$( document ).ready(function () {

    $.ajax({
        type: 'GET',
        url: '../controller/cEquipos.php',
        dataType: 'json',
        success: function( result ) {

            console.log(result);
	             
	                $(".equipos>table").empty();
	                var newRow="";
	                
                    newRow += '<tr><th>ID EQUIPO</th><th>NOMBRE</th><tr>'
                    
	                $.each(result,function(i,equipo) {
	    
                        newRow += "<tr><th>"+equipo.idEquipo+"</th>"+"<th id='nombreEquipo' data-id="+equipo.idEquipo+">"+equipo.nombre+"</th></tr>";                                    
                    });
	                
	                    $(".equipos>table").append(newRow);
	    		
            
        }

    });

});

$("#nombreEquipo").click(function(){

    alert("hola");

});
