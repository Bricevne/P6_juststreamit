const imdbScoreUrl = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
const movieUrl = "http://localhost:8000/api/v1/titles/"


async function getMoviePageById(id) {
    const response = await fetch("http://localhost:8000/api/v1/titles/" + id)
    let data = await response.json();
    return data
}
//-------------------------------------------------------------------- Get first two pages of movies information

async function getAllMoviesData(genre, page = 1, movies = []) {
    const response = await fetch(`${imdbScoreUrl}&page=${page}&genre=${genre}`)
    let data = await response.json();

    if (page <= 2) {
        movies = movies.concat(data.results);
        page++;
        return getAllMoviesData(genre, page, movies)
    }else{
        return movies
    }
}

//-------------------------------------------------------------------- Fetch movies id and api url

function getMoviesIdAndUrl(movies) {
    let movieInformation = {
        id: [],
        imageUrl: []
    }
    for (let number = 0; number < 8; number++) {
        movieInformation.id.push(movies[number].id);
        movieInformation.imageUrl.push(movies[number].image_url);
    }
    return movieInformation
}

//-------------------------------------------------------------------- Set image in HTML with movie id

function setImageHTML(movieInformation, moviePlace, movieType) {
    document.querySelector(moviePlace).innerHTML += `<picture> <img alt="affiche de film" src="${movieInformation.imageUrl}" id=${movieInformation.id} class=${movieType} aria-hidden="true"/></picture>`;
}

//-------------------------------------------------------------------- Set best video image

getAllMoviesData("%20").then((movies) => {
    let movieInf = getMoviesIdAndUrl(movies);
    const bestMovieId = movieInf.id.shift();
    const bestMovieImageUrl = movieInf.imageUrl.shift();
    const bestMovie = {
        id: bestMovieId,
        imageUrl: bestMovieImageUrl
    }
    setImageHTML(bestMovie, ".best-movie", "best-movie__image")
    getMoviePageById(bestMovieId).then((information) => {
        document.querySelector(".best-movie").innerHTML += `<h1 class="best-movie__title">${information.title}</h1>\
        <p class="best-movie__description">${information.long_description}</p>`

    })
    document.querySelector(".best-movie__btn").id = bestMovieId

})

//-------------------------------------------------------------------- Set 7 best videos except for the best one

getAllMoviesData("%20").then((movies) => {
    let movieInf = getMoviesIdAndUrl(movies);
    movieInf.id.shift();
    movieInf.imageUrl.shift();
    for (let i = 0; i < 7; i++) {
        const MovieId = movieInf.id[i];
        const MovieImageUrl = movieInf.imageUrl[i];
        const movie = {
            id: MovieId,
            imageUrl: MovieImageUrl
        } 
    setImageHTML(movie, ".new-releases", "other-movies__image")
    }
})
//-------------------------------------------------------------------- Set 7 best drama videos

getAllMoviesData("drama").then((movies) => {
    let movieInf = getMoviesIdAndUrl(movies);
    movieInf.id.shift();
    movieInf.imageUrl.shift();
    for (let i = 0; i < 7; i++) {
        const MovieId = movieInf.id[i];
        const MovieImageUrl = movieInf.imageUrl[i];
        const movie = {
            id: MovieId,
            imageUrl: MovieImageUrl
        } 
    setImageHTML(movie, ".drama", "other-movies__image")
    }
})

//-------------------------------------------------------------------- Set 7 best mystery videos

getAllMoviesData("mystery").then((movies) => {
    let movieInf = getMoviesIdAndUrl(movies);
    movieInf.id.shift();
    movieInf.imageUrl.shift();
    for (let i = 0; i < 7; i++) {
        const MovieId = movieInf.id[i];
        const MovieImageUrl = movieInf.imageUrl[i];
        const movie = {
            id: MovieId,
            imageUrl: MovieImageUrl
        } 
    setImageHTML(movie, ".mystery", "other-movies__image")
    }
})

//-------------------------------------------------------------------- Set 7 best action videos

getAllMoviesData("action").then((movies) => {
    let movieInf = getMoviesIdAndUrl(movies);
    movieInf.id.shift();
    movieInf.imageUrl.shift();
    for (let i = 0; i < 7; i++) {
        const MovieId = movieInf.id[i];
        const MovieImageUrl = movieInf.imageUrl[i];
        const movie = {
            id: MovieId,
            imageUrl: MovieImageUrl
        } 
    setImageHTML(movie, ".action", "other-movies__image")
    }
})
