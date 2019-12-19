

$(document).ready(function () {
  // COMPROBACION DE SI LA SESSION ESTA INICIADA

  var idGlobalUser;

  function sessionCheck() {
    $.ajax({
      url: "../controller/login/cSessionGetVar.php",
      dataType: "json",
  
      success: function (sesion) {
        //decide que teiene que hacer dependiendo de el tipo de usuario
        userCheck(sesion);
        idGlobalUser=sesion.idUsuario;
        console.log(sesion);
      },
      error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  
  }
  
  function userCheck(sesion) {
    if (!sesion.admin - 1) {
      if (sesion.admin == 1) {
        location.href = "admin.html";
      } else {
        //Adapta la pagina de Index para los usuarios
      }
    }
  }

    sessionCheck();

    $.ajax({
        type: 'GET',
        url: '../controller/cOpiniones.php',
        dataType: 'json',
        success: function (result) {

            console.log(result);

            $(".opiniones").empty();
            var newRow = "";  

            for(var x=0; x<result.length; x++){

                if(result[x].idUsuario == idGlobalUser){

                    newRow += '<div class="card m-3 text-dark">'
                    newRow += '<div class="card-header">'+result[x].fecha+'</div>'
                    newRow += '<div class="card-body">'
                    newRow += '<p class="card-text">'+result[x].texto+'</p>'
                    newRow += '<p></p>'
                    newRow += '<span id="star1'+x+'" class="fa fa-star"></span>'
                    newRow += '<span id="star2'+x+'" class="fa fa-star"></span>'
                    newRow += '<span id="star3'+x+'" class="fa fa-star"></span>'
                    newRow += '<span id="star4'+x+'" class="fa fa-star"></span>'
                    newRow += '<span id="star5'+x+'" class="fa fa-star"></span>'
                    newRow += '</div></div>'
        

                    
                }
            }

            $(".opiniones").append(newRow);
            
                for(var x=0; x<=result.length; x++){

                    var cant = Math.floor((Math.random() * 5) + 1);

                    for(var z=1; z<=cant; z++){
                        $( '#star'+z+x ).addClass( 'checked' );
                    }
                }
        

        }
    });
    


    
});




