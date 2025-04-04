<?php
// sections/dashboard.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ruta ABSOLUTA para la conexión
require_once __DIR__ . '/../../../config/Conexion.php';

// Verificar sesión
session_start();
if (!isset($_SESSION['admin_logged'])) {
    die("Acceso no autorizado");
}

// Consulta segura
$stats = [
    'usuarios' => $conexion->query("SELECT COUNT(*) FROM usuario")->fetch_row()[0],
    'comentarios' => $conexion->query("SELECT COUNT(*) FROM comentario")->fetch_row()[0]
];
?>

<section class="admin-section">
    <h1><i class="bi bi-speedometer2"></i> Dashboard</h1>

    <div class="admin-stats">
        <div class="stat-card">
            <i class="bi bi-people-fill"></i>
            <div>
                <h3><?= $stats['usuarios'] ?></h3>
                <p>Usuarios Registrados</p>
            </div>
        </div>

        <div class="stat-card">
            <i class="bi bi-chat-square-text"></i>
            <h3><?= $stats['comentarios'] ?></h3>
            <p>Comentarios Totales</p>
        </div>

        <div class="stat-card" style="position: relative; overflow: visible;"> 
            <div class="dropdown-container" style="position: relative;">
                <button class="backup-btn" id="dbActionsBtn" style="width: 100%;">
                    <i class="bi bi-database-check"></i>
                    Opciones BD
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-options" id="dbActionsMenu">
                    <button class="option-btn" id="backupBtn" onclick="generarRespaldoDB()">
                        <i class="bi bi-save"></i> Respaldo
                    </button>
                    <button class="option-btn" id="restoreBtn">
                        <i class="bi bi-arrow-counterclockwise"></i> Restaurar
                    </button>
                </div>
            </div>
            <p>Administrar base de datos</p>
        </div>

        <!-- Modal para restauración -->
        <div id="restoreModal" class="modal-auth">
            <div class="modal-content">
                <button class="cerrar-modal" id="closeRestoreModal">×</button>
                <h3>Restaurar base de datos</h3>
                <div class="input-group">
                    <label for="backupFileInput">Seleccionar archivo de respaldo (.sql)</label>
                    <input type="file" id="backupFileInput" class="input-serch" accept=".sql">
                </div>
                <p class="warning">¡Advertencia! Esto sobrescribirá los datos actuales.</p>
                <button class="auth-btn" id="confirmRestoreBtn" onclick="restoreDB()">Restaurar</button>
            </div>
        </div>
    </div>
</section>
<style>
    /* Contenedor del dropdown */
    .dropdown-container {
        position: relative;
        width: 65%;
        margin: 0 auto 1rem;
    }

    /* Opciones del dropdown */
    .dropdown-options {
        display: none; /* Oculto por defecto */
        position: absolute; /* Posición absoluta para que flote */
        top: 100%; /* Aparece justo debajo del botón */
        left: 0; /* Alineado al lado izquierdo del contenedor */
        width: 100%; /* Ocupa todo el ancho del contenedor */
        background: var(--color-primary);
        border-radius: 0.5rem;
        overflow: hidden;
        z-index: 1000; /* Asegura que esté por encima de otros elementos */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* Botones de opciones */
    .option-btn {
        width: 100%;
        padding: 0.85rem;
        background: var(--color-primary);
        border: none;
        color: var(--color-text-primary);
        text-align: left;
        font-family: var(--font);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .option-btn:hover {
        background: var(--color-input);
    }

    .option-btn i {
        font-size: 1.2rem;
    }

    /* Mensaje de advertencia */
    .warning {
        color: var(--red-primary);
        font-size: 0.9rem;
        margin: 1rem 0;
        padding: 0.75rem;
        background: rgba(239, 68, 68, 0.1);
        border-radius: 0.5rem;
        border-left: 3px solid var(--red-primary);
    }

    /* Ajustes para móviles */
    @media (max-width: 768px) {
        .dropdown-container {
            width: 90%;
        }

        .dropdown-options {
            position: static;
            margin-top: 0.5rem;
        }

        .backup-btn {
            width: 100%;
        }
    }
</style>