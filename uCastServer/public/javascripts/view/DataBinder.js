define(["jquery" ,  "underscore" , "datatables" , ], function ($, _, dt) { 
    $.bindFiles = function (arrFiles , castMe) {
        $('.files').html('<table id="tblFiles" class="display" cellspacing="0" width="100%"></table>');
        var data = "<thead><tr><th align='left' valign='top' style='height:24px;'>";
           data +="<input type='checkbox' name='chkSelectAll' id='chkSelectAll' /><label for='chkSelectAll'> File Name</label> </th></tr></thead>";
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
                $('td:eq(0)' , nRow).html('<input type="checkbox" class="selectFile" id="chk' + iDisplayIndex + '" /><a class="GridLink click">' + aData[0] + '</a>');
                
                //$('td:eq(0)' , nRow).append('hi pg' + iDisplayIndex + '');
                $('.click', nRow).css('cursor', 'pointer');
                $('.click', nRow).click(function () { castMe(aData[0], iDisplayIndex); });
                    
            }
        });
        
        $("#playselected").hide();
        $("#playselected").attr("src" , "../images/playselected.png");
        //$("#playselected").button();


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
            }
        });
            
    };
    
});