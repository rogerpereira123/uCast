module.exports = function (filewithpath, callback) {
    var id3 = require('id3js');    
        
     id3({ file: filewithpath, type: id3.OPEN_LOCAL } , function (err, tags) {
            if (err) {
                callback(err);
                return;
            }
            callback(tags);
        });
    
    
      
};