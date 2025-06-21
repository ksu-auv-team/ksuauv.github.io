document.addEventListener("DOMContentLoaded", function () {
    // Check if the current window is the top-level window

        // This code will run only in the top-level window
        const currentPageUrl = window.parent.location.pathname;
        const currentPageEnd = currentPageUrl.split('/').pop();
        const navLinks = document.querySelectorAll("nav a");
        const documentationPages = [
            "2020_sub_kirby.html",
            // "2023_sub_gyarados.html"
            "2025_sub.html"
        ];

        navLinks.forEach((link) => {

            const linkHref = link.getAttribute("href");

            if (currentPageUrl === linkHref) {
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

let sideNav = false;
function toggleSideNav() {
    if(window.innerWidth < 993){
        if(!sideNav) {
            document.getElementById('side_nav').style.left = '0';
            sideNav = true;
        } else {
            document.getElementById('side_nav').style.left = '-100%';
            sideNav = false;
        }
    } else {
        window.location.href = '../index.html';
    }
}
