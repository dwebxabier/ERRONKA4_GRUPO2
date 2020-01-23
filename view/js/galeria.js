var idUsuario;
var idCategoria;
var nombreCategoria;

$(document).ready(function () {
    // COMPROBACION DE SI LA SESSION ESTA INICIADA 
    $('#misRese').hide();
    $(".Galeria-Priv").hide();
  
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
          
          idUsuario = data.idUsuario;
          idCategoria = data.idCategoria;

          if (idCategoria == 3){
            nombreCategoria="Senior";
          }

          if (idCategoria == 2){
            nombreCategoria="Infantil";
          }

          if (idCategoria == 1){
            nombreCategoria="Alevin";
          }
          
          alert(nombreCategoria);


          alert(idUsuario);

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
  
              $(".Galeria-Publi").empty();
              var newRow = "";
  
              $.each(result, function (i, jugador) {
  
                newRow += '<div class="card m-3 carousel" style="width: 18rem;">'
                newRow += '<img src="'+jugador.fotoEquipo+'">'
                newRow += '<div>'
                newRow += '<p'+nombreCategoria+'"p>'
                newRow += '</div>'
                newRow += '</div>'
                
           
            });
              
              fotosPrivadas();
              $(".Galeria-Publi").append(newRow);
                  
              $("#btnExecInsert").click(function(){
			
                var INidCategoria=$("#TituloPeliculaInsert").val();
                var INfotoEquipo=$("#AnioInsert").val();
                var INprivado=$("#DirectorInsert").val(); 
                
                  $.ajax({
                       type: "POST",
                       data:{ 
                           'idCategoria':INidCategoria,
                           'privado':INprivado,'filename':filename,
                           'savedFileBase64': savedFileBase64},
                           
                       url: "controller/cFotosInsert.php", 
                       dataType: "json",  //type of the result
                       success: function(result){  
                         
                         console.log(result);
                         alert(result.resultado);
                         window.location.reload(true);  //recarga la pagina
                       },
                       error : function(xhr) {
                       alert("An error occured: " + xhr.status + " " + xhr.statusText);
                     }
                  });  	
            });
  
          }
  
      });
  
      $("#fitx").change(function(){
		
        let file = $("#fitx").prop("files")[0];
        filename = file.name.toLowerCase();
        console.log(filename);
        
        if (!new RegExp("(.*?).(jpg|jpeg|png|gif)$").test(filename)) {
          alert("Solo se aceptan imágenes JPG, PNG y GIF");
        }
        let reader = new FileReader();
        
        reader.onload = function(e) {
          
          let fileBase64 = e.target.result;
  
          // Almacenar en variable global para uso posterior
          savedFileBase64 = fileBase64;
        };
        reader.readAsDataURL(file);
    });

    $("#upload").click(function(){
      // Código para previsualizar
        $("#filmPhoto").css("background-image", "url(" + savedFileBase64 + ")");
    });

    
      function fotosPrivadas(){    //Para mostrar las fotos privadas de su categoria

        $.ajax({
          type: 'GET',
          data:{'idCategoria': idCategoria},
          url: '../controller/cEquiposGaleriaPriv.php',
          dataType: 'json',
          success: function (result) {
  
              console.log(result);

            
            if(idUsuario !== undefined | null){
              $(".Galeria-Priv").show();
              var newRow = "";
  
              $.each(result, function (i, jugador) {
  

                newRow += '<div class="card m-3 carousel" style="width: 18rem;">'
                newRow += '<img src="'+jugador.fotoEquipo+'">'
                newRow += '<div>'
                newRow += '<p'+nombreCategoria+'"p>'
                newRow += '</div>'
                newRow += '</div>'
            });
  
              $(".Galeria-Priv").append(newRow);
            }
          }
  
      });


      }
  
  
      
  
  });
  
  
  