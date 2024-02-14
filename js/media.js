document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.media_container');
    images.forEach(image => {
        image.addEventListener('click', function() { // Update enlarged photo and title for clicked image
            const img = this.querySelector('img');
            document.getElementById("enlarged_photo").src = img.src;
            const image_title = document.getElementById('image_title');
            //Get image title for :before pseudo element and get rid of quotation marks
            image_title.innerText = (getComputedStyle(image, ':before').content).replace(/^["']|["']$/g, '');
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
/*-----------------------------------------------   END DISPLAYING IMAGES   -----------------------------------------------*/
});

let enlarged = false;
function toggleEnlargedImage() {
    const enlargedPhoto = document.getElementById('enlarged_photo');

    if (!enlarged) { // Open image
        document.getElementById('enlarged_photo_container').style.display = 'flex';
        document.getElementById('shroud').style.display = 'initial';
        document.getElementById('image_title').style.display = 'initial';
        setMenuState(true); // Call function in main.js to disable menu button
        setTimeout(() => {document.getElementById('image_title').style.opacity = '1';}, 150);

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
        document.getElementById('image_title').style.opacity = '0';
        setTimeout(displayOff, 400);
        enlarged = false;
    }
}

function displayOff() {
    document.getElementById('enlarged_photo_container').style.display = 'none';
    document.getElementById('shroud').style.display = 'none';
    document.getElementById('enlarged_photo').style.display = 'none';
    document.getElementById('image_title').style.display = 'none';
}
