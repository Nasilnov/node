const db = require('./models/db.js');

const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public'));

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
    store: sessionStore,
    secret: "Большой секрет",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 }
});

app.use(sessionMiddleware);

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;


app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


const router = require('./routers');

app.use(router);

app.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
