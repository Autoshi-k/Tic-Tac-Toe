const logWindow = document.querySelector('.chat');
const resetText = 'I want to reset the game!';
const scoreText = 'Show me the scores!';

let tieCount = 0;
let player1 = {
  name: 'Player 1',
  letter: 'X',
  score: 0,
  style: 'player1'
};

let player2 = {
  name: 'Player 2',
  letter: 'O',
  score: 0,
  style: 'player2'
};


function createDiv(whoSent) {
  const msg = document.createElement('div');
  msg.classList.add(whoSent);
  return msg;
}

function createSticker(whoSent, srcGif) {
  const div = createDiv(whoSent);
  const img = document.createElement('img');
  img.setAttribute('src', `gif/${srcGif}.gif`);
  div.append(img);
  return div;
}

function createMessege (whoSent, target) {
  const div = createDiv(whoSent);
  // target === 'victory' ? winningDiv() : textDiv(target);
  if (target === 'victory') {
    div.innerHTML = `${currentPlayer.name} won this round!`
  } else if (target) {
    div.innerHTML = target.classList[1] === 'restart-btn' ? resetText : scoreText;
  } else div.innerHTML = 'Technically, you both lost.';
  return div;
}

function shareScore() {
  console.log('hello there');
  const div2 = createDiv('computer-messege');
  div2.innerHTML = `${player1.name}: won ${player1.score} game(s). </br>
  ${player2.name}: won ${player2.score} game(s). </br>
  ties: ${tieCount} time(s).`;
  console.log(div2);
  logWindow.append(div2);
}



function playerVictory(winOrTie) {
  if (window.screen.width > 1290) {
    if (winOrTie) { 
      player1.letter === currentPlayer.letter ? player1.score++ : player2.score++;
      logWindow.append(createSticker('computer-messege', 'win'));
    } else {
      logWindow.append(createSticker('computer-messege', 'tie'))
      tieCount++;
    } 
  } else {
    if (winOrTie) { 
      player1.letter === currentPlayer.letter ? player1.score++ : player2.score++;
      alert(`${currentPlayer.name} won!`);
    } else {
      alert('its a tie!');
      tieCount++;
    } 
    
  }
  
  logWindow.append(createMessege('computer-messege', winOrTie));
  gameState = false;
}



document.querySelector('.save-nicknames').addEventListener('click', () => {
  const nicknames = document.querySelectorAll('input');
  player1.name = nicknames[0].value;
  player2.name = nicknames[1].value;
});

document.querySelector('.switch-roles').addEventListener('click', () => {
  const roles = document.querySelectorAll('.player-letter');
  if (roles[0].innerHTML === 'X') {
    roles[0].innerHTML = 'O';
    roles[1].innerHTML = 'X';
    player1.letter = 'O';
    player2.letter = 'X';
  } else {
    roles[0].innerHTML = 'X';
    roles[1].innerHTML = 'O';
    player1.letter = 'X';
    player2.letter = 'O';
  }
});

document.querySelectorAll('.restart-btn').forEach(restart => restart.addEventListener('click', (e) => {
  logWindow.append(createMessege('user-messege', e.target));
}));

document.querySelector('.scores-btn').addEventListener('click', (e) => {
  logWindow.append(createMessege('user-messege', e.target));
  shareScore();
});
