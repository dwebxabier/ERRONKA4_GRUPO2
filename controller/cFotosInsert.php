<?php
header("Access-Control-Allow-Origin: *");

include_once ("../model/fotosEquipoModel.php");

// $arr=array();

// session_start();
// $name="";
// $type=-1; // alert not logged
// $PHPSESSID=session_id();

// if (isset($_SESSION['name']) )
// {
//     $name=$_SESSION['name'];
//     $type=$_SESSION['type'];
// } 

$idCategoria = filter_input(INPUT_POST, 'idCategoria');
$privado = 1; //siempre sera privado

$filename = filter_input(INPUT_POST, 'filename');
$savedFileBase64 = filter_input(INPUT_POST, 'savedFileBase64');

$equipoFotos = new fotosEquipoModel();

$equipoFotos->setIdCategoria($idCategoria);
$equipoFotos->setFotoEquipo($filename);
$equipoFotos->setPrivado($privado);


$resultado=$equipoFotos->insert(); //function insert en pelicula_model

/*Llega $_POST["savedFileBase64"] ==> 'data:image/png;base64,AAAFBfj42Pj4...';
Se obtiene el contenido limpio del fichero, sin cabecera de tipo de archivo
*/
$fileBase64 = explode(',', $savedFileBase64)[1];

// Se convierte de base64 a binario/texto para almacenarlo
$file = base64_decode($fileBase64);

/*Se especifica el directorio donde se almacenarÃ¡n los ficheros(se crea si no existe)*/
$writable_dir = '../uploads/';
// $writable_dir = 'C:\Users\ikaslea\eclipse-workspace\ERRONKA4_GRUPO2\uploads';
if(!is_dir($writable_dir)){mkdir($writable_dir);}

//Se escribe el archivo
file_put_contents($writable_dir.$filename, $file,  LOCK_EX);

// $arr['name']=$name;
// $arr['type']=$type;
// $arr['PHPSESSID']=$PHPSESSID;
// $arr['resultado']=$resultado;
// $arr['fileBase64']=$fileBase64;

// echo json_encode($arr);
