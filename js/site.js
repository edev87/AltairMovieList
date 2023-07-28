const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzlhNjJiOTJhOWNhYzQ2M2M5NzhjZDA4OTUwYWUwZiIsInN1YiI6IjYwODVlZjczNTMyYWNiMDA1ODg3MWI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HkCsGSbSSyz0cnITBswX3mgp7gwXhrQcc9t2abAnQQ'

async function getMovies() {
  try {
    let response = await fetch('https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

    let data = await response.json();

    return data;

  } catch (error) {
    console.error(error);

  }

}

async function displayMovies() {
  const movieListDiv = document.getElementById('movie-list');
  const moviePosterTemplate = document.getElementById('movie-card-template');

  let data = await getMovies();

  let movies = data.results; //movies is an array of objects

  movies.forEach(movie => {
    let movieCard = moviePosterTemplate.content.cloneNode(true);
    let titleElement = movieCard.querySelector('.card-body > h5');
    titleElement.textContent = movie.title;
    let descriptionElement = movieCard.querySelector('p.card-text');
    descriptionElement.textContent = movie.overview;
    let movieImgElement = movieCard.querySelector('.card img');
    movieImgElement.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    let infoBtn = movieCard.querySelector('button.btn');
    infoBtn.setAttribute('data-movieId', movie.id)
    movieListDiv.appendChild(movieCard);

  });

};

async function showMovieDetails(btn) {
  let movieModal = document.getElementById('movie-modal');
  let movieId = btn.getAttribute('data-movieId');
  document.getElementById("movie-modal-paragraph").textContent = movieId;

  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

    let data = await response.json();

    document.getElementById('modal-title').textContent = data.original_title;
    document.getElementById('movie-modal-paragraph').textContent = data.overview;
    document.getElementById('popularity').textContent = data.popularity;
    document.getElementById('status').textContent = data.status;
    document.getElementById('genres').textContent = data.genres[0].name + " " + "|" + " "
      + data.genres[1].name + "  " + "|" + " " + data.genres[2].name;
    document.getElementById('release-date').textContent = new Date(data.release_date).toLocaleDateString();
    document.getElementById('movie-img').setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);

  } catch (error) {
    console.error(error);

  }
}
