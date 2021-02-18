const db = require('./models/db.js');
// const initdb = require('./models/initdb.js');
// initdb();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = require('./middlewares/sessionmiddleware');

app.use(sessionMiddleware);

const chat = io.of("/chat");

chat.use((socket,next) => {
  sessionMiddleware(socket.request, {}, next);
});

chat.on("connection", (socket) => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log('Unautorized user');
    socket.disconnect();
    return;
  }
  console.log('Chat user connected:', socket.request.session.username);
  socket.join("room1");
  chat.to("room1").emit("hello");
  socket.on('disconect', () => {
    console.log('Chat user disconected:', socket.request.session.username)
  });
  socket.on('chat message',msg => {
    console.log('Chat message from', socket.request.session.username+':',msg);
    msg = socket.request.session.username + ': ' + msg;
    chat.to("room1").emit('chat message', msg);
  });
});


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

http.listen(3000, () => {
  console.log('listening on *:3000');
});

module.exports = sessionMiddleware;