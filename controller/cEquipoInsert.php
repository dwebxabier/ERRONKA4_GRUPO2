<?php
include_once ("../model/equipoModel.php");
include_once ("../model/categoria_equipoModel.php");

$equipo= new equipoModel();
$equipo_categoria = new equipo_categoriaModel();

$equipo_array = json_decode($_GET['value']);

$idEquipo=$equipo_array->idCategoria;
$nombre=$equipo_array->nombre;

$equipo_categoria->setIdCategoria($idCategoria);
$equipo->setNombre($nombre);   

$equipo->insert(); 
$equipo_categoria->insert();

?>
    

