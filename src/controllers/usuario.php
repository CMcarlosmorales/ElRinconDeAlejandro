<?php 
session_start();
require_once "../models/Usuario.php";

$usuario=new Usuario();

$id = isset($_SESSION["id"])? $_SESSION["id"]:"";
$nombre = isset($_POST["nombreRegister"])? $_POST["nombreRegister"]:"";
$tipo_documento = isset($_POST["tipoRegister"])? $_POST["tipoRegister"]:"";
$nro_documento = isset($_POST["nroRegister"])? $_POST["nroRegister"]:"";
$telefono = isset($_POST["telRegister"])? $_POST["telRegister"]:"";
$email = isset($_POST["emailRegister"])? $_POST["emailRegister"]:"";
$clave = isset($_POST["passwordRegister"])? $_POST["passwordRegister"]:"";
$imagen = isset($_POST['fileRegister']) ? $_POST['fileRegister']:"";
$nombreUpgrade = isset($_POST['nombreUpgrade']) ? $_POST['nombreUpgrade']:"";
$tipoUpgrade = isset($_POST['tipoUpgrade']) ? $_POST['tipoUpgrade']:"";
$nroUpgrade = isset($_POST['nroUpgrade']) ? $_POST['nroUpgrade']:"";
$telefonoUpgrade = isset($_POST['telefonoUpgrade']) ? $_POST['telefonoUpgrade']:"";
$correoUpgrade = isset($_POST['correoUpgrade']) ? $_POST['correoUpgrade']:"";
$claveVieja = isset($_POST['claveVieja']) ? $_POST['claveVieja']:"";
$claveNueva = isset($_POST['claveNueva']) ? $_POST['claveNueva']:"";
$claveNuevaConf = isset($_POST['claveNuevaConf']) ? $_POST['claveNuevaConf']:"";

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
        case 'actualizar':         
            $rspta=$usuario->actualizar($id,$nombreUpgrade,$tipoUpgrade,$nroUpgrade,$telefonoUpgrade,$correoUpgrade);
            $rsptados=$usuario->mostrar($id);
            $fetch = $rsptados->fetch_object();
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
        case 'actualizarClave':
            $claveVerifConf = hash("SHA256", $claveVieja);
            $rsptaConf=$usuario->confirmarclave($id,$claveVerifConf);
            if($rsptaConf->num_rows > 0){
                $fetchConf = $rsptaConf->fetch_object();
                $claveComparar = $fetchConf->clave;
                $claveNuevaConf = hash("SHA256", $claveNueva);
                echo $claveComparar;
                if($claveNuevaConf != $claveComparar){
                    $rspta=$usuario->actualizarClave($id,$claveNuevaConf);
                    echo $rspta ? true : false;
                }else{
                    echo "La contraseña nueva no puede ser igual a la anterior";
                }
            }else{
                echo "Contraseña actual incorrecta";
            }          
            break;
        case 'mostrar':          
            $rspta=$usuario->mostrar($id);
            $data=Array();
    
            while ($reg=$rspta->fetch_object()) {
                $data[]=array(
                    "id"=>$reg->id,
                    "nombre"=>$reg->nombre,
                    "tipo_documento"=>$reg->tipo_documento,
                    "nro_documento"=>$reg->nro_documento,
                    "telefono"=>$reg->telefono,
                    "correo"=>$reg->correo,
                    "imagen"=>$reg->imagen,
                );
            }
     
            echo json_encode($data); 
            break;
        case 'eliminar':
            $rspta=$usuario->eliminar($id);
            echo $rspta ? "Datos eliminados correctamente" : "No se pudo eliminar los datos";
            session_unset();
            session_destroy();
            header("Location: ../../index.php");
            break;
        case 'salir':
            session_unset();
            session_destroy();
            header("Location: ../../index.php");
            break;
    }
?>