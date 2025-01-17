<?php 
    //incluir la conexion de base de datos
    require "../config/Conexion.php";
    class Usuario{

        //implementamos nuestro constructor
        public function __construct(){

        }

        //metodo insertar regiustro
        public function insertar($nombre,$tipo_documento,$num_documento,$telefono,$email,$clave,$imagen){
            $sql="INSERT INTO usuario (nombre,tipo_documento,nro_documento,telefono,correo,clave,imagen) VALUES ('$nombre','$tipo_documento','$num_documento','$telefono','$email','$clave','$imagen')";
            return ejecutarConsulta($sql);
        }

        public function actualizar($id,$nombre,$tipo_documento,$num_documento,$telefono,$email){
            $sql="UPDATE usuario SET nombre ='$nombre', tipo_documento = '$tipo_documento', nro_documento = '$num_documento', telefono = '$telefono', correo = '$email' WHERE id = '$id'";
            return ejecutarConsulta($sql);
        }

        public function actualizarClave($id,$clave){
            $sql="UPDATE usuario SET clave = '$clave' WHERE id = '$id'";
            return ejecutarConsulta($sql);
        }

        public function mostrar($id){
            $sql="SELECT * FROM usuario WHERE id = '$id'";
            return ejecutarConsulta($sql);
        }

        public function confirmarclave($id, $clave){
            $sql="SELECT * FROM usuario WHERE id = '$id' AND clave='$clave'";
            return ejecutarConsulta($sql);
        }

        public function verificar($login,$clave){
            $sql="SELECT * FROM usuario WHERE correo='$login' AND clave='$clave'";
            return ejecutarConsulta($sql);
        }

        public function eliminar($id){
            $sql="DELETE FROM usuario WHERE id = '$id'";
            return ejecutarConsulta($sql);
        }
    }

 ?>
