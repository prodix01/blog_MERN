//jwt 을 검증하는 모듈

const JwtStrategy = require("passport-jwt").Strategy;  //  Strategy : jwt 검사
const ExtractJwt = require("passport-jwt").ExtractJwt; // jwt 풀어주기
const userModel = require("../models/users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

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
};
