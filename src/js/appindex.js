let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];

let cards = document.getElementById('idcards');

let btnExpandirP = document.getElementById('btnExpandirPeliculas');
let btnExpandirS = document.getElementById('btnExpandirSeries');
let btnReducirP = document.getElementById('btnReducirPeliculas');
let btnReducirS = document.getElementById('btnReducirSeries');

const cajaPeliculas = document.querySelector('#main_peliculas');
const cajaSeries = document.querySelector('#main_series');

//BOTONES FLECHAS

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
})

right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
})

//BOTONES EXPANIR REDUCIR

btnExpandirP.addEventListener('click', (b) => {
    b.preventDefault();   
    cajaPeliculas.style.height = 'auto'; 
    btnExpandirP.style.display = 'none';
    btnReducirP.style.display = 'inline-block';
});

btnExpandirS.addEventListener('click', (v) => {
    v.preventDefault();
    cajaSeries.style.height = `auto`;
    btnExpandirS.style.display = 'none';
    btnReducirS.style.display = 'inline-block'; 
});

btnReducirP.addEventListener('click', (n) => {
    n.preventDefault();   
    cajaPeliculas.style.height = '978px'; 
    btnExpandirP.style.display = 'inline-block';
    btnReducirP.style.display = 'none';
});

btnReducirS.addEventListener('click', (m) => {
    m.preventDefault();
    cajaSeries.style.height = `978px`;
    btnExpandirS.style.display = 'inline-block';
    btnReducirS.style.display = 'none'; 
});