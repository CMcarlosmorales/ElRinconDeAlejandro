<?php 
    //incluir la conexion de base de datos
    require "../config/Conexion.php";
    class Usuario{

        //implementamos nuestro constructor
        public function __construct(){

        }

        //metodo insertar regiustro
        public function insertar($nombre,$tipo_documento,$num_documento,$telefono,$email,$clave,){
            $sql="INSERT INTO usuario (nombre,tipo_documento,nro_documento,telefono,correo,clave) VALUES ('$nombre','$tipo_documento','$num_documento','$telefono','$email','$clave')";
            return ejecutarConsulta($sql);
        }

        public function verificar($login,$clave){
            $sql="SELECT * FROM usuario WHERE correo='$login' AND clave='$clave'";
            return ejecutarConsulta($sql);
        }
    }

 ?>
