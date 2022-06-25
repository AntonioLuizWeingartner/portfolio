const vmanager = require('./views_manager');

module.exports.render = function(req, res, next) {
    let url_arr = req.url.split('/');
    
    let page_name;
    let page_title;

    if (url_arr.length < 2 ||  url_arr[1] == "") {
        page_name = 'index.html';
        page_title = 'Index';
    } else {
        page_name = url_arr[1] + '.html';
        console.log(url_arr[1]);
        page_title = url_arr[1].charAt(0).toUpperCase() + url_arr[1].slice(1); 
    }

    results = vmanager.try_get_html_file(page_name, '404.html');

    page_content = results.content;

    if (!results.success) {
        page_title = 'Não foi possível localizar a página especificada'
    } 

    let compiled_page = vmanager.get_template('index.pug');
    let rendered_page = compiled_page({
        page_title : page_title,
        page_content : page_content
    })
    res.send(rendered_page);
    res.end();
}