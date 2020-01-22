<?php
header("Access-Control-Allow-Origin: *");
session_start();

if ((isset($_SESSION['name']))  && (isset($_SESSION['admin']))){
    
    
    $obj['name']=$_SESSION['name'];
    $obj['admin']=$_SESSION['admin'];
    $obj['idUsuario']=$_SESSION['idUsuario'];
    
    $objJson= json_encode($obj);
    
    echo /*$GET['callblack'].'('.*/$objJson/*.')'*/;         // ver var session
    
} else{
    
    echo -1;
}
