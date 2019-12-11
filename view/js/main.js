var usuarios
$(document).ready(function () {

  // COMPROBACION DE SI LA SESSION ESTA INICIADA 
  sessionCheck();


  $(".info").click(function () {
    $('#exampleModalLongTitle').html($(this).prev('h2').text());
  });

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
  // $.ajax({

  //   url: "../controller/cSessionVerVars.php",
  //   dataType: "json",

  //   success: function (result) {

  //     console.log(result);

  //     if (result != 0) {

  //       newRow = "";
  //       newRow += "<p>Has iniciado sesion: " + result.name
  //         + " y eres admin(SI/NO) : " + result.admin + "</p>";

  //       newRow += "<p><button id='itxi'>Session close</button></p>";
  //       $("body").append(newRow);

  //     } else {
  //       $("body").append("No has iniciado session");

  //     }
  //   },
  //   error: function (xhr) {
  //     alert("An error occured: " + xhr.status + " " + xhr.statusText);
  //   }
  // });
}