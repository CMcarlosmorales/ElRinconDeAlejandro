const PIC_URL = 'https://image.tmdb.org/t/p/w500';
const BACKPIC_URL = 'https://image.tmdb.org/t/p/original';
const cardSerie = document.getElementById('idcards_serie');
const cardProductS = document.getElementById('idcards_production_serie');
const cardProductionS = document.getElementById('idcards_productionEmp_serie');

const genero = [
    {
        "id": 28,
        "name": "Acción"
    },
    {
        "id": 12,
        "name": "Aventura"
    },
    {
        "id": 16,
        "name": "Animación"
    },
    {
        "id": 35,
        "name": "Comedia"
    },
    {
        "id": 80,
        "name": "Crimen"
    },
    {
        "id": 99,
        "name": "Documental"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Familia"
    },
    {
        "id": 14,
        "name": "Fantasía"
    },
    {
        "id": 36,
        "name": "Historia"
    },
    {
        "id": 27,
        "name": "Terror"
    },
    {
        "id": 10402,
        "name": "Música"
    },
    {
        "id": 9648,
        "name": "Misterio"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Ciencia ficción"
    },
    {
        "id": 10770,
        "name": "Película de TV"
    },
    {
        "id": 53,
        "name": "Suspense"
    },
    {
        "id": 10752,
        "name": "Bélica"
    },
    {
        "id": 37,
        "name": "Western"
    },
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
];

const car = document.getElementById('idcards');

showBackgroundSerie();
showCastS();
showProductionS();
showProductionEmpS();

function showBackgroundSerie(){
    fetch(`https://api.themoviedb.org/3/tv/112470?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(databgserie => {

        const bgdataserie = databgserie;

        console.log(bgdataserie);
        
        const mergedGenre = bgdataserie.genres.map(g => {
            const match = genero.find(genre => genre.id === g.id);
            return match ? match.name : null; 
        }).filter(name => name !== null);

        document.getElementById('poster_tv').innerHTML = `<img src = "${bgdataserie.poster_path ? BACKPIC_URL+bgdataserie.poster_path : "http://via.placeholder.com/1080x1500"}" alt = "movie poster"></img>`;
        document.getElementById('title').innerText = `${bgdataserie.name}`;
        document.getElementById('overview').innerText = `${bgdataserie.overview}`;
        document.getElementById('genre').innerHTML = `<strong>Género</strong>: ${mergedGenre}`;
        document.getElementById('le').innerHTML = `<strong>Último episodio</strong>: ${bgdataserie.last_episode_to_air.air_date}`;
        document.getElementById('ne').innerHTML = `<strong>Próximo episodio</strong>: ${bgdataserie.next_episode_to_air.air_date}`;
        document.getElementById('release_date').innerHTML = `<strong>Estreno al aire</strong>: ${bgdataserie.first_air_date}`;
        document.getElementById('rating').innerHTML = `<span>TMDB</span><i class="bi bi-star-fill"></i> ${bgdataserie.vote_average}`;
        document.getElementById('language').innerHTML = `<b>Eslogan</b> ${bgdataserie.tagline}`;
            
        const imagenInicial = `url(${bgdataserie.backdrop_path ? BACKPIC_URL+bgdataserie.backdrop_path : "https://via.placeholder.com/1800x1080"}) no-repeat center center/cover`;
        const estilo = document.styleSheets[0];
            
        for (let i = 0; i < estilo.cssRules.length; i++) {
            if (estilo.cssRules[i].selectorText === 'header::before') {
                estilo.cssRules[i].style.background = imagenInicial;
                estilo.cssRules[i].style.opacity = '20%';  
                break; 
            }
        }
    });
}

function showCastS(){
    fetch(`https://api.themoviedb.org/3/tv/112470/credits?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(datacastS => {
        cardSerie.innerHTML = '';
        datacastS.cast.forEach(castSerie => {
            const {original_name, profile_path, character, id} = castSerie;

            const cardcastS = document.createElement('a');
            cardcastS.classList.add('card');
            cardcastS.id = 'id-'+id;
            cardcastS.href = '#';
            cardcastS.innerHTML = `
                        <img src="${profile_path ? BACKPIC_URL+profile_path : "http://via.placeholder.com/1080x1500"}" alt="poster_img" class="poster">
                        <div class="rest_card">
                            <div class="cont">
                                <h4>${original_name}</h4>
                                <div class="sub"> 
                                    <p>${character}</p>
                                </div>
                            </div>
                        </div>
                    `;

            cardSerie.appendChild(cardcastS);
        });
    });
}

function showProductionS(){
    fetch(`https://api.themoviedb.org/3/tv/112470/credits?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataproductS => {
        cardProductS.innerHTML = '';
        dataproductS.crew.forEach(productSeries => {
            const {original_name, profile_path, known_for_department, id} = productSeries;

            const cardproS= document.createElement('a');
            cardproS.classList.add('card');
            cardproS.id = 'id-'+id;
            cardproS.href = '#';
            cardproS.innerHTML = `
                        <img src="${profile_path ? BACKPIC_URL+profile_path : "http://via.placeholder.com/1080x1500"}" alt="poster_img" class="poster">
                        <div class="rest_card">
                            <div class="cont">
                                <h4>${original_name}</h4>
                                <div class="sub"> 
                                    <p>${known_for_department}</p>
                                </div>
                            </div>
                        </div>
                    `;

            cardProductS.appendChild(cardproS);

        });
    });
}

function showProductionEmpS(){
    fetch(`https://api.themoviedb.org/3/tv/112470?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataproductionS => {
        cardProductionS.innerHTML = '';
        dataproductionS.production_companies.forEach(productionMovie => {
            const {name, logo_path, origin_country, id} = productionMovie;

            const cardpS= document.createElement('a');
            cardpS.classList.add('card');
            cardpS.id = 'id-'+id;
            cardpS.href = '#';
            cardpS.innerHTML = `
                        <img src="${logo_path ? BACKPIC_URL+logo_path : "http://via.placeholder.com/1080x1500"}" alt="poster_img" class="poster_logo">
                        <div class="rest_card">
                            <div class="cont">
                                <h4>${name}</h4>
                                <div class="sub"> 
                                    <p>${origin_country}</p>
                                </div>
                            </div>
                        </div>
                    `;

            cardProductionS.appendChild(cardpS);

        });
    });
}