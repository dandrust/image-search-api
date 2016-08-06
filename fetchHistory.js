

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://test:test@ds139665.mlab.com:39665/dandrust-url';

module.exports = function(count, callback) {
    
    mongo.connect(url, function(err, db){
        if (err) console.log("Unable to connect: " + err);
        var searchCollection = db.collection('image-search-api');
        searchCollection.find({},{_id:0}).sort({timestamp: -1}).limit(count).toArray(function(err, arr){   //
            if (err) throw err;
            db.close();
            callback(null, arr);
        });
    });
};