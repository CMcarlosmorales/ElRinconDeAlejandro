const seriesBtn = document.getElementById('series_btn');
const moviesBtn = document.getElementById('movies_btn');
const inicioBtn = document.getElementById('inicio_btn');

//BOTONES HEADER
inicioBtn.addEventListener('click', (e) => {
    window.location.href = `../../index.php`;
})

seriesBtn.addEventListener('click', (w) => {
    w.preventDefault();
});

moviesBtn.addEventListener('click', (c) => {
    c.preventDefault();
});