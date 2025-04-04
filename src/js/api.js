import { showLoader, hideLoader, showMessage } from "./app.js";
import { loadSection } from "./navigation.js";
import { toggleAuthModal } from "./applogin.js";
window.loadSection = loadSection; 
window.toggleAuthModal = toggleAuthModal; 

export const API_KEY = 'api_key=65df7f7394c219558c55c1f30d4b6f45';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const BUSCAR_URL = `${BASE_URL}/search/movie?${API_KEY}`;
export const TV_URL = `${BASE_URL}/discover/tv?sort_by=popularity.desc&${API_KEY}`;

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
        
        showMessage(error.message, 'error');
    }
};

window.showMovies = (movies, container) => {
    if (!container) {
        return;
    }
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

export const getTVShows = async (url) => {
    try {
        const container = document.getElementById('seriesGrid');
        const response = await fetch(url);
        const data = await response.json();
        showTVShows(data.results, container);
    } catch (error) {
        showErrorMessage(error.message);
    }
};

function showTVShows(tvShows, container) {
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
                    ${show.first_air_date?.split('-')[0] || 'N/A'} • ${getGeneros(show.genre_ids)}
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

// Handlers para clicks
function setupMovieClickHandlers() {
    document.querySelectorAll('.movie-card[data-movie-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            const movieId = card.dataset.movieId;
            loadMovieDetails(movieId);
            history.pushState({ section: 'detalle', movieId }, '', `?section=detalle&movie=${movieId}`);
        });
    });
}

export function setupTVShowClickHandlers() {
    document.querySelectorAll('.movie-card[data-tv-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            const tvId = card.dataset.tvId;
            loadTVShowDetails(tvId);
            history.pushState({ section: 'detalle', tvId }, '', `?section=detalle&tv=${tvId}`);
        });
    });
}

window.loadGenreMovies = async (genreId) => {
    try {
        const url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${genreId}`;
        window.getMovies(url);
    } catch (error) {
        showErrorMessage('Error cargando películas del género');
    }
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

export async function loadMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}`);
        const data = await response.json();
        showMovieDetail(data);
    } catch (error) {
        console.error('Error cargando detalle:', error);
    }
}


export async function showMovieDetail(movie) {
    const mainContent = document.querySelector('.main-content');
    
    showLoader();
    
    try {
        mainContent.innerHTML = `
                   <section class="movie-detail">
                       <div class="detail-header">
                           <button class="back-button" onclick="loadSection('inicio')">&larr; Volver</button>
                           <h2 class="detail-title">${movie.title}</h2>
                       </div>
                       
                       <!-- informacion de la pelicula -->
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
                                   <h3 class="sub">Información adicional</h3>
                                   <p>Presupuesto: $${movie.budget.toLocaleString()}</p>
                                   <p>Ingresos: $${movie.revenue.toLocaleString()}</p>
                                   <p>Estado: ${movie.status}</p>
                               </div>
                           </div>
                       </div>
           
                       <!-- seccion de comentario-->
                       <div class="comments-section">
                       <!-- si el usuario esta loguedo le permite enviar comentario-->
                       ${userLogged ? `
                           <form id="formComentario" class="comment-form">
                               <h4>Deja tu comentario</h4>
                               <div class="form-group">
                                   <textarea
                                       id="comentarioArea"
                                       name="comentarioArea" 
                                       class="comment-input" 
                                       placeholder="Escribe tu comentario..." 
                                       rows="3" 
                                       required></textarea>
                               </div>
                               <button type="submit" class="auth-btn">Publicar comentario</button>
                           </form>
                       ` : `
                           <div class="comment-login">
                               <p>Debes <button class="text-link" onclick="toggleAuthModal()">iniciar sesión</button> para comentar</p>
                           </div>
                       `}
                           <h3 class="comments-title">Comentarios</h3>
                           
                           <!-- Ejemplo de comentario (maquetación) -->
                           <div class="comment-list" id="commentList">
                               <div class="comment-item">
                                   <div class="comment-header">
                                       <i class="bi bi-person-circle"></i>
                                       <div class="comment-user">
                                           <span class="comment-author">Juan Pérez</span>
                                           <span class="comment-date">Hace 2 días</span>
                                       </div>
                                   </div>
                                   <p class="comment-text">¡Excelente película! La recomiendo totalmente.</p>
                               </div>
                           </div>
           
                       </div>
                   </section>
               `;
           
        await loadComments(movie.id);

        const formComentario = document.getElementById('formComentario');
        if (formComentario) {
            formComentario.addEventListener('submit', async (e) => {
                e.preventDefault();
                showLoader();
                
                try {
                    const urlObj = new URL(window.location.href);
         const params = new URLSearchParams(urlObj.search);
                    const movieId = params.get("movie");

                    const formData = new FormData(e.target);
                    formData.append("movie", movieId);

                    const response = await fetch('src/controllers/comentario.php?op=insertar', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) throw new Error("Error en la respuesta del servidor");
                    const data = await response.json();

                    if (data.tipo === "success") {
                        showMessage(data.msg, 'success', 2000);
                        setTimeout(() => window.location.reload(), 2000); 
                    } else {
                        showMessage(data.msg, 'error');
                    }
                } catch (error) {
                    showMessage(error.message || 'Error al publicar comentario', 'error');
                } finally {
                    hideLoader(); 
                }
            });
        }
    } catch (error) {
        showMessage('Error al cargar detalles de la película', 'error');
    } finally {
        hideLoader(); 
    }
}

