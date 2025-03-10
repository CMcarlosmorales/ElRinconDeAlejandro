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
    return movieId ? 'detalle' : urlParams.get('section') || 'inicio'
}

async function loadSection(section) {
    const mainContent = document.querySelector('.main-content');
    try {
        mainContent.classList.add('loading');
        
        if(section === 'detalle') {
            const urlParams = new URLSearchParams(window.location.search);
            const movieId = urlParams.get('movie');
            if(movieId) {
                await loadMovieDetails(movieId);
                return;
            }
        }
        
        
        const response = await fetch(`./src/sections/${section}.php`);
        if (!response.ok) throw new Error('Sección no encontrada');
        
        mainContent.innerHTML = await response.text();
        
        
        if(section === 'inicio') initHomeSection();
        
        updateActiveLink(section);
    } catch (error) {
        mainContent.innerHTML = `<div class="error">${error.message}</div>`;
    } finally {
        mainContent.classList.remove('loading');
    }
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


function initHomeSection() {
    window.getMovies(API_URL);
    setupSearch();
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