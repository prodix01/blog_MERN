const express = require("express");
const passport = require("passport");
const router = express.Router();

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const auth_check = passport.authenticate("jwt", {session : false});

// 프로필 등록
router.post("/", auth_check, (req, res) => {
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills - spilt into array
    if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
    }

    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            new profileModel(profileFields)
                .save()
                .then(profile => {
                    res.status(200).json({
                        profileInfo : profile
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        error : err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});



//프로필 불러오기
router.get("/", auth_check, (req, res) => {

});



//프로필 삭제
router.delete("/", auth_check, (req, res) => {

});


module.exports = router;