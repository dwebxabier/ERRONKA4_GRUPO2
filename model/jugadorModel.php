<?php
if ($_SERVER['SERVER_NAME'] == 'apc.dominios.fpz1920.com'){
    include_once ("connect_dataServer.php");
}else{
    include_once ("connect_data.php");
}
include_once 'jugadorClass.php';


class jugadorModel extends jugadorClass{
    
    private $link;
    private $list=array();
    private $objectVotos;

    public function getObjectVotos()
    {
        return $this->objectVotos;
    }
    
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }

    public function setList()
    {
        $this->OpenConnect();
        $sql="call sp_jugador_load()";
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newJugador = new jugadorModel();
            
            $newJugador->setIdJugador($row['idJugador']);
            $newJugador->setIdUsuario($row['idUsuario']);
            $newJugador->setNombre($row['nombre']);
            $newJugador->setFotoPerfil($row['fotoPerfil']);

            require_once ($_SERVER['DOCUMENT_ROOT']."/ERRONKA4_GRUPO2/model/votoModel.php");
            
            $voto = new votoModel();
            $voto->setIdJugadorVotado($row['idJugador']);
            $voto->contarVotosByJugador();
            
            $newJugador->objectVotos=$voto;
            
            array_push($this->list, $newJugador);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function delete()
    {
        $this->OpenConnect();
        
        $idUsuario=$this->getIdUsuario();
        
        
        $sql = "CALL sp_delete_jugador($idUsuario)";
        
        if ($this->link->query($sql)>=1) // delete egiten da
        {
            echo "El Jugador se ha borrado con exito";
        } else {
            echo "Fallo al borrar el Jugador: (" . $this->link->errno . ") " . $this->link->error;
        }
        
        $this->CloseConnect();
    }
    
    public function findJugadorByUser()
    {   
        $idUsuario=$this->getIdUsuario();
        $this->OpenConnect();  
        $sql="call sp_jugador_by_idUsuario($idUsuario)";
        // echo $sql;
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $this->setIdJugador($row['idJugador']);
            $this->setNombre($row['nombre']);
        } 
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function insertJugador()
    {   
        $this->OpenConnect();
        $nombre=$this->getNombre();
        $sql="call sp_insertar_jugador('$nombre')";
        $result = $this->link->query($sql);

        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function updateJugador()
    {
        $this->OpenConnect();
        $nombre_jugador = $this->getNombre();
        $idUsuario = $this->getIdUsuario();
        $sql = "call sp_update_jugador('$nombre_jugador', $idUsuario)";
        $result = $this->link->query($sql);

        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function updateFotoPerfil()
    {
        $this->OpenConnect();
        $foto = $this->getFotoPerfil();
        $idUsuario = $this->getIdUsuario();
        $sql = "call sp_update_foto_jugador('$foto', $idUsuario)";
        $result = $this->link->query($sql);

        mysqli_free_result($result);
        $this->CloseConnect();
    }
  

    function getListJsonString() {
        
        $arr=array();
        
        foreach ($this->list as $object)
        {
            $vars = $object->getObjectVars();
            
            array_push($arr, $vars);
        }
        return json_encode($arr);
    }

    function getListJsonStringVoto()
    {
        $arr = array();
        foreach ($this->list as $voto) {

            $vars = $voto->getObjectVars();
            $objectVotos = $voto->objectVotos->getObjectVars();
            $vars['objectVotos'] = $objectVotos;
            array_push($arr, $vars);

        }
        return json_encode($arr);
    }

}

