// Function to perform the search
function performSearch(query) {
    // Clear previous search results
    document.getElementById("display_wrapper").innerHTML = "";

    // Load the JSON file containing page data
    fetch("../docs/2023_index.json")
        .then((response) => {
            console.log("Response status:", response.status); // Add this line for debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Loop through each page and check for the query
            data.forEach((page) => {
                const pageUrl = page.url;
                const pageTitle = page.title;
                const pageContent = page.content;

                if (typeof pageContent === "string") {
                    // Check if the query exists in the page content
                    if (pageContent.toLowerCase().includes(query.toLowerCase())) {
                        // Create a result element
                        const resultElement = document.createElement("div");
                        resultElement.classList.add("search-result");

                        // Create a link to the page
                        const pageLink = document.createElement("a");
                        pageLink.href = pageUrl;
                        pageLink.textContent = pageTitle;
                        pageLink.classList.add("search-result-link");

                        // Create a snippet of content with the query highlighted
                        const contentSnippet = document.createElement("p");
                        contentSnippet.classList.add("search-result-snippet");
                        const startIndex = pageContent.toLowerCase().indexOf(query.toLowerCase());
                        const snippetText = pageContent.substring(
                            Math.max(0, startIndex - 50),
                            Math.min(pageContent.length, startIndex + query.length + 50)
                        );
                        contentSnippet.innerHTML = `${snippetText.substring(0, startIndex)}<strong>${snippetText.substring(startIndex, startIndex + query.length)}</strong>${snippetText.substring(startIndex + query.length)}`;

                        // Append link and content snippet to the result element
                        resultElement.appendChild(pageLink);
                        resultElement.appendChild(contentSnippet);

                        // Append the result element to the display wrapper
                        document.getElementById("display_wrapper").appendChild(resultElement);
                    }
                    else {
                        alert('not found')
                    }
                }
            });
        })
        .catch((error) => {
            console.error("Broken: ", error);
        });
}

// Function to handle search button click
function handleSearchButtonClick() {
    const query = document.getElementById("search-input").value.trim();
    if (query !== "") {
        performSearch(query);
    }
}

// Function to handle Enter key press in search input
function handleSearchInputKeyPress(event) {
        const query = document.getElementById("search-input").value.trim();
        if (query !== "") {
            performSearch(query);
        }
}