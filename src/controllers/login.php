<?php
ob_start();
header('Content-Type: application/json');
session_start();

require_once "../models/Usuario.php";

try {
    $usuario = new Usuario();

    $op = $_GET['op'] ?? '';

    switch ($op) {
        case 'insertar':
            $nombre = $_POST['nombreRegistro'] ?? '';
            $email = $_POST['emailRegistro'] ?? '';
            $password = $_POST['passwordRegistro'] ?? '';
        
            if (empty($nombre) || empty($email) || empty($password)) {
                throw new Exception("Todos los campos son obligatorios");
            }
        
            if ($usuario->verificarCorreo($email)->num_rows > 0) {
                throw new Exception("El correo ya está registrado");
            }
        
            $claveHash = hash('sha256', $password);
        
            if ($usuario->insertar($nombre, $email, $claveHash)) {
                // Obtener los datos del nuevo usuario registrado
                $nuevoUsuario = $usuario->obtenerPorEmail($email); // Necesitarás implementar este método
                
                // Crear la sesión
                $_SESSION['usuario'] = [
                    'id' => $nuevoUsuario['id'],
                    'nombre' => $nuevoUsuario['nombre'],
                    'correo' => $nuevoUsuario['correo']
                ];
        
                echo json_encode([
                    "tipo" => "success", 
                    "msg" => "Registro exitoso",
                    "usuario" => [
                        "nombre" => $nuevoUsuario['nombre']
                    ]
                ]);
            } else {
                throw new Exception("Error al registrar el usuario");
            }
            break;
        case 'verificar':
            $email = $_POST['emailLogin'] ?? '';
            $password = $_POST['passwordLogin'] ?? '';

            if (empty($email) || empty($password)) {
                throw new Exception("Complete todos los campos");
            }

            $claveHash = hash('sha256', $password);
            $resultado = $usuario->verificar($email, $claveHash);

            if ($resultado->num_rows > 0) {
                $usuarioData = $resultado->fetch_assoc();

                $_SESSION['usuario'] = [
                    'id' => $usuarioData['id'],
                    'nombre' => $usuarioData['nombre'],
                    'correo' => $usuarioData['correo'],
                ];

                echo json_encode([
                    "tipo" => "success",
                    "msg" => "Inicio exitoso",
                    "usuario" => [
                        "nombre" => $usuarioData['nombre'],
                    ]
                ]);
            } else {
                throw new Exception("Credenciales incorrectas");
            }
            break;
        case 'salir':
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(
                    session_name(),
                    '',
                    time() - 42000,
                    $params["path"],
                    $params["domain"],
                    $params["secure"],
                    $params["httponly"]
                );
            }

            session_destroy();

            header("Location: ../../index.php");
            exit;
            break;
        default:
            throw new Exception("Operación no válida");
    }
} catch (Exception $e) {
    echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
}

ob_end_flush();
