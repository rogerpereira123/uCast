exports.metadata = function (req, res) {
    var metadata = require('../../modules/metadata');
    var f = req.query.q;
    metadata(f, function (err,tags) {
        if (err) {
            res.status(500).json({ error : "metadata could not be read" });

        }
        else
            res.status(200).json(tags);
    });
};