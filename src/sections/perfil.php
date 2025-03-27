<?php
session_start();
?>
<section class="profile-section">
    <div class="profile-header">
        <h2><i class="bi bi-person-circle"></i> Mi Perfil</h2>

    </div>

    <div class="profile-grid">
        <!-- Sección de Información Personal -->
        <form class="profile-form" action="../controllers/usuario.php?op=actualizar" method="POST">
            <div class="form-section">
                <h3><i class="bi bi-pencil-square"></i> Información Personal</h3>

                <div class="input-group">
                    <label for="nombre"><i class="bi bi-person"></i> Nombre completo</label>
                    <input type="text" id="nombre" name="nombre"
                        value="<?= htmlspecialchars($_SESSION['usuario']['nombre']) ?>" required>
                </div>

                <div class="input-group">
                    <label for="email"><i class="bi bi-envelope"></i> Correo electrónico</label>
                    <input type="email" id="email" name="email"
                        value="<?= htmlspecialchars($_SESSION['usuario']['correo']) ?>" required>
                </div>


                <button type="submit" class="auth-btn">
                    <i class="bi bi-save"></i> Guardar Cambios
                </button>
            </div>
        </form>

        <!-- Sección de Seguridad -->
        <form class="security-form" action="../controllers/usuario.php?op=actualizarClave" method="POST">
            <div class="form-section">
                <h3><i class="bi bi-shield-lock"></i> Seguridad</h3>

                <div class="input-group">
                    <label for="claveActual"><i class="bi bi-key"></i> Contraseña actual</label>
                    <input type="password" id="claveActual" name="claveActual" required>
                </div>

                <div class="input-group">
                    <label for="nuevaClave"><i class="bi bi-key-fill"></i> Nueva contraseña</label>
                    <input type="password" id="nuevaClave" name="nuevaClave" required>
                </div>

                <div class="input-group">
                    <label for="confirmarClave"><i class="bi bi-key-fill"></i> Confirmar nueva contraseña</label>
                    <input type="password" id="confirmarClave" name="confirmarClave" required>
                </div>

                <button type="submit" class="auth-btn">
                    <i class="bi bi-lock"></i> Cambiar Contraseña
                </button>
            </div>
        </form>
    </div>
</section>