<?php
session_start();
if (isset($_SESSION['admin_logged'])) {
    header("Location: dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Admin Login - PELIFLIXX</title>
    <link rel="stylesheet" href="../../../src/styles/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body class="admin-login">
    <div class="admin-login-container">
        <form action="../../../src/controllers/admin.php?op=login" method="POST" class="admin-login-form">
            
            <h1 class="titulo-login"> <i class="bi bi-shield-lock"></i>Acceso Administrador</h1>

            <?php if (isset($_SESSION['admin_error'])): ?>
                <div class="admin-error"><?= $_SESSION['admin_error'] ?></div>
                <?php unset($_SESSION['admin_error']); ?>
            <?php endif; ?>

            <div class="input-group">
                <label for="username"><i class="bi bi-person-badge"></i> Usuario</label>
                <input type="text" id="username" name="username" required autofocus>
            </div>

            <div class="input-group">
                <label for="password"><i class="bi bi-key"></i> Contraseña</label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit" class="auth-btn">
                <i class="bi bi-box-arrow-in-right"></i> Ingresar
            </button>
        </form>
    </div>
</body>

</html>