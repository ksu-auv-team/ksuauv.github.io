document.addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.tagName === 'A') {
        // Check if the Ctrl key (or Command key on Mac) is pressed
        const isCtrlPressed = event.ctrlKey || event.metaKey;

        // If Ctrl is pressed, allow the default behavior (open link in a new tab)
        if (isCtrlPressed) {
            return;
        }

        // Prevent the default link behavior
        event.preventDefault();

        // Change the parent window's location to the clicked URL
        window.parent.location.href = target.getAttribute('href');
    }
});

// Function to highlight the active link based on the parent window's URL
// Function to highlight the active link based on the parent window's URL
function highlightActiveLink() {
    // Get the file name from the parent window's URL
    const currentPageUrl = window.parent.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href").split('/').pop();
        if (currentPageUrl === linkHref) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Add an event listener to call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", highlightActiveLink);


// Add an event listener to call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", highlightActiveLink);
