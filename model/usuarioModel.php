<?php
include_once 'connect_data.php';
include_once 'usuarioClass.php';


class usuarioModel extends usuarioClass{
    
    private $link;
    private $list=array();
    <
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
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }
    
    public function setList()
    {
        
        $this->OpenConnect();
        $sql="call sp_usuario_load";
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newUsuario = new usuarioModel();
            $newUsuario->setIdUsuario($row['idUsuario']);
            $newUsuario->setIdEquipo($row['idEquipo']);
            
            objJUGADO
            array_push($this->list, $newUsuario);
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

