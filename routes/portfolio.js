const path = require('path');
const express = require('express');
const pug = require('pug');
const cviews = require(path.join(__dirname, '..', 'backend', 'template_manager.js'));

const router = express.Router();

router.get('/', (req, res, next) => {
    rendered_page = cviews.index({page_title : 'Inicio', page_content : '<p>Sup bro?</p>'});
    res.send(rendered_page);
    res.end();
});

module.exports = router;