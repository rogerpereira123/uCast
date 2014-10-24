require(["../config"], function (config) {
    require(["jquery" ,"jqueryui", "underscore" ,"chromecast",  "databinder"], function ($ ,jqui, _, castapp, binder) {
        var castApp = new castapp(function () {
            $(".caston").attr("src" , "../images/casticon_on.png");
            $(".caston").show();
            $(".caston").button();
        });
        var arrFiles = [];
        var progressBar = {};
        var playerTimer = {};
        $(document).ready(function () {
            $(".player").hide();
            //$("#progressbar").progressbar();
           //$(".playerHeader").text("Now Playing Big Boss");
            $(".caston").click(function () {
                castApp.requestSession(function (){
                    $(".caston").attr("src" , "../images/casticon_on.png");
                }, function (e) {
                    $(".caston").attr("src" , "../images/casticon_warning.png");
                    //alert("Videos wont play unless you cast using Cast Icon...!");
                });
            });
            
           
            $("#ddlTypeOfMedia").selectmenu();
            
            $("input[name='findFiles']").button().click(function () {
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
            
            $("#imgStop").click(function () { stopMedia(); });
            $("#imgPlayPause").click(function () { pauseMedia(); });

            castApp.onSessionDestroyed = function () {
                $(".player").hide();
            };
        
        }
);
        
        var stopMedia = function () {
            castApp.stopMedia(function (e) {
                $(".player").hide();
            }, function (e) {
                console.log("Could not stop playback");
                $(".player").hide();
            });
        };
        var pauseMedia = function () {
            castApp.pauseMedia(function (e) {
                $("#imgPlayPause").attr("src" , "../../images/play.png");
                $("#imgPlayPause").click(resumeMedia);
            }, function (e) {
                console.log("Could not pause playback");
                $(".player").hide();
            });
        };
        var resumeMedia = function () {
            castApp.playMedia(function (e) {
                $("#imgPlayPause").attr("src" , "../../images/pause.png");
                $("#imgPlayPause").click(pauseMedia);
            }, function (e) {
                console.log("Could not pause playback");
                $(".player").hide();
            });
        };
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
            progressBar = $("#progressbar").progressbar();
            playerTimer = setTimeout(progress, 500);
            $(".player").show();
        };
        var progress = function () {
            var val = progressBar.progressbar("value") || 0;
            if (castApp.currentMedia && castApp.currentMedia.media && castApp.currentMedia.media.duration != null) {
                var currentTime = castApp.currentMedia.getEstimatedTime();
                var progressValue = parseInt(100 * currentTime / castApp.currentMedia.media.duration);
                progressBar.progressbar("value",  progressValue);
                
                if (val <= 99) {
                    progressTimer = setTimeout(progress, 500);
                }
                else
                    $(".player").hide();
            }
            else if(castApp.session)
                setTimeout(progress, 1000);
            else
                $(".player").hide();
        };
       
        
         
    });
});