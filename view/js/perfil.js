var dataSession;
var usuarios;
var juagdores;
var savedFileBase64;
var filename;

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
      type: "GET",
      url: "../controller/login/cSessionGetVar.php",
      data: { 'PHPSESSID': (sessionStorage.getItem('PHPSESSID') || '') },
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
            $("#password").val("");
            $("#password2").val("");
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

// CARGAR FOTO NUEVA

$("#file-upload").change(function () {

  let file = $("#file-upload").prop("files")[0];
  filename = file.name.toLowerCase();
  console.log(filename);

  if (!new RegExp("(.*?).(jpg|jpeg|png|gif)$").test(filename)) {
    alert("Solo se aceptan imágenes JPG, PNG y GIF");
  }
  let reader = new FileReader();

  reader.onload = function (e) {

    let fileBase64 = e.target.result;

    // Almacenar en variable global para uso posterior
    savedFileBase64 = fileBase64;
  };
  reader.readAsDataURL(file);

  var fileRow = '';
  fileRow += 'Cambiar foto de perfil a: '+filename
  $(".nombre-file").append(fileRow);
});


// GUARDAR DATOS

$('#glyphicon-ok-sign').click(function(){

  var email = $("#Email").val();
  var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
  var mensaje = "";

  if (caract.test(email) == false){
      mensaje = "INCORRECTO";
      alert("Email no apropiado");
      location.reload();
  }else{
    
    if($("#password").val() == $("#password2").val()){
      mensaje = "CORRECTO";
    } else {
      alert("Las contraseñas no coinciden");
      mensaje = "INCORRECTO";
      location.reload();
    }
  }

  var idUsuario = dataSession.idUsuario;
  var nombreUsuario = $("#first_name").val();
  var nombreJugador = $("#last_name").val();
  var email = $("#Email").val();
  var password = $("#password").val();


  $.ajax({
    type: 'GET',
    url: '../controller/cUpdateJugador.php',
    data: {'idUsuario': idUsuario, 'usuario': nombreUsuario, 'nombre': nombreJugador, 'email': email, 'password': password},
    success: function (result) {
  
        console.log(result);

    }
  
  });


  $.ajax({
    type: "POST",
    data: {'idUsuario': idUsuario, 'filename': "../uploads/"+filename, 'savedFileBase64': savedFileBase64},
    url: "../controller/cUpdateFotoPerfil.php",

    success: function (result) {

      console.log(result);
     
      window.location.reload(true);  //recarga la pagina
    },
    error: function (xhr) {
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
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


