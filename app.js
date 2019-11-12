class movie {
  constructor(name, religion) {
    this.name = name;
    this.religion = religion;
  }
}

class UI {
  addmovie(movie) {
    let html =
      '<div class="display-movie flew-row"><div class="display-name">%name%</div><div class="display-religion">%religion%</div></div>';

    let newHtml = html.replace("%name%", movie.name);
    newHtml = newHtml.replace("%religion%", movie.religion);
    document.querySelector(".display").insertAdjacentHTML("beforeend", newHtml);
  }

  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("religion").value = "";
  }

  removemovie(target) {
    if (target.className === "remove-movie") {
      target.parentElement.remove();
      // console.log(e.target.parentElement);
    }
  }
}

document.getElementById("movie-form").addEventListener("submit", function(e) {
  const name = document.getElementById("name").value;
  const religion = document.getElementById("religion").value;

  const movie = new movie(name, religion);

  const ui = new UI();
  ui.addmovie(movie);
  ui.clearFields();
  e.preventDefault();
});

document.querySelector(".display").addEventListener("click", function(e) {
  const ui = new UI();
  ui.removemovie(e.target);
  ui.clearFields();
  e.preventDefault();
});








async function getMovie() {
  try {
    const result = await fetch(`http://www.omdbapi.com/?t=${DOMStrings.name.value}&apikey=5c0cf985`);
    const data = await result.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

const DOMStrings = {
  input: document.getElementById("movie-form"),
  name: document.getElementById("movie-name-input"),
  displayName: document.querySelector("movie-name"),
  displayReleaseDate: document.querySelector(".movie-releasedate"),
  displayRuntime: document.querySelector(".movie-runtime"),
  displayGenre: document.querySelector(".movie-genre"),
  displayDirector: document.querySelector(".movie-director"),
  displayActors: document.querySelector(".movie-actors"),
  displayPlot: document.querySelector(".movie-plot")
};

DOMStrings.input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".nes-btn").click();
  }
});

function getMovie() {
  DOMStrings.input.addEventListener("submit", async function(e) {
    e.preventDefault();
    try {
      const result = await fetch(
        `http://www.omdbapi.com/?t=${DOMStrings.name.value}&apikey=5c0cf985`
      );
      const data = await result.json();
      // console.log(data);

      const displayMovie = function(data) {
        DOMStrings.displayName.innerText = data.name;
        DOMStrings.displayNum.innerText = data.id;
        DOMStrings.displayImageFront.src = data.sprites.front_default;
        DOMStrings.displayImageBack.src = data.sprites.back_default;
        DOMStrings.displayImageShinyFront.src = data.sprites.front_shiny;
        DOMStrings.displayImageShinyBack.src = data.sprites.back_shiny;
        DOMStrings.type.textContent = data.types.map(data => data.type.name);
      };
      displayMovie(data);
    } catch (err) {
      console.log(err);
    }
  });
}

getPkmn();
