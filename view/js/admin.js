
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

            var idEquipo = $(this).attr("data-id");
            alert(idEquipo);


            // $http({
            //     method: 'GET',
            //     data: {"idEquipo":idEquipo},
            //     url: '../controller/cPlantilla.php',
            // }).then(function (data) { //necesito saber un evento que al cargar lista sepa que esta cargado
            
            //     console.log(data.data);
            
            // });



        });

        $http({
            method: 'GET',
            url: '../controller/cCategoria.php',
        }).then(function (data) {
        
            console.log(data.data);
            $scope.categorias = data.data;
        });

        $scope.Buscar = function () {
            $scope.agregarEquipo = "false";
            $scope.buscarEquipo = "true";
        }

        $scope.EquipoNuevo = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarEquipo = "true";
        }

        $scope.cancelar = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarEquipo = "false";
        }

    
    },300)

   

});



    
}]);