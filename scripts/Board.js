/**
 * Manages an array of Cell objects that represent the lights.
 */
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

    /**
     * Sets up the grid layout according to rows and columns of the board, adds the cells to the
     * board and initializes their state (on or off)
     */
    generateBoard() {
        const board = document.querySelector(".board");
        board.innerHTML = "";
        board.style.gridTemplateColumns = `repeat(${this.cols}, minmax(0, 1fr)`;
        board.style.gridTemplateRows = `repeat(${this.rows}, minmax(0, 1fr)`;

        board.style.display = "grid";

        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                board.innerHTML += this.boardArray[i][j].renderCell();
                this.boardArray[i][j].initializeState();
            }
        }
    }

    resetBoard() {
        this.boardArray = [];
        for(let i = 0; i < this.rows; i++) {
            this.boardArray.push([]);
            for(let j = 0; j < this.cols; j++) {
                this.boardArray[i].push(new Cell(j, i));
            }
        }
    }

    /**
     * Checks if all the Cells in the board array are off or not.
     * @returns {boolean} true if all are off, false otherwise
     */
    checkWin() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.boardArray[i][j].cellState === 1) {
                    return false;
                }
            }
        }
        return true;
    }

}
