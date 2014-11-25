module.exports.getIP = (function () {
    var getIP = function(callback) {
        require('dns').lookup(require('os').hostname(), function(err, add, fam) {
            if (err) {
                callback(err);
                return;
            } else callback(null, add);
        });
    };

    return getIP;
})();