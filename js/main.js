document.addEventListener("DOMContentLoaded", function () {
    // Check if the current window is the top-level window

        // This code will run only in the top-level window
        const currentPageUrl = window.parent.location.pathname;
        const currentPageEnd = currentPageUrl.split('/').pop();
        const navLinks = document.querySelectorAll("nav a");
        const documentationPages = ["2020_sub_kirby.html", "2023_sub_empoleon.html"];

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
const state = {
    disable_menu: false
}

function setMenuState(boolean) {
    state.disable_menu = boolean;
}

function openDialog() {
    window.parent.document.getElementById('dialog').style.display = 'initial';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

let toggled = false;
function toggleNav() {
    if(!state.disable_menu) {
        if(window.innerWidth>769){
            const iframe = window.parent.document.querySelector('iframe');
            const nav = iframe.contentDocument.getElementById('nav');
            const header = document.getElementById('header');
            // Toggle the 'show' class on the nav element to translate it down or up.
            header.classList.toggle('show');
            nav.classList.toggle('show');
        } else {
            toggleSideNav()
        }
    } else {
        alert("Please close the current action to open the menu.");
    }
}

let sideNav = false;
function toggleSideNav() {
    if(!sideNav) {
        document.getElementById('side_nav').style.left = '0';
        sideNav = true;
    } else {
        document.getElementById('side_nav').style.left = '-100%';
        sideNav = false;
    }
}
