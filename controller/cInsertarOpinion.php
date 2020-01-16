<?php
header("Access-Control-Allow-Origin: *");
include_once ("../model/opinionModel.php");

$opinion = new opinionModel();

$idUsuario=filter_input(INPUT_GET,"idUsuario");

if (isset($idUsuario)){
    $opinion->setIdUsuario($idUsuario);
}

$email=filter_input(INPUT_GET,"email");

if (isset($email)){
    $opinion->setEmail($email);
}

$texto=filter_input(INPUT_GET,"texto");

if (isset($texto)){
    $opinion->setTexto($texto);
}

$opinion->insertOpinion(); 


?>