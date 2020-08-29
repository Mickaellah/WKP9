// Grabed the element from the html page which you want to push the data in.
const movieList = document.querySelector('.movies');

// Fetch all the data from the url that is given in readme.md file.
async function fetchMovie() {
    const response = await fetch('https://ghibliapi.herokuapp.com/films', {
        headers: {
            Accept: 'application/json',
        }
    });

    const data = await response.json();
    // To sort the rt_score from the highest to the lowest.
    data.sort(function(a, b) {
        return b.rt_score - a.rt_score;
    })
    return data;
}


// An async function to display all the movies into html.
async function displayMovies() {
    const movies = await fetchMovie();
    // Generate the data into html.
    const html = movies.map(movie => {
        return `
        <article class="movie">
            <header class="heading">
                <h2 class="header">${movie.title}</h2>
                <p class="release_date">${movie.release_date}</p>
                <p class="score">${movie.rt_score}</p>
            </header>
            <div>
                <p class="description">${movie.description}</p>
            </div>
            <div class="responsible">
                <p class="director">${movie.director}</p>
                <p class="producer">${movie.producer}</p>
            </div>
        </article>
        `;
    });
    movieList.innerHTML = html.join('');
}

// Call the function.
displayMovies();