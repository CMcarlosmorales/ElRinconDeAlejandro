import { showLoader, hideLoader, showMessage } from "./app.js";

export function toggleAuthModal() {
    const modal = document.getElementById('modalAuth');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabType = e.target.dataset.tab;
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        e.target.classList.add('active');
        document.getElementById(`${tabType}Form`)?.classList.add('active');
    });
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoader();
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('src/controllers/login.php?op=verificar', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();

        if (data.tipo === "success") {
            showMessage(data.msg, 'success', 3000);
            setTimeout(() => window.location.reload(), 3000);
        } else {
            showMessage(data.msg, 'error');
        }
    } catch (error) {
        showMessage(error.message || 'Error al iniciar sesión', 'error');
    } finally {
        hideLoader();
    }
});

document.getElementById('registroForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoader();
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch("src/controllers/login.php?op=insertar", {
            method: "POST",
            body: formData 
        });

        if (!response.ok) throw new Error("Error de red");
        const data = await response.json();

        if (data.tipo === "success") {
            showMessage(data.msg, 'success', 3000);
            toggleAuthModal();
            setTimeout(() => window.location.reload(), 3000);
        } else {
            showMessage(data.msg, 'error');
        }
    } catch (error) {
        showMessage(error.message || 'Error en el servidor', 'error');
    } finally {
        hideLoader();
    }
});