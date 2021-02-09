const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const tasks = require('./models/tasks');

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

app.use('/tasks', router);


const dbase = require('./models/dbase');
const options = dbase;
const mysql2 = require('mysql2');

const pool = mysql2.createPool(options);

router.get('/', (req, res) => {
    tasks.list(pool,data => {
    res.send(JSON.stringify(data));
    });
});

router.delete('/', (req, res) => {
    let id = req.body.id;
    tasks.delete(pool, id, data => {
        res.send(JSON.stringify(data));
    });
});

router.post('/add', (req, res) => {
    tasks.add(pool, req.body, data => {
        res.send(JSON.stringify(data));
    });
});

router.post('/set', (req, res) => {
    // console.log(req.body);
    tasks.change(pool, req.body, data => {
        res.send(JSON.stringify(data));
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening ${port} port`);
});