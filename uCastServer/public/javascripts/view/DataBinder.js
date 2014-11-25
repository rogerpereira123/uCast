﻿define(["jquery" ,  "underscore" , "datatables" ], function ($, _, dt) { 
    $.bindFiles = function (arrFiles , castMe) {
        $('.files').html('<table id="tblFiles" class="display" cellspacing="0" width="100%"></table>');
        var data = "<thead><tr><th align='left' valign='top' style='height:24px;'>";
           data +="<input type='checkbox' name='chkSelectAll' id='chkSelectAll' /><label for='chkSelectAll'>&nbsp;File Name</label></th></tr></thead>";
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
                $('td:eq(0)' , nRow).html('<input type="checkbox" class="selectFile" id="chk' + iDisplayIndex + '" />&nbsp;<a class="GridLink click">' + aData[0] + '</a>');
                
                //$('td:eq(0)' , nRow).append('hi pg' + iDisplayIndex + '');
                $('.click', nRow).css('cursor', 'pointer');
                $('.click', nRow).click(function () { castMe(aData[0], iDisplayIndex); });
                    
            }
        });
        
        $("#playselected").hide();
        $("#playselected").attr("src" , "../images/playselected.png");
        //$("#playselected").button();

        $(".selectFile").click(function () {
            $('.headerFiles').html("Following files found");
            $("#playselected").hide();
            $(".selectFile").each(function () {
                
                if (this.checked) {
                    $('.headerFiles').html("Play Selected: ");
                    $("#playselected").show();
                }
            });

            $.SelectedFiles = $.SelectedFiles || [];
            var chkBox = this;
            if (this.checked) $.SelectedFiles.push(arrFiles[parseInt(this.id.replace("chk" , ""))]);
            else _.each($.SelectedFiles , function (f, i) { 
                
                if (f && f.FileName === arrFiles[parseInt(chkBox.id.replace("chk" , ""))].FileName)
                    $.SelectedFiles.splice(i , 1);
            });
        });
        $("#chkSelectAll").click(function () {
            if ($("#chkSelectAll").is(":checked")) {
                $(".selectFile").prop("checked" , true);
                $('.headerFiles').html("Play Selected: ");
                $("#playselected").show();

               
            }
            else {
                $(".selectFile").prop("checked" , false);
                $('.headerFiles').html("Following files found");
                $("#playselected").hide();
                $.SelectedFiles = [];
            }
            $.SelectedFiles = $.SelectedFiles || [];
            $(".selectFile").each(function () {
                var chkBox = this;
                if (this.checked) {
                    if(_.where($.SelectedFiles, { FileName : arrFiles[parseInt(this.id.replace("chk" , ""))].FileName }).length == 0)
                        $.SelectedFiles.push(arrFiles[parseInt(this.id.replace("chk" , ""))]);
                }
                
            });
        });
            
    };
    
});