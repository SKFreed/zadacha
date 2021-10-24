$.ajax({
        type: "POST",
        url: "readjson.php",
        success: function (result) {
            var data = JSON.parse(result);
            $('#table-offers').empty().html($('#table-offers--templete').render({Response: JSON.parse(result)}));
            $('tr:gt(9)').hide();
        }
    })
