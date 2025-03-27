function toggleAuthModal() {
    const modal = document.getElementById('modalAuth');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabType = e.target.dataset.tab;
        
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
      
        e.target.classList.add('active');
        document.getElementById(`${tabType}Form`).classList.add('active');
    });
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    
    // Enviar datos al servidor
    fetch('src/controllers/login.php?op=verificar', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
    })
    .then(data => {
        if (data.tipo === "success") {
            // Redirigir o actualizar la interfaz
            window.location.reload(); // Recargar para ver cambios en el header
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    });
});

document.getElementById('registroForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    fetch("src/controllers/login.php?op=insertar", {
        method: "POST",
        body: formData 
    })
    .then(response => {
        if (!response.ok) throw new Error("Error de red");
        return response.json(); 
    })
    .then(data => {
        if (data.tipo === "success") {
            alert(data.msg);
            toggleAuthModal();
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error en el servidor");
    });
});