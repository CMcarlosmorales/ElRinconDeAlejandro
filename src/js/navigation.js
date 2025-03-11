document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    const initialSection = getCurrentSection();
    loadSection(initialSection);

});

function setupNavigation() {
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('a').dataset.section;
            loadSection(section);
            updateBrowserHistory(section);
        });
    });

    window.addEventListener('popstate', handlePopState);
}

function getCurrentSection() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movie');
    const tvId = urlParams.get('tv');
    return movieId || tvId ? 'detalle' : urlParams.get('section') || 'inicio';
}

async function loadSection(section) {
    const mainContent = document.querySelector('.main-content');
    try {
        mainContent.classList.add('loading');
        
        if(section === 'detalle') {
            const urlParams = new URLSearchParams(window.location.search);
            const movieId = urlParams.get('movie');
            const tvId = urlParams.get('tv');
            
            if(movieId) {
                await loadMovieDetails(movieId);
                return;
            }
            if(tvId) {
                await loadTVShowDetails(tvId);
                return;
            }
        }
        
        const response = await fetch(`./src/sections/${section}.php`);
        if (!response.ok) throw new Error('Sección no encontrada');
        
        mainContent.innerHTML = await response.text();
        
        switch(section) {
            case 'inicio':
                initHomeSection();
                break;
            case 'peliculas':
                initMoviesSection();
                break;
            case 'series':
                initSeriesSection();
                break;
            case 'categorias':
                initCategories();
                break;
        }
        
        updateActiveLink(section);
    } catch (error) {
        mainContent.innerHTML = `<div class="error">${error.message}</div>`;
    } finally {
        mainContent.classList.remove('loading');
    }
}

function initHomeSection() {
    window.getMovies(API_URL);
    setupSearch();
    
  
}
function initMoviesSection() {
    const filtro = document.getElementById('filtroPeliculas');
    const apiUrls = {
        popular: `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`,
        top_rated: `${BASE_URL}/movie/top_rated?${API_KEY}`,
        upcoming: `${BASE_URL}/movie/upcoming?${API_KEY}`
    };
    
    filtro?.addEventListener('change', () => {
        window.getMovies(apiUrls[filtro.value]);
    });
    
    window.getMovies(apiUrls.popular);
}

function initSeriesSection() {
    const filtro = document.getElementById('filtroSeries');
    const apiUrls = {
        popular: `${BASE_URL}/discover/tv?sort_by=popularity.desc&${API_KEY}`,
        top_rated: `${BASE_URL}/tv/top_rated?${API_KEY}`,
        on_the_air: `${BASE_URL}/tv/on_the_air?${API_KEY}`
    };
    
    filtro?.addEventListener('change', () => {
        getTVShows(apiUrls[filtro.value]);
    });
    
    getTVShows(apiUrls.popular);
}

function initCategories() {
    loadGenreImages();
    
    document.querySelectorAll('.genre-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const genreId = card.dataset.genre;
            loadGenreMovies(genreId);
            history.pushState({ section: 'peliculas', genreId }, '', `?section=peliculas&genre=${genreId}`);
        });
    });
}


async function getTVShows(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showTVShows(data.results);
    } catch (error) {
        showErrorMessage(error.message);
    }
}

function showTVShows(tvShows) {
    const container = document.getElementById('seriesGrid');
    container.innerHTML = tvShows.map(show => `
        <div class="movie-card" data-tv-id="${show.id}">
            <div class="movie-image-container">
                <img src="${show.poster_path ? IMG_URL + show.poster_path : 'https://via.placeholder.com/300x450'}" 
                     alt="${show.name}" 
                     class="movie-image"
                     loading="lazy">
                <div class="descripcion">
                    <h4>Descripción</h4>
                    <p>${show.overview || 'Descripción no disponible'}</p>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${show.name}</h3>
                <p class="movie-details">
                    ${show.first_air_date?.split('-')[0] || 'N/A'} • ${show.genre_ids ? getGeneros(show.genre_ids) : 'N/A'}
                </p>
                <div class="movie-rating">
                    <span class="stars ${getColorClass(show.vote_average)}">
                        ★ ${show.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    setupTVShowClickHandlers();
}

async function loadTVShowDetails(tvId) {
    try {
        const response = await fetch(`${BASE_URL}/tv/${tvId}?${API_KEY}`);
        const data = await response.json();
        showTVShowDetail(data);
        history.pushState({ section: 'detalle', tvId }, '', `?section=detalle&tv=${tvId}`);
    } catch (error) {
        console.error('Error cargando detalle de serie:', error);
    }
}

function showTVShowDetail(tvShow) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <section class="movie-detail">
            <div class="detail-header">
                <button class="back-button" onclick="loadSection('series')">&larr; Volver</button>
                <h2 class="detail-title">${tvShow.name}</h2>
            </div>
            
            <div class="detail-content">
                <div class="detail-poster">
                    <img src="${IMG_URL + tvShow.poster_path}" alt="${tvShow.name}">
                </div>
                
                <div class="detail-info">
                    <p class="detail-meta">
                        <span class="rating ${getColorClass(tvShow.vote_average)}">
                            ★ ${tvShow.vote_average.toFixed(1)}
                        </span>
                        ${tvShow.first_air_date} • ${tvShow.number_of_seasons} temporadas
                    </p>
                    
                    <div class="detail-genres">
                        ${tvShow.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                    </div>
                    
                    <p class="detail-overview">${tvShow.overview}</p>
                    
                    <div class="detail-extra">
                        <h3 class="sub">Información adicional</h3>
                        <p>Episodios: ${tvShow.number_of_episodes}</p>
                        <p>Último episodio: ${tvShow.last_air_date}</p>
                        <p>Estado: ${tvShow.status}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}


function updateBrowserHistory(section) {
    history.pushState({ section }, '', `?section=${section}`);
}

function handlePopState(event) {
    const section = event.state?.section || 'inicio';
    loadSection(section);
}

function updateActiveLink(section) {
    document.querySelectorAll('[data-section]').forEach(link => {
        link.classList.toggle('active', link.dataset.section === section);
    });
}

function setupSearch() {
    const form = document.getElementById('form');
    const buscar = document.getElementById('buscar');
    
    if (form && buscar) {
        form.onsubmit = (e) => {
            e.preventDefault();
            window.handleSearch();
        };
        buscar.oninput = () => window.handleSearch();
    }
}

async function loadGenreMovies(genreId) {
    try {
        const url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${genreId}`;
        window.getMovies(url);
        history.pushState({ section: 'peliculas', genreId }, '', `?section=peliculas&genre=${genreId}`);
    } catch (error) {
        showErrorMessage('Error cargando género');
    }
}

