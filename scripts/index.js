let board;
// screen elements initialized
let mainScreen = document.querySelector(".main-screen");
let gameScreen = document.querySelector(".game-screen");
// button elements initialized
let choice3x3 = document.querySelector(".option3x3");
let choice5x5 = document.querySelector(".option5x5");
let backButton = document.querySelector(".back-button");
let resetButton = document.querySelector(".reset-button");

// If user chooses 3x3 board, generate a 3x3 board and change to the game scene.
choice3x3.addEventListener('click', function() {
    mainScreen.style.display = "none";
    board = new Board(3,3);
    board.generateBoard();
    startGame();
    gameScreen.style.display = "block";
});

// If user chooses 5x5 board, generate a 5x5 board and change to the game scene.
choice5x5.addEventListener('click', function() {
    mainScreen.style.display = "none";
    board = new Board(5,5);
    board.generateBoard();
    startGame();
    gameScreen.style.display = "block";
});

// Clicking the back button will reload the page to reset any board that might've been generated
// and brings the user back to the main screen.
backButton.addEventListener('click', function() {
    location.reload();
});

// Resets the board and erases the win message.
resetButton.addEventListener('click', function () {
    board.resetBoard();
    board.generateBoard();
    startGame();
    document.querySelector(".game-screen h2").style.display = "none";
});


/**
 * Adds event listeners to all cells to perform the operation for turning lights on/off.
 */
function startGame() {
    for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.cols; j++) {
            let cell = board.boardArray[i][j];

            cell.getCell().addEventListener('click', function () {
                cell.flipState();
                if (cell.row + 1 < board.boardArray.length) {
                    board.boardArray[cell.row + 1][cell.col].flipState();
                }
                if (cell.row > 0) {
                    board.boardArray[cell.row - 1][cell.col].flipState();
                }
                if (cell.col + 1 < board.boardArray[cell.row].length) {
                    board.boardArray[cell.row][cell.col + 1].flipState();
                }
                if (cell.col > 0) {
                    board.boardArray[cell.row][cell.col - 1].flipState();
                }

                if(board.checkWin()) {
                    setTimeout(function () {
                        document.querySelector(".game-screen h2").style.display = "block";
                    }, 100);
                }
            });
        }
    }
}
