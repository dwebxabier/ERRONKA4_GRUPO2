<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/usuarioModel.php");

$usuario= new usuarioModel();
$usuario->setList(); 

$usuarioJSON=$usuario->getListJsonString();
echo $usuarioJSON;

?>