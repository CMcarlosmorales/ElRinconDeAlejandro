<div class="modal-auth" id="modalAuth">
    <div class="modal-content">
        <button class="cerrar-modal" onclick="toggleAuthModal()">&times;</button>
        
        <div class="auth-tabs">
            <button class="tab active" data-tab="login">Iniciar Sesión</button>
            <button class="tab" data-tab="registro">Registrarse</button>
        </div>

        <form class="auth-form active" id="loginForm">
            <div class="input-group">
                <label for="emailLogin">Correo electrónico</label>
                <input type="email" id="emailLogin" name="emailLogin" required>
            </div>
            
            <div class="input-group">
                <label for="passwordLogin">Contraseña</label>
                <input type="password" id="passwordLogin" name="passwordLogin" required>
            </div>
            
            <button type="submit" class="auth-btn">Ingresar</button>
        </form>

        <form class="auth-form" id="registroForm">
            <div class="input-group">
                <label for="nombreRegistro">Nombre completo</label>
                <input type="text" id="nombreRegistro" name="nombreRegistro" required>
            </div>
            
            <div class="input-group">
                <label for="emailRegistro">Correo electrónico</label>
                <input type="email" id="emailRegistro" name="emailRegistro" required>
            </div>
            
            <div class="input-group">
                <label for="passwordRegistro">Contraseña</label>
                <input type="password" id="passwordRegistro" name="passwordRegistro" required>
            </div>
            
            <button type="submit" class="auth-btn">Registrarse</button>
        </form>
    </div>
</div>

