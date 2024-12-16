const BUSCAR_URL = 'https://api.themoviedb.org/3/search/movie?language=es-MX&api_key=65df7f7394c219558c55c1f30d4b6f45&query=';
const TV_URL = 'https://api.themoviedb.org/3/search/tv?language=es-MX&api_key=65df7f7394c219558c55c1f30d4b6f45&query=';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const filtroBuscar = document.getElementById('buscar_input');
const buscar = document.getElementsByClassName('buscar')[0];

function getMoviesBuscar(url){
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            displayMovieList(data.results);
        }else{
            console.log('No encontrado')
        }     
    })
}

function findMovies(){
    let term = filtroBuscar.value;
    if(term.length > 0){
        buscar.classList.remove('ocultar_buscar');
        console.log(term);
        getMoviesBuscar(BUSCAR_URL + term);
        getMoviesBuscar(TV_URL + term)
    }else{
        buscar.classList.add('ocultar_buscar')
    }
}

function displayMovieList(movie){
    buscar.innerHTML = "";
    movie.forEach(movies => {
        const {title, poster_path, vote_average, release_date, name, first_air_date, id} = movies;
        const bus = document.createElement('a');
        bus.classList.add('card');
        bus.href = `${title ? `movie.html?id=${id}` : `tv.html?id=${id}`}`;
        bus.innerHTML = `
                    <img src="${poster_path ? IMG_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="img_buscar">
                    <div class="cont">
                        <h3>${title ? title : name}</h3>
                        <p>${release_date ? release_date : first_air_date}<span>TMDB</span><i class="bi bi-star-fill"></i> ${vote_average}</p>
                    </div>
                `;
    
        buscar.appendChild(bus);
    });  
}