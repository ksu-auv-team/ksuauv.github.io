document.addEventListener("DOMContentLoaded", function() {
    fetchImageUrls().then(() => {
        /*-----------------------------------------------   END FETCH IMAGES -----------------------------------------------*/

        /*-----------------------------------------------   START ADDING IMAGE FUNCTIONS  -----------------------------------------------*/
        const images = document.querySelectorAll('.media_container');
        images.forEach(image => {
            image.addEventListener('click', function() { // Update enlarged photo and title for clicked image
                const img = this.querySelector('img');
                document.getElementById("enlarged_photo").src = img.src;
                toggleEnlargedImage();
            });

            image.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const img = this.querySelector('img');
                    document.getElementById("enlarged_photo").src = img.src;
                    toggleEnlargedImage();
                }
            });
        });
        /*-----------------------------------------------   END IMAGE FUNCTIONS  -----------------------------------------------*/
    });

});

/*-----------------------------------------------   DISPLAY EXTERNAL IMAGES   -----------------------------------------------*/

//Fetch the json file containing the end part of the url and the year for various images
function fetchImageUrls() {
    return fetch("../media/photos.json")
        .then((response) => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((entry) => {
                createImage(entry.url, entry.year)
            })
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
}

function createImage(url_end, year) {
    // Select correct year section (given in json | div id is simply the year)
    const image_gallery = document.getElementById(year);

    //create the image container to hold the image
    const image_container = document.createElement("div");
    image_container.classList.add("media_container");
    image_container.tabIndex = 0;

    //create the image and set its values
    const img = document.createElement("img");
    //deo2ttpox is the username | q_35 means retrieve at quality: 35%
    img.src = `https://res.cloudinary.com/deo2ttpox/image/upload/q_35/${url_end}`;
    img.alt = url_end;
    img.loading = "lazy";

    //append the image to the container and then to the section
    image_container.appendChild(img);
    image_gallery.appendChild(image_container)
}
/*-----------------------------------------------   END DISPLAY EXTERNAL IMAGES   -----------------------------------------------*/


let enlarged = false;
function toggleEnlargedImage() {
    const enlargedPhoto = document.getElementById('enlarged_photo');

    if (!enlarged) { // Open image
        document.getElementById('enlarged_photo_container').style.display = 'flex';
        document.getElementById('shroud').style.display = 'initial';
        setMenuState(true); // Call function in main.js to disable menu button

        enlargedPhoto.style.display = 'initial';

        enlargedPhoto.animate(
            {
                transform: ['scale(.75)', 'scale(1)'],
                opacity: [0, 1]
            },
            {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );

        enlarged = true;
    } else { // Close Image
        setMenuState(false); // Call function in main.js to enable menu button
        enlargedPhoto.animate(
            {
                transform: ['scale(1)', 'scale(.75)'],
                opacity: [1, 0]
            },
            {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );
        setTimeout(displayOff, 400);
        enlarged = false;
    }
}

function displayOff() {
    document.getElementById('enlarged_photo_container').style.display = 'none';
    document.getElementById('shroud').style.display = 'none';
    document.getElementById('enlarged_photo').style.display = 'none';
}
