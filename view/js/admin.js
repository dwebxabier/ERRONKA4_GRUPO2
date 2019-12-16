
var miApp = angular.module('miApp', []);
miApp.controller('miControlador', ['$scope', '$http', function ($scope, $http) {

//Escondemos todo al Principio
$scope.ConAjax="true";
$scope.agregarEquipos="false";
$scope.agregarJugador = "false";
$scope.agregarTecnico="false";  
$scope.modificarEquipo="false";
$scope.eliminarEquipos = "false";
$scope.eliminarJugadores = "false";
$scope.verTabla="true";


$scope.misdatosEquipo = {
    idEquipo:"",
    idCategoria: "",
    nombreEquipo: "",
}

$scope.misdatosJugador = {
    idJugador:"",
    idUsuario: "",
    nombreJugador: "",
}


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

        $http({
            method: 'GET',
            url: '../controller/cJugadores.php',
        }).then(function (data) {
        
            console.log(data.data);
            $scope.jugadores = data.data;
        });

        $scope.Buscar = function () {
            $scope.agregarEquipos = "false";
            $scope.buscarEquipo = "true";
        }

        $scope.EquipoNuevo = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarTecnico = "false";
            $scope.agregarJugador = "false";
            $scope.agregarEquipos = "true";
            
        }

        $scope.JugadorNuevo = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarEquipos = "false";
            $scope.agregarTecnico = "false";
            $scope.agregarJugador = "true";
            
        }

        $scope.TecnicoNuevo = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarEquipos = "false";
            $scope.agregarJugador = "false";
            $scope.agregarTecnico = "true";
        }

        $scope.cancelar = function () {
            $scope.buscarEquipo = "false";
            $scope.agregarEquipo = "false";
            $scope.eliminarEquipos = "false";
            $scope.eliminarJugadores = "false";
        }

        $scope.EliminarEquipo = function () {
            $scope.eliminarEquipos = "true";
        }

        $scope.EliminarJugador = function () {
            $scope.eliminarJugadores = "true";
        }

        $scope.agregarEquipo = function () {
            
            alert( $scope.misdatosEquipo.idCategoria.idCategoria);
            equipoNuevo = { 'idCategoria': $scope.misdatosEquipo.idCategoria.idCategoria, 'nombre': $scope.misdatosEquipo.nombreEquipo};

            equipoNuevo = JSON.stringify(equipoNuevo);
            alert(equipoNuevo);

            $http({
                method: 'GET',
                params:{value: equipoNuevo},
                url: '../controller/cEquipoInsert.php',
            }).then(function (data) {
            
                console.log(data.data);
                
            });
        }

        $scope.agregar_Jugador = function () {
            
            jugadorNuevo = { 'nombreJugador': $scope.misdatos.nombreJugador, 'idEquipo': $scope.misdatosEquipo.idEquipo.idEquipo};

            jugadorNuevo = JSON.stringify(jugadorNuevo);
            alert(jugadorNuevo);

            $http({
                method: 'GET',
                params:{value: jugadorNuevo},
                url: '../controller/cJugadorInsert.php',
            }).then(function (data) {
            
                console.log(data.data);
                
            });
        }

        $scope.agregar_Tecnico = function () {
            
            tecnicoNuevo = { 'nombreTecnico': $scope.misdatos.nombreTecnico, 'licencia': $scope.misdatos.licencia, 'idEquipo': $scope.misdatosEquipo.idEquipo.idEquipo};

            tecnicoNuevo = JSON.stringify(tecnicoNuevo);
            alert(tecnicoNuevo);

            $http({
                method: 'GET',
                params:{value: tecnicoNuevo},
                url: '../controller/cTecnicoInsert.php',
            }).then(function (data) {
            
                console.log(data.data);
                
            });
        }

        $scope.eliminarEquipo = function () {
            
            EquipoDelete = { 'idEquipo': $scope.misdatosEquipo.idEquipo.idEquipo};

            EquipoDelete = JSON.stringify(EquipoDelete);
            alert(EquipoDelete);

            $http({
                method: 'GET',
                params:{value: EquipoDelete},
                url: '../controller/cEquipoDelete.php',
            }).then(function (data) {
            
                console.log(data.data);
                
            });
        }

        $scope.eliminarJugador = function () {
            
            JugadorDelete = { 'idUsuario': $scope.misdatosJugador.idUsuario.idUsuario};

            JugadorDelete = JSON.stringify(JugadorDelete);
            alert(JugadorDelete);

            $http({
                method: 'GET',
                params:{value: JugadorDelete},
                url: '../controller/cJugadorDelete.php',
            }).then(function (data) {
            
                console.log(data.data);
                
            });
        }

    
    },300)

   

});



    
}]);