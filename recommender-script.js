//TMDB

const API_KEY = 'api_key=b65bff51c90679a02263b13e7dc5a987';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const recForm = document.getElementById('rec-form');
const recInput = document.getElementById('recommender-input');
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

// getMovies(API_URL);

function getMovies(url){
    fetch(url).then(response => response.json()).then(data =>{
        console.log(data.results);
        if (data.results && data.results.length > 0) {
            getRecommendedMovies(BASE_URL + '/movie/' + data.results[0].id + '/recommendations?' + API_KEY)
        }
    })
}

function getRecommendedMovies(url){
    fetch(url).then(response => response.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average} </span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`
        main.appendChild(movieEl);
    })
}

function getColor(vote) {
    if(vote >= 8){
        return 'green'
    }
    else if(vote >= 5){
        return "orange"
    }
    else{
        return 'red'
    }
}

recForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const searchTerm = recInput.value;
    if(searchTerm){
        getMovies(searchURL + '&query=' + searchTerm);
    }
    else{
        getMovies(API_URL);
    }
})