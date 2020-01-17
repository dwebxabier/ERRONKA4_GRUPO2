<?php
include_once ("../model/votoModel.php");

$voto= new votoModel();
$voto->load_MVPs(); 

$votos_mvp=$voto->getListJsonString();
echo $votos_mvp;

?>