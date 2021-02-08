const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const newsRout = express.Router();

const app = express();
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.redirect('/news.html');
});

app.use('/news', newsRout);

newsRout.post('/', (req, res) => {
    const request = req.body;

    if (request.news == 'yandex') {

        axios.get('https://yandex.ru/').then((result) => {
            let $ = cheerio.load(result.data);
            let news = [];
            $('.news__item-content').each(function (i, element) {
                news.push($(this).text());
            });
            res.render('news', {text: news})
        }).catch((err) => {
            res.send(JSON.stringify({result: 0, text: err}));
        });
    }

    if (request.news == 'rbk') {

        axios.get('https://www.rbc.ru/').then((result) => {
            let $ = cheerio.load(result.data);
            // console.log(result.data);
            let news = [];

            $('.main__feed__title').each(function (i, element) {
                news.push($(this).text());
            });

            res.render('news', {text: news})
        }).catch((err) => {
            res.send(JSON.stringify({result: 0, text: err}));
        });
    }
});




//
// app.get('/', (req, res) => {
//     res.redirect('/index.html');
// });



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening ${port} port`);
});
