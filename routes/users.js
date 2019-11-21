const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userModel = require("../models/users");
const userController = require("../controllers/users");


// @route   POST http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", userController.user_register);


// @route   POST http://localhost:1234/users/login
// @desc    user login / return jsonwebtoken
// @access  public
router.post("/login", (req, res) => {

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg : "No emailInfo"
                });
            }
            else {
                // 패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({
                                msg : "password incorrect"
                            });
                        }
                        else {
                            //토큰에 들어갈 유저정
                            const payload = {
                                id : user.id,
                                name : user.name,
                                avatar : user.avatar
                            };
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

});


// @route   POST http://localhost:1234/users/:user_id
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", (req, res) => {

});



// @route   POST http://localhost:1234/users/
// @desc    get userInfo
// @access  private
router.get("/", (req, res) => {

});







module.exports = router;