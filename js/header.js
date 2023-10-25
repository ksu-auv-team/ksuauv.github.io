function highlightActiveLink() {
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

document.addEventListener("DOMContentLoaded", highlightActiveLink);

