const PIC_URL = 'https://image.tmdb.org/t/p/w500';
const BACKPIC_URL = 'https://image.tmdb.org/t/p/original';
const cardPelicula = document.getElementById('idcards_pelicula');
const cardProduct = document.getElementById('idcards_production');
const cardProduction = document.getElementById('idcards_productionEmp');
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

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

showBackgroundPelicula();
showCast();
showProduction();
showProductionEmp();

function showBackgroundPelicula(){
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(databgpelicula => {

        const bgdatapelicula = databgpelicula;

        console.log(bgdatapelicula);
        
        const mergedGenre = bgdatapelicula.genres.map(g => {
            const match = genero.find(genre => genre.id === g.id);
            return match ? match.name : null; 
        }).filter(name => name !== null);

        document.getElementById('poster_movie').innerHTML = `<img src = "${bgdatapelicula.poster_path ? BACKPIC_URL+bgdatapelicula.poster_path : "http://via.placeholder.com/1080x1500"}" alt = "movie poster"></img>`;
        document.getElementById('title').innerText = `${bgdatapelicula.title}`;
        document.getElementById('overview').innerText = `${bgdatapelicula.overview}`;
        document.getElementById('genre').innerHTML = `<strong>Género</strong>: ${mergedGenre}`;
        document.getElementById('release_date').innerHTML = `<strong>Fecha de estreno</strong>: ${bgdatapelicula.release_date}`;
        document.getElementById('rating').innerHTML = `<span>TMDB</span><i class="bi bi-star-fill"></i> ${bgdatapelicula.vote_average}`;
        document.getElementById('language').innerHTML = `<b>Eslogan</b> ${bgdatapelicula.tagline}`;
            
        const imagenInicial = `url(${bgdatapelicula.backdrop_path ? BACKPIC_URL+bgdatapelicula.backdrop_path : "https://via.placeholder.com/1800x1080"}) no-repeat center center/cover`;
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

function showCast(){
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(datacast => {
        cardPelicula.innerHTML = '';
        datacast.cast.forEach(castMovie => {
            const {original_name, profile_path, character, id} = castMovie;

            const cardcast = document.createElement('a');
            cardcast.classList.add('card');
            cardcast.id = 'id-'+id;
            cardcast.href = '#';
            cardcast.innerHTML = `
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

            cardPelicula.appendChild(cardcast);
        });
    });
}

function showProduction(){
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataproduct => {
        cardProduct.innerHTML = '';
        dataproduct.crew.forEach(productMovie => {
            const {original_name, profile_path, known_for_department, id} = productMovie;

            const cardpro= document.createElement('a');
            cardpro.classList.add('card');
            cardpro.id = 'id-'+id;
            cardpro.href = '#';
            cardpro.innerHTML = `
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

            cardProduct.appendChild(cardpro);

        });
    });
}

function showProductionEmp(){
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-ES&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(dataproduction => {
        cardProduction.innerHTML = '';
        dataproduction.production_companies.forEach(productionMovie => {
            const {name, logo_path, origin_country, id} = productionMovie;

            const cardp= document.createElement('a');
            cardp.classList.add('card');
            cardp.id = 'id-'+id;
            cardp.href = '#';
            cardp.innerHTML = `
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

            cardProduction.appendChild(cardp);

        });
    });
}