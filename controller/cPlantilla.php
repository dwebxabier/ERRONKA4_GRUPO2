<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/usuarioModel.php");

$usuario= new usuarioModel();

$idEquipo=filter_input(INPUT_GET,"idEquipo");
if (isset($idEquipo))
{
    $usuario->setIdEquipo($idEquipo);
}

$usuario->setJugadoresByEquipo(); 
$usuarioJSON=$usuario->getListJsonStringJugador();

echo $usuarioJSON;

?>