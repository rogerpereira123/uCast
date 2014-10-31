define([ 'id3'], function (id3) {
    var metadata = function () { 
    };
    metadata.getMp3MetaData = function (mp3Url, onsuccess, onerror) {
        id3(mp3Url , function (err, tags) { 
            if (err) {
                onerror(err);
                return;
            }
            onsuccess(tags);
        });
    };
    
    return metadata; 
});