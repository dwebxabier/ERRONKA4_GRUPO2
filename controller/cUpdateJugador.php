<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/usuarioModel.php");
include_once ("../model/jugadorModel.php");

$usuario= new usuarioModel();
$jugador = new jugadorModel();


$idUsuario=filter_input(INPUT_GET,"idUsuario");
$usuario->setIdUsuario($idUsuario);
$jugador->setIdUsuario($idUsuario);

$nombre_usuario=filter_input(INPUT_GET,"usuario");
$usuario->setNombreUsuario($nombre_usuario);

$nombre_jugador=filter_input(INPUT_GET,"nombre");
$jugador->setNombre($nombre_jugador); 

$email=filter_input(INPUT_GET,"email");
$usuario->setEmail($email); 

$password=filter_input(INPUT_GET,"password");
$usuario->setPassword($password);



$usuario->updateUsuario();
$jugador->updateJugador();

?>
    