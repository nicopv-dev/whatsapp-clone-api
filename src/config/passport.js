import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL,
} from "../utils/constants.js";
import User from "../models/User.js";

export default function Setup() {
  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const userFound = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!userFound) {
          const user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatarUrl: profile.photos[0].value,
            googleId: profile.id,
          });
          const userSaved = await user.save();
          return done(null, userSaved);
        }
        return done(null, userFound);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
