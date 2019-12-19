<?php
session_start();

if ((isset($_SESSION['name']))  && (isset($_SESSION['admin']))){
    
    
    $obj['name']=$_SESSION['name'];
    $obj['admin']=$_SESSION['admin'];
    $obj['idUsuario']=$_SESSION['idUsuario'];
    
    $objJson= json_encode($obj);
    
    echo $objJson;         // ver var session
    
} else{
    
    echo -1;
}
