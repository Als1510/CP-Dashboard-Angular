const express = require('express');
const router = express.Router();
const Contest = require('../../models/Contest');

function sortContests(contests) {
  contests.sort((a, b) => {
    const dateA = new Date(a.startTime);
    const dateB = new Date(b.startTime);
    return dateA - dateB;
  });
  return contests;
}

// @route    GET api/contest/all
// @desc     Get all upcoming/ongoing contest
// @access   Public
router.get('/', async (req, res) => {
  try {
    const allContests = await Contest.find({});
    await sortContests(allContests);
    const contestsByPlatform = {};
    const contests = allContests.filter((contest) => {
      const platform = contest.platform;
      if (!contestsByPlatform[platform]) {
        contestsByPlatform[platform] = true;
        return true;
      }
      return false;
    })
    res.json(contests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
})

// @route    GET api/contest/all
// @desc     Get all upcoming/ongoing contest
// @access   Public
router.get('/all', async (req, res) => {
  try {
    let contests = await Contest.find({});
    await sortContests(contests);
    res.json(contests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
})

module.exports = router;