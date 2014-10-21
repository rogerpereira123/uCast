require(["../config"], function (config) {
    require(["jquery" ,"jqueryui", "underscore" ,"chromecast",  "databinder"], function ($ ,jqui, _, castapp, binder) {
        var castApp = new castapp();
        var arrFiles = [];
        var progressBar = {};
        var playerTimer = {};
        $(document).ready(function () {
            $(".player").hide();
           // $(".playerHeader").text("Now Playing Big Boss");
            $(".caston").click(function () {
                castApp.requestSession(function (){
                    $(".caston").attr("src" , "../images/casticon_on.png");
                }, function (e) {
                    $(".caston").attr("src" , "../images/casticon_warning.png");
                    //alert("Videos wont play unless you cast using Cast Icon...!");
                });
            });
            $("#ddlTypeOfMedia").append('<option value="video">Videos</option>');
            $("#ddlTypeOfMedia").append('<option value="audio">Songs</option>');
            $("#ddlTypeOfMedia").append('<option value="image">Photos</option>');
            $("input[name='findFiles']").click(function () {
                var path = $("input[name='dirLocation']").val();
                var url = "http://" + $(location).attr('host') + "/ls?q=" + path + "&t=" + $('#ddlTypeOfMedia').val();
                $.get(url, function (files) {
                    arrFiles = files;
                    $('.files').html('');
                    if (files.length > 0) $('.headerFiles').html("Following files found");
                    else $('.headerFiles').html("No playable files found:");
                    $.bindFiles(arrFiles, castMe);
                    
                });
            }
);
            castApp.onSessionDestroyed = function () {
                $(".player").hide();
            };
        
        });
       
        var castMe = function (fileName, index) {
            var path = $("input[name='dirLocation']").val();
            var fileInfo = _.filter(arrFiles , function (f) { return f.FileName == fileName; });
            var mediaUrl = "http://" + $(location).attr('host') + "/streamer?q=" + path + "\\" + fileName;
            castApp.uCast(mediaUrl , fileInfo[0].ContentType , function () {
                initPlayer(fileName);
                
            });
        }
        var initPlayer = function (fileName) {
            $(".playerHeader").text("Now Playing " + fileName);
            $("#imgPlayPause").attr("src" , "../../images/pause.png");
            progressBar = $(".progressbar").progressbar();
            playerTimer = setTimeout(progress, 2000);
            $(".player").show();
        };
        var progress = function () {
            var val = progressBar.progressbar("value") || 0;
            if (castApp.currentMedia && castApp.currentMedia.media && castApp.currentMedia.media.duration != null) {
                var currentTime = castApp.currentMedia.getEstimatedTime();
                var progressValue = parseInt(100 * currentTime / castApp.currentMedia.media.duration);
                progressBar.progressbar("value", val + progressValue);
                
                if (val <= 99) {
                    progressTimer = setTimeout(progress, 1000);
                }
            }
            else
                setTimeout(progress, 1000);
        };
       
        
         
    });
});