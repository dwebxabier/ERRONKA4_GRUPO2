<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/jugadorModel.php");

$jugador= new jugadorModel();
$jugador->setList(); 
$jugadorJSON=$jugador->getListJsonString();

echo $jugadorJSON;

?>