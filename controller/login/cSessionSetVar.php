<?php
header("Access-Control-Allow-Origin: *");
require_once '../../model/usuarioModel.php';
require_once '../../model/adminModel.php';




$name = "";
$admin = - 2; // alert incorrect loging

$name = filter_input(INPUT_GET, "name");
$password = filter_input(INPUT_GET, "password");

$PHPSESSID = array_merge($_GET,$_POST);


$PHPSESSID = filter_input(INPUT_GET, "PHPSESSID");

if(strlen($PHPSESSID) < 26){ $PHPSESSID = session_id(); }

session_id($PHPSESSID);
session_start();

if (isset($_SESSION['name'])) {
    $name = $_SESSION['name'];
    $admin = $_SESSION['admin'];
}




if (($name != null) && ($password != null)) {

    $user = new usuarioModel();
    $user->setNombreUsuario($name);
    $user->setPassword($password);
    if ($user->findUserByUsername()) // si es correcto el userName y el password
    {

        $_SESSION['name'] = $name;
        $_SESSION['admin'] = $user->getadmin();
        $_SESSION['idUsuario'] = $user->getIdUsuario();
        $_SESSION['idCategoria'] = $user->getIdCategoria();

        $obj['usuario'] = $_SESSION['name'];
        $obj['admin'] = $_SESSION['admin'];
        $obj['idUsuario'] = $_SESSION['idUsuario'];
        $obj['idCategoria'] = $_SESSION['idCategoria'];
        $obj['PHPSESSID']=$PHPSESSID;

        $objJson = json_encode($obj);
        print_r($objJson);
    } else {
        echo - 1; // not correct user
    }
} else {
    echo - 1; // not filled user or password
}