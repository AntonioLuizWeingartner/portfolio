const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const connect_DB = function(on_connect) {
    mongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority`)
    .then((client_obj) => {
        console.log("Succesfully connected")
        _db = client_obj.db('Portfolio');
        on_connect(client_obj);
    })
    .catch((err) => {console.log(err)});
}

function get_DB() {
    if (_db) {
        return _db;
    } else {
        throw 'No DataBase found';
    }
}

module.exports.connect_DB = connect_DB;
module.exports.get_DB = get_DB;