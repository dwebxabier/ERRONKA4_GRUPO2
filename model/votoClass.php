<?php


class votoClass{
    protected $idVoto;
    protected $idUsuario;
    protected $idCategoria;
    protected $idJugadorVotado;

    /**
     * @return mixed
     */
    public function getIdVoto()
    {
        return $this->idVoto;
    }

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
    public function getIdCategoria()
    {
        return $this->idCategoria;
    }

    /**
     * @return mixed
     */
    public function getIdJugadorVotado()
    {
        return $this->idJugadorVotado;
    }



    /**
     * @param mixed $idVoto
     */
    public function setIdVoto($idVoto)
    {
        $this->idVoto = $idVoto;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * @param mixed $idCategoria
     */
    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;
    }

  /**
     * @param mixed $idJugadorVotado
     */
    public function setIdJugadorVotado($idJugadorVotado)
    {
        $this->idJugadorVotado = $idJugadorVotado;
    }


    
    function getObjectVars()
    {
        $vars = get_object_vars($this);
        return  $vars;
    }
    

 
}

