const pug = require('pug');
const path = require('path');
const fs = require('fs');

let compiled_templates = {};
let html_files = {};
let files_loaded = false;

function compile_template(template_name) {
    return pug.compileFile(path.join(__dirname, '..', 'views', template_name));
}

function load_html_files(files) {
    files.map((file_name) => {
        html_files[file_name] = fs.readFileSync(path.join(__dirname, '..', 'views', file_name)).toString();
    });
}

function load_files() {
    if (files_loaded) {
        console.log("Reloading templates and HTML files.");
        files_loaded = false;
        compiled_templates = {};
        html_files = {};
    }

    try {
        let files = fs.readdirSync(path.join(__dirname, '..', 'views'));

        load_html_files(files.filter((str) => str.endsWith('.html')));

        let template_files = files.filter((str) => str.endsWith('.pug'));

        let templates = template_files.map((file_name) => compile_template(file_name))   

        templates.map((ctemplate, index) => {
            compiled_templates[template_files[index]] = ctemplate;
        });
        files_loaded = true;
    } catch(err) {
        console.error(err);
    }
}

function get_file(name, object) {
    if (!files_loaded) {
        throw new Error("Files are not loaded (Did you forget to call load_files ?).");
    }
    if (name in object) {
        return object[name];
    } else {
        throw new Error(`The specified file does not exist on the server (filename: ${name}).`);
    }
}

function get_html_file(name) {
    return get_file(name, html_files);
}

function try_get_html_file(name, fallback_name) {
    try {
        return { content : get_html_file(name), success : true};
    } catch(err) {
        return { content : get_html_file(fallback_name), success : false};
    }
}

function get_template(name) {
    return get_file(name, compiled_templates);
}

load_files();

module.exports.get_html_file = get_html_file;
module.exports.get_template = get_template;
module.exports.try_get_html_file = try_get_html_file;