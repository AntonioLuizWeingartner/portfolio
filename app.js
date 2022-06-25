const path = require('path');
const pug = require('pug');
const express = require('express');
const portfolio_router = require(path.join(__dirname, 'routes', 'portfolio.js'));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', portfolio_router);



app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(3000);