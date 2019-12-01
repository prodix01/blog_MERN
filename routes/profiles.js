const express = require("express");
const passport = require("passport");
const router = express.Router();

const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const validateProfileInput = require("../validation/profile");
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



module.exports = router;