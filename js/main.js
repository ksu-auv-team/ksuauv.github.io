document.addEventListener("DOMContentLoaded", function () {
    // Check if the current window is the top-level window

        // This code will run only in the top-level window
        const currentPageUrl = window.parent.location.pathname;
        const currentPageEnd = currentPageUrl.split('/').pop();
        const navLinks = document.querySelectorAll("nav a");
        const documentationPages = ["2020_sub_kirby.html"];

        navLinks.forEach((link) => {

            const linkHref = link.getAttribute("href");
            // alert(currentPageEnd + " = " + documentationPages[0] + "\nlinkhref: " + linkHref + "\nCurrentButton: " + link)

            if (currentPageUrl === linkHref) {
                // link.classList.add("active");
                document.getElementById('doc_link').classList.add('active');
            }

            if(documentationPages.includes(currentPageEnd)) {
                document.getElementById('doc_link').classList.add('go');
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
