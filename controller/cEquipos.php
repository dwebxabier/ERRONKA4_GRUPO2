<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/ERRONKA4_GRUPO2/model/equipoModel.php");

$equipo= new equipoModel();
$equipo->setList(); 
$equipoJSON=$equipo->getListJsonString();

echo $equipoJSON;

?>