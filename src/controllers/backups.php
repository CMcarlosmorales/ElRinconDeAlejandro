<?php
ob_start();
header('Content-Type: application/json');
session_start();

try {

    $op = $_GET['op'] ?? '';

    switch ($op) {
        case 'backup':
            $host = 'localhost';
            $user = 'root';
            $pass = '';
            $dbname = 'movie';

            try {
                // Establecer conexión a la base de datos
                $conn = new mysqli($host, $user, $pass, $dbname);

                if ($conn->connect_error) {
                    throw new Exception("Conexión fallida: " . $conn->connect_error);
                }

                // Determinar la ruta de destino para el backup
                $backupPath = '';
                if (!empty($_SERVER['HOME'])) {
                    $backupPath = $_SERVER['HOME'] . '/Descargas/backups/';
                } elseif (!empty(getenv('USERPROFILE'))) {
                    $backupPath = getenv('USERPROFILE') . '\\Downloads\\backups\\';
                } else {
                    $backupPath = __DIR__ . '/backups/';
                }

                // Crear directorio si no existe
                if (!file_exists($backupPath)) {
                    if (!mkdir($backupPath, 0755, true)) {
                        throw new Exception("No se pudo crear el directorio de respaldos: " . $backupPath);
                    }
                }

                // Nombre del archivo de respaldo
                $backupFile = $backupPath . $dbname . '_' . date('Y-m-d_H-i-s') . '.sql';

                // Obtener todas las tablas
                $tables = array();
                $result = $conn->query("SHOW TABLES");
                while ($row = $result->fetch_row()) {
                    $tables[] = $row[0];
                }

                $backupContent = "-- Backup generado el " . date('Y-m-d H:i:s') . "\n";
                $backupContent .= "-- Base de datos: " . $dbname . "\n\n";
                $backupContent .= "SET FOREIGN_KEY_CHECKS = 0;\n\n"; // Desactivar checks de claves foráneas

                foreach ($tables as $table) {
                    // Eliminar tabla si existe
                    $backupContent .= "-- --------------------------------------------------------\n";
                    $backupContent .= "-- Eliminar tabla si existe: `$table`\n";
                    $backupContent .= "-- --------------------------------------------------------\n";
                    $backupContent .= "DROP TABLE IF EXISTS `$table`;\n\n";

                    // Estructura de la tabla
                    $backupContent .= "-- --------------------------------------------------------\n";
                    $backupContent .= "-- Crear estructura para tabla `$table`\n";
                    $backupContent .= "-- --------------------------------------------------------\n";
                    $result = $conn->query("SHOW CREATE TABLE `$table`");
                    $row = $result->fetch_row();
                    $backupContent .= $row[1] . ";\n\n";

                    // Datos de la tabla
                    $backupContent .= "-- --------------------------------------------------------\n";
                    $backupContent .= "-- Volcado de datos para tabla `$table`\n";
                    $backupContent .= "-- --------------------------------------------------------\n";

                    $result = $conn->query("SELECT * FROM `$table`");

                    // Solo insertar datos si la tabla no está vacía
                    if ($result->num_rows > 0) {
                        $columns = array();
                        $fieldInfo = $result->fetch_fields();
                        foreach ($fieldInfo as $field) {
                            $columns[] = "`" . $field->name . "`";
                        }

                        $result->data_seek(0); // Volver al inicio del resultset

                        while ($row = $result->fetch_assoc()) {
                            $values = array();
                            foreach ($row as $value) {
                                if (is_null($value)) {
                                    $values[] = 'NULL';
                                } else {
                                    $values[] = "'" . $conn->real_escape_string($value) . "'";
                                }
                            }
                            $backupContent .= "INSERT INTO `$table` (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $values) . ");\n";
                        }
                        $backupContent .= "\n";
                    } else {
                        $backupContent .= "-- La tabla `$table` está vacía\n\n";
                    }
                }

                $backupContent .= "SET FOREIGN_KEY_CHECKS = 1;\n"; // Reactivar checks de claves foráneas

                // Guardar en archivo
                if (file_put_contents($backupFile, $backupContent) === false) {
                    throw new Exception("No se pudo escribir en el archivo de respaldo: " . $backupFile);
                }

                // Cerrar conexión
                $conn->close();

                return $backupFile;
            } catch (Exception $e) {
                // Registrar el error
                error_log("Error en generarRespaldoPHP: " . $e->getMessage());

                // Cerrar conexión si está abierta
                if (isset($conn) && $conn instanceof mysqli) {
                    $conn->close();
                }

                return false;
            }
            break;
        case 'restore':
            // Verificar si se ha subido un archivo
            if (isset($_FILES['backupFile']) && $_FILES['backupFile']['error'] === UPLOAD_ERR_OK) {
                $host = 'localhost';
                $user = 'root';
                $pass = '';
                $dbname = 'movie';

                // Configuración temporal para el archivo subido
                $tempFile = $_FILES['backupFile']['tmp_name'];
                $fileName = $_FILES['backupFile']['name'];

                try {
                    // Validar extensión del archivo
                    $extension = pathinfo($fileName, PATHINFO_EXTENSION);
                    if (strtolower($extension) !== 'sql') {
                        throw new Exception("Solo se permiten archivos con extensión .sql");
                    }

                    // Establecer conexión a la base de datos
                    $conn = new mysqli($host, $user, $pass, $dbname);

                    if ($conn->connect_error) {
                        throw new Exception("Conexión fallida: " . $conn->connect_error);
                    }

                    // Leer el contenido del archivo SQL
                    $sql = file_get_contents($tempFile);

                    if ($sql === false) {
                        throw new Exception("No se pudo leer el archivo de respaldo");
                    }

                    // Desactivar verificación de claves foráneas temporalmente
                    $conn->query("SET FOREIGN_KEY_CHECKS = 0");

                    // Ejecutar las consultas SQL
                    if ($conn->multi_query($sql)) {
                        do {
                            // Vaciar los resultados
                            if ($result = $conn->store_result()) {
                                $result->free();
                            }
                        } while ($conn->more_results() && $conn->next_result());
                    }

                    // Verificar errores de ejecución
                    if ($conn->errno) {
                        throw new Exception("Error durante la restauración: " . $conn->error);
                    }

                    // Reactivar verificación de claves foráneas
                    $conn->query("SET FOREIGN_KEY_CHECKS = 1");
                    $conn->close();

                    // Mensaje de éxito
                    $mensaje = "Base de datos restaurada exitosamente desde: " . htmlspecialchars($fileName);
                    $claseMensaje = "success";
                } catch (Exception $e) {
                    // Cerrar conexión si está abierta
                    if (isset($conn) && $conn instanceof mysqli) {
                        $conn->query("SET FOREIGN_KEY_CHECKS = 1");
                        $conn->close();
                    }

                    $mensaje = "Error al restaurar: " . $e->getMessage();
                    $claseMensaje = "error";
                }
            } else {
                $mensaje = "No se ha seleccionado un archivo válido o hubo un error en la carga";
                $claseMensaje = "error";
            }
            break;
    }
} catch (Exception $e) {
    echo json_encode(["tipo" => "error", "msg" => $e->getMessage()]);
}
ob_end_flush();
