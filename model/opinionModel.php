<?php
// echo $_SERVER['SERVER_NAME'];
if ($_SERVER['SERVER_NAME'] == 'apc.dominios.fpz1920.com'){
    include_once ("connect_dataServer.php");
}else{
    include_once ("connect_data.php");
}
include_once 'opinionClass.php';


class opinionModel extends opinionClass{
    
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
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }
  
    public function getOpiniones(){

        $this->OpenConnect();
        $sql="call sp_load_opiniones()";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $this->setIdOpinion($row['idOpinion']);
            $this->setEmail($row['email']);
            $this->setFecha($row['fecha']);
            $this->setTexto($row['texto']);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function insertOpinion()
    {
        $this->OpenConnect();
        $email=$this->getEmail();
        $texto=$this->getTexto();
        $sql="call sp_insertar_opinion('$email', '$texto')";
        
        $result = $this->link->query($sql);
      
        mysqli_free_result($result);
        $this->CloseConnect();
    }

}

