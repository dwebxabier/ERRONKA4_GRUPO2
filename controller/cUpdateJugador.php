<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/usuarioModel.php");
include_once ("../model/jugadorModel.php");

$usuario= new usuarioModel();
$jugador = new jugadorModel();

$usuario_array = json_decode($_GET['value']);

$idUsuario=$usuario_array->$idUsuario;
$nombre_usuario=$usuario_array->usuario;
$nombre_jugador=$usuario_array->nombre;
$email=$usuario_array->email;
$password=$usuario_array->password;


$usuario->setIdUsuario($idUsuario);
$jugador->setIdUsuario($idUsuario);

$usuario->setNombreUsuario($nombre_usuario);
$jugador->setNombre($nombre_jugador);   
$usuario->setEmail($email); 
$usuario->setPassword($password);

$usuario->updateUsuario();
$jugador->updateJugador();

?>
    