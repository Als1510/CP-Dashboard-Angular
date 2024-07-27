const cheerio = require('cheerio');
const axios = require('axios');
const Contest = require('../models/Contest');

const removeSpecialCharacters = (str) => {
  return str.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
};

const convertTimeToMilliseconds = (timeString) => {
  const [hours, minutes, seconds = 0] = timeString.split(':').map(Number);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
};


function getStartOnDate(inputDate) {
  inputDate = new Date(inputDate);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDay = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate =
    `${formattedDay} ${months[inputDate.getMonth()]} ${inputDate.getFullYear()} ${days[inputDate.getDay()]} ` +
    `${String(inputDate.getHours()).padStart(2, '0')}:${String(inputDate.getMinutes()).padStart(2, '0')}`;
  return formattedDate;
}

const calculateTime = (duration) => {
  const totalSeconds = Math.floor(duration / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  let result = '';
  if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  if (!result) result += '< minute';

  return result.trim();
}

async function getContestsFromPlatforms() {
  let contests = [];

  // Leetcode
  try {
    const response = await axios.get('https://leetcode.com/contest/');
    const $ = cheerio.load(response.data);
    $('.swiper-slide').each((index, element) => {
      const name = $(element).find('.text-label-1 span').text().trim();
      const startTimeString = $(element).find('.flex.items-center div').text().replace(new RegExp(name + '.*' + name, 'g'), '').replace(new RegExp(name, 'g'), '').trim();
      const duration = calculateTime(convertTimeToMilliseconds("01:30"));
      const url = "https://leetcode.com" + $(element).find('a').attr('href');
      if (!startTimeString.match(/Ended/)) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const [, day, time] = startTimeString.match(/([a-zA-Z]+) (\d+:\d+) [a-zA-Z]+/);
        const [hours, minutes] = time.split(':').map(Number);
        const dayNumber = days.indexOf(day);
        const currentUTCDate = new Date((new Date()).toUTCString());
        const dayDifference = (dayNumber - currentUTCDate.getUTCDay() + 7) % 7;
        currentUTCDate.setUTCHours(hours + 5, minutes + 30);
        currentUTCDate.setUTCDate(currentUTCDate.getUTCDate() + dayDifference);
        const startTime = currentUTCDate.toISOString().replace(/\.\d+Z$/, '');
        const startsOn = getStartOnDate(startTime);
        contests.push({ name, startTime, startsOn, duration, url, platform: 'leetcode' });
      }
    });
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error.message);
  }

  // Spoj
  try {
    const response = await axios.get('https://spoj.com/contests');
    const $ = cheerio.load(response.data);
    $('#content .row table tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const name = removeSpecialCharacters($(columns[0]).text().trim());
      const url = "https://www.spoj.com" + $(columns[0]).find('a').attr('href');
      const startTime = new Date(new Date($(columns[1]).text().trim()).
        toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })).toISOString().replace(/\.\d+Z$/, '');
      const startsOn = getStartOnDate(startTime);
      const endTime = $(columns[2]).text().trim();
      const duration = calculateTime(new Date(endTime) - new Date(startTime));
      contests.push({ name, startTime, startsOn, duration, url, platform: 'spoj' });
    });
  } catch (error) {
    console.error('Error fetching spoj contests:', error.message);
  }

  // Codeforces
  try {
    const response = await axios.get('https://codeforces.com/contests');
    const $ = cheerio.load(response.data);
    $('.datatable:first tbody tr').each((index, element) => {
      if (index !== 0) {
        const id = $(element).attr('data-contestid');
        const columns = $(element).find('td');
        const name = removeSpecialCharacters($(columns[0]).text().trim());
        let startTime = new Date($(columns[2]).text().trim());
        startTime.setMinutes(startTime.getMinutes() + 480);
        startTime = startTime.toISOString().replace(/\.\d+Z$/, '');
        const startsOn = getStartOnDate(startTime);
        const currentTime = new Date();
        const duration = calculateTime(convertTimeToMilliseconds($(columns[3]).text()));
        const isContestStarted = new Date(startTime) < currentTime;
        const url = isContestStarted
          ? `https://codeforces.com/contest/${id}`
          : `https://codeforces.com/contestRegistration/${id}?backUrl=%2Fcontests%2F${id}`;
        contests.push({ name, startTime, startsOn, duration, url, platform: 'codeforces' });
      }
    });
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error.message);
  }

  // Atcoder
  try {
    const response = await axios.get('https://atcoder.jp/contests/');
    const $ = cheerio.load(response.data);
    $('#contest-table-action .table-default tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      let startTime = new Date($(columns[0]).text());
      startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset());
      startTime = startTime.toISOString().replace(/\.\d+Z$/, '');;
      const startsOn = getStartOnDate(startTime);
      const name = removeSpecialCharacters($(columns[1]).text().trim());
      const url = "https://atcoder.jp" + $(columns[1]).find('a').attr('href');
      const duration = calculateTime(convertTimeToMilliseconds($(columns[2]).text()));
      contests.push({ name, startTime, startsOn, duration, url, platform: 'atcoder' });
    });
    $('#contest-table-upcoming .table-default tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      let startTime = new Date($(columns[0]).text());
      startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset());
      startTime = startTime.toISOString().replace(/\.\d+Z$/, '');
      const startsOn = getStartOnDate(startTime);
      const name = removeSpecialCharacters($(columns[1]).text().trim());
      const url = "https://atcoder.jp" + $(columns[1]).find('a').attr('href');
      const duration = calculateTime(convertTimeToMilliseconds($(columns[2]).text()));
      contests.push({ name, startTime, startsOn, duration, url, platform: 'atcoder' });
    });
    $('#contest-table-permanent .table-default tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const startTime = new Date(new Date("01 January 2022").toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })).toISOString().replace(/\.\d+Z$/, '');
      const startsOn = getStartOnDate(startTime);
      const name = removeSpecialCharacters($(columns[0]).text().trim());
      const url = "https://atcoder.jp" + $(columns[0]).find('a').attr('href');
      const duration = 'Infinite';
      contests.push({ name, startTime, startsOn, duration, url, platform: 'atcoder' });
    });
  } catch (error) {
    console.error('Error fetching AtCoder contests:', error.message);
  }

  return contests;
}

async function scrapeContests() {
  try {
    const contests = await getContestsFromPlatforms();
    await Contest.deleteMany({});
    await Contest.insertMany(contests);
    console.log("Contest fetched");
  } catch (error) {
    console.error('Error scraping contests:', error);
  }
}

module.exports = scrapeContests;