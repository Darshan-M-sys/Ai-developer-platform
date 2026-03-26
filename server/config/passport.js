const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");


// ============================
// SESSION STORE
// ============================

// store user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// get user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// ============================
// GITHUB OAUTH STRATEGY
// ============================

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      // change this if your backend port is different
      callbackURL: "http://localhost:5000/api/auth/github/callback",

      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        // check if user already exists
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        }

        // if not exists → create new user
        user = await User.create({
          name: profile.displayName || profile.username,
          email: profile.emails[0].value,
          githubId: profile.id,
          avatar: profile.photos[0].value,
        });

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;