console.log('hello');


async function findmovie() {

    search_val = document.getElementById('moviename').value;
    var place = document.getElementById('movielist');
    place.innerHTML = '';
    var json_data = await fetch('https://www.omdbapi.com/?apikey=67605edc&s=' + search_val);
    var js_data = await json_data.json();
    console.log(search_val, js_data);
    js_data.Search.forEach(element => {
        place.innerHTML += `
        <div class="card mx-1 my-1" style="width: 16rem">
                    <img src="${element.Poster}" class="card-img-top" alt="Image" width="100%">
                <div class="card-body">
                    <p class="card-title text-secondary">${element.Title}</p>
                </div>
                <button onclick="movieSelected('${element.imdbID}')" class="btn btn-primary" href="#">Movie Details</button>
            </div>`
    });
    search_val.innerHTML = '';
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = './movie.html';
    return false;
}
async function getmovie() {
    var movie_detail = document.getElementById('movie_detail')
    var movieId = sessionStorage.getItem('movieId');
    var json_response = await fetch('https://www.omdbapi.com/?apikey=67605edc&i=' + movieId);
    var movie = await json_response.json();
    console.log(movie);
    // var movie = js_data.response.data;
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

    movie_detail.innerHTML = output;

}