var sendRequest = require('./sendRequest');
var getTimestamp = require('./getTimestamp');
var composeSearchUrl = require('./composeSearchUrl');
var logRequest = require('./logRequest');
var parseResults = require('./parseResults');
var fetchHistory = require('./fetchHistory');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();

app.get('/', function(req, res){
    fs.readFile('index.html', 'utf8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data, 'utf8');
    });
});

app.get('/search', function(req,res){
    // Initialize variables
    var timestamp = getTimestamp();
    var query = url.parse(req.url, true).query;

    // Log search request
    logRequest({
        'query': query.query,
        'timestamp': timestamp
    });

    // Prepare, execute, parse, and return search
    composeSearchUrl(query, function(err, url){
        if (err) throw err;
        sendRequest(url, function(err, data){
            if (err) throw err;
            parseResults(data, function(err, array){
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(array));
            });
        });
    });
    
});

app.get('/history', function(req, res){
    var query = url.parse(req.url, true).query;
    if (!query.count) {
        query['count'] = 10
    }
    fetchHistory(parseInt(query.count, 10), function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    });
});

app.listen(process.env.PORT || 8080);

