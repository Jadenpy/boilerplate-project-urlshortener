require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Your project API endpoints
// the requriements of this proj.
// 1. must commit a address of yourself proj, not a sample of freecodecamp
// 2. post a URL to /api/shorturl and get a response likes { original_url: 'http://www.freecodecamp.com', short_url: 1 }
// 3. when you visit /api/shorturl/<short_url>, you will be redirected to the original_url
// 4. if you visit the original URL which is invalid (not like www.freecodecamp.com), you will get a response likes { error: 'invalid url' }

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
