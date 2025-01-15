<?php 
session_start();
require_once "../models/Usuario.php";

$usuario=new Usuario();

$nombre = isset($_POST["nombreRegister"])? $_POST["nombreRegister"]:"";
$tipo_documento = isset($_POST["tipoRegister"])? $_POST["tipoRegister"]:"";
$nro_documento = isset($_POST["nroRegister"])? $_POST["nroRegister"]:"";
$telefono = isset($_POST["telRegister"])? $_POST["telRegister"]:"";
$email = isset($_POST["emailRegister"])? $_POST["emailRegister"]:"";
$clave = isset($_POST["passwordRegister"])? $_POST["passwordRegister"]:"";
$imagen = isset($_POST['fileRegister']) ? $_POST['fileRegister']:"";

    switch ($_GET["op"]) {

        case 'insertar':

            if(isset($_FILES['fileRegister'])){
                var_dump($_FILES);
                $ext=explode(".", $_FILES["fileRegister"]["name"]);
                if ($_FILES['fileRegister']['type']=="image/jpg" || $_FILES['fileRegister']['type']=="image/jpeg" || $_FILES['fileRegister']['type']=="image/png") {
        
                    $clientId = '38263709c3b0ac8';
                    define('URL', 'https://api.imgur.com/3/image.json');
                    $imgb64 = base64_encode(file_get_contents($_FILES["fileRegister"]["tmp_name"]));
                    $imageFinal = array('image' => $imgb64);
        
                    $timeout = 30;
                    $curl = curl_init();
        
                    curl_setopt($curl, CURLOPT_URL, URL);
                    curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $clientId));
                    curl_setopt($curl, CURLOPT_POST, 1);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $imageFinal);
        
                    $sreResponse = curl_exec($curl);
        
                    if(curl_errno($curl)){
                        $data['Error'] = 'Error: '.curl_error($curl);
                        return false;
                    }
        
                    curl_close($curl);
        
                    $response_data = json_decode($sreResponse, true);
                    echo $response_data['data']['link'];
                    $imagen = $response_data['data']['link'];
                }
            }

            $clavehash=hash("SHA256", $clave);
            $rspta=$usuario->insertar($nombre,$tipo_documento,$nro_documento,$telefono,$email,$clavehash,$imagen);
	        echo $rspta ? "Usuario registrado correctamente" : "No se pudo registrar todos los datos del usuario";
            break;
        case 'verificar':
            $cuenta=$_POST['logina'];
	        $password=$_POST['clavea'];
            $passwordhash = hash("SHA256", $password);             
            $rspta=$usuario->verificar($cuenta,$passwordhash);
            $fetch = $rspta->fetch_object();
            echo $rspta->num_rows > 0 ? true : false;  
            if (isset($fetch)) {
                # Declaramos la variables de sesion
                $_SESSION['id'] = $fetch->id;
                $_SESSION['nombre'] = $fetch->nombre;
                $_SESSION['tipo_documento'] = $fetch->tipo_documento;
                $_SESSION['nro_documento'] = $fetch->nro_documento;
                $_SESSION['telefono'] = $fetch->telefono;
                $_SESSION['correo'] = $fetch->correo;
                $_SESSION['imagen'] = $fetch->imagen;
            }
            break;
    }
?>