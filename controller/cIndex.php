<?php

include_once ("../model/peliculaModel.php");

$user = new usuarioModel();
$user->setList();

print_r("holis");
$listaUser=$user->getListJsonString();
echo $listaUser;
