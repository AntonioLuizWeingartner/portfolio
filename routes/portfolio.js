const path = require('path');
const express = require('express');
const pug = require('pug');
const vmanager = require('./../controllers/views_manager.js');
const portfolio = require('./../controllers/portfolio');

const router = express.Router();

router.get('/projects', portfolio.list_projects);
router.get('/:page_name', portfolio.render_page);

module.exports = router;