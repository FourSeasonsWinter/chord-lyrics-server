const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { findByGoogleId, createUser, findById } = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await findByGoogleId(profile.id)
        if (!user)
          user = await createUser(profile.id, profile.emails[0].value, profile.displayName)
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id)
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});