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