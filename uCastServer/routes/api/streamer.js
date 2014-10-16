exports.stream = function(req,res){
    var fs = require("fs");
    var config = require("../../modules/mediaconfig");
    res.set('Content-Type', config.mediaconfig.getContentTypeFromFileName(req.query.q));
    res.set('Connection', 'Keep-alive');
    fs.createReadStream(req.query.q).pipe(res);

};