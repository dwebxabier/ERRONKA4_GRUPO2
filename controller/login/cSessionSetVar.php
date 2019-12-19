<?php
require_once '../../model/usuarioModel.php';
require_once '../../model/adminModel.php';

$name = filter_input(INPUT_GET, "name");
$password = filter_input(INPUT_GET, "password");

if (($name != null) && ($password != null)) {

    $user = new usuarioModel();
    $user->setNombreUsuario($name);
    $user->setPassword($password);

    if ($user->findUserByUsername()) // si es correcto el userName y el password
    {

        session_start();
        $_SESSION['name'] = $name;
        $_SESSION['admin'] = $user->getAdmin();
        $_SESSION['idUsuario'] = $user->getIdUsuario();

        $obj['usuario'] = $_SESSION['name'];
        $obj['admin'] = $_SESSION['admin'];
        $obj['idUsuario'] = $_SESSION['idUsuario'];
       
        $objJson = json_encode($obj);
    } else {
        echo -1; // not correct user
    }
} else {
    echo -1; // not filled user or password
}