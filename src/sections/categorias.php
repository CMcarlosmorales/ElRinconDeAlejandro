
<?php
$generos = [

    ["id" => 28, "name" => 'Acción'],
    ["id" => 12, "name" => 'Aventura'],
    ["id" => 16, "name" => 'Animación'],
    ["id" => 35, "name" => 'Comedia'],
    ["id" => 80, "name" => 'Crimen'],
    ["id" => 99, "name" => 'Documental'],
    ["id" => 18, "name" => 'Drama'],
    ["id" => 10751, "name" => 'Familia'],
    ["id" => 14, "name" => 'Fantasía'],
    ["id" => 36, "name" => 'Historia'],
    ["id" => 27, "name" => 'Terror'],
    ["id" => 10402, "name" => 'Música'],
    ["id" => 9648, "name" => 'Misterio'],
    ["id" => 10749, "name" => 'Romance'],
    ["id" => 878, "name" => 'Ciencia ficción'],
    ["id" => 10770, "name" => 'TV Movie'],
    ["id" => 53, "name" => 'Suspenso'],
    ["id" => 10752, "name" => 'Bélica'],
    ["id" => 37, "name" => 'Western']

];

?>
<section class="categorias-section">
    <div class="container">
        <h2 class="section-title">Explora por Géneros</h2>
        <div class="genres-grid">
            <?php foreach ($generos as $genero): ?>
                <div class="genre-card" data-genre="<?= $genero['id'] ?>">
                    <img class="genre-image" loading="lazy" alt="<?= $genero['name'] ?>">
                    <div class="genre-content">
                        <h3><?= $genero['name'] ?></h3>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>