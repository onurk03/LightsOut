// Manages Cell objects that represent the lights.
class Board {
    boardArray = [];
    // Initialized with an array of Cell objects with the desired rows x cols
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        for(let i = 0; i < this.rows; i++) {
            this.boardArray.push([]);
            for(let j = 0; j < this.cols; j++) {
                this.boardArray[i].push(new Cell(j, i));
            }
        }
    }

    // Sets up the grid layout according to rows and columns of the board, adds the cells to the
    // board and sets up their state (on or off)
    generateBoard() {
        const board = document.querySelector(".board");
        board.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        board.style.display = "grid";

        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                board.innerHTML += this.boardArray[i][j].renderCell();
                this.boardArray[i][j].setState();
            }
        }
    }

}
