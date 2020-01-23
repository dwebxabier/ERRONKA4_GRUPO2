<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/fotosEquipoModel.php");



$equipoGaleria= new fotosEquipoModel();

$idCategoria=filter_input(INPUT_GET,"idCategoria");

if (isset($idCategoria))
{
    $equipoGaleria->setIdCategoria($idCategoria);    
}

$equipoGaleria->setListPrivados(); 
$equipoJSON=$equipoGaleria->getListJsonString();

echo $equipoJSON;

?>