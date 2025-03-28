<?php
    require '../config/Conexion.php';
    class Admin{
        public function __construct(){
            
        }

        public function login($user){
            $sql = "SELECT id, password_hash FROM admin WHERE username = '$user'";
            return ejecutarConsulta($sql);
        }
    }
?>