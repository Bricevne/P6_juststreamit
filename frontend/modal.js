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

const myTimeout = setTimeout(main, 500);

function main() {
    // Get the modal
    var modal = document.querySelector(".modal");
    // Get the button that opens the modal
    var btn = document.querySelector(".best-movie__btn");
    // Get the <span> element that closes the modal
    var span = document.querySelector(".modal__close-btn");


    // When the user clicks on the button, open the modal

    btn.addEventListener("click", async function() {
        const response = await fetch("http://localhost:8000/api/v1/titles/" + btn.id)
        let data = await response.json()
        document.querySelector(".modal__image").setAttribute("src", data.image_url);
        document.querySelector("#modal__movie-information").innerText = addInformation(data);
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

    const images = document.querySelectorAll(".other-movies__image");
    for (let movie of images) {
        movie.addEventListener("click", async function() {
            let response = await fetch("http://localhost:8000/api/v1/titles/" + movie.id)
            let data = await response.json()
            document.querySelector(".modal__image").setAttribute("src", data.image_url);
            document.querySelector("#modal__movie-information").innerText = addInformation(data);
            modal.style.display = "block";
        })
    }
}