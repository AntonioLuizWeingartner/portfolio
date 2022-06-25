const vmanager = require('./views_manager');

module.exports.get_404 = function(req, res, next) {
    res.status(404).sendFile(vmanager.get_html_file('404.html'));
    res.end();
}  