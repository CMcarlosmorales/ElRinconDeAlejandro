import { showLoader, showMessage, hideLoader } from "./app.js";

export async function desactivar(id) {
    const iduser = id;
    const confirmacion = confirm("¿Estás seguro de suspender al usuario?");

    if (confirmacion) {
        showLoader(); // Mostrar loader al iniciar
        try {
            const response = await fetch('../../../src/controllers/usuario.php?op=desactivar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${encodeURIComponent(iduser)}`
            });

            const data = await response.text();
            const dato = JSON.parse(data);
            
            if (response.ok) {
                showMessage(dato.msg, 'success', 3000);
                setTimeout(() => location.reload(), 3000); // Recargar después de 3 segundos
            } else {
                showMessage(dato.msg || 'Error al desactivar usuario', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión con el servidor', 'error');
        } finally {
            hideLoader(); // Ocultar loader al finalizar
        }
    }
};

export async function activar(id) {
    const iduser = id;
    const confirmacion = confirm("¿Estás seguro de activar al usuario?");

    if (confirmacion) {
        showLoader(); // Mostrar loader al iniciar
        try {
            const response = await fetch('../../../src/controllers/usuario.php?op=activar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${encodeURIComponent(iduser)}`
            });

            const data = await response.text();
            const dato = JSON.parse(data);
            
            if (response.ok) {
                showMessage(dato.msg, 'success', 3000);
                setTimeout(() => location.reload(), 3000); // Recargar después de 3 segundos
            } else {
                showMessage(dato.msg || 'Error al activar usuario', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión con el servidor', 'error');
        } finally {
            hideLoader(); // Ocultar loader al finalizar
        }
    }
};

export async function eliminarComentario(id) {
    const iduser = id;
    const confirmacion = confirm("¿Estás seguro de eliminar el comentario?");

    if (confirmacion) {
        showLoader(); // Mostrar loader al iniciar
        try {
            const response = await fetch('../../../src/controllers/comentario.php?op=eliminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `idcomentario=${encodeURIComponent(iduser)}`
            });

            const data = await response.text();
            const dato = JSON.parse(data);
            
            if (response.ok) {
                showMessage(dato.msg, 'success', 3000);
                setTimeout(() => location.reload(), 3000); // Recargar después de 3 segundos
            } else {
                showMessage(dato.msg || 'Error al eliminar el comentario', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión con el servidor', 'error');
        } finally {
            hideLoader(); // Ocultar loader al finalizar
        }
    }
};

export async function generarRespaldoDB() {
        const response = await fetch('../../../src/controllers/backups.php?op=backup', {
            method: 'POST'
        });

        if (response.ok) {
            showMessage("Respaldo de BD realizado", 'success', 3000);// Recargar después de 3 segundos
        } else {
            showMessage('Error al desactivar usuario', 'error');
        }
}

export async function restoreDB() {
    const confirmacion = confirm("¿Estás seguro que deseas sobreescribir la base de datos?");

    if(confirmacion){
        const backupFileInput = document.getElementById('backupFileInput');

        // Verifica si se seleccionó un archivo
        if (!backupFileInput.files.length) {
            showMessage('Por favor selecciona un archivo de respaldo', 'error');
            return;
        }

        // Crea un objeto FormData y agrega el archivo
        const formData = new FormData();
        formData.append('backupFile', backupFileInput.files[0]);

        try {
            // Realiza la solicitud fetch con el archivo
            const response = await fetch('../../../src/controllers/backups.php?op=restore', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('Restauración de BD realizada con éxito', 'success', 3000);
                setTimeout(() => location.reload(), 3000); // Recargar después de 3 segundos
            } else {
                showMessage('Error al restaurar la base de datos', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión con el servidor', 'error');
        }
    }
}

window.desactivar = desactivar;
window.activar = activar;
window.eliminarComentario = eliminarComentario;
window.generarRespaldoDB = generarRespaldoDB;
window.restoreDB = restoreDB;