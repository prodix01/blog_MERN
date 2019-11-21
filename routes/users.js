const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");


const userModel = require("../models/users");


// @route   POST http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {


    // 이메일 중복여부
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg : "email already exitsts"
                });
            }
            const avatar = gravatar.url(req.body.email, {
                s : '200',  //size
                r : 'pg',   //rating
                d : 'mm'    //default
            });

            const newUser = new userModel({
                name : req.body.userName,
                email : req.body.email,
                avatar : avatar,
                password : req.body.password
            });

            //패스워드 암호화
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.status(200).json({
                                msg : "registered user",
                                userInfo : user
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error : err.message
                            });
                        });
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });










});


// @route   POST http://localhost:1234/users/login
// @desc    user login / return jsonwebtoken
// @access  public
router.post("/login", (req, res) => {

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