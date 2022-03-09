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

    /**
     * Resets the board array and the cell count to generate a new board.
     */
    resetBoard() {
        this.boardArray = [];
        Cell.count = 0;
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

    /**
     * Solves the 3x3 Lights Out system using a matrix and a vector.
     */
    solveBoard() {
        // Inverse of a matrix representing the result of button presses for a 3x3 matrix.
        let matrixA = math.boolean([
            [1, 0, 1, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0, 1, 1, 1],
            [1, 0, 1, 1, 0, 0, 0, 1, 1],
            [0, 0, 1, 0, 1, 1, 0, 0, 1],
            [0, 1, 0, 1, 1, 1, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 1, 0, 0],
            [1, 1, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 1, 0, 1]
        ]);


        // Vector representing the lights that are ON inside the board.
        let vector = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.boardArray[i][j].cellState === 1) {
                    vector[this.boardArray[i][j].cellNo - 1] = 1;
                } else {
                    vector[this.boardArray[i][j].cellNo - 1] = 0;
                }
            }
        }
        vector = math.boolean(vector);
        console.log(math.inv(matrixA));

        // Boolean matrix multiplication is done to create a vector representing which button
        // presses will turn off all lights.
        let matrixSolution = matrixMultiply(matrixA, vector);
        console.log(matrixSolution);

        let k = 0;
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(matrixSolution[k] === 1) {
                    this.boardArray[i][j].highlightCell();
                }
                k++;
            }
        }
    }
}

/**
 *
 * @param matrix The inverse matrix representing the results of each button press on a Lights
 *               Out board.
 * @param vector Vector representing which lights are ON inside the board.
 * @returns {*[]} vector representing the lights to turn off for completing a Lights Out board.
 *                (1 --> click, 0 --> don't click)
 */
function matrixMultiply(matrix, vector) {
    let result = [];
    for(let i = 0; i < matrix.length; i++) {
        let multi = [];
        let k = 0;
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] && vector[k]) {
                multi.push(1);
            } else {
                multi.push(0);
            }
            k++;
        }
        let add = multi[0];
        for(let i = 1; i < multi.length; i++) {
            add = add ^ multi[i];
        }
        result.push(add);
    }
    return result;
}

