var url = require('url');
var mongojs = require('mongojs');

module.exports = function(req,res) {

    var queryString = url.parse(req.url, true).query || {};
    var dbQuery = {
        _id : mongojs.ObjectId(queryString.id)
    };

    DB.find(dbQuery,{url : 1},function(err,results) {
        if(err) {
            res.send(err);
        }
        dbQuery = {
            url : results[0].url
        };

        DB.find(dbQuery,{
            url : 1,
            timestamp: 1,
            build : 1,
            tag : 1,
            "metrics.time.grades" : 1,
            "metrics.yslow.grades" : 1,
            "metrics.dommonster.grades" : 1,
            "metrics.validator.grades" : 1
        },function(err,data) {
            if(err) {
                res.send(err);
            }
            res.send(JSON.stringify(data));
        });
    });

};