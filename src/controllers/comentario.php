<?php
ob_start();
header('Content-Type: application/json');
session_start();

require_once '../models/Comentario.php';

try{
    $comentario = new Comentario();

    $op = $_GET['op'] ?? '';

    switch ($op) {
        case 'insertar':
            $idusuario = $_SESSION['usuario']['id'] ?? '';
            $idmovie = $_POST['movie'] ?? '';
            date_default_timezone_set("America/Caracas");
            $fechaActual = date("Y-m-d");
            $comentarioArea = $_POST['comentarioArea'] ?? '';

            if (empty($idusuario) || empty($idmovie) || empty($fechaActual) || empty($fechaActual)) {
                throw new Exception("Todos los campos son obligatorios");
            }

            if ($comentario->insertarComentario($idusuario, $idmovie, $comentarioArea, $fechaActual)) {
                echo json_encode(["tipo" => "success", "msg" => "Comentario publicado"]);
            } else {
                throw new Exception("Error al publicar comentario");
            }
            break;
    }

}catch (Exception $e) {
    echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
}
ob_end_flush();
?>