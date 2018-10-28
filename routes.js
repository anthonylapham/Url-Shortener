const express = require('express');
const router = express.Router();
const validator = require('validator');
const shortid = require('shortid');
const Url = require('./models/Url');

router.get('/', (req, res) => {
  Url.find({},  (err, result) => {
    if(err)return res.status(500).send({success: false, msg: 'Error'});
    if(!result) return res.status(404).send({success: false, msg: 'Not found'});
    res.render('index', {
      shortUrl: null,
      arrayOfResults: result
    });
  });
});

/*router.get('/shorten', (req, res) => {
  return res.redirect(Url);
});*/

router.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  // Check the database for the short code
  // If the shortCode exists, then redirect the user
  // If the code does not exist in the database, respond with an error.
  Url.findOne({ shortCode }, (err, result) => {
    if (err) return res.status(500).send({ success: false, msg: 'Error reading database' });
    if (!result) return res.status(404).send({ success: false, msg: 'Short code not found' });
    const { url } = result;
    res.redirect(url);
  });
});

router.post('/shorten', (req, res) => {
  const { url } = req.body;
  if (validator.isURL(url, { require_protocol: true })) {
    // first check if the URL has already been added to the db
    Url.findOne({ url }, (err, result) => {
      if (err) return res.send('Error searching the DB');
      // If it has been added, then respond with its shortid
      if (result) {
        return res.render('index', {
          shortUrl: result.shortCode
        })
      }

      // If it hasn't been added, then create a short id, add the record to the DB, and then respond
      const shortCode = shortid();
      const newRecord = new Url({
        url,
        shortCode
      });
      newRecord.save((err) => {
        if (err) return res.send('Error writing to the DB');
        res.render('index', {
          shortUrl: shortCode
        });
      });
    });
  } else {
    res.send('Invalid URL!');
  }
});

//

module.exports = router;
