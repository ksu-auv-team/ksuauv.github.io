// Function to perform the search
function performSearch() {
    const query = document.getElementById("search-input").value;
    // Clear previous search results

    if(query.trim() === "") {
        document.getElementById("display_wrapper").style.display = "none";
        return;
    }

    document.getElementById("display_wrapper").innerHTML = "";

    // Load the JSON file containing page data
    fetch("../docs/2023_index.json")
        .then((response) => {
            console.log("Response status:", response.status); // Debugging Status Codes
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            let resultCount = document.getElementsByClassName("search-result").length;
            // Loop through each page and check for the query
            data.forEach((page) => {
                const pageUrl = page.url;
                const pageTitle = page.title;
                const pageContent = page.content;

                if (typeof pageContent === "string") {
                    //check page content
                    if (pageContent.toLowerCase().includes(query.toLowerCase())) {
                        const unfilteredSentences = pageContent.split(/[.!?]/);
                        const sentences = unfilteredSentences.filter(sentence => sentence.trim() !== '');

                        sentences.forEach((sentence) => {
                            if (sentence.toLowerCase().includes(query.toLowerCase())) {
                                sentence = sentence.replace(new RegExp(query, 'gi'), `<strong class="colored_text">${query}</strong>`);
                                resultCount++;
                                createSearchResult(pageUrl, pageTitle, sentence);
                            }
                        })
                    }

                    if (resultCount !== 0) {
                        document.getElementById("display_wrapper").style.display = "initial";
                    }
                }
            });

            //none found function
            if(resultCount === 0) {
                const noResults = document.createElement("p");
                noResults.classList.add("text_centered");
                noResults.innerText = "No Results";
                document.getElementById("display_wrapper").appendChild(noResults);
            } else {
                const counter = document.createElement("p");
                counter.classList.add("text_righted");
                counter.innerText = `Found ${resultCount} results.`;
                document.getElementById("display_wrapper").prepend(counter);
            }
        })

        .catch((error) => {
            console.error("Broken: ", error);
        });
}

function createSearchResult(pageUrl, pageTitle, content) {
    // Create a result element
    const resultElement = document.createElement("div");
    resultElement.classList.add("search-result");

    // Create a link to the page
    const pageLink = document.createElement("a");
    pageLink.href = pageUrl;
    pageLink.setAttribute("target", "_top");
    pageLink.classList.add("search-result-link");
    pageLink.textContent = pageTitle;

    // Create a snippet of content with the query highlighted
    const contentSnippet = document.createElement("p");
    contentSnippet.classList.add("search-result-snippet");
    contentSnippet.innerHTML = content;

    // Append link and content snippet to the result element
    resultElement.appendChild(pageLink);
    resultElement.appendChild(contentSnippet);

    // Append the result element to the display wrapper
    document.getElementById("display_wrapper").appendChild(resultElement);
}