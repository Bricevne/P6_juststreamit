const mySecondTimeout = setTimeout(main, 500);
let numberOfImages = 7;
let numberOfImagesScreen = 5;
let numberOfSlides = numberOfImages - numberOfImagesScreen;
let imageWidth = 280; // image width + padding right

const categories = ["new-releases", "drama", "mystery", "action"];

function main() {

    for (category of categories) {
      
        let container = document.querySelector(`#${category}`);
        let itemContainer = document.querySelector(`.other-movies__pictures.${category}`);
        let index = 0;

        itemContainer.style.transform = 'translateX(0)';

        let leftArrow = container.querySelector('.other-movies__left-arrow');
        let rightArrow = container.querySelector('.other-movies__right-arrow');

        leftArrow.addEventListener('click', function() {
        animate(-1);
        });

        rightArrow.addEventListener('click', function() {
        animate(1);
        });

        function animate(direction) {
        index += direction;
        
        if(index < 0) {
            index = numberOfSlides;
        }
        else if (index > numberOfSlides) {
            index = 0;
        }
        
        let translateX = imageWidth * index * -1;
        itemContainer.style.transform = `translateX(${translateX}px)`;
        }
        }
    }