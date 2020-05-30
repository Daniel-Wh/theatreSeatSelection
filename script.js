/**
 * global state object
 */
const state = {
  container: document.querySelector(".container"),
  seats: document.querySelectorAll(".row .seat:not(.occupied)"),
  count: document.getElementById("count"),
  total: document.getElementById("total"),
  movieSelect: document.getElementById("movie"),
  ticket: +document.getElementById("movie").value,
};
/**
 * update ui with local storage info
 */
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats && selectedSeats.length > 0) {
    state.seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  // empty values return false in JS
  if (selectedMovieIndex) {
    state.movieSelect.selectedIndex = selectedMovieIndex;
  }

  updateSelectedCount();
};

//update total/count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // create array of indexs and then store in local storage
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...state.seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  state.ticket = +state.movieSelect.value;
  state.total.textContent = state.ticket * selectedSeats.length;
  state.count.textContent = selectedSeats.length;
};
/**
 * set current selected movie data in local storage
 * @param {index of current movie} index
 * @param {cost of current movie} value
 */
const setMovieData = (index, value) => {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", value);
};
//movie select event
state.movieSelect.addEventListener("change", (e) => {
  state.ticket = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// seat click event
state.container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

window.addEventListener("load", populateUI);
