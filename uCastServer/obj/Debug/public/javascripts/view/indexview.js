require(["../config"], function (config) {
    require(["jquery" ,"jqueryui", "underscore" ,"chromecast", "datatables"], function ($ ,jqui, _, castapp, dt) {
        var castApp = new castapp();
        var arrFiles = [];
        $(document).ready(function () {
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
                    bindFiles();
                    
                });
            }
            );
        });
        var bindFiles = function () {
            $('.files').html('<table id="tblFiles" class="display" cellspacing="0" width="100%"></table>');
            var data = "<thead><tr><th align='left'>File Name</th></tr></thead>";
            $('#tblFiles').append(data);
            var d = _.map(arrFiles , function (f) { return [f.FileName]; });
            $('#tblFiles').dataTable({
                "aaData": d,
                "bSort": false,
                "bFilter": false,
                "bJQueryUI": true,
                "bInfo": false,
                "bPaginate": false,
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $('td:eq(0)' , nRow).html('<a class="GridLink click">' + aData[0] + '</a>');
                    $('td:eq(0)' , nRow).append('<br/><img class="imgControl'+iDisplayIndex+'" src="../../images/forward_enabled_hover.png"></img>');
                     $('td:eq(0)' , nRow).append('<div style="display:inline;" class="pg'+iDisplayIndex+'"></div>');
                    //$('td:eq(0)' , nRow).append('hi pg' + iDisplayIndex + '');
                    $('.click', nRow).css('cursor', 'pointer');
                    $('.click', nRow).click(function () { castMe(aData[0], iDisplayIndex); });
                    $(".imgControl" + iDisplayIndex).hide();
                }
            });
            
        };
        var castMe = function (fileName, index) {
            var path = $("input[name='dirLocation']").val();
            var fileInfo = _.filter(arrFiles , function (f) { return f.FileName == fileName; });
            var mediaUrl = "http://" + $(location).attr('host') + "/streamer?q=" + path + "\\" + fileName;
            castApp.uCast(mediaUrl , fileInfo[0].ContentType , function () { 
                showProgressBar(index);
            });
        }

        var showProgressBar = function (index) { 
            $(".pg" + index).progressbar();
        };
         
    });
});