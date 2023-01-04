// API is from themoviedb.org
const APILINK = "";
const SEARCHAPI = "";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

console.log(APILINK);

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Display found movies
const returnMovies = async function (url) {
  let data = await fetch(url);
  data = await data.json();

  // Check if there are any results
  if (data.results < 1) {
    alert("No results found !");
  }

  // Display each movie
  data.results.forEach((element) => {
    const div_card = document.createElement("div");
    div_card.setAttribute("class", "card");

    const div_row = document.createElement("div");
    div_row.setAttribute("class", "row");

    const div_column = document.createElement("div");
    div_column.setAttribute("class", "column");

    const image = document.createElement("img");
    image.setAttribute("class", "thumbnail");
    image.setAttribute("id", "image");

    const title = document.createElement("h3");
    title.setAttribute("id", "title");

    const link = document.createElement("a");
    link.setAttribute("href", "random");

    const center = document.createElement("center");

    title.innerHTML = `${element.title}<br>`;
    link.innerHTML = `<a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;

    image.src = IMG_PATH + element.poster_path;

    center.appendChild(image);
    div_card.appendChild(center);
    div_card.appendChild(title);
    div_card.appendChild(link);
    div_column.appendChild(div_card);
    div_row.appendChild(div_column);

    main.appendChild(div_row);
  });
};

// Listen for search movie reuest
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    main.innerHTML = "";
    search.value = "";
  } else {
    alert("You must insert a movie name !");
  }
});

returnMovies(APILINK);
