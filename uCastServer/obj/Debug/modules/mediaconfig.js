exports.mediaconfig = (function () {
    var _ = require("underscore");
    var path = require("path");
    var self = this;
        this.contenttype = {
        mp4 : 'video/mp4',
        mp3 : 'audio/mpeg' , 
        wav : 'audio/x-wav',
        gif : 'image/gif',
        jpeg : 'image/jpeg',
        jpg : 'image/jpeg'
    };
    this.mediatype = {
        video : ['.mp4'],
        audio : ['.mp3' , '.wav'],
        image : ['.gif' , '.jpeg' , '.jpg']
    };
    this.getContentTypeFromFileName = function (fileName) {
        var ext = path.extname(fileName);
        var k = _.chain(self.contenttype)
                  .keys()
                  .filter(function (f) { return "." + f == ext; })
                  .value();
        return self.contenttype[k[0]];

    };
    return this;
})();