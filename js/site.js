const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzlhNjJiOTJhOWNhYzQ2M2M5NzhjZDA4OTUwYWUwZiIsInN1YiI6IjYwODVlZjczNTMyYWNiMDA1ODg3MWI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HkCsGSbSSyz0cnITBswX3mgp7gwXhrQcc9t2abAnQQ'
//https://api.themoviedb.org/3/movie/popular


async function getMovies() {
  //fetch returns a promise, which promises to return data
  //await => for things that take a long time, so im going to wait for it to be done
  //async function => might write code that will take a long time to execute

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
    let descriptionElement = movieCard.querySelector('.card-body > p');
    descriptionElement.textContent = movie.descriptionElement;
    movieListDiv.appendChild(movieCard);

  });

};

