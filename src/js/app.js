const seriesBtn = document.getElementById('series_btn');
const moviesBtn = document.getElementById('movies_btn');
const inicioBtn = document.getElementById('inicio_btn');

//BOTONES HEADER
inicioBtn.addEventListener('click', (e) => {
    window.location.href = `index.html`;
})

seriesBtn.addEventListener('click', (w) => {
    tvDatos = 'true';
    car.innerHTML = '';
    showDatos(tvDatos);
    showBackground(tvDatos);
});

moviesBtn.addEventListener('click', (c) => {
    tvDatos = 'false';
    car.innerHTML = '';
    showDatos(tvDatos);
    showBackground(tvDatos);
});