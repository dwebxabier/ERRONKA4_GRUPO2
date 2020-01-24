var dataSession;
var usuarios;
var juagdores;

$(document).ready(function () {
  // COMPROBACION DE SI LA SESSION ESTA INICIADA 
  $('#misRese').hide();
  $("#file-upload").hide();

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
          $('#logout').hide();
          $('#login').hide();
          var newRow = "";
          newRow += '<h1>'+dataSession.name+'</h1>';
          $("#username").append(newRow);
      } else{
        window.location.href = "../index.html";
      }
      },
      error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  
  }

  sessionCheck();


  // CARGAR USUARIOS

  $.ajax({
    type: 'GET',
    url: '../controller/cUsuarios.php',
    dataType: 'json',
    success: function (data) {

        console.log(data); 
        usuarios = data;

        $.each(data, function (x) {

          if(data[x].idUsuario == dataSession.idUsuario){

            $("#first_name").val(data[x].nombreUsuario);
            $("#Email").val(data[x].email);
            $("#password").val(data[x].password);
            $("#password2").val(data[x].password);
          }

        });


    }

});

  // CARGAR JUGADORES

  $.ajax({
    type: 'GET',
    url: '../controller/cJugadores.php',
    dataType: 'json',
    success: function (result) {

        console.log(result); 
        juagdores = result;

        $.each(result, function (x) {

          if(result[x].idUsuario == dataSession.idUsuario){

            $("#foto_avatar").attr("src", result[x].fotoPerfil);
            $("#last_name").val(result[x].nombre);

          }

        });

    }

});

// GUARDAR DATOS

$('#glyphicon-ok-sign').click(function(){

  // var email = $("#Email").val();
  // var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
  // var mensaje = "";

  // if (caract.test(email) == false){
  //     mensaje = "INCORRECTO";
  // }else{
  //   mensaje = "CORRECTO";
  // }

  var idUsuario;
  var nombreUsuario;
  var email;
  var password;

  $.each(usuarios, function (x) {

    if(usuarios[x].idUsuario == dataSession.idUsuario){

      idUsuario = usuarios[x].idUsuario;
      nombreUsuario = usuarios[x].nombreUsuario;
      email = usuarios[x].email;
      password = usuarios[x].password;

    }

  });

  var nombreJugador;

  $.each(juagdores, function (x) {

    if(juagdores[x].idUsuario == dataSession.idUsuario){

      nombreJugador = juagdores[x].nombre;

    }

  });

  alert(idUsuario+" "+nombreUsuario+" "+nombreJugador+" "+email+" "+password);

  $.ajax({
    type: 'GET',
    url: '../controller/cUpdateJugador.php',
    value: {'idUsuario': idUsuario, 'usuario': nombreUsuario, 'nombre': nombreJugador, 'email': email, 'password': password},
    success: function (result) {
  
        console.log(result);
  
    }
  
  });

});

  
  
// LIMPIAR
$("#glyphicon-repeat").click(function(){

    $("#first_name").val("");
    $("#Email").val("");
    $("#password").val("");
    $("#password2").val("");
    $("#last_name").val("");
})

// SUBIR FOTO
$("#foto_avatar").click(function(){

  $("#file-upload").trigger("click");;

})

$("#lapiz_editor").click(function(){

  $("#file-upload").trigger("click");;

});








    

});


