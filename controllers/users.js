const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRagisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const userModel = require("../models/users");



// 회원가입
exports.user_register = (req, res) => {

    const {errors, isValid} = validateRagisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    // 이메일 중복여부
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (user) {
                errors.msg = "email already exists";
                return res.status(400).json(errors);
                // return res.status(400).json({
                //     msg : "email already exists"
                // });
            }

            const newUser = new userModel({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });

            newUser
                .save()
                .then(user => {
                    res.status(200).json({
                        msg : "registered user",
                        userInfo : user
                    })
                })
                .catch(err => {
                    errors.msg = err.message;
                    res.status(500).json(errors);
                })

        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
};






//로그인
exports.user_get_login = (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                errors.msg = "No emailInfo";
                return res.status(400).json(errors);
                // return res.status(404).json({
                //     msg : "No emailInfo"
                // });
            }
            else {
                // 패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.msg = "password incorrect";
                            return res.status(400).json(errors);
                            // return res.status(400).json({
                            //     msg : "password incorrect"
                            // });
                        }
                        else {

                            const payload = {id: user.id, name: user.name, avatar: user.avatar};
                            // sign token
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn : 36000 }, //만료시간
                                (err, token) => {
                                    res.status(200).json({
                                        msg : "successful login(토큰 반환)",
                                        tokenInfo : "bearer " + token
                                    });
                                }
                            );
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            error : err.message
                        });
                    });

            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

};




//회원정보 불러오기
exports.user_get_all = (req, res) => {
    res.status(200).json({
        id : req.user.id,
        name : req.user.name,
        avatar : req.user.avatar
    })
};