<?php 
    //incluir la conexion de base de datos
    require "../config/Conexion.php";
    class Usuario{
            private $conexion;
        
            public function __construct() {
                $this->conexion = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
                if ($this->conexion->connect_error) {
                    die("Error de conexión: " . $this->conexion->connect_error);
                }
            }
        
            // Método para insertar usuario (versión simplificada)
            public function insertar($nombre, $correo, $clave) {
                $stmt = $this->conexion->prepare("INSERT INTO usuario (nombre, correo, clave) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $nombre, $correo, $clave);
                return $stmt->execute();
            }
        
            // Verificar si el correo ya existe
            public function verificarCorreo($correo) {
                $stmt = $this->conexion->prepare("SELECT id FROM usuario WHERE correo = ?");
                $stmt->bind_param("s", $correo);
                $stmt->execute();
                return $stmt->get_result();
            }
        
            // Verificar credenciales de login
            public function verificar($correo, $clave) {
                $stmt = $this->conexion->prepare("SELECT id, nombre, correo FROM usuario WHERE correo = ? AND clave = ?");
                $stmt->bind_param("ss", $correo, $clave);
                $stmt->execute();
                return $stmt->get_result();
            }
        }

 ?>
