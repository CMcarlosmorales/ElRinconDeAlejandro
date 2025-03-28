async function desactivar(id) {
    const iduser = id;

    const confirmacion = confirm("¿Estas seguro de suspender al usuario?");

    if (confirmacion) {
        try {
            const response = await fetch('../../../src/controllers/usuario.php?op=desactivar', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Indicar el formato
                },
                body: `id=${encodeURIComponent(iduser)}` // Convertir el dato al formato URL-encoded
            });

            if (response.ok) {
                const respuestaServidor = await response.text();
                dato = JSON.parse(respuestaServidor) // Leer la respuesta del servidor
                alert(dato.msg);
                location.reload();
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Hubo un problema al enviar el dato:', error);
        }
    }
};

async function activar(id) {
    const iduser = id;

    const confirmacion = confirm("¿Estas seguro de activar al usuario?");

    if (confirmacion) {
        try {
            const response = await fetch('../../../src/controllers/usuario.php?op=activar', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Indicar el formato
                },
                body: `id=${encodeURIComponent(iduser)}` // Convertir el dato al formato URL-encoded
            });

            if (response.ok) {
                const respuestaServidor = await response.text();
                dato = JSON.parse(respuestaServidor) // Leer la respuesta del servidor
                alert(dato.msg);
                location.reload();
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Hubo un problema al enviar el dato:', error);
        }
    }
};
