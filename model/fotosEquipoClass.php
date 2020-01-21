<?php


class fotosEquipoClass{
    protected $idFoto;
    protected $idCategoria;
    protected $fotoEquipo;
    protected $privado;

    /**
     * @return mixed
     */
    public function getIdFoto()
    {
        return $this->idFoto;
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
    public function getFotoEquipo()
    {
        return $this->fotoEquipo;
    }

    /**
     * @return mixed
     */
    public function getPrivado()
    {
        return $this->privado;
    }



    /**
     * @param mixed $idVoto
     */
    public function setIdFoto($idFoto)
    {
        $this->idFoto = $idFoto;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;
    }

    /**
     * @param mixed $idCategoria
     */
    public function setFotoEquipo($fotoEquipo)
    {
        $this->fotoEquipo = $fotoEquipo;
    }

  /**
     * @param mixed $idJugadorVotado
     */
    public function setPrivado($privado)
    {
        $this->privado = $privado;
    }


    
    function getObjectVars()
    {
        $vars = get_object_vars($this);
        return  $vars;
    }
    

 
}

