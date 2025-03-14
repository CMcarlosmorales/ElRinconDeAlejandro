<?php
    session_start();
    require_once '../models/Usuario.php';

    $usuario = new Usuario;

    $emailLogin = isset($_POST["emailLogin"]) ? $_POST["emailLogin"] : "";
    $passwordLogin = isset($_POST["passwordLogin"]) ? $_POST["passwordLogin"] : "";
    $nombreRegistro = isset($_POST["nombreRegistro"]) ? $_POST["nombreRegistro"] : "";
    $emailRegistro = isset($_POST["emailRegistro"]) ? $_POST["emailRegistro"] : "";
    $passwordRegistro = isset($_POST["passwordRegistro"]) ? $_POST["passwordRegistro"] : "";

    switch($_GET["op"]){
        case 'insertar':
            $rspta = $usuario->insertar($nombreRegistro, $emailRegistro, $passwordRegistro);
            echo json_encode($rspta ? array('tipo' => 'success', 'msg' => 'Usuario ingresado correctamente') : array('tipo' => 'failure', 'msg' => 'Error al intentar crear el usuario'));
            break;
    }
?>