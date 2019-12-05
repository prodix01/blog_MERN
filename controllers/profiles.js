const userModel = require("../models/users");
const profileModel = require("../models/profiles");

const validateProfileInput = require("../validation/profile");
const validateExpInput = require("../validation/experience");
const validateEduInput = require("../validation/education");


//프로필 등록
exports.post_profile = (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    //check Validate
    if (!isValid) {
        return res.status(400).json(errors);
    }

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
            if (profile) {
                profileModel
                    .findOneAndUpdate(
                        {user : req.user.id},
                        {$set : profileFields},
                        {new : true}
                    )
                    .then(profile => {
                        res.status(200).json({
                            msg : "Updated profile",
                            profileInfo : profile
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error : err.message
                        });
                    });
            }
            else {
                new profileModel(profileFields)
                    .save()
                    .then(profile => {
                        res.status(200).json({
                            msg : "registed profile",
                            profileInfo : profile
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
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

};




//프로필 정보 불러오기 수정하기
exports.get_profile = (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            if (!profile) {
                return res.status(400).json({
                    msg : "There is no profile for this user"
                });
            }
            else {
                res.status(200).json({
                    msg : "successful load profileInfo",
                    profileInfo : profile
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

};


//프로필 정보 삭제하기
exports.delete_profile = (req, res) => {

    profileModel
        .findByIdAndRemove(req.user.id)
        .then(() => {
            userModel
                .findOneAndRemove({ _id : req.user.id })
                .then(() => {
                    res.status(200).json({
                        msg : "Deleted profile"
                    });
                })
                .catch(err => {
                    res.status(404).json({
                        error : err.message
                    });
                });
        });


};






//프로필 핸들 탐색
exports.get_handle = (req, res) => {

    profileModel
        .findOne({handle : req.params.handle})
        .then(profile => {
            if (!profile) {
                return res.status(400).json({
                    msg : "There is no profile for this user"
                });
            }
            res.status(200).json({
                result : true,
                count : profile.length,
                profileInfo : profile
            });
        });
};






//프로필 exp 내용 등록
exports.post_Exp = (req, res) => {

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
};




//프로필 edu 내용 등록
exports.post_Edu = (req, res) => {

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
};




//Exp 내용 삭제하기
exports.delete_Exp = (req, res) => {
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

};




//Edu 내용 삭제하기
exports.delete_Edu = (req, res) => {
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

};




