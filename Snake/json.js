const canvas = document.getElementById("myCanvas");

const context = canvas.getContext("2d");

const grid = 30;
let count = 0;

var snake = {
  x: 240,
  y: 240,

  //viteza
  dx: grid,
  dy: 0,

  cells: [],

  maxCells: 4,
};
var apple = {
  x: 480,
  y: 480,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = " rgb(37, 37, 37)";
  context.fillRect(0, 0, 600, 600);
  context.stroke();

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = "green";
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      document.querySelector(".scor").textContent = ` ${snake.maxCells - 4}`;

      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 240;
        snake.y = 240;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        document.querySelector(".scor").textContent = ` 0`;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
      }
    }
  });
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
document.addEventListener("keydown", function (e) {
  //ASA SCOATEAM SI ESECUL BACKTRACKINGULUI DE A MERGE IN DRRAPTA CAND MERGEAM DEJA IN STANGE

  //STANGA
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // SUS
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  //DREAPTA
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // JOS
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
