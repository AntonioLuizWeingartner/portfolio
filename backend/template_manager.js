const pug = require('pug');
const path = require('path');

function compile_template(template_name) {
    return pug.compileFile(path.join(__dirname, '..', 'views', template_name));
}

module.exports.index = compile_template('index.pug');

/**
 * TODO 
 * List all pug files in views directory, pre-compile all of em
 * For each pug file associate a build function that tells it how to go from pre-compiled to a string repr.
 */