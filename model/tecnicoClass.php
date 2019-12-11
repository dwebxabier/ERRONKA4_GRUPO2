<?php


class tecnicoClass{
    protected $idUsuario;
    protected $idTecnico;

    /**
     * @return mixed
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * @return mixed
     */
    public function getIdTecnico()
    {
        return $this->idTecnico;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * @param mixed $idTecnico
     */
    public function setIdTecnico($idTecnico)
    {
        $this->idTecnico = $idTecnico;
    }

    
    function getObjectVars()
    {
        $vars = get_object_vars($this);
        return  $vars;
    }
    

 
}

