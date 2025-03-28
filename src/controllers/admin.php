<?php
session_start();
require_once '../config/Conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $_SESSION['admin_error'] = "Todos los campos son obligatorios";
        header("Location: /src/pages/admin/login.php");
        exit;
    }

    $stmt = $conexion->prepare("SELECT id, password_hash FROM admin WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        if (password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_logged'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            header("Location: /src/pages/admin/dashboard.php"); 
            exit;
        }
    }
    
    $_SESSION['admin_error'] = "Credenciales incorrectas";
    header("Location: ../pages/admin/login.php"); 
}

header("Location: ../pages/admin/login.php"); 
exit;