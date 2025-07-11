/*Plan: Fetch JSON, store each entry as a document object.
        Object: title, date_published, documentation_url, photo_url, summary, tags
*/
let documents = [];
let currentOrder = [];

// Displays how many results are visible
function updateCount(condition) {
    if(condition === 0) {
        document.getElementById("result_count").innerText = `${currentOrder.length} Results`;
    } else {
        const documentList = document.getElementsByClassName("discover_object");
        let visibleCount = 0;

        for (const document of documentList) {
            if (!document.classList.contains("discover_hidden")) {
                visibleCount++;
            }
        }
        document.getElementById("result_count").innerText = `${visibleCount} Results`;
    }
}

// Function to retrieve the documentation index JSON and create entry objects
function document_list() {
    return fetch("../docs/documentation_index.json")
        .then((response) => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((entry) => {
                const date_parts = entry["date_published"].split('-');
                const doc_date = new Date(
                    parseInt(date_parts[0]),    //Year
                    parseInt(date_parts[1]) - 1,    //Month
                    parseInt(date_parts[2]),    //Day
                )

                const document = {
                    title: entry.title,
                    author: entry.author,
                    date: doc_date,
                    documentation_link: entry["documentation_url"],
                    photo: entry["photo_url"],
                    photo_alt: entry["photo_alt_description"],
                    summary: entry.summary,
                    tags: entry.tags
                }

                documents.push(document);
            })
            currentOrder = documents;
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
}

// Process what to do after parsing the documentation index JSON
document_list().then(() => {
    const sortedDocuments = documents.sort((a,b) => b.date.getTime() - a.date.getTime());
    display_documents(sortedDocuments);
    sort_docs();
    updateCount(0);
});

// Called if any of the sort buttons are pressed
function sort_docs() {
    const sorting_radios = document.querySelectorAll('input[name="sorting"]');

    let radio_value;

    for(const radio of sorting_radios) {
        if(radio.checked) {
            radio_value = parseInt(radio.value);
            break;
        }
    }

    switch (radio_value) {
        case 0:
            clearDocumentList();
            const sortedByNew = documents.slice().sort((a,b) => b.date.getTime() - a.date.getTime());
            currentOrder = sortedByNew;
            display_documents(sortedByNew);
            break;
        case 1:
            clearDocumentList();
            const sortedByOld = documents.slice().sort((a,b) => a.date.getTime() - b.date.getTime());
            currentOrder = sortedByOld;
            display_documents(sortedByOld);
            break;
        default:
            alert('There was an issue.');
    }
    updateCount();
}

// Helper function used to reset the list
function clearDocumentList() {
    document.getElementById('docs_list').innerHTML = '';
    updateCount();
}

// Create HTML elements, input information from entries created in document_list() and display them
function display_documents(documents) {
    const docsList = document.getElementById('docs_list');
    // Keep track of years to display dividers
    const renderedYears = [];
    documents.forEach((entry) => {
        // If entry has no date, then skip. They need a date
        if (!(entry.date instanceof Date) || isNaN(entry.date)) return;
        const year = entry.date.getFullYear().toString();

        // If this year hasn't been added yet, add a year divider
        if (!renderedYears.includes(year)) {
            const documentation_spacer = document.createElement('div');
            documentation_spacer.classList.add('documentation_spacer');
            documentation_spacer.id = `year-${year}`;
            documentation_spacer.setAttribute('data-year', year);

            const divider_decoration_1 = document.createElement('span');
            divider_decoration_1.classList.add('divider_decoration');
            documentation_spacer.appendChild(divider_decoration_1);

            const divider_title = document.createElement('h1');
            divider_title.innerText = year;
            documentation_spacer.appendChild(divider_title);

            const divider_decoration_2 = document.createElement('span');
            divider_decoration_2.classList.add('divider_decoration');
            documentation_spacer.appendChild(divider_decoration_2);

            docsList.appendChild(documentation_spacer);
            renderedYears.push(year);
        }

        const newDoc = document.createElement('a');
        newDoc.href = entry.documentation_link;
        newDoc.classList.add('discover_object');
        newDoc.setAttribute('data-year', year);

        // Set the download attribute and give the name of the file being downloaded
        if(entry.tags.includes("download")) {
            newDoc.download = `${entry.title}`;
        }

        // Open the link in a new page as it leads to page not on this site
        if(entry.tags.includes('external')) {
            newDoc.target = "_blank";
        }

        const doc_img = document.createElement('img');
        if(entry.photo.trim() !== "") { // If an external link, append the link, if not, set the directory location. Also attach given alt text
            if(entry.photo.startsWith('https')) {
                doc_img.src = entry.photo;
            } else {
                doc_img.src = `../media/${entry.photo}`;
            }

            doc_img.alt = entry.photo_alt;
            doc_img.classList.add('discover_img_down');
        }

        const doc_content = document.createElement('div');
        doc_content.classList.add('discover_content');

        const doc_title = document.createElement('h2');
        doc_title.innerHTML = entry.title;

        let author_exists = false;
        const doc_author = document.createElement("p");
        doc_author.classList.add('text_inverted');
        if(entry.author.trim().length !== 0) {
            author_exists = true;
            doc_author.innerHTML = entry.author;
        }

        const date_icon_container = document.createElement('div');
        date_icon_container.classList.add("content_date_icon");

        const doc_date = document.createElement('p');
        const month = entry.date.toLocaleString('en-US', { month: 'long' });
        doc_date.innerHTML = `${entry.date.getFullYear()} ${month} ${entry.date.getDate()}`;
        date_icon_container.appendChild(doc_date)

        if(entry.tags.includes("download")) {
            const download_icon = document.createElement("img");
            download_icon.src = "../media/download_svg.svg";
            download_icon.alt = "Downloadable"
            download_icon.classList.add("document_icon");
            date_icon_container.appendChild(download_icon);
        }

        if(entry.tags.includes("external")) {
            const external_icon = document.createElement("img");
            external_icon.src = "../media/external_svg.svg";
            external_icon.alt = "External SIte"
            external_icon.classList.add("document_icon");
            date_icon_container.appendChild(external_icon);
        }

        const doc_summary = document.createElement('p');
        doc_summary.innerHTML = entry.summary;

        doc_content.appendChild(doc_title);
        if(author_exists) {
            doc_content.appendChild(doc_author);
        }
        doc_content.appendChild(date_icon_container);
        doc_content.appendChild(doc_summary);

        if(entry.photo.trim() !== "") {
            newDoc.appendChild(doc_img);
        } else {
            newDoc.classList.add("discover_no_image");
        }

        newDoc.appendChild(doc_content);

        docsList.appendChild(newDoc);
    })
}

// Un-filter the entries on the page
function unFilterResults() {
    const document_list = document.querySelectorAll(".discover_object, .documentation_spacer");
    for (const item of document_list) {
        item.classList.remove("discover_hidden");
    }
}

// Filters results based on the tags selected
function filterResults() {
    unFilterResults();
    let filters = [];
    const document_list = document.getElementsByClassName("discover_object");

    const filter_checkboxes = document.querySelectorAll("input[name='filtering']");
    for(const input of filter_checkboxes) {
        if(input.checked) {
            filters.push(input.value);
        }
    }

    let docIndex = 0;
    currentOrder.forEach((obj) => {
        if (!(obj.date instanceof Date) || isNaN(obj.date)) return; // skip if not a doc

        if (!filters.every(filter => obj.tags.includes(filter))) {
            document_list[docIndex].classList.add("discover_hidden");
        }
        docIndex++;
    });


    // Hide year dividers with no visible documents
    const yearDividers = document.querySelectorAll('.documentation_spacer');
    yearDividers.forEach(divider => {
        const year = divider.dataset.year;
        const hasVisibleDocs = Array.from(document.querySelectorAll(`.discover_object[data-year="${year}"]`))
            .some(doc => !doc.classList.contains('discover_hidden'));

        if (!hasVisibleDocs) {
            console.log(`Year ${year} has no visible docs`);
            divider.classList.add('discover_hidden');
        } else {
            console.log(`Year ${year} has visible docs`);
            divider.classList.remove('discover_hidden');
        }
    });

    updateCount();
}

// Used for mobile if the sort/filter area does not fit
let side_filter_toggled = false;
function toggleSideFilter() {
    if (side_filter_toggled) {
        document.getElementById('doc_menu').style.right = '-50%';
        side_filter_toggled  = false;
    } else {
        document.getElementById('doc_menu').style.right = '0';
        side_filter_toggled = true;
    }
}