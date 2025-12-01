const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const usermodel = require("../models/user.model");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in DB
        let email = profile.emails[0].value;
        let fullname = profile.displayName;
        let profilePic = profile.photos[0].value;

        let user = await usermodel.findOne({ email });
        if (!user) {
          user = await usermodel.create({
            fullname,
            email,
            profilePic,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Optional - if you use sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await usermodel.findById(id);
  done(null, user);
});