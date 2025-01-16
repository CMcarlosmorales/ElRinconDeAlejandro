<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/styles/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>El Rincón de Alejandro</title>
</head>
<body>
    <header>
        <nav>
            <div class="logo_ul">
                <img src="./src/img/logo-trans.png" alt="logo-img" id="img_profile">
                <ul>
                    <li>
                        <a href="#" id="inicio_btn">Inicio</a>
                    </li>
                    <li>
                        <a href="#" id="categoria_btn">Categoría</a>
                    </li>
                    <li>
                        <a href="#" id="movies_btn">Películas</a>
                    </li>
                    <li>
                        <a href="#" id="series_btn">Series</a>
                    </li>
                    <?php if(empty($_SESSION['nombre'])) { ?>
                    <li>
                        <a href="./src/Pages/login.html" class="ingr">Ingresar</a>
                    </li>
                    <?php } ?>
                </ul>
            </div>
            <div class="buscar_user">
                <input type="text" placeholder="Buscar..." id="buscar_input" onkeyup="findMovies()";>
                <?php if(empty($_SESSION['imagen'])) { ?>
                <img src="./src/img/user.png" alt="user-img">
                <?php }else{ ?>
                <a href="./src/Pages/profile.html" style="height: 20px;">
                    <img src="<?php echo $_SESSION['imagen']; ?>" alt="user-img">
                </a>
                <?php } ?>
                <div class="buscar">
                    
                </div>
            </div>
        </nav>
        <div class="content">
            <div id="title_content"></div>
            <p id="overview"></p>
            <div class="details">
                <h5 id="gen"></h5>
                <h4 id="date"></h4>
                <h3 id="rate"></h3>
            </div>
        </div>
        <section>
            <h4>Popular</h4>
            <i class="bi bi-chevron-left"></i>
            <i class="bi bi-chevron-right"></i>
            <div id="idcards" class="cards">
                            
            </div>
        </section>
    </header>
    <main>
        <div class="container_movie">
            <h2 class="subtitulo">PELICULAS MEJOR CLASIFICADAS</h2>
        </div>
        <div id="main_peliculas">

        </div>
        <div class="btn-section">
            <a href="#" class="btn-expandir" id="btnExpandirPeliculas">Ver más</a>
        </div>
        <div class="btn-section">
            <a href="#" class="btn-reducir" id="btnReducirPeliculas">Ver menos</a>
        </div>
        <div class="container_movie">
            <h2 class="subtitulo">SERIES MEJOR CLASIFICADAS</h2>
        </div>
        <div id="main_series">

        </div>
        <div class="btn-section">
            <a href="#" class="btn-expandir" id="btnExpandirSeries">Ver más</a>
        </div>
        <div class="btn-section">
            <a href="#" class="btn-reducir" id="btnReducirSeries">Ver menos</a>
        </div>
    </main>
    <footer>
        <div class="container_footer">
            <div class="container-redes">
                <div class="enlaces_redes">
                    <a class="redes" href="#">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a class="redes" href="#">
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a class="redes" href="#">
                        <i class="bi bi-twitter-x"></i>
                    </a>
                </div>
                <div>
                    <h3 class="enlaces">SIGUENOS</h3>
                </div>
            </div>
            <div class="container_footer-iamgen">
                <img class="img_footer" src="./src/img/logo_footer-trans.png" alt="">
            </div>
            <div class="container_footer-contenido">

                <h3 class="enlaces">Legal</h3>
                <h3 class="enlaces">Terminos y Condicones </h3>

            </div>

        </div>
    </footer>
</body>
<script type="module" src="./src/js/app.js"></script>
<script type="module" src="./src/js/appindex.js"></script>
<script src="./src/js/buscador.js"></script>
<script type="module" src="./src/js/header.js"></script>
<script src="./src/js/cuerpo.js"></script>
</html>