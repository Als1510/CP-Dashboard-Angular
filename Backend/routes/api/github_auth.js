const passport = require('passport');
require('dotenv').config();
const GithubStrategy = require("passport-github").Strategy;

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.SERVER_URL + `/api/social/github/callback`,
  scope: 'user:email',
},
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
))