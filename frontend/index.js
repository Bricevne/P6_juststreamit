const imdbScoreUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const dramaUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=drama&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const mysteryUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=mystery&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
const actionUrl = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=action&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="

/* Function to get all movie information */
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
  return `Title: ${title}\n\
  Genre: ${genre}\n\
  Release: ${releaseDate}\n\
  Rated: ${rated}\n\
  Imdb score: ${imdbScore}\n\
  Director: ${director}\n\
  Actors: ${actors}\n\
  Duration: ${duration}\n\
  Country: ${country}\n\
  Box Office: ${boxOffice}\n\
  Description: ${description}`
}
function addImage(tagClass, text) {
  document.querySelector(tagClass).appendChild(document.createElement("div"));
  document.querySelector(tagClass).lastChild.innerHTML += text
}

function getMoviesByPage(valueJson, start, end, movieClass) {
  for (let number = start; number < end; number++) {
    fetch(valueJson.results[number].url)
    .then(function(res) {
          if (res.ok) {
              return res.json();
          }
        })
    .then(function(movie) {
      document.querySelector(movieClass).appendChild(document.createElement("div"));
      document.querySelector(movieClass).lastChild.innerHTML += `<picture> <img alt="affiche de film" src="${movie.image_url}" id=${movie.id} class="other-movie__image" aria-hidden="true"/></picture>`;
          
      document.querySelector(".modal__image").setAttribute("src", movie.image_url);
      document.querySelector("#modal__movie-information").innerText = addInformation(movie);
      })
  }
}

/* BEST MOVIE */
fetch(imdbScoreUrl)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
    fetch(`${value.results[0].url}`)
    .then(function(res) {
          if (res.ok) {
              return res.json();
          }
        })
    .then(function(movie) {

      document.querySelector(".best-movie").appendChild(document.createElement("div"));
      document.querySelector(".best-movie div").classList.add("modal");
      document.querySelector(".best-movie").lastChild.innerHTML += 
      "<div class='modal__content'>\
        <span class='modal__close-btn'>&times;</span>\
        <picture>\
            <img class='modal__image' src='' alt='Movie image'/>\
        </picture>\
        <p id='modal__movie-information'></p>\
      </div>";

      document.querySelector(".best-movie").appendChild(document.createElement("div"));
      document.querySelector(".best-movie").lastChild.innerHTML += `<picture> <img alt="affiche de film" src="${movie.image_url}" id=${movie.id} class="best-movie__image" aria-hidden="true"/></picture> \
      <h1 class="best-movie__title">${movie.title}</h1>\
      <p class="best-movie__description">${movie.long_description}</p>`;
      
      document.querySelector(".modal__image").setAttribute("src", movie.image_url);
      document.querySelector("#modal__movie-information").innerText = addInformation(movie);
      })
    .then (function() {
        // Get the modal
        var modal = document.querySelector(".modal");

        // Get the button that opens the modal
        var btn = document.querySelector(".best-movie__btn");

        // Get the <span> element that closes the modal
        var span = document.querySelector(".modal__close-btn");


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
    })

  })

/* 7 other best movies */
fetch(imdbScoreUrl)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
  getMoviesByPage(value, 1, 5, ".new-releases"); /* Get the first 4 movies after the best scored one */
    fetch(value.next) /* Get the next page */
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        getMoviesByPage(value, 0, 3, ".new-releases"); /* Get the last 3 movies out of 7 after the best scored one */
  })
})

/* 7 other best movies */
fetch(dramaUrl)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
  getMoviesByPage(value, 0, 5, ".drama"); /* Get the first 4 movies after the best scored one */
    fetch(value.next) /* Get the next page */
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        getMoviesByPage(value, 0, 2, ".drama"); /* Get the last 3 movies out of 7 after the best scored one */
  })
})

fetch(mysteryUrl)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
  getMoviesByPage(value, 0, 5, ".mystery"); /* Get the first 4 movies after the best scored one */
    fetch(value.next) /* Get the next page */
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        getMoviesByPage(value, 0, 2, ".mystery"); /* Get the last 3 movies out of 7 after the best scored one */
  })
})


fetch(actionUrl)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
.then(function(value) {
  getMoviesByPage(value, 0, 5, ".action"); /* Get the first 4 movies after the best scored one */
    fetch(value.next) /* Get the next page */
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        getMoviesByPage(value, 0, 2, ".action"); /* Get the last 3 movies out of 7 after the best scored one */
  })
})