async function loadComments(movieId) {
    const commentList = document.getElementById('commentList');
    if (!commentList) return;

    showLoader(); 
    try {
        const response = await fetch(`src/controllers/comentario.php?op=listar&movieId=${movieId}`);
        if (!response.ok) throw new Error("Error al cargar comentarios");
        
        const comments = await response.json();
        
        commentList.innerHTML = comments.length === 0 
            ? '<p class="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</p>'
            : comments.map(comment => `
                <div class="comment-item">
                    <div class="comment-header">
                        <i class="bi bi-person-circle"></i>
                        <div class="comment-user">
                            <span class="comment-author">${comment.nombre}</span>
                            <span class="comment-date-user">${formatCommentDate(comment.fecha)}</span>
                        </div>
                    </div>
                    <p class="comment-text">${comment.comentario}</p>
                </div>
            `).join('');
    } catch (error) {
        commentList.innerHTML = '<p class="error-comments">Error al cargar comentarios. Intenta recargar la página.</p>';
        showMessage('Error al cargar comentarios', 'error');
    } finally {
        hideLoader(); 
    }
}
function formatCommentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Hace unos segundos';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
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

export function getGeneros(genreIds) {
    return genreIds.map(id => generos.find(g => g.id === id)?.name)
        .filter(Boolean)
        .slice(0, 2)
        .join(', ') || 'Género no especificado';
}

export function getColorClass(vote) {
    return vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}

function showErrorMessage(message) {
    const main = document.getElementById('main');
    if (main) main.innerHTML = `<h2 class="error">${message}</h2>`;
}


export async function loadGenreImages() {
    const genreCards = document.querySelectorAll('.genre-card');

    for (const card of genreCards) {
        const img = card.querySelector('.genre-image');
        const genreId = card.dataset.genre;
        const genreName = card.querySelector('h3').textContent;

        try {
            const response = await fetch(
                `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1`
            );
            const data = await response.json();

            const validMovies = data.results.slice(0, 5).filter(movie =>
                movie.backdrop_path || movie.poster_path
            );

            if (validMovies.length === 0) throw new Error('No hay imágenes');

            const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];
            const imagePath = randomMovie.backdrop_path || randomMovie.poster_path;

            img.src = `${IMG_URL}${imagePath}`;
            img.crossOrigin = "anonymous";

            img.onerror = () => {
                img.src = 'https://via.placeholder.com/300x450?text=Imagen+no+disponible';
                card.classList.add('error');
            };

            img.onload = () => {
                card.classList.remove('loading');
            };

            img.onerror = () => {
                card.classList.remove('loading');
                card.classList.add('error');
            };

        } catch (error) {
            card.classList.remove('loading');
            card.classList.add('error')
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buscarLista = document.getElementById('buscar_lista');
    setupClickOutside();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('section') === 'series') {
        getTVShows(TV_URL, document.getElementById('seriesGrid'));
    } else {
        getMovies(API_URL);
    }
});