<?php
header("Access-Control-Allow-Origin: *");
require_once '../../model/usuarioModel.php';
require_once '../../model/adminModel.php';

$PHPSESSID = filter_input(INPUT_POST, "PHPSESSID");
$name = filter_input(INPUT_POST, "name");
$password = filter_input(INPUT_POST,"password");

if ($PHPSESSID == null) {
    $PHPSESSID = filter_input(INPUT_GET, "PHPSESSID");
}
if ($PHPSESSID == ''/* || strlen($PHPSESSID) < 26*/) { // si llega PHPSESSID a '', crear session nueva, sino restaurar la que tiene que ser
    session_start();
    $PHPSESSID = session_id();
    $_SESSION['PHPSESSID'] = $PHPSESSID;
    // $objJson =  $PHPSESSID;
    // echo $objJson;   
} else {

    session_id($PHPSESSID);
    $_SESSION['PHPSESSID'] = $PHPSESSID;
    session_start();
}

// if (isset($_SESSION['name'])) {
//     $name = $_SESSION['name'];
//     $admin = $_SESSION['admin'];
// }


if (($name != null) && ($password != null)) {
    
    $user = new usuarioModel();
    $user->setNombreUsuario($name);
    $user->setPassword($password);
    if ($user->findUserByUsername()) // si es correcto el userName y el password
    {
        // session_start();
        $_SESSION['name'] = $name;
        $_SESSION['admin'] = $user->getAdmin();
        $_SESSION['idUsuario'] = $user->getIdUsuario();
        $_SESSION['idCategoria'] = $user->getIdCategoria();

        $obj['usuario'] = $_SESSION['name'];
        $obj['admin'] = $_SESSION['admin'];
        $obj['idUsuario'] = $_SESSION['idUsuario'];
        $obj['idCategoria'] = $_SESSION['idCategoria'];
        
        $obj['$PHPSESSID'] = $_SESSION['PHPSESSID'];

        $objJson = json_encode($obj);
        echo $objJson;
    } else {
        echo -1; // not correct user
    }
} else {
    echo -1; // not filled user or password
}

