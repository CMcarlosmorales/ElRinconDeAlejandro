<?php
    require "../config/Conexion.php";

    class Comentario{
        public function __construct(){
            
        }

        public function insertarComentario($idusuario, $idmovie, $comentario, $fecha){
            $sql = "INSERT INTO comentario (idusuario, idmovie, comentario, fecha) VALUES ('$idusuario','$idmovie','$comentario','$fecha');";
            return ejecutarConsulta($sql);
        }
    }
?>