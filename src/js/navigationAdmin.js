import { showLoader, showMessage, hideLoader } from "./app.js";
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.admin-main');
    
    const loadSection = async (section) => {
        try {
            showLoader(); 
            mainContent.classList.add('loading');
            
            const response = await fetch(`../../../src/Pages/admin/sections/${section}.php`);
            
            if (!response.ok) throw new Error('Sección no encontrada: ' + section);
            
            const html = await response.text();
            mainContent.innerHTML = html;
            
            history.pushState({ section }, '', `?section=${section}`);
            showMessage(`Sección ${section} cargada`, 'success', 1000);
            
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            hideLoader(); 
            mainContent.classList.remove('loading');
        }
    };

    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const section = e.target.closest('a').dataset.section;
            
            document.querySelectorAll('.admin-nav-link').forEach(l => 
                l.classList.remove('active')
            );
            e.target.closest('a').classList.add('active');
            
            await loadSection(section);
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

 document.getElementById('logoutButton')?.addEventListener('click', async (e) => {
        e.preventDefault();
        
        showMessage('¿Estás seguro de cerrar sesión?', 'info', 0, true, async () => {
            showLoader();
            try {
                const response = await fetch('src/Pages/admin/logoutAdmin.php');
                if (response.redirected) {
                    showMessage('Sesión cerrada', 'success', 1000);
                    setTimeout(() => window.location.href = response.url, 1000);
                }
            } catch (error) {
                showMessage('Error al cerrar sesión', 'error');
            } finally {
                hideLoader();
            }
        });
    });

    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        showMessage('Menú ' + (sidebar.classList.contains('active') ? 'abierto' : 'cerrado'), 'info', 1500);
    });

    document.querySelectorAll('.comment-card').forEach(card => {
        const movieId = card.dataset.movieId;
        showLoader(card); 
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=TU_API_KEY`)
            .then(response => response.json())
            .then(data => {
                card.querySelector('small').textContent = data.title;
            })
            .catch(error => {
                showMessage('Error al cargar título', 'error', 3000, false, card);
                card.querySelector('small').textContent = 'Título no disponible';
            })
            .finally(() => hideLoader(card));
    });
});