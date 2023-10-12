/*Plan: Fetch JSON, store each entry as a document object.
        Object: title, date_published, documentation_url, photo_url, summary, tags
*/
let documents = [];
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
                    date: doc_date,
                    documentation_link: entry["documentation_url"],
                    photo: entry["photo_url"],
                    photo_alt: entry["photo_alt_description"],
                    summary: entry.summary,
                    tags: entry.tags
                }

                documents.push(document);
            })
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
}

document_list().then(() => {
    const sortedDocuments = documents.sort((a,b) => b.date - a.date);
    display_documents(sortedDocuments);
});

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
            display_documents(sortedByNew);
            break;
        case 1:
            clearDocumentList();
            const sortedByOld = documents.slice().sort((a,b) => a.date.getTime() - b.date.getTime());
            display_documents(sortedByOld);
            break;
        default:
            alert('There was an issue.');
    }
}

function clearDocumentList() {
    document.getElementById('docs_list').innerHTML = '';
}

function display_documents(documents) {
    documents.forEach((entry) => {
        const newDoc = document.createElement('a');
        newDoc.href = entry.documentation_link;
        newDoc.classList.add('discover_object');

        const doc_img = document.createElement('img');
        doc_img.src = `../media/${entry.photo}`;
        doc_img.alt = entry.photo_alt;

        const doc_content = document.createElement('div');
        doc_content.classList.add('discover_content');

        const doc_title = document.createElement('h2');
        doc_title.innerHTML = entry.title;

        const doc_date = document.createElement('p');
        const month = entry.date.toLocaleString('en-US', { month: 'long' });
        doc_date.innerHTML = `${entry.date.getFullYear()} ${month} ${entry.date.getDate()}`;

        const doc_summary = document.createElement('p');
        doc_summary.innerHTML = entry.summary;

        doc_content.appendChild(doc_title);
        doc_content.appendChild(doc_date);
        doc_content.appendChild(doc_summary);

        if(entry.photo.trim() !== "") {
            newDoc.appendChild(doc_img);
        } else {
            newDoc.classList.add("discover_no_image");
        }

        newDoc.appendChild(doc_content);

        document.getElementById('docs_list').appendChild(newDoc);
    })
}