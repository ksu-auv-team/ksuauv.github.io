document.addEventListener("DOMContentLoaded", function () {
    const currentPageUrl = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        if (currentPageUrl.endsWith(linkHref)) {
            link.classList.add("active");
        }
    });
});

function openDialog() {
    window.parent.document.getElementById('dialog').style.display = 'initial';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

let toggled = false;
function toggleNav() {
    const iframe = window.parent.document.querySelector('iframe');
    const nav = iframe.contentDocument.getElementById('nav');
    const header = document.getElementById('header');
    // Toggle the 'show' class on the nav element to translate it down or up.
    header.classList.toggle('show');
    nav.classList.toggle('show');
}

function changeParentIframeSrc(newSrc) {
    // Access the parent document's <iframe> element and update its src attribute.
    window.parent.document.querySelector('iframe').src = newSrc;
}
