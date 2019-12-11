<?php
include_once 'connect_data.php';
include_once 'tecnicoClass.php';


class tecnicoModel extends tecnicoClass{
    
    private $link;
    private $list=array();
    private $objectEntrenador = array();

    public function getObjectEntrenador(){
        return $this->objectEntrenador;
    }

    public function setObjectEntrenador($objectEntrenador){
        $this->objectEntrenador = $objectEntrenador;
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
    
    public function findTecnicoByUser()
    {   
        $idUsuario=$this->idUsuario;
        $this->OpenConnect();  
        $sql="call sp_tecnico_by_idUsuario($idUsuario)";
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $this->setIdTecnico($row['idTecnico']);
            $this->setLicencia($row['licencia']);
            $this->setNombre($row['nombre']);
        } 
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

