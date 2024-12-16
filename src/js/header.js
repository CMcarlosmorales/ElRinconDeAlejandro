const PIC_URL = 'https://image.tmdb.org/t/p/w500';
const BACKPIC_URL = 'https://image.tmdb.org/t/p/original';

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

showBackground();
showDatos();

function showBackground(){
    fetch(`https://api.themoviedb.org/3/movie/popular?language=es-MX&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(databg => {

        const bgdata = databg.results;
        
        const mergedGenre = bgdata[0].genre_ids.map(g => {
            const match = genero.find(genre => genre.id === g);
            return match ? match.name : null; 
        }).filter(name => name !== null);

        fetch(`https://api.themoviedb.org/3/movie/${bgdata[0].id}/images?api_key=65df7f7394c219558c55c1f30d4b6f45&include_image_language=es`).then(res => res.json()).then(datalogobg => {
            const datimagenbg = datalogobg.logos;
            const logobgin = datimagenbg.length > 0 && datimagenbg[0].file_path ? datimagenbg[0].file_path : false;
            document.getElementById('title_content').innerHTML = logobgin != false ? `<img src="${BACKPIC_URL+logobgin}" alt="poster_img" class="poster_logo">` : `<h1 class="title">${bgdata[0].title ? bgdata[0].title : bgdata[0].name}</h1>`;
        });

        document.getElementById('overview').innerText = bgdata[0].overview;
        document.getElementById('gen').innerText = mergedGenre;
        document.getElementById('date').innerText = bgdata[0].release_date ? bgdata[0].release_date : bgdata[0].first_air_date;
        document.getElementById('rate').innerHTML = `<span>TMDB</span><i class="bi bi-star-fill"></i> ${bgdata[0].vote_average}`;
            
        const imagenInicial = `url(${bgdata[0].backdrop_path ? BACKPIC_URL+bgdata[0].backdrop_path : "https://via.placeholder.com/1800x1080"}) no-repeat center center/cover`;
        const estilo = document.styleSheets[0];
            
        for (let i = 0; i < estilo.cssRules.length; i++) {
            if (estilo.cssRules[i].selectorText === 'header::before') {
                estilo.cssRules[i].style.background = imagenInicial; 
                break; 
            }
        }
    });
}

function showDatos(){
    fetch(`https://api.themoviedb.org/3/movie/popular?language=es-MX&api_key=65df7f7394c219558c55c1f30d4b6f45`).then(res => res.json()).then(data => {
        data.innerHTML = '';
        data.results.forEach(movie => {
            const {title, name, poster_path, overview, vote_average, genre_ids, release_date, backdrop_path, first_air_date, id} = movie;

            const mergedGenres = genre_ids.map(g => {
                const match = genero.find(genre => genre.id === g);
                return match ? match.name : null; 
            }).filter(name => name !== null);

            const carda = document.createElement('a');
            carda.classList.add('card');
            carda.id = 'id-'+id;
            carda.href = '#';
            carda.innerHTML = `
                        <img src="${poster_path ? BACKPIC_URL+poster_path : "http://via.placeholder.com/1080x1500"}" alt="poster_img" class="poster">
                        <div class="rest_card">
                            <img src="${backdrop_path ? BACKPIC_URL+backdrop_path : "https://via.placeholder.com/1800x1080"}" alt="poster_fondo">
                            <div class="cont">
                                <h4>${title ? title : name}</h4>
                                <div class="sub"> 
                                    <p>${mergedGenres} ${release_date ? release_date : first_air_date}</p>
                                    <h3><span>TMDB</span><i class="bi bi-star-fill"></i> ${vote_average}</h3>
                                </div>
                            </div>
                        </div>
                    `;

            car.appendChild(carda);

            let cardsbtn = document.querySelectorAll('#id-'+id);

            cardsbtn.forEach((enlace) => {
                enlace.addEventListener('click', (evento) => {
                    evento.preventDefault(); 

                    fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=65df7f7394c219558c55c1f30d4b6f45&include_image_language=es`).then(res => res.json()).then(datalogo => {
                        const datimagen = datalogo.logos;
                        const logobg = datimagen.length > 0 && datimagen[0].file_path ? datimagen[0].file_path : false;
                        document.getElementById('title_content').innerHTML = logobg != false ? `<img src="${BACKPIC_URL+logobg}" alt="poster_img" class="poster_logo">` : `<h1 class="title">${title ? title : name}</h1>`;
                    });
                                     
                    document.getElementById('overview').innerText = overview;
                    document.getElementById('gen').innerText = mergedGenres;
                    document.getElementById('date').innerText = release_date ? release_date : first_air_date;
                    document.getElementById('rate').innerHTML = `<span>TMDB</span><i class="bi bi-star-fill"></i> ${vote_average}`;
            
                    const nuevaImagen = `url(${backdrop_path ? BACKPIC_URL+backdrop_path : "https://via.placeholder.com/1800x1080"}) no-repeat center center/cover`;
                    const estilo = document.styleSheets[0];
            
                    for (let i = 0; i < estilo.cssRules.length; i++) {
                        if (estilo.cssRules[i].selectorText === 'header::before') {
                            estilo.cssRules[i].style.background = nuevaImagen; 
                            break; 
                        }
                    }
                }); 
            });
        });
    });
}