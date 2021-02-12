const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const controllers = require('./controllers')

// initdb();

const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
// app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function (user) { done(null, user); })
        .catch(done);
});


passport.use(new VKontakteStrategy(
    {
        clientID:     7759130, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: 'Alpt6cKBstHEx17z1w3N',
        callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
    },
    function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
        // console.log(profile)
        return done(null, profile);
    }
));

app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/auth/vk/',
        failureRedirect: '/login'
    }),
);


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

const registerHelpers = require('./views/helpers');
registerHelpers();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const router = require('./routers');

app.use(router);

app.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
