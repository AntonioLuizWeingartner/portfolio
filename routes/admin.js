const path = require('path');
const express = require('express');
const admin_controller = require('../controllers/admin');

const router = express.Router();

router.get('/logout', admin_controller.logout);

router.get('/:page_name', admin_controller.get_page);

router.post('/register_project', admin_controller.register_project);

router.post('/login', admin_controller.process_login_request);

module.exports = router;