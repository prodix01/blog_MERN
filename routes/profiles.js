const express = require("express");
const passport = require("passport");
const router = express.Router();

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const auth_check = passport.authenticate("jwt", {session : false});

// 프로필 등록
router.post("/", auth_check, (req, res) => {




});



//프로필 불러오기
router.get("/", auth_check, (req, res) => {

});



//프로필 삭제
router.delete("/", auth_check, (req, res) => {

});


module.exports = router;