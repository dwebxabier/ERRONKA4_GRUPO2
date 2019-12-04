$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '../controller/cEquipos.php',
        dataType: 'json',
        success: function (data) {

            console.log(data);
        }
              
    });

});
