// Función para mostrar notificaciones
export const showMessage = (message, type = 'info', duration = 5000) => {
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle' : type === 'error' ? 'bi-x-circle' : 'bi-info-circle'}"></i>
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    // Cierre manual
    alert.querySelector('.close-btn').addEventListener('click', () => {
        alert.classList.add('hide');
        setTimeout(() => alert.remove(), 300);
    });
    
    // Cierre automático
    if (duration > 0) {
        setTimeout(() => {
            alert.classList.add('hide');
            setTimeout(() => alert.remove(), 300);
        }, duration);
    }
    
    document.body.appendChild(alert);
}

// Función para mostrar loader global
export const showLoader = () => {
    const loader = document.querySelector('.global-loader') || document.createElement('div');
    loader.className = 'global-loader active';
    loader.innerHTML = `
        <div class="loader"></div>
    `;
    document.body.appendChild(loader);
}

// Función para ocultar loader
export const hideLoader = () => {
    const loader = document.querySelector('.global-loader');
    if (loader) loader.remove();
}