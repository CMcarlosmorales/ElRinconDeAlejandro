<?php
//activamos almacenamiento en el buffer
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
    header("Location: ../../index.php");
} else {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <link rel="stylesheet" href="../librerias/bootstrap-4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="../styles/profile.css">
        <title>El Rincón de Alejandro</title>
    </head>

    <body>
        <div class="container mt-5" id="base">
            <div class="profile">
                <div class="profile-header">
                    <img src="<?php echo $_SESSION['imagen']; ?>" alt="profile" class="profile-img">
                    <div class="profile-text-container mt-2">
                        <h1 class="profile-title"><?php echo $_SESSION['nombre']; ?></h1>
                        <p class="profile-email"><?php echo $_SESSION['correo']; ?></p>
                    </div>
                </div>
                <div class="menu">
                    <a href="#" class="menu-link focus" id="miCuentaBtn"><i class="bi bi-person-fill menu-icon mr-3"></i>Cuenta</a>
                    <a href="#" class="menu-link" id="miClaveBtn"><i class="bi bi-person-fill-gear menu-icon mr-3"></i>Cambiar contraseña</a>
                    <a href="#" class="menu-link" id="miComentarioBtn"><i class="bi bi-person-lines-fill menu-icon mr-3"></i>Comentarios realizados</a>
                    <a href="../controllers/usuario.php?op=eliminar" class="menu-link" id="eliminarCuentaBtn"><i class="bi bi-person-x-fill menu-icon mr-3"></i>Eliminar cuenta</a>
                    <a href="../controllers/usuario.php?op=salir" class="menu-link" id="cerrarSesionBtn"><i class="bi bi-person-fill-down menu-icon mr-3"></i>Cerrar sesión</a>
                </div>
            </div>
            <form class="account" id="miCuenta" style="display: block;">
                <div class="account-header">
                    <h1 class="account-title mt-1">Mi cuenta</h1>
                    <div class="btn-container">
                        <button class="btn btn-transparent btn-outline-secondary btnConfig text-white">Cancelar</button>
                        <button class="btn btn-transparent btn-outline-secondary btnConfig text-white" onclick="Actualizar()">Guardar</button>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mt-3 mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input class="form-control" type="text" id="nombreUpgrade" name="nombreUpgrade" placeholder="Ingrese su nombre" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <div class="input-group-prepend">
                                    <select class="form-control" name="tipoUpgrade" id="tipoUpgrade">
                                        <option value="CI">CI</option>
                                        <option value="CI">CIE</option>
                                    </select>
                                </div>
                                <input type="number" class="form-control" name="nroUpgrade" id="nroUpgrade"
                                    placeholder="Numero de identificación" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input type="number" class="form-control" id="telefonoUpgrade" name="telefonoUpgrade" placeholder="Ingrese su teléfono" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input type="text" class="form-control" placeholder="Ingrese su correo electronico" id="correoUpgrade" name="correoUpgrade" aria-label="Recipient's username" aria-describedby="basic-addon2" required>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">@ejemplo.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form class="account w-100" id="miClave" style="display: none;">
                <div class="account-header">
                    <h1 class="account-title mt-1">Cambiar contraseña</h1>
                    <div class="btn-container">
                        <button class="btn btn-transparent btn-outline-secondary btnConfig text-white">Cancelar</button>
                        <button class="btn btn-transparent btn-outline-secondary btnConfig text-white" id="btnClaveGuardar">Guardar</button>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mt-3 mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input class="form-control" id="claveVieja" name="claveVieja" type="password" placeholder="Ingrese su antigua contraseña" required>
                                <div class="input-group-append">
                                    <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarClaveUno"><i
                                            class="bi bi-eye-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input type="password" class="form-control" id="claveNueva" name="claveNueva" placeholder="Ingrese su nueva contraseña" required>
                                <div class="input-group-append">
                                    <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarClaveDos"><i
                                            class="bi bi-eye-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-edit">
                    <div class="container mb-3">
                        <div class="row w-100 mr-0 ml-0">
                            <div class="input-group col">
                                <input type="password" class="form-control" id="claveNuevaConf" name="claveNuevaConf" placeholder="Confirme su nueva contraseña" required>
                                <div class="input-group-append">
                                    <button class="btn bg-light btn-outline-secondary" type="button" id="MostrarClaveTres"><i
                                            class="bi bi-eye-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <script src="../librerias/jquery/jquery-3.2.1.min.js"></script>
        <script src="../librerias/bootstrap-4.4.1/js/bootstrap.min.js"></script>
        <script src="../js/appProfile.js"></script>
    </body>

    </html>
<?php
}
ob_end_flush();
?>