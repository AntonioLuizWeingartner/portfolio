const path = require('path');
const pug = require('pug');
const express = require('express');
const portfolio_router = require(path.join(__dirname, 'routes', 'portfolio.js'));
const error_controller = require('./controllers/error');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/portfolio', portfolio_router);

app.use('/', error_controller.get_404);

app.listen(3000);