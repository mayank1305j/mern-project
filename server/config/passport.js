import pkg from "passport-jwt";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
import User from "../models/Users.js";
import * as dotenv from "dotenv";
dotenv.config();

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
