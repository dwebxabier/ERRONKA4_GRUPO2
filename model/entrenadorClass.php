<?php


class entrenadorClass{

    protected $idEntrenador;
    protected $idTecnico;
    protected $nombre;


    public function getIdEntrenador()
    {
        return $this->idEntrenador;
    }

    public function getIdTecnico()
    {
        return $this->idTecnico;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setIdEntrenador($idEntrenador)
    {
        $this->idEntrenador = $idEntrenador;
    }

    public function setIdTecnico($idTecnico)
    {
        $this->idTecnico = $idTecnico;
    }

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

