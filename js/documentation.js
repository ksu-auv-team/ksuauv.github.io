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
                const date_parts = entry.date_published.split('-');
                const doc_date = new Date(
                    parseInt(date_parts[0]),    //Year
                    parseInt(date_parts[1]) - 1,    //Month
                    parseInt(date_parts[2]),    //Day
                )

                const month = doc_date.toLocaleString('en-US', { month: 'long' });

                const shortened_date = `${doc_date.getFullYear()} ${month} ${doc_date.getDate()}`;

                const document = {
                    title: entry.title,
                    date: shortened_date,
                    documentation_link: entry.documentation_url,
                    photo: entry.photo_url,
                    photo_alt: entry.photo_alt_description,
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

document_list().then((res) => {
    const sortedDocuments = documents.sort((a,b) => b.date - a.date);

    display_documents(sortedDocuments);
});

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
        doc_date.innerHTML = entry.date;

        const doc_summary = document.createElement('p');
        doc_summary.innerHTML = entry.summary;

        doc_content.appendChild(doc_title);
        doc_content.appendChild(doc_date);
        doc_content.appendChild(doc_summary);

        newDoc.appendChild(doc_img);
        newDoc.appendChild(doc_content);

        document.getElementById('docs_list').appendChild(newDoc);
    })
}