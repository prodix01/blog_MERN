const express = require("express");
const router = express.Router();
const passport = require("passport");



const auth_check = passport.authenticate("jwt", {session : false});

const {
    post_update,
    post_doPost,
    get_post_all,
    get_post_detail,
    delete_post,
    like_post,
    unlike_post,
    post_comment,
    delete_comment
} = require("../controllers/posts");



// @route POST /posts
// @desc Create post
// @access private
router.post("/", auth_check, post_doPost);



// @route GET /posts
// @desc Get post
// @access public
router.get("/", get_post_all);




// @route POST /posts/
// @desc update post
// @access private
router.post("/", auth_check, post_update);



// @route GET /posts/:post_id
// @desc Detail Get post
// @access private
router.get("/:post_id", auth_check, get_post_detail);




// @route DELETE /posts/:post_id
// @desc Detail Delete post
// @access private
router.delete("/:post_id", auth_check, delete_post);





// @route POST /posts/like/:post_id
// @desc Like post
// @access private
router.post("/like/:post_id", auth_check, like_post);




// @route POST /posts/unlike/:post_id
// @desc UnLike post
// @access private
router.post("/unlike/:post_id", auth_check, unlike_post);




// @route POST /posts/comment/:post_id
// @desc Add comment to post
// access private
router.post("/comment/:post_id", auth_check, post_comment);




// @route DELETE /posts/comment/:post_id/:commnet_id
// @desc Delete comment to post
// @access private
router.delete("/comment/:post_id/:comment_id", auth_check, delete_comment);



module.exports = router;