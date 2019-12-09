var usuarios
$( document ).ready(function() {
    
    $( ".info" ).click(function() {
        $( '#exampleModalLongTitle' ).html($( this ).prev('h2').text());
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