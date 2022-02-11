let matrix = Array(9)
  .fill(0)
  .map(() => Array(9).fill(0));
let matrixDublura = Array(9)
  .fill(0)
  .map(() => Array(9).fill(0));
let matrixVerifica = Array(9)
  .fill(0)
  .map(() => Array(9).fill(0));

let i = 0,
  j = 0;
function select(matrixVerifica) {
  i = j = 0;

  document.querySelectorAll(".all").forEach((el) => {
    if (el.querySelector("input")) {
      if (Number(el.querySelector("input").value) !== NaN)
        matrixVerifica[i][j] = Number(el.querySelector("input").value);
      else matrixVerifica[i][j] = 0;
    } else {
      if (Number(el.textContent) !== NaN)
        matrixVerifica[i][j] = Number(el.textContent);
      else matrixVerifica[i][j] = 0;
    }

    j++;
    if (j == 9) {
      j = 0;
      i++;
    }
  });
}
function checkOrizontally(element) {
  const pr = element.charCodeAt(0) - 97;
  let i = Math.floor(pr / 3);

  const trei = Number(element.slice(1, 2));
  const doi = Number(element.slice(2, 3));
  if (matrix[trei + i * 3].includes(matrix[trei + i * 3][doi + (pr % 3) * 3])) {
    return 1;
  }

  return 0;
}

function checkHorizontally(element) {
  let i,
    j = 0;
  const pr = element.charCodeAt(0) - 97;
  i = Math.floor(pr / 3);
  const trei = Number(element.slice(1, 2));
  const doi = Number(element.slice(2, 3));
  for (j = 0; j <= 8; j++) {
    if (
      matrix[j][doi + (pr % 3) * 3] == matrix[trei + i * 3][doi + (pr % 3) * 3]
    )
      return 1;
  }
  return 0;
}
function checkBox(element) {
  let i, j;
  const element2 = document.getElementById(element).textContent;
  console.log(element2);
  const pr = element.slice(0, 1);
  const trei = Number(element.slice(1, 2));
  const doi = Number(element.slice(2, 3));
  for (i = 0; i < 3; i++)
    for (j = 0; j < 3; j++) {
      console.log(
        pr + i + j,
        document.getElementById(`${pr + i + j}`).textContent
      );
      if (document.getElementById(`${pr + i + j}`).textContent === element2)
        if (i !== trei || j !== doi) return 1;
    }
  return 0;
}
function check(element) {
  return (
    checkBox(element) || checkHorizontally(element) || checkOrizontally(element)
  );
}

function eliminate(n, matrixDublura) {
  let random1 = Math.floor(Math.random() * 3),
    random2 = Math.floor(Math.random() * 3);
  for (let j = 0; j <= 2; j++)
    for (let k = 0; k <= 2; k++)
      for (let i = 0; i < Math.floor(n / 8); i++) {
        matrixDublura[random1 + j * 3][random2 + k * 3] = 0;
        (random1 = Math.floor(Math.random() * 3)),
          (random2 = Math.floor(Math.random() * 3));
      }
}

function putSudoku(matrix) {
  let i = 0,
    j = 0;

  document.querySelectorAll(".all").forEach((el) => {
    el.textContent = matrix[i][j];
    j++;
    if (j == 9) {
      j %= 9;
      i++;
    }
  });
}

function checkBoxMatrice(nr1, nr2) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (matrix[nr1 - (nr1 % 3) + i][nr2 - (nr2 % 3) + j] == matrix[nr1][nr2])
        if (nr1 - (nr1 % 3) + i != nr1 || nr2 - (nr2 % 3) + j != nr2) return 1;
    }
  return 0;
}
function checkHorizontallyMatrice(nr1, nr2) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i][nr2] == matrix[nr1][nr2]) if (i !== nr1) return 1;
  }
  return 0;
}
function checkOrizontallyMatrice(nr1, nr2) {
  for (let i = 0; i < 9; i++)
    if (matrix[nr1][i] == matrix[nr1][nr2]) if (i != nr2) return 1;
  return 0;
}
function checkMatrice(nr1, nr2) {
  return (
    checkBoxMatrice(nr1, nr2) ||
    checkHorizontallyMatrice(nr1, nr2) ||
    checkOrizontallyMatrice(nr1, nr2)
  );
}
function eliminateZero() {
  document.querySelectorAll(".all").forEach((el) => {
    if (el.textContent == "0") {
      el.classList.remove("fixed");
      el.textContent = "";
      el.innerHTML = `<input type="text" maxlength="1" min="1" max="9" />`;
    } else el.classList.add("fixed");
  });
}
function checkMatrice2(x, y, val) {
  let old = matrix[x][y];
  matrix[x][y] = val;

  let i =
    checkBoxMatrice(x, y) ||
    checkHorizontallyMatrice(x, y) ||
    checkOrizontallyMatrice(x, y);
  matrix[x][y] = old;

  return i;
}
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function emptyPlace() {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) if (matrix[i][j] == 0) return [i, j];
  return [-1, -1];
}
matrix = Array(9)
  .fill(0)
  .map(() => Array(9).fill(0));
