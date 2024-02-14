document.addEventListener("DOMContentLoaded", function () {
    // Select card_containers and assign to an array
    const cardContainers = document.getElementsByClassName('card_container');
    const cardContainersList = Array.from(cardContainers);
    // Idea: Iterate over the array add the .flip class to the selected card. Remove when needed.

    // If on mobile, cards flip on click/tap
    if(window.innerWidth <= 768) {
        let currentlyFlipped = false; //Keep track if a card is flipped
        console.log("Mode: Mobile");
        cardContainersList.forEach(function (card) {
            card.addEventListener('click', function () {

                if(currentlyFlipped) {  //If already flipped: un-flip
                    cardContainersList.forEach(function (currentCard) {
                        currentCard.classList.remove('flip');
                    });
                    currentlyFlipped = false;
                } else { // Else --> Flip it
                    //First, iterate over all the cards and remove the .flip class if it has it
                    cardContainersList.forEach(function (currentCard) {
                        currentCard.classList.remove('flip');
                    });

                    card.classList.add('flip');
                    currentlyFlipped = true;
                }
            })
        })
    }

    //If on PC, cards flip on mouse hovering
    if(window.innerWidth >= 769) {
        console.log("Mode: PC")
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
            //Create listener for mouseout and remove all cases of class .flip
            card.addEventListener('mouseout', function () {
                cardContainersList.forEach(function (currentCard) {
                    currentCard.classList.remove('flip');
                });
            })
        })
    }
/*-------------------------------------------   END CARD FLIPPING JS    -------------------------------------------*/


    // Have the title of the page dynamically change every few seconds.
    const title = document.getElementById('team_attention');
    const currentYear = new Date().getFullYear();
    const previous_phrase_index = 0;
    const phrase_list = [
        currentYear + " Crew Snapshot",
        currentYear + " Team Spotlight",
        "Meet Our Crew: " + currentYear + " Edition",
        "Team " + currentYear + " Unleashed",
        "Faces of Success: " + currentYear,
        "Our " + currentYear + " All-Stars",
        currentYear + " Dream Team",
        "The Winning Lineup: " + currentYear,
        currentYear + "'s Finest Faces",
        currentYear + " Crew Snapshot",
        "Behind the Scenes: Team " + currentYear
    ];
    setInterval(() => {
        title.style.opacity = '0';
        // Keep selecting a random phrase if they are of the same index
        let current_index;
        do {
            current_index = Math.floor(Math.random() * phrase_list.length);
        } while (current_index === previous_phrase_index);

        setTimeout(() => {
            title.innerHTML = phrase_list[current_index];
            title.style.opacity = '1';
        }, 2000)
    }, 10000)

}) // This closing bracket & parentheses is for the DOMContentLoaded Listener on line 1. All code goes inside here