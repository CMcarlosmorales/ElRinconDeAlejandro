<?php
    require "../config/Conexion.php";

    class Comentario{
        public function __construct(){
            
        }

        public function insertarComentario($idusuario, $idmovie, $comentario, $fecha){
            $sql = "INSERT INTO comentario (idusuario, idmovie, comentario, fecha) VALUES ('$idusuario','$idmovie','$comentario','$fecha');";
            return ejecutarConsulta($sql);
        }

        public function eliminarComentario($idcomentario){
            $sql = "DELETE FROM comentario WHERE idcomentario='$idcomentario'";
            return ejecutarConsulta($sql);
        }

        public function listarComentario($idmovie){
            $sql = "SELECT c.*, u.nombre FROM comentario c INNER JOIN usuario u ON c.idusuario=u.id WHERE c.idmovie='$idmovie'";
            return ejecutarConsulta($sql);
        }
    }
?>