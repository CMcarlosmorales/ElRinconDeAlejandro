document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const abrirMenu = document.querySelector(".abrir-menu");
    const cerrarMenu = document.querySelector(".cerrar-menu");
    const nav = document.querySelector(".nav");
    const body = document.body;

    abrirMenu.addEventListener("click", () => {
        nav.classList.add("visible");
        header.classList.add("header--active");
        body.classList.add("nav-open"); 
    });

    cerrarMenu.addEventListener("click", () => {
        nav.classList.remove("visible");
        header.classList.remove("header--active");
        body.classList.remove("nav-open"); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        

        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="bi bi-moon-fill"></i>' 
            : '<i class="bi bi-brightness-high-fill"></i>';
    });
    
    // Inicializar ícono
    const initialTheme = savedTheme || 'dark';
    themeToggle.innerHTML = initialTheme === 'dark' 
        ? '<i class="bi bi-moon-fill"></i>' 
        : '<i class="bi bi-brightness-high-fill"></i>';
});

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.removeAttribute('data-theme');
    }
});
