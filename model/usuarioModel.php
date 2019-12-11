<?php
include_once 'connect_data.php';
include_once 'usuarioClass.php';


class usuarioModel extends usuarioClass{
    
    private $link;
    private $list=array();
    private $objectJugador = array();

    public function getObjectJugador(){   
        return $this->objectJugador;
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
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
        
    }
    
    public function setUsuariosByEquipo()
    {   
        $this->OpenConnect();
        $id=$this->getIdEquipo();
        $sql="call sp_usuario_by_equipo($id)";
        // echo $sql;
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newUsuario = new usuarioModel();
            $newUsuario->setIdEquipo($row['idEquipo']);
            $newUsuario->setIdUsuario($row['idUsuario']);

            require_once ($_SERVER['DOCUMENT_ROOT']."/ERRONKA4_GRUPO2/model/jugadorModel.php");
            
            $jugador = new jugadorModel();
            $jugador->setIdUsuario($row['idUsuario']);
            $jugador->findJugadorByUser();
            
            $newUsuario->objectJugador=$jugador;

            array_push($this->list, $newUsuario);
        }
        mysqli_free_result($result);
        unset($jugador);
        $this->CloseConnect();
    }
    public function findUserByUsername(){
        $this->OpenConnect();
        
        $username=$this->username;
        
        $sql="call spFindUserByUsername('$username')";
        $result= $this->link->query($sql);
        
        $userExists=false;
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $passwordEncripted=$row['password'];
            
            // if (password_verify($this->getPassword(), $passwordEncripted))
            // {
            //     $this->setAdmin($row['admin']); 
                
            //     $userExists=true;
            // }
        }
        return $userExists;
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

    function getListJsonString() {
        
        $arr=array();
        foreach ($this->list as $usuario)
        {
            if ($usuario->getObjectJugador()->getNombre() != null )
            {
                $vars = $usuario->getObjectVars();
                $objectJugador=$usuario->objectJugador->getObjectVars();
                $vars['objectJugador']=$objectJugador;
                array_push($arr, $vars);
            }
        }
        return json_encode($arr);
    }
}

