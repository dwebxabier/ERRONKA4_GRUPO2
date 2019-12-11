
var miApp = angular.module('miApp', []);
miApp.controller('miControlador', ['$scope', '$http', function ($scope, $http) {

$scope.ConAjax="true";
$scope.agregarEquipo="false";
$scope.modificarEquipo="false";
$scope.verTabla="true";

$http({
    method: 'GET',
    url: '../controller/cEquipos.php',
}).then(function (data) { //necesito saber un evento que al cargar lista sepa que esta cargado

    console.log(data.data);
    $scope.lista = data.data; //asigna a la lista los datos recibidos
    $scope.verMenu="true";

    setTimeout(function(){ //hace que se ejecute mas tarde para que pueda realizar esta accion
        $(".nombreEquipo").click(function(){
            alert("hola");
        });
    
    },300)


});

    
}]);