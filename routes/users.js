const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");


const userModel = require("../models/users");
const {
    user_register,
    user_get_all,
    user_get_login
} = require("../controllers/users");

const auth_check = passport.authenticate("jwt", {session : false});
const facebook_auth = passport.authenticate("facebookToken", {session: false});

// @route   POST http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", user_register);


// @route   POST http://localhost:1234/users/login
// @desc    user login / return jsonwebtoken
// @access  public
router.post("/login", user_get_login);


// @route POST http://localhost:1234/users/facebook
// @desc user facebook login jsonwebtoken
// @access public
router.post("/facebook", facebook_auth, (req, res) => {

    console.log(req.user);
    const payload = {id: req.user._id, name: req.user.name, avatar: req.user.avatar};

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn : 36000 }, //만료시간
        (err, token) => {
            res.status(200).json({
                msg : "successful login(토큰 반환)",
                token : "bearer " + token
            });
        }
    );
});


// @route   DELETE http://localhost:1234/users/:user_id
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", (req, res) => {

});



// @route   GET http://localhost:1234/users/
// @desc    get userInfo
// @access  private
router.get("/", auth_check, user_get_all);







module.exports = router;