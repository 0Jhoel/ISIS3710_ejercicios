const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const url = process.env.mongourl;
const url = "mongodb+srv://monitoring_user:admin@cluster0.8p9ka.mongodb.net/reto?retryWrites=true&w=majority";

const dbName = 'job';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('offers');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const createDocument = function(db,body,callback) {
    const collection = db.collection('offers');
    collection.insertOne(body)
    .then(result => {
      callback(result);
    });
}

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.createDocument = createDocument;