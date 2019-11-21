const express = require("express");
const router = express.Router();



// @route   POST http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {

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