exports.filter = function (dirpath, extArray, callback) {
    var fs = require("fs");
    var path = require("path");
    var _ = require("underscore");
    var config = require("../modules/mediaconfig");
    fs.readdir(dirpath, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        else {
            var ls = _.chain(data)
                        .filter(function (f) { return _.indexOf(extArray, path.extname(f)) > -1; })
                        .map(function (f) { return { 'FileName' : f, 'ContentType' : config.mediaconfig.getContentTypeFromFileName(f) }; })
                        .value();
            callback(null , ls);
        }
    });
            
        
   
};