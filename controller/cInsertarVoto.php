<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/votoModel.php");

$voto = new votoModel();

$idUsuario=filter_input(INPUT_GET,"idUsuario");
$voto->setIdUsuario($idUsuario);

$idCategoria=filter_input(INPUT_GET,"idCategoria");
$voto->setIdCategoria($idCategoria);

$idJugadorVotado=filter_input(INPUT_GET,"idJugadorVotado");
$voto->setIdJugadorVotado($idJugadorVotado);

$voto->insertar_voto(); 

?>

