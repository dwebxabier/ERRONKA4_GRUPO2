<?php
include_once 'connect_data.php';
include_once 'jugadorClass.php';


class jugadorModel extends jugadorClass{
    
    private $link;
    private $list=array();
    // private $objectJugador;
    
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

    function getListJsonString() {
        
        $arr=array();
        
        foreach ($this->list as $object)
        {
            $vars = $object->getObjectVars();
            
            array_push($arr, $vars);
        }
        return json_encode($arr);
    }

}

