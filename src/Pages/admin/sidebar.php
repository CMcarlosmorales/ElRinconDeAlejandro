<?php
if (!isset($_SESSION['admin_logged'])) {
    header("Location: login.php");
    exit;
}
?>

<nav class="admin-sidebar">
    
    <div class="sidebar-header">
        <h2 class="logo-admin">
            <i class="bi bi-shield-lock"></i> PELIFLIXX ADMIN
        </h2>
    </div>

    <ul class="admin-nav">
        <li>
            <a href="#"
                class="admin-nav-link active"
                data-section="dashboard">
                <i class="bi bi-speedometer2"></i> Dashboard
            </a>
        </li>
        <li>
            <a href="#"
                class="admin-nav-link"
                data-section="usuarios">
                <i class="bi bi-people"></i> Usuarios
            </a>
        </li>
        <li>
            <a href="#"
                class="admin-nav-link"
                data-section="comentarios">
                <i class="bi bi-chat-dots"></i> Comentarios
            </a>
        </li>
        <li class="nav-divider"></li>
        <li>
            <a href="#"
                class="admin-nav-link text-danger"
                id="logoutButton">
                <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
            </a>
        </li>
    </ul>
</nav>