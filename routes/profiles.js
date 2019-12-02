const express = require("express");
const passport = require("passport");
const router = express.Router();

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const validateProfileInput = require("../validation/profile");
const validateExpInput = require("../validation/experience");
const validateEduInput = require("../validation/education");
const profileController = require("../controllers/profiles");



const auth_check = passport.authenticate("jwt", {session : false});

//// @route POST profiles/
// // @desc post profile
// // @ private
router.post("/", auth_check, profileController.post_profile);



// @route GET profiles/
// @desc get profileInfo
// @ private
router.get("/", auth_check, profileController.get_profile);



// @route DELETE profiles/
// @desc delete profile
// @ private
router.delete("/", auth_check, profileController.delete_profile);




// @route GET profiles/handle/:handle
// @desc Get profile by handle
// @ public
router.get("/handle/:handle", profileController.get_handle);



// @route POST profiles/experience
// @desc Add experience to profile
// @access private
router.post("/experience", auth_check, (req, res) => {

    const {errors, isValid} = validateExpInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            // 사용자 입력값 규정
            const newExp = {
                title : req.body.title,
                company : req.body.company,
                location : req.body.location,
                from : req.body.from,
                to : req.body.to,
                current : req.body.current,
                description : req.body.description
            };

            //add to exp array
            profile.experience.unshift(newExp);
            profile
                .save()
                .then(profile => {
                    res.status(200).json(profile);
                })
                .catch(err => {
                    errors.msg = err.message;
                    res.status(404).json(errors);
                });
        });
});





// @route POST profiles/education
// @desc Add education to profile
// @access private
router.post("/education", auth_check, (req, res) => {

    const {errors, isValid} = validateEduInput(req.body);

    //check validation
    if (!isValid) {
        res.status(400).json(errors);
    }
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            const newedu = {
                school : req.body.school,
                degree : req.body.degree,
                major : req.body.major,
                from : req.body.from,
                to : req.body.to,
                current : req.body.current,
                description : req.body.description
            };

            //add to edu array
            profile.education.unshift(newedu);
            profile
                .save()
                .then(profile => {
                    res.status(200).json(profile);
                })
                .catch(err => {
                    errors.msg = err.message;
                    res.status(404).json(errors);
                });
        });
});


// @route DELETE profile/education/:edu_id
// @desc Delete education from profile
// @access private
router.delete("/education/:edu_id", auth_check, (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {

            //get remove index

            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);

            //splice out of array
            profile.education.splice(removeIndex, 1);
            //save
            profile
                .save()
                .then(profile => {
                    res.status(200).json(profile)
                })
                .catch(err => {
                    res.status(400).json({
                        error : err.message
                    });
                });


        });

});



// @route DELETE profile/experience/:exp_id
// @desc Delete experience from profile
// @access private
router.delete("/experience/:exp_id", auth_check, (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {

            //get remove index

            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);

            //splice out of array
            profile.experience.splice(removeIndex, 1);

            //save
            profile
                .save()
                .then(profile => {
                    res.status(200).json(profile)
                })
                .catch(err => {
                    res.status(400).json({
                        error : err.message
                    });
                });
        })

});


module.exports = router;