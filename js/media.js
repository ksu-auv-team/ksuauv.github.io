document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.media_container');
    images.forEach(image => {
        image.addEventListener('click', function() {
            const img = this.querySelector('img');
            document.getElementById("enlarged_photo").src = img.src;
            toggleEnlargedImage();
        });
    });
});

let enlarged = false;
function toggleEnlargedImage() {
    const enlargedPhoto = document.getElementById('enlarged_photo');

    if (!enlarged) {
        document.getElementById('enlarged_photo_container').style.display = 'flex';
        document.getElementById('shroud').style.display = 'initial';
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
    } else {
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
