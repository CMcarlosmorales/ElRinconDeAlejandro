<?php
// sections/dashboard.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ruta ABSOLUTA para la conexión
require_once __DIR__ . '/../../../config/Conexion.php';

// Verificar sesión
session_start();
if (!isset($_SESSION['admin_logged'])) {
    die("Acceso no autorizado");
}

// Consulta segura
$stats = [
    'usuarios' => $conexion->query("SELECT COUNT(*) FROM usuario")->fetch_row()[0],
    'comentarios' => $conexion->query("SELECT COUNT(*) FROM comentario")->fetch_row()[0]
];
?>

<section class="admin-section">
    <h1 ><i class="bi bi-speedometer2"></i> Dashboard</h1>
    
    <div class="admin-stats">
        <div class="stat-card">
            <i class="bi bi-people-fill"></i>
            <div>
                <h3><?= $stats['usuarios'] ?></h3>
                <p>Usuarios Registrados</p>
            </div>
        </div>
        
        <div class="stat-card">
            <i class="bi bi-chat-square-text"></i>
            <h3><?= $stats['comentarios'] ?></h3>
            <p>Comentarios Totales</p>
        </div>
        
    </div>
</section>