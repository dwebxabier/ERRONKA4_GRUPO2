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
        success: function (result) {

          console.log(result);


          $(".jugadores-mvp").empty();

          var newRow = "";

            $.each(result, function (x, jugador) {


                newRow += '<div class="card m-3 carousel" style="width: 18rem;">'
                newRow += '<img class="card-img-top mt-2" src="'+jugador.fotoPerfil+'">'
                newRow += '<div class="card-body">'
                newRow += '<h5 class="card-title">'+jugador.nombre+'</h5>'
                newRow += '<p class="card-text categoria" data-id="'+jugador.objectVotos.idCategoria+'" >Categoria: '+jugador.objectVotos.idCategoria+'</p>'
                newRow += '<p class="card-text votos" value='+jugador.objectVotos.idVoto+' >Votos: '+jugador.objectVotos.idVoto+'</p>'
                newRow += '<button type="button" data-id="'+jugador.idJugador+'" class="btn votarJugador btn-danger mvp-button">Votar</button>'
                newRow += '</div></div>' 
 
            });

            $(".jugadores-mvp").append(newRow);


            $('.votarJugador').click(function () {

              var votos = $(this).prevAll(".votos").attr("value");
              votos = (votos + 1);

              $(this).prevAll(".votos").text('Votos: '+votos);

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

              alert("Votado a jugador "+idJugadorVotado+" de categoria "+idCategoria+" por el usuario "+idUsuario);

              // $.ajax({

              //   type: 'GET',
              //   data: {'idUsuario': idUsuario, 'idCategoria': idCategoria, 'idJugadorVotado': idJugadorVotado},
              //   url: '../controller/cInsertarVoto.php',
              //   dataType: 'json',
              //   success: function (result) {
        
              //     console.log(result);
        
              //   }
        
              // });



          
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


