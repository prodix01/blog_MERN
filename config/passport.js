//jwt 을 검증하는 모듈

const JwtStrategy = require("passport-jwt").Strategy;  //  Strategy : jwt 검사
const ExtractJwt = require("passport-jwt").ExtractJwt; // jwt 풀어주기
const FacebookTokenStrategy = require("passport-facebook-token");
const userModel = require("../models/users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || "kim";

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            userModel
                .findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        done(null, false);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        })
    );



    //
    passport.use("facebookToken", new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENTID || "3469341533092807",
        clientSecret: process.env.FACEBOOK_SECRET || "800ff990b22a51b728de8f1d9960a69b",

    }, async (accessToken, refreshToken, profile, cb) => {
        // console.log("profile", profile);
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        try {
            const existingUser = await userModel.findOne({"facebook.id" : profile.id });
            if (existingUser) {
                return cb(null, existingUser);
            }
            const newUser = new userModel({
                method: "facebook",
                facebook: {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value
                }
            });
            await newUser.save();
            cb(null, newUser);

        }
        catch (error) {
            cb(error, false, error.message)
        }
    }))

};
