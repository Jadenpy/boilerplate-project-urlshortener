require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');    // require body-parser


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));   // use body-parser

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Your project API endpoints
// the requriements of this proj.
// 1. must commit a address of yourself proj, not a sample of freecodecamp  DONE
// 2. post a URL to /api/shorturl and get a response likes { original_url: 'http://www.freecodecamp.com', short_url: 1 }
// let a variable[] to store all the {} ,each {} has two key-value pairs: original_url and short_url
const urls = [];

app.post('/api/shorturl', function(req, res) {
  
  //  2. get the original_url from the request body
  const original_url = req.body.url;
  //  3. check if the original_url is valid  --- is not null and like www.xxxxxx.com,use the regex to check
  const regex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  if (!original_url || !regex.test(original_url)) {
    // response error message
    return res.json({ error: 'invalid url' });
  }else {
    // check if the original_url is already in the urls[]
    const url = urls.find(url => url.original_url === original_url);
    if (url) {
      // if yes, return the url and short url   ?
      console.log('url already exists:',url);
      return res.json(url);
    } else {
      // if no, create a new url and push it to the urls[]
      const short_url = urls.length + 1;
      const newUrl = { original_url, short_url };
      urls.push(newUrl);
      // response the new url
      console.log('urls is:', urls);
      return res.json(newUrl);
    }
  }

})
// 3. when you visit /api/shorturl/<short_url>, you will be redirected to the original_url
app.get('/api/shorturl/:short_url', function(req, res) {
  //  3-1. get the short_url from the get request para.
  const short_url = req.params.short_url;
  // console.log('short_url is:',short_url);
  //  3-2. check if the short_url is in the urls[];
  const url = urls.find(url => url.short_url == short_url);
  //  3-3. if yes, redirect to the original_url
  if (url) {
    return res.redirect(url.original_url);
  } else {
    //  3-4. if no, return a response likes { error: 'invalid url' }
    return res.json({ error: 'invalid url' });
  }
})
// 4. if you visit the original URL which is invalid (not like www.freecodecamp.com), you will get a response likes { error: 'invalid url' }


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
