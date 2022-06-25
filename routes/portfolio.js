const path = require('path');
const express = require('express');
const pug = require('pug');
const vmanager = require('./../controllers/views_manager.js');
const portfolio = require('./../controllers/portfolio');

const router = express.Router();

router.use('/', portfolio.render);

module.exports = router;