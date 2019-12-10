<?php
include_once ("../model/usuarioModel.php");

$usuario= new usuarioModel();

$idEquipo=filter_input(INPUT_GET,"idEquipo");
if (isset($idEquipo))
{
    $usuario->setIdEquipo($idEquipo);
}

$usuario->setUsuariosByEquipo(); 
$usuarioJSON=$usuario->getListJsonString();

echo $usuarioJSON;

?>