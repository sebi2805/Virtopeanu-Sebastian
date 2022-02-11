"use strict";
const grid = document.querySelector(".container");
let currentPlayer = 0;
const players = [
  document.querySelector(".player0"),
  document.querySelector(".player1"),
];
players[0].style.backgroundColor = "rgb(39, 39, 39)";
players[0].style.color = "rgb(228, 228, 228)";
/////////////////////////////////////////////////
function clicked1(event) {
  event.preventDefault();

  if ((event.target.querySelector("img").src = "unknown")) {
    event.target.querySelector("img").src = `player${currentPlayer}.png`;

    players[(currentPlayer + 1) % 2].style.backgroundColor = "rgb(39, 39, 39)";
    players[(currentPlayer + 1) % 2].style.color = "rgb(228, 228, 228)";
    players[currentPlayer].style.backgroundColor = " rgb(228, 228, 228)";
    players[currentPlayer].style.color = "rgb(39, 39, 39)";
    let numar1 = Number(
      event.target.querySelector("img").classList.value.slice(-2, -1)
    );
    let numar2 = Number(
      event.target.querySelector("img").classList.value.slice(-1)
    );
    event.target.querySelector("img").setAttribute("value", `${currentPlayer}`);

    checkVerically(numar1);
    checkOrizontally(numar2);
    checkSpecial();
    currentPlayer = (currentPlayer + 1) % 2;
  }
}
///////////////////////////////////
const containsClass = function (numar1) {
  numar1 = Number(numar1);

  const linia = [
    document.querySelector(`.cell-${numar1}1`).getAttribute("value"),
    document.querySelector(`.cell-${numar1}2`).getAttribute("value"),
    document.querySelector(`.cell-${numar1}3`).getAttribute("value"),
  ];
  return linia[1] == linia[0] && linia[0] == linia[2];
};
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const addWinner = function (numar1) {
  numar1 = Number(numar1);
  document
    .querySelector(`.cell-${numar1}${((numar1 + 1) % 3) + 1}`)
    .parentElement.classList.add("winner");
  document
    .querySelector(`.cell-${numar1}${((numar1 + 2) % 3) + 1}`)
    .parentElement.classList.add("winner");
  document
    .querySelector(`.cell-${numar1}${(numar1 % 3) + 1}`)
    .parentElement.classList.add("winner");

  grid.removeEventListener("click", clicked1, false);
};
///////////////////////////////////
const checkVerically = function (numar) {
  numar = Number(numar);

  if (containsClass(numar)) {
    addWinner(numar);
  }
};
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const contains2 = function (numar1) {
  const linia = [
    document.querySelector(`.cell-1${numar1}`).getAttribute("value"),
    document.querySelector(`.cell-2${numar1}`).getAttribute("value"),
    document.querySelector(`.cell-3${numar1}`).getAttribute("value"),
  ];
  return linia[1] == linia[0] && linia[0] == linia[2];
};

const addWinner2 = function (numar1) {
  document
    .querySelector(`.cell-1${numar1}`)
    .parentElement.classList.add("winner");
  document
    .querySelector(`.cell-2${numar1}`)
    .parentElement.classList.add("winner");
  document
    .querySelector(`.cell-3${numar1}`)
    .parentElement.classList.add("winner");
  grid.removeEventListener("click", clicked1);
};
////////////////////////////////////////
const checkOrizontally = function (numar1) {
  numar1 = Number(numar1);
  if (contains2(numar1)) {
    addWinner2(numar1);
  }
};
const checkSpecial = function () {
  // if (numar1 + numar2 != 4) return 0;
  const linia1 = [
    document.querySelector(`.cell-11`).getAttribute("value"),
    document.querySelector(`.cell-22`).getAttribute("value"),
    document.querySelector(`.cell-33`).getAttribute("value"),
  ];
  const linia2 = [
    document.querySelector(`.cell-31`).getAttribute("value"),
    document.querySelector(`.cell-22`).getAttribute("value"),
    document.querySelector(`.cell-13`).getAttribute("value"),
  ];
  // console.log(
  //   (linia1[1] == linia1[0] &&
  //     linia1[0] == linia1[2] &&
  //     linia1[0] == `${currentPlayer}`) ||
  //     (linia2[1] == linia2[0] &&
  //       linia2[0] == linia2[2] &&
  //       linia2[0] == `${currentPlayer}`)
  // );
  if (
    linia1[1] == linia1[0] &&
    linia1[0] == linia1[2] &&
    linia1[0] == `${currentPlayer}`
  ) {
    grid.removeEventListener("click", clicked1);

    document.querySelector(`.cell-11`).parentElement.classList.add("winner");
    document.querySelector(`.cell-22`).parentElement.classList.add("winner");
    document.querySelector(`.cell-33`).parentElement.classList.add("winner");
    grid.removeEventListener("click", clicked1);
  }
  if (
    linia2[1] == linia2[0] &&
    linia2[0] == linia2[2] &&
    linia2[0] == `${currentPlayer}`
  ) {
    grid.removeEventListener("click", clicked1);
    document.querySelector(`.cell-13`).parentElement.classList.add("winner");
    document.querySelector(`.cell-22`).parentElement.classList.add("winner");
    document.querySelector(`.cell-31`).parentElement.classList.add("winner");
    grid.removeEventListener("click", clicked1);
  }
  // return linia1[1] == linia1[0] && linia1[0] == linia1[2];
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
grid.addEventListener("click", clicked1, false);
document.querySelector(".button").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("muie");
  document.querySelectorAll(".cell").forEach((el) => {
    console.log(el.children);
    // el.querySelector("img").removeAttribute("src");
    el.querySelector("img").src = "";
    el.querySelector("img").removeAttribute("value");
    el.classList.remove("winner");
    currentPlayer = 0;
    players[0].style.backgroundColor = "rgb(39, 39, 39)";
    players[0].style.color = "rgb(228, 228, 228)";
    players[1].style.backgroundColor = "rgb(228, 228, 228)";
    players[1].style.color = "rgb(39, 39, 39)";
  });
  grid.addEventListener("click", clicked1);
});
