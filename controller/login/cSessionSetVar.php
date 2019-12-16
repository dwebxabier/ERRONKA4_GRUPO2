<?php
require_once '../../model/usuarioModel.php';

$name=filter_input(INPUT_GET, "name");
$password=filter_input(INPUT_GET, "password");

if (( $name !=null ) && ( $password !=null )){

    $user=new usuarioModel();
    $user->setNombreUsuario($name);
    $user->setPassword($password);
    
    if ($user->findUserByUsername()) // si es correcto el userName y el password
    {
        session_start();
        $_SESSION['name']=$name;
        $_SESSION['admin']=$user->getObjAdmin();
    
        echo 1;
        
    }  else {
        
        echo 0; // not correct user
    }
}  else {
    
    echo 0;     // not filled user or password
}
