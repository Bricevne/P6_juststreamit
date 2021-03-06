//-------------------------------------------------------------------- Function to get all movie information 
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
    const description = movie.description;
    return `<h1 class="modal__movie-information__title">${title}</h1>
    <h2 class="modal__movie-information__production">${director}, ${country}</h2>

    <div class="modal__movie-information__data">
        <p>${genre}</p>
        <p>${releaseDate}</p>
        <p>${duration}min</p>
    </div>

    <div class="modal__movie-information__cast">
        Actors : <p>${actors}</p>
        Description : <p>${description}</p>
    </div>

    <div class="modal__movie-information__score">
        <p>Rated: ${rated}</p>
        <p>Box Office: ${boxOffice}</p>
        <p>Imdb score: ${imdbScore}</p>
    </div>`
  }


//-------------------------------------------------------------------- Function to add all click events

function main() {
    // Get the modal
    var modal = document.querySelector(".modal");
    // Get the button that opens the modal
    var btn = document.querySelector(".best-movie__btn");
    // Get the <span> element that closes the modal
    var span = document.querySelector(".modal__close-btn");


    // When the user clicks on the button play, open the modal

    btn.addEventListener("click", async function() {
        const response = await fetch("http://localhost:8000/api/v1/titles/" + btn.id)
        let data = await response.json()
        document.querySelector(".modal__image").setAttribute("src", data.image_url);
        document.querySelector(".modal__movie-information").innerHTML = addInformation(data);
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

    // When the user clicks on an image, open the modal

    const images = document.querySelectorAll(".other-movies__image");
    for (let movie of images) {
        movie.addEventListener("click", async function() {
            let response = await fetch("http://localhost:8000/api/v1/titles/" + movie.id)
            let data = await response.json()
            document.querySelector(".modal__image").setAttribute("src", data.image_url);
            document.querySelector(".modal__movie-information").innerHTML = addInformation(data);
            modal.style.display = "block";
        })
    }
}


//-------------------------------------------------------------------- Call the main function with a delay

setTimeout(main, 700);