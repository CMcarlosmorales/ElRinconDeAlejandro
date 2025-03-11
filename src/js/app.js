document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('a').dataset.section;
            loadSection(section);
            history.pushState({ section }, '', `?section=${section}`);
        });
    });

   
    window.addEventListener('popstate', (e) => {
        const section = e.state?.section || 'inicio';
        loadSection(section);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialSection = urlParams.get('section') || 'inicio';
    loadSection(initialSection);
});



async function loadSection(section) {
    const mainContent = document.querySelector('.main-content');
    
    try {
        mainContent.classList.add('loading');
        
        const response = await fetch(`./src/sections/${section}.php`);
        if (!response.ok) throw new Error(response.statusText);
        
        const content = await response.text();
        
        mainContent.innerHTML = `
            <div class="container">
                ${content}
            </div>
        `;
        
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.classList.remove('active');
            if(link.dataset.section === section) {
                link.classList.add('active');
            }
        });

    } catch (error) {
        mainContent.innerHTML = `
            <div class="container">
                <h2 class="error">Error cargando contenido: ${error.message}</h2>
            </div>
        `;
    } finally {
        mainContent.classList.remove('loading');
    }
}