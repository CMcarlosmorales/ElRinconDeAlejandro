<?php
session_start();
require_once __DIR__ . '/../../config/Conexion.php'; 

if (!isset($_SESSION['admin_logged'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel Admin - PELIFLIXX</title>
    <link rel="stylesheet" href="../../../src/styles/index.css"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
    <div class="admin-container">

        <?php include __DIR__ . '/sidebar.php'; ?> 
    

        <main class="admin-main">
        
        </main>
    </div>

   
    <script type="module" src="../../../src/js/navigationAdmin.js"></script>
    <script type="module" src="../../../src/js/appAdmin.js"></script>
    <script type="module" src="../../js/app.js"></script>
</body>
</html>