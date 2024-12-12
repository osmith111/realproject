const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'red';
let gameBoard = Array(6).fill().map(() => Array(7).fill(null));
let gameOver = false;

function createBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropPiece(col));
            board.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    if (gameOver) return;
    
    for (let row = 5; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            gameBoard[row][col] = currentPlayer;
            const cell = board.children[row * 7 + parseInt(col)];
            cell.classList.add(currentPlayer);
            
            if (checkWin(row, col)) {
                message.textContent = `${currentPlayer.toUpperCase()} wins!`;
                gameOver = true;
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                message.textContent = `${currentPlayer.toUpperCase()}'s turn`;
            }
            
            break;
        }
    }
}

function checkWin(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    
    for (const [dx, dy] of directions) {
        let count = 1;
        for (const direction of [-1, 1]) {
            for (let i = 1; i <= 3; i++) {
                const newRow = row + i * direction * dx;
                const newCol = col + i * direction * dy;
                if (
                    newRow < 0 || newRow >= 6 || 
                    newCol < 0 || newCol >= 7 || 
                    gameBoard[newRow][newCol] !== currentPlayer
                ) {
                    break;
                }
                count++;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

function resetGame() {
    gameBoard = Array(6).fill().map(() => Array(7).fill(null));
    gameOver = false;
    currentPlayer = 'red';
    message.textContent = "Red's turn";
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
}

createBoard();
resetButton.addEventListener('click', resetGame);
message.textContent = "Red's turn";
