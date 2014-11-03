define([], function () {
    var metadata = function () { 
    };
    metadata.getMp3MetaData = function (fileNameWithPath, onsuccess) {
        var url = "http://" + $(location).attr('host') + "/metadata?q=" + encodeURIComponent(fileNameWithPath);
        $.get(url, function (tags) { 
            onsuccess(tags);
        });
    };
    
    return metadata; 
});