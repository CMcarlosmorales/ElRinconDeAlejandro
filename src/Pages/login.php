<?php
//activamos almacenamiento en el buffer
ob_start();
session_start();
if (isset($_SESSION['nombre'])) {
    header("Location: ../../index.php");
} else {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>El Rincón de Alejandro | Iniciar Sesión</title>
        <link rel="stylesheet" href="../styles/login.css">
        <link rel="stylesheet" href="../librerias/bootstrap-4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    </head>

    <body>
        <div class="container d-flex justify-content-center align-items-center full-height">
            <div class="login_box" id="login_box" style="display: block;">
                <div class="login_header">
                    <header>Bienvenido!!</header>
                    <p>Ingresa tus datos para iniciar sesión</p>
                </div>
                <form id="loginForm">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Correo electronico"
                            aria-label="Recipient's username" aria-describedby="basic-addon2" id="emailLogin">
                        <div class="input-group-append">
                            <span class="input-group-text bg-light text-secondary" id="basic-addon2">@ejemplo.com</span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Contraseña" aria-label="Recipient's username"
                            aria-describedby="button-addon2" id="passwordLogin">
                        <div class="input-group-append">
                            <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarLogin"><i
                                    class="bi bi-eye-fill"></i></button>
                        </div>
                    </div>
                    <div class="forgot">
                        <section>
                            <a href="#" class="forgot_link" id="recoverLogin">¿Oldivó su contraseña?</a>
                        </section>
                    </div>
                    <div class="input-group">
                        <button class="input_submit w-100 btn text-white" id="ingresarLogin">Ingresar</button>
                    </div>
                </form>
                <hr>
                <div class="input-group mb-3">
                    <button class="input_submit btn d-flex justify-content-center w-100 text-white">
                        <i class="bi bi-google mr-2"></i> Ingresar con Google
                    </button>
                </div>
                <div class="input-group">
                    <p class="text-white">¿No tienes una cuenta? <a href="#" class="text-white"
                            id="registerLogin">Registrate</a></p>
                </div>
            </div>
            <div class="register_box" id="register_box" style="display: none;">
                <div class="login_header">
                    <header>Bienvenido!!</header>
                    <p>Ingresa tus datos para registrarte</p>
                </div>
                <form class="form_class" id="registerForm" enctype="multipart/form-data">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" name="nombreRegister" id="nombreRegister"
                            placeholder="Ingrese su nombre" required>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <select class="form-control" name="tipoRegister" id="tipoRegister">
                                <option value="CI">CI</option>
                                <option value="CI">CIE</option>
                            </select>
                        </div>
                        <input type="number" class="form-control" name="nroRegister" id="nroRegister"
                            placeholder="Numero de identificación" required>
                    </div>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" name="telRegister" id="telRegister"
                            placeholder="Numero de teléfono" required>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" name="emailRegister" id="emailRegister"
                            placeholder="Correo electronico" required>
                    </div>
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon01"
                                name="fileRegister" id="fileRegister" required>
                            <label class="custom-file-label" for="fileRegister">Elige tu foto de usuario</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="passwordRegister" id="passwordRegister"
                            placeholder="Contraseña" required>
                        <div class="input-group-append">
                            <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarRegister"><i
                                    class="bi bi-eye-fill"></i></button>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="conPasswordRegister" id="conPasswordRegister"
                            placeholder="Confirmar contraseña" required>
                        <div class="input-group-append">
                            <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarRegisterCon"><i
                                    class="bi bi-eye-fill"></i></button>
                        </div>
                    </div>
                    <div class="input-group">
                        <button class="input_submit w-100 btn text-white">Registrarse</button>
                    </div>
                </form>
                <hr>
                <div class="input-group mb-3">
                    <button class="input_submit btn d-flex justify-content-center w-100 text-white">
                        <i class="bi bi-google mr-2"></i> Registrarse con Google
                    </button>
                </div>
                <div class="input-group">
                    <p class="text-white">¿Ya tienes una cuenta? <a href="#" class="text-white" id="loginRegister">Inicia sesión</a></p>
                </div>
            </div>
            <div class="recover_box" id="recover_box" style="display: none;">
                <div class="login_header">
                    <header>Bienvenido!!</header>
                    <p>Ingresa tu correo para recuperar tu contraseña</p>
                </div>
                <form action="">
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" id="emailRecover" placeholder="Ingrese su correo electronico" required>
                    </div>
                    <div class="input-group mb-3">
                        <button class="input_submit w-100 btn text-white">Enviar</button>
                    </div>
                </form>
                <div class="input-group">
                    <p class="text-white">¿Desea iniciar sesión? <a href="#" class="text-white" id="loginRecover">Regresar</a></p>
                </div>
            </div>
        </div>


        <script src="../librerias/jquery/jquery-3.2.1.min.js"></script>
        <script src="../js/applogin.js"></script>
        <script src="../librerias/bootstrap-4.4.1/js/bootstrap.min.js"></script>
    </body>

    </html>
<?php
}
ob_end_flush();
?>