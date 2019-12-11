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

                var idEquipo = $( this ).attr("data-id");

                $.ajax({

                    type: 'GET',
                    data: {"idEquipo":idEquipo},
                    url: '../controller/cPlantilla.php',
                    dataType: 'json',
                    success: function (result) {
            
                        console.log(result);

                        $(".equipos>table").empty();
                        var newRow = "";

                        newRow += '<tr><th>JUGADOR</th><th>NOMBRE</th><tr>'

                        $.each(result, function(i, jugador) {

                            newRow += "<tr><th>"+jugador.objectJugador.idJugador+"</th>" + "<th><a class='nombreJugador'  data-id="+jugador.objectJugador.idJugador+">" + jugador.objectJugador.nombre+"<a></th></tr>";

                        });

                        $(".equipos>table").append(newRow);
                    }
                });

                $.ajax({

                    type: 'GET',
                    data: {"idEquipo":idEquipo},
                    url: '../controller/cTecnicos.php',
                    dataType: 'json',
                    success: function (result) {
            
                        console.log(result);

                        // $(".equipos>table").empty();
                        var newRow = "";

                        newRow += '<tr><th>TECNICO</th><th>NOMBRE</th><th>LICENCIA</th><tr>'

                        $.each(result, function(i, tecnico) {

                            newRow += "<tr><th>"+tecnico.objectTecnico.idTecnico+"</th>" + "<th><a class='nombreJugador'  data-id="+tecnico.objectTecnico.idTecnico+">" + tecnico.objectTecnico.nombre+"<a></th><th>"+tecnico.objectTecnico.licencia+"</th></tr>";

                        });

                        $(".equipos>table").append(newRow);
                    }
                });


            });

        }

    });


    

});

