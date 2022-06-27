const vmanager = require('./views_manager');
const db = require('./../util/database');
const { ObjectId } = require('mongodb');

module.exports.render_page = function(req, res, next) {
    let page_name = req.params.page_name;
    page_name += '.pug'; 

    let compiled_page = vmanager.try_get_template(page_name, '404.pug').content;
    let rendered_page = compiled_page({
        page : req.params.page_name
    });
    res.send(rendered_page);
    res.end();
}

module.exports.list_projects = async function(req, res, next) {
    //fetch data from db
    const cursor = db.get_DB().collection('Projects').find({}, {});
    
    const projects = await cursor.toArray();
    let rendered_page = vmanager.get_template('projects.pug')({projects: projects, page : 'projects'});
    res.send(rendered_page);
    res.end();
}

module.exports.get_project = async function(req, res, next) {
    const project = await db.get_DB().collection('Projects').findOne({_id : ObjectId(req.params.pid)});
    let rendered_page = vmanager.get_template('project_details.pug')({prj : project, page : 'projects'});
    res.send(rendered_page);
    res.end();
}