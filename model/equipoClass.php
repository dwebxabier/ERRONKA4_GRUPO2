<?php


class equipoClass{
    protected $idEquipo;
    protected $idCategoria;
    protected $nombre;
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
    public function getIdCategoria()
    {
        return $this->idCategoria;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $idEquipo
     */
    public function setIdEquipo($idEquipo)
    {
        $this->idEquipo = $idEquipo;
    }

    /**
     * @param mixed $idCategoria
     */
    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

   
    
    
}

