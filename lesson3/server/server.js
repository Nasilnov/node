const express = require('express');
const fs = require('fs');
const newsRouter = require('./newsRouter');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/news', newsRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

