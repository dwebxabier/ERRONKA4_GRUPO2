$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '../controller/cEquipos.php',
        dataType: 'json',
        success: function (result) {

            console.log(result);

            $(".equipos").empty();
            var newRow = "";

            $.each(result, function (i, equipo) {

                newRow += '<div class="card text-center col-md-3 mr-3 ml-3 mb-3" style="width: 18rem;">'
                newRow += '<img src="img/escudo_APC.png" class="card-img-top mx-auto d-block">'
                newRow += '<div class="card-body">'
                newRow += '<h5 class="card-title text-dark">'+equipo.nombre+'</h5>'
                newRow += '<p class="card-text text-dark">'+equipo.objectCategoria.idEquipo+'</p>'
                newRow += '<a class="btn btn-primary">Plantilla</a>'
                newRow += '</div> </div>'
            
            });

            $(".equipos").append(newRow);


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

