<?php
if ($_SERVER['SERVER_NAME'] == 'apc.dominios.fpz1920.com'){
    include_once ("connect_dataServer.php");
}else{
    include_once ("connect_data.php");
}
include_once 'votoClass.php';


class votoModel extends votoClass{
    
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

    public function setList()
    {
        $this->OpenConnect();
        $sql="call sp_votos_load()";
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $newVoto = new votoModel();
            
            $newVoto->setIdVoto($row['idVoto']);
            $newVoto->setIdUsuario($row['idUsuario']);
            $newVoto->setIdCategoria($row['idCategoria']);
            $newVoto->setIdJugadorVotado($row['idJugadorVotado']);
            
            array_push($this->list, $newVoto);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function contarVotosByJugador()
    {
        $this->OpenConnect();
        $idJugadorVotado = $this->getIdJugadorVotado();
        $sql="call sp_votos_totales($idJugadorVotado)";
        $result = $this->link->query($sql);

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $this->setIdVoto($row['votos']);
            $this->setIdCategoria($row['categoria']);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function load_MVPs()
    {
        $this->OpenConnect();
        $sql="call sp_jugador_con_mas_votos()";
        $result = $this->link->query($sql);

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $mvp = new votoModel();

            $mvp->setIdUsuario($row['fotoPerfil']);
            $mvp->setIdCategoria($row['categoria']);
            $mvp->setIdJugadorVotado($row['jugador']);
            $mvp->setIdVoto($row['votos']);

            array_push($this->list, $mvp);
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

