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
            $fechaActual = date("Y-m-d H:i:s");
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
        case 'listar':
            $idmovie = $_GET['movieId'] ?? '';

            if (empty($idmovie)) {
                throw new Exception("No se ha podido obtener la dirección deseada");
            }

            $rspta = $comentario->listarComentario($idmovie);
            $comentarios = [];
            if ($rspta) {
                foreach ($rspta as $row) {
                    $comentarios[] = [
                        "nombre" => $row['nombre'],
                        "fecha" => $row['fecha'],
                        "comentario" => $row['comentario']
                    ];
                }
                echo json_encode($comentarios);
            } else {
                throw new Exception("Error al listar comentarios");
            }
            break;
    }

}catch (Exception $e) {
    echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
}
ob_end_flush();
?>