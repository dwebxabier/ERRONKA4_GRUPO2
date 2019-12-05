$( document ).ready(function() {
    
    $( ".info" ).click(function() {
        $( '#exampleModalLongTitle' ).html($( this ).prev('h2').text());
      });

});