const express = require("express");
const passport = require("passport");
const router = express.Router();

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
router.post("/experience", auth_check, profileController.post_Exp);




// @route POST profiles/education
// @desc Add education to profile
// @access private
router.post("/education", auth_check, profileController.post_Edu);




// @route DELETE profile/education/:edu_id
// @desc Delete education from profile
// @access private
router.delete("/education/:edu_id", auth_check, profileController.delete_Exp);




// @route DELETE profile/experience/:exp_id
// @desc Delete experience from profile
// @access private
router.delete("/experience/:exp_id", auth_check, profileController.delete_Edu);


module.exports = router;