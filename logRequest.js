var mongo = require('mongodb').MongoClient;
var url = 'mongodb://test:test@ds139665.mlab.com:39665/dandrust-url';

module.exports = function(doc) {
    
mongo.connect(url, function(err, db){
    if (err) console.log("Unable to connect: " + err);
    var collection = db.collection('image-search-api');
    collection.insert(doc);
});
};