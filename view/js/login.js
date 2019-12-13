
$(document).ready(function(){
	alert("holis");
	$("#submit").click(function(){	
		var name=$("#name").val();
		var password=$("#password").val();
		$.ajax({
			data:{'name':name,'password':password},
	       	url: "../../controller/login/cSessionSetVar.php", 
	       	dataType:"text",
	    	success: function(result){ 
	    		
	    		console.log(result);
	    		
	       		if (result ==1)
	       		{
//	       			window.location.href="view/vLogin.html";
	       			alert("Se ha iniciado sesión de forma correcta");
	       		} else {
	       			alert("Error al iniciar sesion");
//	       			window.location.href="view/vLogout.html";
	       		}	
			},
	       	error : function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		});
		
	});
	$('#insert').on('click',function(){
		alert("CREAR UN NUEVO USUARIO ");
		// winidow.location.href="view/vNewUser.html";
	});
});
	