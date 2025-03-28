<?php

require_once __DIR__ . '/../../../config/Conexion.php';

session_start();
if (!isset($_SESSION['admin_logged'])) {
    die("Acceso no autorizado");
}

$comentarios = $conexion->query("
    SELECT c.*, u.nombre AS usuario 
    FROM comentario c
    LEFT JOIN usuario u ON c.idusuario = u.id
    ORDER BY c.fecha DESC
");


if (!$comentarios) {
    die("Error en la consulta: " . $conexion->error);
}
?>

<section class="admin-section">
    <h1><i class="bi bi-chat-dots"></i> Comentarios Recientes</h1>

    <div class="comments-grid">
        <?php 
        
        while ($comentario = $comentarios->fetch_assoc()): 
            
            $fecha = date("d/m/Y", strtotime($comentario['fecha']));
        ?>
            <div class="comment-card" data-movie-id="<?= $comentario['idmovie'] ?>">
                <div class="comment-header">
                    <i class="bi bi-person-circle"></i>
                    <div>
                        <h4><?= htmlspecialchars($comentario['usuario'] ?? 'Anónimo') ?></h4>
                        <small>ID Película: <?= $comentario['idmovie'] ?></small>
                    </div>
                    <span class="comment-date"><?= $fecha ?></span>
                </div>
                <p class="comment-text"><?= htmlspecialchars($comentario['comentario']) ?></p>
            </div>
        <?php endwhile; ?>
    </div>
</section>