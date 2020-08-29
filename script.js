const movieList = document.querySelector('.movies');


async function fetchMovie() {
    const response = await fetch('https://ghibliapi.herokuapp.com/films', {
        headers: {
            Accept: 'application/json',
        }
    });

    const data = await response.json();
    return data;
}


async function displayMovies() {
    const movies = await fetchMovie();
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
    console.log(html);
    movieList.innerHTML = html.join('');
}

displayMovies();