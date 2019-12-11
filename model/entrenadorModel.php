<?php
include_once 'connect_data.php';
include_once 'entrenadorClass.php';


class entrenadorModel extends entrenadorClass{
    
    private $link;
    private $list=array();
    
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
    
    public function findEntrenadorByTecnico()
    {   
        $idTecnico=$this->getIdTecnico();
        $this->OpenConnect();  
        $sql="call sp_entrenador_by_idTecnico($idTecnico)";
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $this->setIdEntrenador($row['idEntrenador']);
            $this->setNombre($row['nombre']);
        } 
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    // function getListJsonString() {
        
    //     $arr=array();
        
    //     foreach ($this->list as $object)
    //     {
    //         $vars = $object->getObjectVars();
            
    //         array_push($arr, $vars);
    //     }
    //     return json_encode($arr);
    // }

}

