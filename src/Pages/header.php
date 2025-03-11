<header>
    <h1><i class="bi bi-film logo"></i> PELIFLIXX</h1>
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
        <ul class="nav-list">
            <button id="themeToggle" class="theme-toggle">
                <i class="bi bi-moon-fill"></i>
            </button>
            <li><a href="#" data-section="inicio" class="active"><i class="bi bi-house"></i> Inicio</a></li>
            <li><a href="#" data-section="categorias"><i class="bi bi-grid"></i> Categorías</a></li>
            <li><a href="#" data-section="peliculas"><i class="bi bi-film"></i> Películas</a></li>
            <li><a href="#" data-section="series"><i class="bi bi-tv"></i> Series</a></li>
            <li><a href="#" onclick="toggleAuthModal(); return false;"><i class="bi bi-box-arrow-in-right"></i> Ingresar</a></li>
        </ul>
    </nav>
    <button class="cerrar-menu" id="cerrar"><i class="bi bi-x"></i></button>
</header>

<div class="container-search">
    <div class="bar-search">
        <div class="bar-search__position">
            <form id="form" class="search-container">
                <input class="input-serch"
                    type="text"
                    placeholder="Buscar películas y series..."
                    id="buscar">
            </form>
        </div>
        <div id="buscar_lista" class="buscar-lista ocultar_buscar"></div>
    </div>
</div>