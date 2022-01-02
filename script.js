const cells = document.querySelectorAll('.cell');
const playerOneDom = document.querySelector('.one');
const playerTwoDom = document.querySelector('.two');

let currentPlayer = player1.letter === 'X' ? player1 : player2;
let usedCells = ['', '', '', '', '', '', '', '', ''];

let gameState = true;

function toggleClass (classNameToToggle) {
  playerTwoDom.classList.toggle(classNameToToggle);
  playerOneDom.classList.toggle(classNameToToggle);
}

const winningBoard = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function checkVictory() {
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningBoard[i];
    let a = usedCells[winCondition[0]];
    let b = usedCells[winCondition[1]];
    let c = usedCells[winCondition[2]];
    if (a === '' || b === '' || c === '') continue;
    if (a === b && a === c) {
      playerVictory('victory');
      break
    }
  }  
  if (!usedCells.includes('')) playerVictory(); //fix
}

// function endGame(winner) {
//   alert(winner.includes('lost') ? winner : `${winner} won (:`);
//   gameState = false; //fix
// }

function clickCell (cellTrgt, cellId) {
  usedCells[cellId] = currentPlayer.letter;
  cellTrgt.innerHTML = currentPlayer.letter;
  cellTrgt.classList.add(`control-${currentPlayer.style}`);
  checkVictory();
}

cells.forEach(cell => cell.addEventListener('click', (e) => {
  const targetedCell = e.target;
  const cellId = Number(e.target.dataset.cellIndex);
  if (usedCells[cellId] === '' && gameState) {
    clickCell(targetedCell, cellId);
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    toggleClass('current-player');
  }  
}))

document.querySelectorAll('.restart-btn').forEach(btn => btn.addEventListener('click', () => {
  usedCells = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.innerHTML = '';
    const delClass = cell.className.slice(5);
    if (delClass !== '') cell.classList.remove(delClass);
  });
  
  currentPlayer = player1.letter === 'X' ? player1 : player2;
  
  if (currentPlayer.style === 'player1' && !playerOneDom.classList[2]) {
    toggleClass('current-player');
  }
  
  if (currentPlayer.style === 'player2' && !playerTwoDom.classList[2]) {
    toggleClass('current-player');
  }

  // if (!playerOneDom.classList[2]) {
  // }

  // console.log(player1.letter);
  gameState = true;
}));