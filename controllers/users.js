const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const userModel = require("../models/users");



// 회원가입
exports.user_register = (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

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
                method: "local",
                local: {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                }

            });

            newUser
                .save()
                .then(user => {
                    res.status(200).json({
                        msg : "registered user",
                        userInfo : user
                    })
                });

        });
    //
    // const { errors, isValid } = validateRegisterInput(req.body);
    // const { name, email, password } = req.body;
    //
    // // Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    //
    // userModel
    //     .findOne({ email })
    //     .exec()
    //     .then(user => {
    //         if (user) {
    //             errors.email = 'Email already exists';
    //             return res.status(400).json(errors);
    //         }
    //         const newUser = new userModel({
    //             name, email, password
    //         });
    //         newUser
    //             .save()
    //             .then(user => {
    //                 res.status(200).json({
    //                     msg: "Successful newuser",
    //                     userInfo: user
    //                 });
    //             })
    //             .catch(err => console.log(err));
    //
    //
    //     });

};






//로그인
exports.user_get_login = (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    userModel
        .findOne({"local.email" : req.body.email})
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
                    .compare(req.body.password, user.local.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.msg = "password incorrect";
                            return res.status(400).json(errors);
                            // return res.status(400).json({
                            //     msg : "password incorrect"
                            // });
                        }
                        else {

                            const payload = {id: user._id, name: user.name, avatar: user.avatar};
                            // sign token
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET || "kim",
                                { expiresIn : 36000 }, //만료시간
                                (err, token) => {
                                    res.status(200).json({
                                        msg : "successful login(토큰 반환)",
                                        token : "bearer " + token
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