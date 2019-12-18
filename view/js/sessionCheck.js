function sessionCheck() {
    $.ajax({
  
      url: "controller/login/cSessionGetVar.php",
      dataType: "json",
  
      success: function (result) {
        console.log(result);
        // alert(JSON.stringify(result));
  
        // if (result.admin != -1) {
        //   if (result.admin != 0) {
        //     window.location.href = "../index.html";
        //   } else {
        //     window.location.href = "../index.html";
        //   }
        // } else {
        //   alert("Error al iniciar sesión");
        // }
      },
      error: function (xhr) {
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
}
