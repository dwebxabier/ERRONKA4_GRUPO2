var dataSession;
$(document).ready(function () {
  // COMPROBACION DE SI LA SESSION ESTA INICIADA 
  $('#misRese').hide();

  function userCheck(data) {
    if (!data.admin - 1) {
      if (data.admin == 1) {
        location.href = "admin.html";
    } 
    // else {
    //     habilitarLogout(data);
    //   }
    }
  }

  function sessionCheck() {
    $.ajax({
      url: "../controller/login/cSessionGetVar.php",
      dataType: "json",
  
      success: function (data) {
        //decide que teiene que hacer dependiendo de el tipo de usuario
       dataSession=data;

        userCheck(data);
        
        console.log(data);

        if(data!=-1){
          $('#misRese').show();

      } else{
          $("#votar").attr('disabled', true)
          $('#votar').css('color', '#fff');
          $('#votar').css('background-color', '#c82333');
          $('#votar').css('border-color', '#bd2130');
      }
      },
      error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  
  }

  sessionCheck();


  $('#votar').click(function () {

    $.ajax({
        type: 'GET',
        url: '../controller/cJugadores.php',
        dataType: 'json',
        success: function (data) {

          console.log(data);

          var categorias_array = ["Senior", "Infantil", "Alevin"];

          $(".jugadores-mvp").empty();

          var newRow = "";

          for(var i=0; i<categorias_array.length; i++){

            newRow += '<div class="'+categorias_array[i]+' titulo-cat"><h3>'+categorias_array[i]+'</h3></div>'

            $.each(data, function (x, jugador) {

              if(jugador.objectVotos.idCategoria == categorias_array[i]){

                newRow += '<div class="card '+jugador.objectVotos.idCategoria+' m-3 carousel" style="width: 18rem;">'
                newRow += '<img class="card-img-top mt-2" src="'+jugador.fotoPerfil+'">'
                newRow += '<div class="card-body">'
                newRow += '<h5 class="card-title">'+jugador.nombre+'</h5>'
                newRow += '<p class="card-text categoria" data-id="'+jugador.objectVotos.idCategoria+'" >Categoria: '+jugador.objectVotos.idCategoria+'</p>'
                newRow += '<p class="card-text votos" value='+jugador.objectVotos.idVoto+' >Votos: '+jugador.objectVotos.idVoto+'</p>'
                newRow += '<button type="button" data-id="'+jugador.idJugador+'" class="btn votarJugador btn-danger mvp-button">Votar</button>'
                newRow += '</div></div>' 

              }
 
            });

          }

          $(".jugadores-mvp").append(newRow);

          $.ajax({

            type: 'GET',
            url: '../controller/cComprobarVoto.php',
            dataType: 'json',
            success: function (result) {

                console.log(result);

                var cont = data.length;

                for(var i=0; i<result.length; i++){

                  if(dataSession.idUsuario == result[i].idUsuario){

                    if(result[i].idCategoria == 3){
                      categoria = "Senior";
                    } else if(result[i].idCategoria == 2){
                      categoria = "Infantil";
                    } else {
                      categoria = "Alevin";
                    }

                    if($(".categoria").attr("data-id") == categoria){

                      $("."+categoria).remove();
                      cont = cont - 1;
      
                            }

                          }

                        }

                  if($(".jugadores-mvp").html() == ''){

                  var tituloRow = '';
                  tituloRow += '<div><h3>No te quedan votos por realizar</h3></div>'
                  $(".jugadores-mvp").append(tituloRow);

                  $("#votar").attr('disabled', true)
                  $('#votar').css('color', '#fff');
                  $('#votar').css('background-color', '#c82333');
                  $('#votar').css('border-color', '#bd2130');
                                
                  }


                    }
        
                });     

                
        
            

              $('.votarJugador').click(function () {

              var categoria = $(this).prevAll(".categoria").attr("data-id");

              if(categoria == "Senior"){
                categoria = 3;
              } else if(categoria == "Infantil"){
                categoria = 2;
              } else {
                categoria = 1;
              }

              var idJugadorVotado = $(this).attr("data-id");
              var idCategoria = categoria;
              var idUsuario = dataSession.idUsuario;


              $.ajax({

                type: 'GET',
                data: {'idUsuario': idUsuario, 'idCategoria': idCategoria, 'idJugadorVotado': idJugadorVotado},
                url: '../controller/cInsertarVoto.php',
                success: function (result) {

                  window.location.reload();
        
                }

                
              });



          
            });
          
                

        }

    });

  });



  $('#MVPs').click(function () {

    $.ajax({
        type: 'GET',
        url: '../controller/cVotos.php',
        dataType: 'json',
        success: function (result) {

            console.log(result);

            $(".jugadores-mvp").empty();
            var newRow = "";

            $.each(result, function (i, jugador) {

              newRow += '<div class="card m-3 carousel" style="width: 18rem;">'
              newRow += '<img class="card-img-top" src="'+jugador.idUsuario+'">'
              newRow += '<div class="card-body">'
              newRow += '<h5 class="card-title">'+jugador.idJugadorVotado+'</h5>'
              newRow += '<p class="card-text" >Categoria: '+jugador.idCategoria+'</p>'
              newRow += '<p class="card-text" >Votos: '+jugador.idVoto+'</p>'
              newRow += '</div></div>'

          });

            $(".jugadores-mvp").append(newRow);
                

        }

    });

  });



    

});


