<?php
include_once ("../model/jugadorModel.php");

$jugador= new jugadorModel();
$jugador->setList(); 
$jugadorJSON=$jugador->getListJsonStringVoto();

echo $jugadorJSON;

?>