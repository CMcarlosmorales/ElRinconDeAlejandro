<?php
ob_start();
header('Content-Type: application/json');
session_start();

require_once '../models/Admin.php';

try{
    $admin = new Admin();
    $op = $_GET['op'] ?? '';

    switch($op){
        case 'login':
            $username = trim($_POST['username']);
            $password = trim($_POST['password']);

            if (empty($username) || empty($password)) {
                $_SESSION['admin_error'] = "Todos los campos son obligatorios";
                header("Location: /src/pages/admin/login.php");
                exit;
            }

            $rspta = $admin->login($username);

            if($rspta->num_rows === 1){
                $admin = $rspta->fetch_assoc();
                if(password_verify($password, $admin['password_hash'])){
                    $_SESSION['admin_logged'] = true;
                    $_SESSION['admin_id'] = $admin['id'];
                    header("Location: ../pages/admin/dashboard.php"); 
                    exit;
                }
            }

            $_SESSION['admin_error'] = "Credenciales incorrectas";
            header("Location: ./pages/admin/login.php"); 
            break;
    }
}catch (Exception $e) {
    echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
}
ob_end_flush();
?>