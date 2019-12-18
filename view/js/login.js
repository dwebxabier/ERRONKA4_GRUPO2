
$(document).ready(function () {
	$("#submit").click(function () {
		var name = $("#name").val();
		var password = $("#password").val();
		$.ajax({
			data: { 'name': name, 'password': password },
			url: "../controller/login/cSessionSetVar.php",
			dataType: "text",
			success: function (result) {

				console.log(result);
				result = JSON.parse(result);
				console.log(result);
				userCheck(result);
			},
			error: function (xhr) {
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			}
		});

	});
	$('#insert').on('click', function () {
		alert("CREAR UN NUEVO USUARIO ");
		// winidow.location.href="view/vNewUser.html";
	});
});

function userCheck(result){
	if (!result.admin -1) {
		if (result.admin == 1) {
			location.href="admin.html";
		} else { 
			location.href="../index.html";
		}
	} else {
		alert("Error al iniciar sesion");
	}
}