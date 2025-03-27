<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "./src/config/global.php";

$conexion = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, 3306);

// Verificar si hay error de conexión
if ($conexion->connect_error) {
    die("❌ Error de conexión: " . $conexion->connect_error);
} else {
    echo "✅ Conexión exitosa a la base de datos.";
}

// Cerrar conexión
$conexion->close();
?>
