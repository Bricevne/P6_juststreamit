
function addInformation(movie) {
  const title = movie.title;
  const genre = movie.genres.join(", ");
  const releaseDate = movie.date_published;
  const rated = movie.rated;
  const imdbScore = movie.imdb_score;
  const director = movie.directors[0];
  const actors = movie.actors.join(", ");
  const duration = movie.duration;
  const country = movie.countries[0];
  const boxOffice = movie.avg_vote;
  const description = movie.long_description;
  const inf = `Title: ${title}\n\
  Genre: ${genre}\n\
  Release: ${releaseDate}\n\
  Rated: ${rated}\n\
  Imdb score: ${imdbScore}\n\
  Director: ${director}\n\
  Actors: ${actors}\n\
  Duration: ${duration}\n\
  Country: ${country}\n\
  Box Office: ${boxOffice}\n\
  Description: ${description}`;
  return inf
}


  // Get the modal
  var modal = document.getElementById("modal");

  // Get the button that opens the modal
  var btn = document.getElementById("best-movie__btn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("modal__close-btn")[0];
  
  // When the user clicks on the button, open the modal
  btn.addEventListener("click", function() {
    modal.style.display = "block";
  })
  
  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function() {
    modal.style.display = "none";
  })
  
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  })

fetch("http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
    var bestMovieId = value.results[1].id;
    fetch("http://localhost:8000/api/v1/titles/" + bestMovieId)
    .then(function(res) {
          if (res.ok) {
              return res.json();
          }
        })
      .then(function(movie) {
        document.getElementsByClassName("best-movie")[0].innerHTML += `<picture> <img alt="affiche de film" src="${movie.image_url}" id=${value.id} class="best-movie__image" aria-hidden="true"/> </picture> \
        <h1 class="best-movie__title">${movie.title}</h1>\
        <p class="best-movie__description">${movie.long_description}</p>`
        document.getElementsByClassName("modal__image")[0].setAttribute("src", movie.image_url);
        document.getElementById("modal__movie-information").innerText = addInformation(movie);
        });
  })