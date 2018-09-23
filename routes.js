const express = require('express');
const router = express.Router();
const validator = require('validator');
const shortid = require('shortid');

router.get('/', (req, res) => {
  res.render('index', { shortUrl: null });
});

router.post('/shorten', (req, res) => {
  const { url } = req.body;
  if (validator.isURL(url)) {
    // first check if the URL has already been added to the db
    // If it has been added, then respond with its shortid
    // If it hasn't been added, then create a short id, add the record to the DB, and then respond
    res.render('index', { shortUrl: shortid() })
  } else {
    res.send('Invalid URL!');
  }
});

//

module.exports = router;
