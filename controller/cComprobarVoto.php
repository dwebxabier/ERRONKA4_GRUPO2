<?php
include_once ("../model/votoModel.php");

$voto= new votoModel();
$voto->setList(); 

$votos=$voto->getListJsonString();
echo $votos;

?>