<?php
ob_start();
header('Content-Type: application/json');
session_start();
require_once "../config/Conexion.php";
require_once "../models/Usuario.php";

$usuario = new Usuario();

$nombre = $_POST["nombreRegistro"] ?? "";
$email = $_POST["emailRegistro"] ?? "";
$clave = $_POST["passwordRegistro"] ?? "";


switch ($_GET["op"]) {
    case 'insertar':
        try {

            $correoExistente = $usuario->verificarCorreo($email);
            if ($correoExistente->num_rows > 0) {
                throw new Exception("El correo ya está registrado");
            }

            $claveHash = hash("SHA256", $clave);

            $rspta = $usuario->insertar($nombre, $email, $claveHash);

            echo json_encode(
                $rspta
                    ? ["tipo" => "success", "msg" => "Usuario registrado"]
                    : ["tipo" => "error", "msg" => "Error al registrar"]
            );
        } catch (Exception $e) {
            echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
        }
        break;

    case 'verificar':
        try {
            $password = $_POST["passwordLogin"] ?? "";

            if (empty($email) || empty($password)) {
                throw new Exception("Complete todos los campos");
            }

            $claveHash = hash("SHA256", $password);
            $resultado = $usuario->verificar($email, $claveHash);

            if ($resultado->num_rows > 0) {
                $usuarioData = $resultado->fetch_assoc();
                $_SESSION['usuario'] = [
                    'id' => $usuarioData['id'],
                    'nombre' => $usuarioData['nombre'],
                    'email' => $usuarioData['correo']
                ];
                echo json_encode(["tipo" => "success", "msg" => "Inicio exitoso"]);
            } else {
                throw new Exception("Credenciales incorrectas");
            }
        } catch (Exception $e) {
            echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
        }
        break;
    case 'desactivar':
        $id = $_POST['id'];
        $usuario->desactivar($id);
        echo json_encode(["tipo" => "success", "msg" => "Usuario suspendido"]);
        break;
    case 'activar':
        $id = $_POST['id'];
        $usuario->activar($id);
        echo json_encode(["tipo" => "success", "msg" => "Usuario activado"]);
        break;
    default:
        echo json_encode(["tipo" => "error", "msg" => "Operación no válida"]);
}

ob_end_flush();
