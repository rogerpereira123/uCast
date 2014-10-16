exports.ls = function (req, res) {
   
    var f = require("../../modules/filefilter");

    var config = require("../../modules/mediaconfig");
    var _ = require("underscore");
    var extArray = new Array();
    if (req.query.t == "video") extArray = config.mediaconfig.mediatype.video;
    else if (req.query.t == "audio") extArray = config.mediaconfig.mediatype.audio;
    else if (req.query.t == "image") extArray = config.mediaconfig.mediatype.image;
    else res.status(500).json({ error : "unsupported media type" });

    f.filter(req.query.q , extArray, function (err, data) {
        if (err) {
            res.status(500).json({ error : "invalid path" });
        }
        else
            res.status(200).json(data);


    });
   
        
            


    };
    

