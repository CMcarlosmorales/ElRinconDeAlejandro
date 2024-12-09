//TMDB

const API_KEY = 'api_key=65df7f7394c219558c55c1f30d4b6f45';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BUSCAR_URL = BASE_URL + '/search/movie?' + API_KEY

const genero = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const main = document.getElementById('main');
const form = document.getElementById('form');
const buscar = document.getElementById('buscar');
const buscarLista = document.getElementById('buscar_lista');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML = '<h1 class="noresult">No se encontraron resultados</h1>'
        }
        
    })
}

function getMoviesBuscar(url){
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            displayMovieList(data.results);
        }else{
            buscarLista.innerHTML = `
                    <div class="buscar_lista_item">
                        <h5 class="noresult">No se encontraron resultados</h5>
                    </div>
            `
        }
        
    })
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl =document.createElement('div');
        movieEl.classList.add('pelicula');
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="${title}">
            <div class="peli_info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="descripcion">
                <h3>Descripción</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const buscarTerm = buscar.value;

    if(buscarTerm){
        getMovies(BUSCAR_URL + '&query=' + buscarTerm);
    }else{
        getMovies(API_URL);
    }
});

function findMovies(){
    let term = buscar.value;
    if(term.length > 0){
        buscarLista.classList.remove('ocultar_buscar');
        console.log(term);
        getMoviesBuscar(BUSCAR_URL + '&query=' + term);
    }else{
        buscarLista.classList.add('ocultar_buscar')
    }
}

function displayMovieList(movie){
    buscarLista.innerHTML = "";
    movie.forEach(movies => {
        const {title, poster_path, release_date} = movies;
        let listItem = document.createElement('div');
        listItem.classList.add('buscar_lista_item');
        listItem.innerHTML = `
                            <div class="buscar_item_img">
                                <img src="${poster_path ? IMG_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="${title}">
                            </div>
                            <div class="buscar_item_info">
                                <h3>${title}</h3>
                                <p>${release_date}</p>
                            </div>
        `;
        buscarLista.appendChild(listItem);
    })  
}