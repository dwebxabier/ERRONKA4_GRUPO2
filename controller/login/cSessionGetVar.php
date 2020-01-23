<?php
header('Access-Control-Allow-Origin: *');
/*
 * header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
 * header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
 * header("Allow: GET, POST, OPTIONS, PUT, DELETE");
 * header('Access-Control-Allow-Credentials: false');
 * header('Access-Control-Max-Age: 86400');
 */

require_once '../../model/usuarioModel.php';

$name = "";
$type = - 1; // alert not logged

$PHPSESSID = (filter_input(INPUT_GET, "PHPSESSID"));

if ($PHPSESSID == null) {
    $PHPSESSID = filter_input(INPUT_POST, "PHPSESSID");
}
if ($PHPSESSID == '') // si llega PHPSESSID a '', crear session nueva, sino restaurar la que tiene que ser
{
    session_start();
    $PHPSESSID = session_id();
} else {
    session_id($PHPSESSID);
    session_start();
}


if ((isset($_SESSION['name']))  && (isset($_SESSION['admin']))){
    
    
    $obj['name']=$_SESSION['name'];
    $obj['admin']=$_SESSION['admin'];
    $obj['idUsuario']=$_SESSION['idUsuario'];
    $obj['idCategoria'] = $_SESSION['idCategoria'];
    $obj['PHPSESSID']=$PHPSESSID;
    
    $objJson= json_encode($obj);
    
    echo/* $GET['callblack'].'('.*/$objJson/*.')'*/;         // ver var session
    
} else{
    
    echo -1;
}
