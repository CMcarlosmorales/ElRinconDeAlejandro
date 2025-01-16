<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../styles/profile.css">
    <title>El Rincón de Alejandro</title>
</head>
<body>
    <div class="container">
        <div class="profile">
            <div class="profile-header">
                <img src="<?php echo $_SESSION['imagen']; ?>" alt="profile" class="profile-img">
                <div class="profile-text-container">
                    <h1 class="profile-title"><?php echo $_SESSION['nombre']; ?></h1>
                    <p class="profile-email"><?php echo $_SESSION['correo']; ?></p>
                </div>
            </div>
            <div class="menu">
                <a href="" class="menu-link focus"><i class="bi bi-person-fill menu-icon"></i> Cuenta</a>
                <a href="" class="menu-link"><i class="bi bi-person-fill-gear menu-icon"></i> Cambiar contraseña</a>
                <a href="" class="menu-link"><i class="bi bi-person-lines-fill menu-icon"></i> Comentarios realizados</a>
                <a href="" class="menu-link"><i class="bi bi-person-x-fill menu-icon"></i> Eliminar cuenta</a>
                <a href="" class="menu-link"><i class="bi bi-person-fill-down menu-icon"></i> Cerrar sesión</a>
            </div>
        </div>
        <form class="account">
            <div class="account-header">
                <h1 class="account-title">Account Settings</h1>
                <div class="btn-container">
                    <button class="btn-cancel">Cancelar</button>
                    <button class="btn-save">Guardar</button>
                </div>
            </div>
            <div class="account-edit">
                <div class="input-container">
                    <label>Primer nombre</label>
                    <input type="text" placeholder="Ingrese su nombre">
                </div>
                <div class="input-container">
                    <label>Documento de identidad</label>
                    <div class="inline-elements">
                        <select class="" name="" id="" style="height: 37px;">
                            <option value="CI">CI</option>
                            <option value="CIE">CIE</option>
                        </select>
                        <input type="text" placeholder="Ingrese su numero de identificación" style="width: 100%;">
                    </div>             
                </div>
            </div>
            <div class="account-edit">
                <div class="input-container">
                    <label>Teléfono</label>
                    <input type="text" placeholder="Ingrese su teléfono">
                </div>
                <div class="input-container">
                    <label>Correo electrónico</label>
                    <input type="text" placeholder="Ingrese su correo electrónico">
                </div>
            </div>
        </form>
    </div>
</body>
</html>