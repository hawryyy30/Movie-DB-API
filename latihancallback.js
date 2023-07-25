const searchBar = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchButton');


searchButton.addEventListener('click', async function(){
  const movieKeyword = searchBar.value;
  const movies = await getMovies(movieKeyword);
  updateUI(movies);
})


function getMovies(movieKeyword){
  return fetch(`http://www.omdbapi.com/?s=${movieKeyword}&apikey=5847a1d5`)
  .then(movies => movies.json())
  .then(movies => movies.Search)
}

function updateUI(movies){
  const cardStack = document.querySelector('.cardStack')
    let cards = '';
    movies.forEach(movie => cards += showMovies(movie))
    cardStack.innerHTML = cards; 
}

document.addEventListener('click', async function(event){
 if(event.target.classList.contains('modalDetailButton')){
  const imdbid = event.target.dataset.imdbid;
  const movieDetails = await getMovieDetails(imdbid);
  updateModalDetail(movieDetails);
}
})

function getMovieDetails(imdbid){
  return fetch(`http://www.omdbapi.com/?i=${imdbid}&apikey=5847a1d5`)
  .then(movieDetails => movieDetails.json())
  .then(movieDetails => movieDetails)
}

function updateModalDetail(movieDetails){
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = showMovieDetails(movieDetails);
}


function showMovies(movie){
  return `
  <div class="col md-4 my-3">
      <div class="card" style="width: 18rem">
        <img src="${movie.Poster}" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          <a href="#" class="btn btn-primary modalDetailButton" data-imdbid="${movie.imdbID}" data-toggle="modal" data-target="#movieDetailModal">Show Details</a>
        </div>
      </div>
    </div>
`;
}

function showMovieDetails(movie){
  return `
  <div class="container">
  <div class="row">
    <div class="col md-3"><img class="img-fluid" src="${movie.Poster}" alt=""></div>
    <div class="col md-3">
      <ul class="list-group">
        <li class="list-group-item"><h4>${movie.Title}(${movie.Year})</h4></li>
        <li class="list-group-item"><strong>Director : ${movie.Director}</strong></li>
        <li class="list-group-item"><strong>Actors : ${movie.Actors}</strong></li>
        <li class="list-group-item"><strong>Writer : ${movie.Writer}</strong></li>
        <li class="list-group-item">Plot : ${movie.Plot}</li>
      </ul>
    </div>
  </div>
  `;
}