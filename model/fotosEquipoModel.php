<?php
if ($_SERVER['SERVER_NAME'] == 'apc.dominios.fpz1920.com'){
    include_once ("connect_dataServer.php");
}else{
    include_once ("connect_data.php");
}
include_once 'fotosEquipoClass.php';


class fotosEquipoModel extends fotosEquipoClass{
    
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

    public function setListPublicos()
    {
        $this->OpenConnect();
        $sql="call sp_fotos_del_equipoPubli()";
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newFotos = new fotosEquipoModel();
            
            $newFotos->setIdFoto($row['idFoto']);
            $newFotos->setIdCategoria($row['idCategoria']);
            $newFotos->setFotoEquipo($row['fotoEquipo']);
            $newFotos->setPrivado($row['privado']);
            
            array_push($this->list, $newFotos);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function setListPrivados()
    {
        $this->OpenConnect();
        $idCategoria = $this->getIdCategoria();

        $sql="call sp_fotos_del_equipoPriv($idCategoria)";
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newFotos = new fotosEquipoModel();
            
            $newFotos->setIdFoto($row['idFoto']);
            $newFotos->setIdCategoria($row['idCategoria']);
            $newFotos->setFotoEquipo($row['fotoEquipo']);
            $newFotos->setPrivado($row['privado']);
            
            array_push($this->list, $newFotos);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function insert()
    {  
         $this->OpenConnect(); 
   
         $idCategoria=$this->getIdCategoria();
         $fotoEquipo= $this->getFotoEquipo();
         $privado= $this->getPrivado(); 
         
         $sql = "CALL sp_insertar_foto($idCategoria, '$fotoEquipo', $privado)";
         //$sql = "CALL spInsert('nuevo', 'ssss', 55)";
         
         if ($this->link->query($sql)) // insert egiten da
        {
            echo "La imagen se ha insertado con exito";
        } else {
            echo "Fallo en la insercion de la foto: (" . $this->link->errno . ") " . $this->link->error;
        }
         
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

