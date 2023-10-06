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
