const path = require('path');
const pug = require('pug');
const express = require('express');
const portfolio_router = require(path.join(__dirname, 'routes', 'portfolio.js'));
const admin_router = require('./routes/admin');
const error_controller = require('./controllers/error');
const db = require('./util/database.js');
const body_parser = require('body-parser');
const session = require('express-session');
const mongo_store = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');

const app = express();

const store = new mongo_store({
    uri : "mongodb+srv://antonio:root@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority",
    collection : 'sessions',
    databaseName: 'Portfolio'
});

store.on('error', (err) => {
    console.error(err);
});

app.use(session({secret: 'asdoaseqw', resave: false, saveUninitialized: false, store: store})); //session middleware
app.use(body_parser.urlencoded({extended:true})); //middleware to parse the request body
app.use(express.static(path.join(__dirname, 'public'))); //middleware to serve public files

app.use('/portfolio', portfolio_router);
app.use('/admin', admin_router);

app.get('/', error_controller.get_404);

db.connect_DB(() => {
    (() => {
        const username = 'portfolioAdmin';
        const password = 'r00tus3r';
    
        bcrypt.hash(password, 10, async function(err, hash) {
            if (err) {
                console.error(err);
                return;
            }
            try {
                const users_collection = db.get_DB().collection('users');
                await users_collection.insertOne({user: username, pass : hash});
                console.log("user succesfully inserted");
            } catch(db_err) {
                console.error(db_err);
            }
        });
    });
    app.listen(3000);
});