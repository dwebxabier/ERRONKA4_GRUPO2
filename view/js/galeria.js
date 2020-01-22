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
  
      $.ajax({
          type: 'GET',
          url: '../controller/cEquiposGaleriaPubli.php',
          dataType: 'json',
          success: function (result) {
  
              console.log(result);
  
              $(".jugadores-mvp").empty();
              var newRow = "";
  
              $.each(result, function (i, jugador) {
  
                newRow += '<div class="card m-3 carousel" style="width: 18rem;">'
                newRow += '<img src="'+jugador.fotoEquipo+'">'
                newRow += '</div>'
  
            });
  
              $(".jugadores-mvp").append(newRow);
                  
  
          }
  
      });
  
  
  
  
  
      
  
  });
  
  
  