<?php
header("Access-Control-Allow-Origin: *");
require_once '../../model/usuarioModel.php';
require_once '../../model/adminModel.php';

session_start();

$PHPSESSID = session_id();
$name = "";
$admin = - 2; // alert incorrect loging

if (isset($_SESSION['name'])) {
    $name = $_SESSION['name'];
    $admin = $_SESSION['admin'];
}

$name = filter_input(INPUT_GET, "name");
$password = filter_input(INPUT_GET, "password");

if (($name != null) && ($password != null)) {

    $user = new usuarioModel();
    $user->setNombreUsuario($name);
    $user->setPassword($password);
    if ($user->findUserByUsername()) // si es correcto el userName y el password
    {

        $_SESSION['name'] = $name;
        $_SESSION['admin'] = $user->getadmin();
        $_SESSION['idUsuario'] = $user->getIdUsuario();

        $obj['usuario'] = $_SESSION['name'];
        $obj['admin'] = $_SESSION['admin'];
        $obj['idUsuario'] = $_SESSION['idUsuario'];
        $obj['PHPSESSID']=$PHPSESSID;

        $objJson = json_encode($obj);
        print_r($objJson);
    } else {
        echo - 1; // not correct user
    }
} else {
    echo - 1; // not filled user or password
}