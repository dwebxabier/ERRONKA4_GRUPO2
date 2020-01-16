<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/opinionModel.php");

$opinion= new opinionModel();
$opinion->setList(); 


$listaopiniones=$opinion->getListJsonString();
echo $listaopiniones;

?>