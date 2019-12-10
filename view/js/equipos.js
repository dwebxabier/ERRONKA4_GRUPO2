$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '../controller/cEquipos.php',
        dataType: 'json',
        success: function (result) {

            console.log(result);

            $(".equipos>table").empty();
            var newRow = "";

            newRow += '<tr><th>ID EQUIPO</th><th>NOMBRE</th><tr>'

            $.each(result, function (i, equipo) {

                newRow += "<tr><th>" + equipo.idEquipo + "</th>" + "<th><a class='nombreEquipo'  data-id=" + equipo.idEquipo + ">" + equipo.nombre + "<a></th></tr>";
            
            });

            $(".equipos>table").append(newRow);


            $(".nombreEquipo").click(function () {

                alert($( this ).attr("data-id"));
                var idEquipo = $( this ).attr("data-id");

                $.ajax({

                    type: 'GET',
                    data: {"idEquipo":idEquipo},
                    url: '../controller/cPlantilla.php',
                    dataType: 'json',
                    success: function (result) {
            
                        console.log(result);
                    }
                });


            });

        }

    });


    

});

