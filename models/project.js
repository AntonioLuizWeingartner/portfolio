const db = require('../util/database');
const uuid = require('uuid');
const { ObjectId } = require('mongodb');

class Project {

    constructor(title, short_desc, full_desc, thumb_url, git_repo) {
        this.title = title;
        this.short_desc = short_desc;
        this.full_desc = full_desc;
        this.thumb_url = thumb_url;
        this.git_repo = git_repo;
    }

    save() {
        db.get_DB().collection('Projects').insertOne(this)
        .catch(err => console.log(err));
    }

    static fetch(obj_id) {
        //return new project object
    }

}

module.exports = Project;