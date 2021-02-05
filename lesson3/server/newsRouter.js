const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
const bodyParser = require('body-parser');
const { IAM_TOKEN, FOLDER } = require("./yandexset");

router.get('/', (req, res) => {

  axios.get('https://yandex.ru/').then((result) => {
    let $ = cheerio.load(result.data);
    let news = [];
    $('.news__item-content').each(function(i, element){
      news.push($(this).text());
    });
    res.send(JSON.stringify(news));
  }).catch((err) => {
    res.send(JSON.stringify({result: 0, text: err}));
  });
});
//
router.post('/', (req, res) => {

  axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
    "folder_id": FOLDER,
    "texts": req.body.req,
    "targetLanguageCode": "ru"
  }, {
    headers: {
      'Content-Type': 'aaplication/json',
      'Authorization': 'Bearer ' + IAM_TOKEN
    }
  }).then((result) => {
        res.send(JSON.stringify(result.data.translations));
      }).catch((err) => {
    res.send(JSON.stringify(err));
  });
});

module.exports = router;