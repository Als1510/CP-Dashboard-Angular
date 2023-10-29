const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport');
const app = express();
require('dotenv').config();
require('./routes/api/google_auth');
require('./routes/api/github_auth');
app.use(passport.initialize());

const corsOptions = {
  origin: ["http://localhost:4200", "https://cp-dashboard.netlify.app"]
}

app.use(cors(corsOptions))
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
connectDB()
app.use(express.static('config'))

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/user', require('./routes/api/user'))
app.use('/api/validation', require('./routes/api/validation'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/platform', require('./routes/api/platform'))
app.use('/api/social', require('./routes/api/social'))

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))