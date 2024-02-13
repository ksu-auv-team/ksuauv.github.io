document.addEventListener("DOMContentLoaded", function () {
    // Select card_containers and assign to an array
    const cardContainers = document.getElementsByClassName('card_container');
    const cardContainersList = Array.from(cardContainers);
    // Iterate over the array add the .flip class to the selected card
    cardContainersList.forEach(function (card) {
        //Create listener for hovering over
        card.addEventListener('mouseover', function () {
            if(card.classList.contains('flip')) { return }
            //First iterate over all the cards and remove the .flip class if it has it
            cardContainersList.forEach(function (currentCard) {
                currentCard.classList.remove('flip');
            });

            card.classList.add('flip');
        })

        //Create listener for click
        card.addEventListener('click', function () {
            if(card.classList.contains('flip')) { return }
            //First iterate over all the cards and remove the .flip class if it has it
            cardContainersList.forEach(function (currentCard) {
                currentCard.classList.remove('flip');
            });

            card.classList.add('flip');
        })

        //Create listener for mouseout and remove all cases of class .flip
        card.addEventListener('mouseout', function () {
            cardContainersList.forEach(function (currentCard) {
                currentCard.classList.remove('flip');
            });
        })
    })
})