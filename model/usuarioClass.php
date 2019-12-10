<?php


class usuarioClass{
    protected $idUsuario;
    protected $idEquipo;
    protected $nombre;

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
    public function getIdEquipo()
    {
        return $this->idEquipo;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * @param mixed $idEquipo
     */
    public function setIdEquipo($idEquipo)
    {
        $this->idEquipo = $idEquipo;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    
    function getObjectVars()
    {
        $vars = get_object_vars($this);
        return  $vars;
    }
    

 
}

