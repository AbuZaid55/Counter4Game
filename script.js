const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'black';
let gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));

function createBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

function resetBoard() {
    gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));
    currentPlayer = 'black';
    board.innerHTML = '';
    message.innerText = '';
    setTimeout(() => {
        createBoard();
    }, 200);
}
function checkWin() {
    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row][col + 1] === currentPlayer &&
                gameBoard[row][col + 2] === currentPlayer &&
                gameBoard[row][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check columns
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col] === currentPlayer &&
                gameBoard[row + 2][col] === currentPlayer &&
                gameBoard[row + 3][col] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col + 1] === currentPlayer &&
                gameBoard[row + 2][col + 2] === currentPlayer &&
                gameBoard[row + 3][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col - 1] === currentPlayer &&
                gameBoard[row + 2][col - 2] === currentPlayer &&
                gameBoard[row + 3][col - 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}


function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

function handleClick(event) {
    let col = event.target.dataset.col;
    col = parseInt(col,10)
    if (col === undefined) return;

    const row = findAvailableRow(col);
    if (row === -1) return;

    gameBoard[row][col] = currentPlayer;
    const targetCell = board.querySelector(`div[data-row="${row}"][data-col="${col}"]`)
    targetCell.style.backgroundColor = currentPlayer;

    if (checkWin()) {
        message.innerText = `${currentPlayer.toUpperCase()} wins!`;
        board.removeEventListener('click', handleClick);
    } else if (checkDraw()) {
        message.innerText = 'It\'s a draw!';
        board.removeEventListener('click', handleClick);
    } else {
        currentPlayer = currentPlayer === 'black' ? 'purple' : 'black';
    }
}

function findAvailableRow(col) {
    for (let rowx = 5; rowx >= 0; rowx--) {
        if (gameBoard[rowx][col] === null) {
            return rowx;
        }
    }
    return -1;
}

createBoard();
board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetBoard);
