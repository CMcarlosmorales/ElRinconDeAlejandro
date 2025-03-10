const API_KEY = 'api_key=65df7f7394c219558c55c1f30d4b6f45';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BUSCAR_URL = `${BASE_URL}/search/movie?${API_KEY}`;

const generos = [
    { id: 28, name: 'Acción' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animación' },
    { id: 35, name: 'Comedia' },
    { id: 80, name: 'Crimen' },
    { id: 99, name: 'Documental' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Familia' },
    { id: 14, name: 'Fantasía' },
    { id: 36, name: 'Historia' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Misterio' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ciencia ficción' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Suspenso' },
    { id: 10752, name: 'Bélica' },
    { id: 37, name: 'Western' }
];

let buscarLista = document.getElementById('buscar_lista');

window.getMovies = async (url) => {
    try {
        const main = document.getElementById('main');
        const response = await fetch(url);
        const data = await response.json();

        showMovies(data.results, main);
        if (buscarLista) buscarLista.classList.add('ocultar_buscar');
    } catch (error) {
        showErrorMessage(error.message);
    }
};

window.showMovies = (movies, container) => {
    container.innerHTML = movies.map(movie => `
        <div class="movie-card" data-movie-id="${movie.id}">
            <div class="movie-image-container">
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450'}" 
                     alt="${movie.title}" 
                     class="movie-image"
                     loading="lazy">
                <div class="descripcion">
                    <h4>Descripción</h4>
                    <p>${movie.overview || 'Descripción no disponible'}</p>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-details">
                    ${movie.release_date?.split('-')[0] || 'N/A'} • ${getGeneros(movie.genre_ids)}
                </p>
                <div class="movie-rating">
                    <span class="stars ${getColorClass(movie.vote_average)}">
                        ★ ${movie.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const movieId = card.dataset.movieId;
            loadMovieDetails(movieId);
            history.pushState({ section: 'detalle', movieId }, '', `?section=detalle&movie=${movieId}`);
        });
    });
};

window.handleSearch = async () => {
    const term = document.getElementById('buscar')?.value.trim();
    if (!term) {
        if (buscarLista) buscarLista.classList.add('ocultar_buscar');
        getMovies(API_URL);
        return;
    }

    try {
        const response = await fetch(`${BUSCAR_URL}&query=${encodeURIComponent(term)}`);
        const data = await response.json();

        if (data.results.length > 0) {
            displayMovieList(data.results);
            buscarLista.classList.remove('ocultar_buscar');
        } else {
            buscarLista.innerHTML = '<div class="buscar_lista_item"><p>No se encontraron resultados</p></div>';
            buscarLista.classList.remove('ocultar_buscar');
        }
    } catch (error) {
        console.error('Error en búsqueda:', error);
        buscarLista.innerHTML = '<div class="buscar_lista_item"><p>Error en la búsqueda</p></div>';
    }
};

function displayMovieList(movies) {
    if (!buscarLista) return;

    buscarLista.innerHTML = movies.map(movie => `
        <div class="buscar_lista_item" data-movie-id="${movie.id}">
            <div class="buscar_item_img">
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450'}" 
                     alt="${movie.title}">
            </div>
            <div class="buscar_item_info">
                <h3>${movie.title}</h3>
                <p>${movie.release_date || 'Fecha desconocida'}</p>
                <span class="${getColorClass(movie.vote_average)}">★ ${movie.vote_average?.toFixed(1) || 'N/A'}</span>
            </div>
        </div>
    `).join('');


    document.querySelectorAll('.buscar_lista_item').forEach(item => {
        item.addEventListener('click', (e) => {
            const movieId = item.dataset.movieId;
            loadMovieDetails(movieId);
            buscarLista.classList.add('ocultar_buscar');
            history.pushState({ section: 'detalle', movieId }, '', `?section=detalle&movie=${movieId}`);
        });
    });
    
}

async function loadMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}`);
        const data = await response.json();
        showMovieDetail(data);
    } catch (error) {
        console.error('Error cargando detalle:', error);
    }
}

function showMovieDetail(movie) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <section class="movie-detail">
            <div class="detail-header">
                <button class="back-button" onclick="loadSection('inicio')">&larr; Volver</button>
                <h2 class="detail-title">${movie.title}</h2>
            </div>
            
            <div class="detail-content">
                <div class="detail-poster">
                    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                </div>
                
                <div class="detail-info">
                    <p class="detail-meta">
                        <span class="rating ${getColorClass(movie.vote_average)}">
                            ★ ${movie.vote_average.toFixed(1)}
                        </span>
                        ${movie.release_date} • ${movie.runtime} mins
                    </p>
                    
                    <div class="detail-genres">
                        ${movie.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                    </div>
                    
                    <p class="detail-overview">${movie.overview}</p>
                    
                    <div class="detail-extra">
                        <h3 clas="sub">Información adicional</h3>
                        <p>Presupuesto: $${movie.budget.toLocaleString()}</p>
                        <p>Ingresos: $${movie.revenue.toLocaleString()}</p>
                        <p>Estado: ${movie.status}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupClickOutside() {
    document.addEventListener('click', (e) => {
        const buscarContainer = document.querySelector('.container-search');
        if (!buscarContainer.contains(e.target)) {
            buscarLista.classList.add('ocultar_buscar');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getGeneros(genreIds) {
    return genreIds.map(id => generos.find(g => g.id === id)?.name)
        .filter(Boolean)
        .slice(0, 2)
        .join(', ') || 'Género no especificado';
}

function getColorClass(vote) {
    return vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}

function showErrorMessage(message) {
    const main = document.getElementById('main');
    if (main) main.innerHTML = `<h2 class="error">${message}</h2>`;
}

document.addEventListener('DOMContentLoaded', () => {
    buscarLista = document.getElementById('buscar_lista');
    getMovies(API_URL);
    setupClickOutside(); 
});