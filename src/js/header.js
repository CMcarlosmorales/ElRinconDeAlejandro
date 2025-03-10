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
