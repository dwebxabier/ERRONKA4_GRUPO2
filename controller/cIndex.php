<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/peliculaModel.php");

$user = new usuarioModel();
$user->setList();

$listaUser=$user->getListJsonString();
echo $listaUser;
