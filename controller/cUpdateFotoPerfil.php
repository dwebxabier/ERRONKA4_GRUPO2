<?php
header("Access-Control-Allow-Origin: *");

include_once ("../model/jugadorModel.php");

$filename = filter_input(INPUT_POST, 'filename');
$savedFileBase64 = filter_input(INPUT_POST, 'savedFileBase64');
$idUsuario = filter_input(INPUT_POST, 'idUsuario');

$jugadorFoto = new jugadorModel();

$jugadorFoto->setFotoPerfil($filename);
$jugadorFoto->setIdUsuario($idUsuario);

$resultado=$jugadorFoto->updateFotoPerfil(); 



$fileBase64 = explode(',', $savedFileBase64)[1];

$file = base64_decode($fileBase64);

$writable_dir = '../uploads/';

if(!is_dir($writable_dir)){mkdir($writable_dir);}

file_put_contents($writable_dir.$filename, $file,  LOCK_EX);

