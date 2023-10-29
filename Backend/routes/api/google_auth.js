const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.SERVER_URL + `/api/social/google/callback`,
  scope: ['profile', 'email'],
},
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
))