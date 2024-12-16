const main = document.getElementById('main_peliculas');
const mainSeries = document.getElementById('main_series');

showMoviesCuerpo();
showSeriesCuerpo();

function showMoviesCuerpo(){
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataMovieCuerpo => {
        main.innerHTML = '';
        dataMovieCuerpo.results.forEach(movieCuerpo => {
            const {title, poster_path, vote_average, overview, id} = movieCuerpo;
            const movieEl = document.createElement('div');
            movieEl.classList.add('peli_individual');
            movieEl.id = 'pelicula-'+id;
            movieEl.innerHTML = `
                <div class="peli_container">
                    <a class="peli_enlace" href="../../src/Pages/movie.html?id=${id}">
                        <img class="peli_logo" src="${poster_path ? IMG_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="${title}">
                    </a>
                    <div class="peli_detalle">
                        <div class="peli_info">
                            <h4 class="titulo_peli">${title}</h4>
                            <p class="${getColor(vote_average)}"><span>TMDB</span><i class="bi bi-star-fill"></i> ${vote_average}</p>
                        </div>
                        <div class="descripcion">
                            <h3>Descripción</h3>
                            <p>${overview}</p>
                        </div>
                    </div>
                </div>
            `;

            main.appendChild(movieEl);
        });
    });
}

function showSeriesCuerpo(){
    fetch(`https://api.themoviedb.org/3/tv/top_rated?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataSeriesCuerpo => {
        mainSeries.innerHTML = '';
        dataSeriesCuerpo.results.forEach(seriesCuerpo => {
            const {name, poster_path, vote_average, overview, id} = seriesCuerpo;
            const seriesEl = document.createElement('div');
            seriesEl.classList.add('serie_individual');
            seriesEl.id = 'serie-'+id;
            seriesEl.innerHTML = `
                <div class="serie_container">
                    <a class="serie_enlace" href="../../src/Pages/tv.html?id=${id}">
                        <img class="serie_logo" src="${poster_path ? IMG_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="${name}">
                    </a>
                    <div class="serie_detalle">
                        <div class="serie_info">
                            <h4 class="titulo_serie">${name}</h4>
                            <p class="${getColor(vote_average)}"><span>TMDB</span><i class="bi bi-star-fill"></i> ${vote_average}</p>
                        </div>
                        <div class="descripcion">
                            <h3>Descripción</h3>
                            <p>${overview}</p>
                        </div>
                    </div>
                </div>
            `;

            mainSeries.appendChild(seriesEl);
        });
    });
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5 && vote < 8){
        return 'orange'
    }else if(vote < 5){
        return 'red'
    }
}