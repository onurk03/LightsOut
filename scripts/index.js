let board;
let mainScreen = document.querySelector(".main-screen");
let choice3x3 = document.querySelector(".option3x3");
let choice5x5 = document.querySelector(".option5x5");
let backButton = document.querySelector(".back-button");
let boardScreen = document.querySelector(".board");

// If user chooses 3x3 board, generate a 3x3 board and change to the game scene.
choice3x3.addEventListener('click', function() {
    mainScreen.style.display = "none";
    board = new Board(3,3);
    board.generateBoard();
    startGame();
    backButton.style.display = "block";
});

// If user chooses 5x5 board, generate a 5x5 board and change to the game scene.
choice5x5.addEventListener('click', function() {
    mainScreen.style.display = "none";
    board = new Board(5,5);
    board.generateBoard();
    startGame();
    backButton.style.display = "block";
});

// If user wants to go back to the main screen, a back arrow button is available.
backButton.addEventListener('click', function() {
    location.reload();
})

// Adds event listeners to all cells to perform the operation for turning lights on/off.
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
            });
        }
    }
}
