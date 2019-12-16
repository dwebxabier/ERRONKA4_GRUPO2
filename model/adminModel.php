<?php
include_once 'connect_data.php';
include_once 'adminClass.php';


class adminModel extends adminClass{
    
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
    
  
    public function getAdminByUserId(){
        $this->OpenConnect();
        
        $userId=$this->idUsuario;
        
        $sql="call sp_get_admin_by_user_id($userId)";
        $result= $this->link->query($sql);
        
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            
            $this->setNombre($row['nombre']);

        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }
}

