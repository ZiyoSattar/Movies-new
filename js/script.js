let elTemplate = document.getElementById("template").content
let elList = document.querySelector(".list");
let elSelect = document.querySelector(".form-select");
let elInput = document.querySelector(".form-control");
let newArr = [];
movies = movies.splice(0, 100)
// let sortedRating = [movies.rating];

// const toTop = sortedRating.sort((a,b) => b-a).map(d => d*10); 
// console.log(toTop);

let elMoviesArr = movies.forEach(movie => {
  newArr.push({
    title: movie.Title,
    year: movie.movie_year,
    rating: `Rating: ${movie.imdb_rating}`,
    img:`https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    category: movie.Categories,
    summary: movie.summary,
  })
});


let createElement = (movie) => {
  let newItem = elTemplate.cloneNode(true);
  newItem.querySelector(".card-rating").textContent = movie.rating;
  newItem.querySelector(".card-img-top").src = movie.img;
  newItem.querySelector(".card-text").textContent = movie.summary.split(" ").splice(0, 15).join(" ");
  newItem.querySelector(".categories").textContent = movie.category.split("|").flat();
  newItem.querySelector(".card-title").textContent = movie.title;
  return newItem;

} 

let renderFilm = (moveies) => {
  elList.innerHTML = null;
  let elNewWrapper = document.createDocumentFragment();

  moveies.forEach(movie => {
    if(movie.ytid != "") {
      elNewWrapper.append(createElement(movie))
    }
  })

  elList.appendChild(elNewWrapper)
}

renderFilm(newArr);

let categories = [...new Set(movies.map(movie => movie.Categories.split("|")).flat())];
categories.forEach(movie => {
  let categoryOption = document.createElement("option");
  categoryOption.textContent = movie;
  categoryOption.value = movie;
  elSelect.appendChild(categoryOption)
})

elSelect.addEventListener("change", () => {
  let filt = newArr.filter(movie => movie.category.includes(elSelect.value));

  if(elSelect.value == "choose-category") {
    renderFilm(newArr);
  } else {
    renderFilm(filt)
  }
});

elInput.oninput = () => {
  let elInputVal = elInput.value;
  let regEx = new RegExp(elInputVal.trim(), "gi")
  let filmName = newArr.filter(movie => regEx.test(movie.title));
  renderFilm(filmName); 
};

let arrDefault = newArr.slice(0, 100); 

let elMoviesSelectSort = document.querySelector(".movies__select-sort");

elMoviesSelectSort.addEventListener("change", function () {

  if (this.value == "choose-sort-default") {
    renderMovies(arrDefault);
  }

  else if (this.value == "choose-sort-A-Z") {
    newArr = newArr.sort((a, b) => {
      let movName1 = a.title.toLowerCase();
      let movName2 = b.title.toLowerCase();
      if (movName1 < movName2) return -1
      return 1
    });
    renderMovies(newArr);
  }

  else if (this.value == "choose-sort-Z-A") {
    newArr = newArr.sort((a, b) => {
      let movName1 = a.title.toLowerCase();
      let movName2 = b.title.toLowerCase();
      if (movName1 > movName2) return -1
      return 1
    });
    renderMovies(newArr);
  }

  else if (this.value == "choose-sort-0-10") {
    newArr = newArr.sort((a, b) => a.retImdb - b.retImdb);
    renderMovies(newArr);
  }

  else if (this.value == "choose-sort-10-0") {
    newArr = newArr.sort((a, b) => b.retImdb - a.retImdb);
    renderMovies(newArr);
  }

})
