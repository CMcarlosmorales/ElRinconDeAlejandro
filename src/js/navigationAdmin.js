document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.admin-main');
    
    // Función para cargar secciones
    const loadSection = async (section) => {
        try {
            mainContent.classList.add('loading');
            
            const response = await fetch(`../../../src/Pages/admin/sections/${section}.php`);
            
            if (!response.ok) throw new Error('Sección no encontrada: ' + section);
            
            const html = await response.text();
            mainContent.innerHTML = html;
            
            history.pushState({ section }, '', `?section=${section}`);
            
        } catch (error) {
            mainContent.innerHTML = `
                <div class="error">
                    <i class="bi bi-exclamation-triangle"></i>
                    ${error.message}
                </div>
            `;
        } finally {
            mainContent.classList.remove('loading');
        }
    };
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('a').dataset.section;
            
            document.querySelectorAll('.admin-nav-link').forEach(l => 
                l.classList.remove('active')
            );
            e.target.closest('a').classList.add('active');
            
            loadSection(section);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialSection = urlParams.get('section') || 'dashboard';
    loadSection(initialSection);

    window.addEventListener('popstate', (e) => {
        if (e.state?.section) {
            loadSection(e.state.section);
        }
    });
});

document.querySelectorAll('.comment-card').forEach(card => {
    const movieId = card.dataset.movieId;
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=TU_API_KEY`)
        .then(response => response.json())
        .then(data => {
            card.querySelector('small').textContent = data.title;
        });
});

document.getElementById('logoutButton').addEventListener('click', (e) => {
    e.preventDefault();
    
    if (confirm('¿Estás seguro de cerrar sesión?')) {
        fetch('../../controllers/logout.php')
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.error('Error:', error));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !e.target.closest('.sidebar-toggle')) {
            sidebar.classList.remove('active');
        }
    });
});