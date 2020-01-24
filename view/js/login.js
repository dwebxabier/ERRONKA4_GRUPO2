var conectCheck = false;
$(document).ready(function () {
	// COMPROBACION DE SI LA SESSION ESTA INICIADA 
	//sessionCheck();

	$("#submit").click(function () {
		var name = $("#name").val();
		var password = $("#password").val();
		$.ajax({
			type: "POST",
			data: { 'PHPSESSID': (sessionStorage.getItem('PHPSESSID') || ''), 'name': name, 'password': password },
			url: "../controller/login/cSessionSetVar.php",
			//url: "http://lmar.fpz1920.com/controller/cLogin.php", 
			dataType: "json",
			success: function (result) {
				conectCheck = true;
				console.log(result.$PHPSESSID)
				sessionStorage.setItem('PHPSESSID', result.$PHPSESSID || '');
				userCheck(result);
			},
			error: function (xhr) {
				alert("An error occured: " + xhr.status + " azesdrxttcyfguvhbiojnopkkm" + xhr.statusText);
			}
		});
	});
});

function sessionCheck() {

	$.ajax({
		type: "GET",
		data: { 'PHPSESSID': (sessionStorage.getItem('PHPSESSID') || '') },
		url: "../controller/login/cSessionGetVar.php",
		// "http://lmar.fpz1920.com/controller/cIndex.php",
		//url: "controller/cIndex.php", 
		dataType: "json",

		success: function (result) {

			sessionStorage.setItem('PHPSESSID', result.$PHPSESSID || '');

			//userCheck(result);

			console.log(result);
		},
		error: function (xhr) {
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		}
	});
	//##Antiguo getVars
	// $.ajax({
	// 	url: "../controller/login/cSessionGetVar.php",
	// 	dataType: "json",

	// 	success: function (result) {
	// 		console.log(result);
	// 		if (result.name!=null) {
	// 			conectCheck=true;
	// 		}
	// 		userCheck(result);
	// 	},
	// 	error: function (xhr) {
	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	// 	}
	// });
}

function userCheck(result) {
	if (conectCheck != false) {
		if (!result.admin - 1) {
			if (result.admin == 1) {
				location.href = "admin.html";
			} else {
				location.href = "../index.html";
			}
		} else {
			alert("Error al iniciar sesion");
		}
	}
	conectCheck = false;
}