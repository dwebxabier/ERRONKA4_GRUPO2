<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/fotosEquipoModel.php");

$equipoGaleria= new fotosEquipoModel();
$equipoGaleria->setListPublicos(); 
$equipoJSON=$equipoGaleria->getListJsonString();

echo $equipoJSON;

?>