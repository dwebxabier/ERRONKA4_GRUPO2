<?php
header("Access-Control-Allow-Origin: *");
session_start();

$name="";
$admin=-1; // alert not logged
$PHPSESSID=session_id();

if ((isset($_SESSION['name']))  && (isset($_SESSION['admin']))){
    
    
    $obj['name']=$_SESSION['name'];
    $obj['admin']=$_SESSION['admin'];
    $obj['idUsuario']=$_SESSION['idUsuario'];
    $obj['PHPSESSID']=$PHPSESSID;
    
    $objJson= json_encode($obj);
    
    echo $objJson;         // ver var session
    
} else{
    
    echo -1;
}
