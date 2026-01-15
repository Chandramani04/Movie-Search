// Use HTTPS to avoid mixed-content errors when the site is served over HTTPS (e.g. Netlify)
const API_URL = "https://www.omdbapi.com/?apikey=1fd9a2ed";
// taking user input from search box
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const favorites = document.getElementById("favorites");

//Create a Global Array to store favorite movies
// if we decide to persist favorite movies across sessions , we can load them from localStorage here
let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
// if already favorite movies exist in localStorage , load them into favoriteMovies array , otherwise initialize as empty array

// also load favorite movies into the DOM on page load
// displayFavoriteMovies(); or 
document.addEventListener("DOMContentLoaded", displayFavoriteMovies);
// 'DOMContentLoaded' event is fired when the initial HTML document has been completely loaded and parsed , without waiting for stylesheets , images and subframes to finish loading

async function fetchMovieData(movieTitle) {
    try {
        // omdb api gives us a search parameter to search for movies by their title , syntax :   append &s=movie_title at the end of the url
        // by default , api returns only 1 page , to get more results we can append &page=2 or &page=3 and so on , each page contains 10 results
        // encode the movie title to handle spaces and special characters
        const response = await fetch(`${API_URL}&s=${encodeURIComponent(movieTitle)}&page=1`);
        if (!response.ok) { // Check if the response is ok (status code 200-299) 
            // response object has an ok property which is true if the status code is in the range 200-299 
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.Response === "False") {
            movieResults.innerHTML = `
            <p>No results found for "${movieTitle}". Please try a different title.</p>
            `;
            throw new Error("API returned an error: " + data.Error);
        }
        console.log(data.Search);

        // data is an object containing a search array with movie results as objects
        displayMovieResults(data.Search);
        // console.log(`Search results for "${movieTitle}":`);
        // data.Search.forEach((movie) => {
        //     console.log(`Title: ${movie.Title}, Year: ${movie.Year}, imdbID: ${movie.imdbID}`);
        // });

    }
    catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    const movieTitle = searchInput.value.trim();
    if (movieTitle) {
        fetchMovieData(movieTitle);
    } else {
        alert("Please enter a movie title");
    }
});

// Display movie results in the DOM
function displayMovieResults(movies) {
    // data.Search was an array of movie objects  , here it's passed as movies
    movieResults.innerHTML = ""; // Clear previous results
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title.replace("'", "\\'")}', '${movie.Year}', '${movie.Poster}')">Add to Favorite</button>
        `;
        /*
        <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Year}', '${movie.Poster}')">Add to Favorite</button> , there is a catch here , since we are already using backticks for template literals , double quotes for html attributes and single quotes for onclick function parameters ,if any of the movie title contains a single quote , it will cause a syntax error because the single quote will terminate the string early.
        To fix this , we need to escape single quotes in all the paramter passed to the addToFavorites function like this :
        '${movie.Title.replace("'","\\'")}' i.e. replace single quote with escaped single quote
        */

        movieCard.className = "movie-card"; // Set class name for styling
        movieResults.appendChild(movieCard);

        // Alternative way without innerHTML
        // movieCard.className = "movie-card";

        // const poster = document.createElement("img");
        // poster.src = movie.Poster;
        // poster.alt = movie.Title;
        // movieCard.appendChild(poster);

        // const title = document.createElement("h3");
        // title.textContent = movie.Title;
        // movieCard.appendChild(title);

        // const year = document.createElement("p");
        // year.textContent = `Year: ${movie.Year}`;
        // movieCard.appendChild(year);

        // const imdbID = document.createElement("p");
        // imdbID.textContent = `imdbID: ${movie.imdbID}`;
        // movieCard.appendChild(imdbID);

        // movieResults.appendChild(movieCard);
    });

}

// implemnt favorite button functionality
function addToFavorites(imdbID, title, year, poster) {
    // Here we can implement the logic to add the movie to favorites
    // maintain a global array of favorite movies
    // [{imdbID, title, year, poster}, ...]
    const movie = { imdbID, title, year, poster };
    if (!favoriteMovies.some((favMovie) => favMovie.imdbID === imdbID)) {
        favoriteMovies.push(movie);
        // now we can store this array in localStorage to persist the data
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }

    displayFavoriteMovies();
}

// Function to display favorite movies
function displayFavoriteMovies() {
    // it's very similar to displayMovieResults function
    favorites.innerHTML = ""; // Clear previous favorites
    favoriteMovies.forEach((movie) => { // movie = {imdbID, title, year, poster}
        const movieCard = document.createElement("div");
        movieCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Year: ${movie.year}</p>
        <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorite</button>
        `;
        movieCard.className = "movie-card"; // Set class name for styling
        favorites.appendChild(movieCard);
    });
}

// Function to remove a movie from favorites
function removeFromFavorites(imdbID) {
    // const index = favoriteMovies.findIndex((movie) => movie.imdbID === imdbID);
    // if (index !== -1) {
    //     favoriteMovies.splice(index, 1); // remove from array
    //     localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    //     displayFavoriteMovies();
    // }

    // another of doing the same thing
    favoriteMovies = favoriteMovies.filter((movie) => movie.imdbID !== imdbID);
    // filter out all the movies whose imdbID is not equal to the given imdbID
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    displayFavoriteMovies();
}