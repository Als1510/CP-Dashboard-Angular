const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
const User = require('../../models/User')

function generateRandomUsername() {
  return username = Math.random().toString(36).substring(3, 7);
}

// @route   POST api/social/google
// @desc    Authenticate/Register user with google
// @access  Public 
router.get('/google', passport.authenticate('google', { session: false }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL + '/register', session: false }),
  async (req, res) => {
    const userData = req.user;

    try {
      let user = await User.findOne({ email: userData.emails[0].value });
      // Provider isn't google
      if (user && user.provider !== 'google') {
        let message = "Please register your account";
        res.redirect(process.env.CLIENT_URL + `/#/register?message=${message}`);
      } else {  // Registering user
        if (!user) {
          let isUnique = false;
          let username;

          while (!isUnique) {
            username = generateRandomUsername();
            const existingUser = await User.findOne({ username });
            if (!existingUser) {
              isUnique = true;
            }
          }

          user = new User({
            name: userData.displayName,
            username,
            email: userData.emails[0].value,
            password: null,
            uniqueString: null,
            active: userData.emails[0].verified,
            provider: 'google'
          })

          await user.save();
        }

        const payload = {
          id: user.id,
          name: user.name,
          username: user.username
        }

        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error
            res.redirect(process.env.CLIENT_URL + `/#/login?token=${token}`);
          }
        )
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error!')
    }
  }
)

// @route   POST api/social/github
// @desc    Authenticate/Register user with github
// @access  Public 
router.get('/github', passport.authenticate('github', { session: false }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL + '/register', session: false }),
  async (req, res) => {
    const userData = req.user;

    try {
      if (!userData?.emails) {
        let message = "You have set your email address to private on your github account. To continue make your email public";
        return res.redirect(process.env.CLIENT_URL + `/#/register?message=${message}`);
      }

      let user = await User.findOne({ email: userData.emails[0].value });
      // Provider isn't github
      if (user && user.provider !== 'github') {
        let message = "Please register your account";
        res.redirect(process.env.CLIENT_URL + `/#/register?message=${message}`);
      } else {  // Registering user
        if (!user) {

          let isUnique = false;
          let username = userData.username;
          const existingUser = await User.findOne({ username });
          if (!existingUser) {
            isUnique = true;
          }

          while (!isUnique) {
            username = generateRandomUsername();
            const existingUser = await User.findOne({ username });
            if (!existingUser) {
              isUnique = true;
            }
          }

          user = new User({
            name: userData.displayName,
            username,
            email: userData.emails[0].value,
            password: null,
            uniqueString: null,
            active: true,
            provider: userData.provider
          })

          await user.save();
        }

        const payload = {
          id: user.id,
          name: user.name,
          username: user.username
        }

        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error
            res.redirect(process.env.CLIENT_URL + `/#/login?token=${token}`);
          }
        )
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error!')
    }
  }
)

module.exports = router;