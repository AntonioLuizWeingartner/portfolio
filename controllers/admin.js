const vmanager = require('./views_manager');
const db = require('../util/database');
const Project = require('../models/project');
const bcrypt = require('bcrypt');
const session = require('express-session');

module.exports.get_page = function(req, res, next) {
    if (!req.session.authenticated && req.params.page_name != "login") {
        res.redirect('/admin/login');
        return;
    }

    let page_name = req.params.page_name;
    page_name += '.pug'; 

    let compiled_page = vmanager.try_get_template(page_name, '404.pug').content;
    let rendered_page = compiled_page();
    res.send(rendered_page);
    res.end();
}

module.exports.register_project = function(req, res, next) {
    if (req.session.authenticated) {
        const project = new Project(
            req.body['title'],
            req.body['short_desc'],
            req.body['full_desc'],
            req.body['img_url'],
            req.body['gitrepo']);   
        project.save();
        res.send(vmanager.get_template('project_registered.pug')());
        res.end();
    } else {
        res.redirect('/admin/login');
    }
}

module.exports.process_login_request = async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    const db_user = await db.get_DB().collection('users').findOne({user: username});

    if (db_user === null) {
        res.send("User not found");
    } else {
        const equal = await bcrypt.compare(password, db_user.pass);
        if (equal) {
            req.session.authenticated = true;
            res.redirect('/portfolio/index/');
        } else {
            res.redirect('/admin/login/');
        }
    }
    res.end();
}

module.exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/admin/login');
    res.end();
}