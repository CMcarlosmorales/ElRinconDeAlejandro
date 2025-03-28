<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../../config/Conexion.php';

session_start();
if (!isset($_SESSION['admin_logged'])) {
    header("Location: login.php");
    exit;
}

// Paginación
$pagina = filter_input(INPUT_GET, 'pagina', FILTER_VALIDATE_INT, [
    'options' => ['default' => 1, 'min_range' => 1]
]);
$porPagina = 10;
$offset = ($pagina - 1) * $porPagina;

try {
    // Consulta principal con SQL_CALC_FOUND_ROWS
    $stmt = $conexion->prepare("
        SELECT SQL_CALC_FOUND_ROWS 
            id, nombre, correo, is_banned, deleted_at 
        FROM usuario 
        ORDER BY id DESC 
        LIMIT ? OFFSET ?
    ");
    $stmt->bind_param("ii", $porPagina, $offset);
    $stmt->execute();
    $usuarios = $stmt->get_result();

    // Total de registros
    $totalQuery = $conexion->query("SELECT FOUND_ROWS()");
    $totalUsuarios = $totalQuery->fetch_row()[0];
} catch (Exception $e) {
    die("Error en la consulta: " . $e->getMessage());
}
?>

<section class="admin-section">
    <div class="section-header">
        <h1><i class="bi bi-people"></i> Gestión de Usuarios</h1>
        <div class="search-box">
            <input type="text" id="buscarUsuario" placeholder="Buscar usuario...">
            <i class="bi bi-search"></i>
        </div>
    </div>

    <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($usuario = $usuarios->fetch_assoc()): ?>
                <tr>
                    <td><?= $usuario['id'] ?></td>
                    <td><?= htmlspecialchars($usuario['nombre']) ?></td>
                    <td><?= htmlspecialchars($usuario['correo']) ?></td>
                    <td>
                        <?php if ($usuario['deleted_at']): ?>
                            <span class="status status--deleted">
                                <i class="bi bi-trash"></i> Eliminado
                            </span>
                        <?php elseif ($usuario['is_banned']): ?>
                            <span class="status status--banned">
                                <i class="bi bi-slash-circle"></i> Baneado
                            </span>
                        <?php else: ?>
                            <span class="status status--active">
                                <i class="bi bi-check-circle"></i> Activo
                            </span>
                        <?php endif; ?>
                    </td>
                    <td class="actions">
                        <button class="btn btn--ban <?= $usuario['is_banned'] ? 'btn--unban' : '' ?>"
                            data-id="<?= $usuario['id'] ?>"
                            title="<?= $usuario['is_banned'] ? 'Reactivar usuario' : 'Suspender usuario' ?>">
                            <i class="bi <?= $usuario['is_banned'] ? 'bi-unlock' : 'bi-lock' ?>"></i>
                            <?= $usuario['is_banned'] ? 'Desbanear' : 'Banear' ?>
                        </button>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</section>