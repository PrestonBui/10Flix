//TMDB

const API_KEY = "api_key=b65bff51c90679a02263b13e7dc5a987";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const REC_URL =
  BASE_URL +
  "/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}";

const main = document.getElementById("main");
const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

let searchTerm = "";

getMovies();

function getMovies() {
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log("watchlist: " + JSON.stringify(watchlist));
  showMovies(watchlist);
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    console.log("movie: ", movie);
    const { id, title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    console.log("movie id: ", id);
    movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average} </span>
                <button class="add-watchlist" onclick="watchlistHandler('${id}');"/>${getAddRemoveWatchlistText(
      id
    )}</button>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`;
    main.appendChild(movieEl);
  });
}

function getAddRemoveWatchlistText(movieID) {
  let watchlist = getWatchlist();
  if (
    watchlist &&
    watchlist.find((movie) => {
      //   console.log("movie.id: ", movie.id, "movieID: ", movieID);
      if (movie.id == movieID) {
        // console.log("Movie IDs are EQUAL");
        return true;
      }
      //   console.log("Movie IDs are NOT EQUAL");
      return false;
    })
  ) {
    return "Remove from Watchlist";
  } else {
    return "Add to Watchlist";
  }
}

function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist") ?? JSON.stringify([]));
}

function setWatchlist(watchlist) {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function addMovieToWatchlist(movieID) {
  console.log("addMovieToWatchlist: ", movieID);
  let watchlist = getWatchlist();
  console.log("results: ", results);
  let movie = results.find((movie) => movie.id == movieID);
  console.log("movie: ", JSON.stringify(movie));
  watchlist.push({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
  });
  setWatchlist(watchlist);
}

function removeMovieFromWatchlist(movieID) {
  console.log("removeMovieFromWatchlist: ", movieID);
  let watchlist = getWatchlist();
  setWatchlist(watchlist.filter((movie) => movie.id != movieID));
}

function watchlistHandler(movieID) {
  console.log("watchlistHandler movieID: ", movieID);
  if (movieID) {
    const watchlist = getWatchlist();
    // console.log("watchlist: ", watchlist);
    if (watchlist && watchlist.find((movie) => movie.id == movieID)) {
      removeMovieFromWatchlist(movieID);
      console.log("removeMovieFromWatchlist: ", movieID);
    } else {
      addMovieToWatchlist(movieID);
      console.log("addMovieToWatchlist: ", movieID);
    }
  } else {
    console.error("movie id not found!");
  }

  getMovies();
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
