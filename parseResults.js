module.exports = function (resultsObj, callback) {
    //Create Array 'data' that holds result objects
    var data = JSON.parse(resultsObj).d.results;
    
    //Initialize an array to return with parsed results
    var resultsArr = [];
    
    //Read each object from data array and push parsed object into resultsArr array
    data.forEach(function(result, i){
        resultsArr.push({
            'imgURL' : result.MediaUrl,
            'altText' : result.Title,
            'thumbnail' : result.Thumbnail.MediaUrl,
            'sourceURL' : result.SourceUrl
        });
    });
    
    callback(null, resultsArr);
    
};