const quotes = document.getElementById("content");
const button = document.getElementById("fetch");
const API_KEY = "api-key";

function displayQuote() {
    fetch("https://api.api-ninjas.com/v1/quotes",{
        headers: {'X-Api-Key': API_KEY}
    })
    .then((response) => response.json())
    .then((data)=>{
        quotes.textContent = `"${data[0].quote}" - ${data[0].author}`;
    })
    .catch((error) => {
      quote.textContent = "Failed to fetch quote.";
      console.log(error);
    });
}

button.addEventListener("click",displayQuote);
