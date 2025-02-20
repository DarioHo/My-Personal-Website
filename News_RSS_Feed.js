document.addEventListener("DOMContentLoaded", function () {
    const rssUrl = "https://feeds.arstechnica.com/arstechnica/index";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.items) {
                console.error("No items found in RSS feed.");
                return;
            }

            const items = data.items.slice(0, 3); // Limit to 3 articles
            let html = "";

            items.forEach(item => {
                html += `
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.link}" target="_blank">Read more</a>
                    </div>
                `;
            });

            document.getElementById("feed").innerHTML = html;
        })
        .catch(error => console.error("Error fetching RSS feed:", error));
});