function generateSudoku(x, y) {
  let k = 0;
  if (x == 8 && y == 9) return true;
  if (y == 9) {
    x++;
    y = 0;
  }
  shuffle(arr);
  for (k = 0; k < 9; k++) {
    if (checkMatrice2(x, y, arr[k]) == 0) {
      matrix[x][y] = arr[k];
      if (generateSudoku(x, y + 1)) return true;
    }
  }
  matrix[x][y] = 0;

  return false;
}
function copy(matrixDublura) {
  for (i = 0; i < 9; i++)
    for (j = 0; j < 9; j++) matrixDublura[i][j] = matrix[i][j];
}
generateSudoku(0, 0);
copy(matrixDublura);
eliminate(30, matrix);
putSudoku(matrix);

putSudoku(matrix);
eliminateZero();
function gresit(valoare) {
  if (valoare == 1) {
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".alert").style.backgroundColor = "#1aa526";
    document.querySelector(
      ".alert"
    ).innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
<strong>Corect!</strong>Pana acum`;
  } else if (valoare == 0) {
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".alert").style.backgroundColor = "#f44336";
    document.querySelector(
      ".alert"
    ).innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>Gresit!</strong> Ceva este in neregula.`;
  }
}
function verifica(matrixVerifica) {
  let k = 1;
  for (let i = 0; i <= 8; i++)
    for (let j = 0; j <= 8; j++) {
      console.log(matrixVerifica[i][j], k);
      if (matrixVerifica[i][j] == "0") k = 0;
    }
  return k;
}
function winner() {
  document.querySelector(".alert").style.display = "block";
  document.querySelector(".alert").style.backgroundColor = "#dbdf10";
  document.querySelector(
    ".alert"
  ).innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  <strong>Ai castigat</strong> `;
}
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
document.querySelector(".button").addEventListener("click", function (e) {
  e.preventDefault();
  matrix = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  let dificulate = document.querySelector("#dificultate").value;
  generateSudoku(0, 0);
  copy(matrixDublura);
  eliminate(dificulate, matrix);
  putSudoku(matrix);
  eliminateZero();
});

document.querySelector(".button2").addEventListener("click", function (e) {
  e.preventDefault();

  putSudoku(matrixDublura);
  document.querySelectorAll(".all").forEach((el) => el.classList.add("fixed"));
});
document.querySelector(".button1").addEventListener("click", function (e) {
  e.preventDefault();
  select(matrixVerifica);
  let valoare = 1;
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) {
      //console.log(matrixVerifica[i][j]);
      if (
        matrixVerifica[i][j] != matrixDublura[i][j] &&
        matrixVerifica[i][j] != 0
      )
        valoare = 0;
    }
  gresit(valoare);
  if (verifica(matrixVerifica) == 1) winner();
});
document.querySelector(".table").addEventListener("input", function (e) {
  if (Number(e.target.value) !== NaN && Number(e.target.value) > 0) {
    let num = e.target.value;

    select(matrixVerifica);

    console.log(matrixVerifica[0][0]);
  }
});

///////////////////////////////////////////////////
// function generateSudoku(number) {
//   matrix = Array(9)
//     .fill(0)
//     .map(() => Array(9).fill(0));
//   let number1 = 0,
//     random1 = Math.floor(Math.random() * 9),
//     random2 = Math.floor(Math.random() * 9),
//     random3 = Math.floor(Math.random() * 9 + 1);

//   while (number1 < number) {
//     if (matrix[random1][random2] == 0) {
//       matrix[random1][random2] = random3;
//       if (!checkMatrice(random1, random2)) {
//         number1++;
//         putSudoku();
//       } else matrix[random1][random2] = 0;
//     }
//     (random1 = Math.floor(Math.random() * 9)),
//       (random2 = Math.floor(Math.random() * 9)),
//       (random3 = Math.floor(Math.random() * 9 + 1));
//   }
//   eliminateZero();
// }

// generateSudoku(50);

// function emptyPlace() {
//   for (let i = 0; i < 9; i++)
//     for (let j = 0; j < 9; j++) if (matrix[i][j] == 0) return [i, j];
//   return [-1, -1];
// }

// function checkMatrice2(x, y, val) {
//   let old = matrix[x][y];
//   matrix[x][y] = val;

//   let i =
//     checkBoxMatrice(x, y) ||
//     checkHorizontallyMatrice(x, y) ||
//     checkOrizontallyMatrice(x, y);
//   matrix[x][y] = old;

//   return i;
// }
// function solverSudoku(matrix) {
//   let [x, y] = emptyPlace();
//   matrix[x][y] = 20;
//   console.log(x, y, checkMatrice2(x, y, 1));
//   if (x == -1 && y == -1) {
//     putsudoku();
//     return true;
//   }
//   for (valoare = 1; valoare <= 9; valoare++) {
//     if (checkMatrice2(x, y, valoare) == 0) {
//       matrix[x][y] = valoare;
//       putSudoku();
//       if (solverSudoku(matrix)) return true;
//       else matrix[x][y] = 0;
//     }
//   }

//   return false;
// }
// while (solverSudoku(matrix) == false) {
//   setTimeout(generateSudoku(50), 5000);
// }
// putSudoku();
////////////////////////////////TRASH

// function solveSudoku2() {
//   let [x, y] = emptyPlace();

//   if (x == -1) return true;
//   for (let i = 1; i <= 9; i++) {
//     matrix[x][y] = i;
//     console.log(x, y, matrix[x][y], "respectivul", checkBoxMatrice(x, y));
//     if (checkMatrice(x, y) == 0) {
//       if (solveSudoku2()) return true;
//     } else matrix[x][y] = 0;
//   }
//   putSudoku();
//   return false;
// }
// solveSudoku2();
// putSudoku();

// function checkMatrice2checkMatrice2(  row, col, num){
// let old = matrix[row][col];
// matrix[row][col]=num;
// checkMatrice()

// }
// // console.log(
// //   checkHorizontallyMatrice(3, 4),
// //   checkHorizontallyMatrice(5, 4),
// //   checkHorizontallyMatrice(4, 4)
// // );
// //for (i = 0; i < 9; i++) for (j = 0; j < 9; j++) console.log(matrix[i][j]);
// // console.log(matrix[5][0], matrix[6][0]);
// let N = 9;
// function solveSudoku(grid, row, col) {
//   /* If we have reached the 8th
//        row and 9th column (0
//        indexed matrix) ,
//        we are returning true to avoid further
//        backtracking       */
//   if (row == N - 1 && col == N) return true;

//   // Check if column value  becomes 9 ,
//   // we move to next row
//   // and column start from 0
//   if (col == N) {
//     row++;
//     col = 0;
//   }

//   // Check if the current position
//   // of the grid already
//   // contains value >0, we iterate
//   // for next column
//   if (grid[row][col] != 0) return solveSudoku(grid, row, col + 1);

//   for (let num = 1; num < 10; num++) {
//     // Check if it is safe to place
//     // the num (1-9)  in the given
//     // row ,col ->we move to next column
//     if (checkMatrice2(  row, col, num)) {
//       /*  assigning the num in the current
//             (row,col)  position of the grid and
//             assuming our assigned num in the position
//             is correct */
//       grid[row][col] = num;

//       // Checking for next
//       // possibility with next column
//       if (solveSudoku(grid, row, col + 1)) return true;
//     }

//     /* removing the assigned num , since our
//            assumption was wrong , and we go for next
//            assumption with diff num value   */
//     grid[row][col] = 0;
//   }
//   return false;
// }
// solveSudoku(matrix, 0, 0);
// putSudoku();
// function shuffle() {
//   let i,
//     j,
//     k,
//     numar,
//     alfa = "abcdefghi",
//     elementul1,
//     elementul2;
//   let random1 = Math.floor(Math.random() * 3),
//     random2 = Math.floor(Math.random() * 3),
//     random3 = Math.floor(Math.random() * 3),
//     random4 = Math.floor(Math.random() * 3);
//   for (i = 0; i < 9; i++)
//     for (
//       j = 0;
//       j < 9;
//       j++,
//         random1 = Math.floor(Math.random() * 3),
//         random2 = Math.floor(Math.random() * 3),
//         random3 = Math.floor(Math.random() * 3),
//         random4 = Math.floor(Math.random() * 3)
//     ) {
//       elementul1 = document.getElementById(`${alfa[i] + random1 + random2}`);
//       elementul2 = document.getElementById(`${alfa[i] + random3 + random4}`);

//       numar = elementul2.textContent;
//       elementul2.textContent = elementul1.textContent;
//       elementul1.textContent = numar;
//     }
// }
// function eliminate(numar) {
//   let i,
//     j,
//     elementul1,
//     random1,
//     random2,
//     random,
//     alfa = "abcdefghi";
//   (random1 = Math.floor(Math.random() * 9)),
//     (random2 = Math.floor(Math.random() * 9));
//   for (i = 0; i < 9; i++) {
//     {
//       elementul1 = document.getElementById(`${alfa[i] + random1 + random2}`);
//       console.log(alfa[i] + random1 + random2);
//       if (elementul1.textContent == "") j--;
//       elementul1.textContent = "";
//       elementul1.classList.remove("fixed");
//       elementul1.classList.add("guess");
//       (random1 = Math.floor(Math.random() * 9)),
//         (random2 = Math.floor(Math.random() * 9));
//     }

//     // random = Math.floor(Math.random() * numar) + 3;
//     // for (
//     //   j = 0;
//     //   j < random;
//     //   j++,
//     //     random1 = Math.floor(Math.random() * 3),
//     //     random2 = Math.floor(Math.random() * 3)
//     // ) {
//     //   elementul1 = document.getElementById(`${alfa[i] + random1 + random2}`);
//     //   console.log(alfa[i] + random1 + random2);
//     //   if (elementul1.textContent == "") j--;
//     //   elementul1.textContent = "";
//     //   elementul1.classList.remove("fixed");
//     //   elementul1.classList.add("guess");
//     // }
//   }
// }
