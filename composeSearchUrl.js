module.exports = function(query, callback) {
    
    //Prepare variables
    query.query = '%27' + encodeURIComponent(query.query) + '%27';
    if (!query.count) {
        query['count'] = '10';
    }
    if (!query.offset) {
        query['offset'] = '0';
    } else {
        query.offset = parseInt(query.count, 10) * parseInt(query.offset, 10);
    }
    
    var url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=" + query.query + "&$top=" + query.count + "&$skip=" + query.offset + "&$format=JSON";
    
    callback(null, url);
};