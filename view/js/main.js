var usuarios
$(document).ready(function () {

  // COMPROBACION DE SI LA SESSION ESTA INICIADA 
  sessionCheck();


  $(".info").click(function () {
    $('#exampleModalLongTitle').html($(this).prev('h2').text());
  });

  // TRANSICION DE LOS DROPDOWNS A LA SECCION
  $(function(){
    $('.dropdown-menu>a[href]').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
          var targetOffset = $target.offset().top;
          $('html,body').animate({scrollTop: targetOffset}, 800);
          return false;
        }
      }
    });
  });

  // VALIDAMIENTO DEL MODAL CONTACTO

  $('.modal-footer>#enviarOp').click(function() {

    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    var mensaje;

    if (regex.test($("form").find('#email').val().trim())) {
        
      if($("form").find('#comentario').val()==""){
        alert('No has escrito el comentario');
        mensaje = "no";
        slide_stop();
      }

      mensaje = "si";

    } else {
        alert('La direccón de correo no es válida');
        mensaje = "no";
        slide_stop();
    }

    alert(mensaje);
    if(mensaje == "si"){

      var email = $("form").find('#email').val();
      var texto = $("form").find('#comentario').val();
      alert($("form").find('#email').val()+"---"+$("form").find('#comentario').val());

      $.ajax({

        type: 'GET',
        data: {'email':email,'texto':texto},
        url: 'controller/cInsertarOpinion.php',
        dataType: 'json',
        success: function (result) {

            console.log(result);

        }  

    });

    }


});



  
//NO TOCAR $$$$$$$$$$$$$$$$
  // $.ajax({
  //     type: "GET",
  //     url: "../controller/cIndex.php",
  //     dataType: "json",  //type of the result
  //     success: function (result) {
  //     	console.log(result);
  //     },
  //     error: function (xhr) {
  //         alert("An error occured: " + xhr.status + " " + xhr.statusText);
  //     }
  // });

});

function sessionCheck(){
  //NO TOCAR $$$$$$$$$$$$

  $.ajax({

    url: "../controller/login/cSessionVerVars.php",
    dataType: "json",

    success: function (result) {

      console.log(result);

      if (result != 0) {

        newRow = "";
        newRow += "<p>Has iniciado sesion: " + result.name
          + " y eres admin(SI/NO) : " + result.admin + "</p>";

        newRow += "<p><button id='itxi'>Session close</button></p>";
        $("body").append(newRow);

      } else {
        $("body").append("No has iniciado session");

      }
    },
    error: function (xhr) {
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
  });
}