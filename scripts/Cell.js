/**
 * Represents each cell or light on the board. Stores the total count of cells, the number of
 * the cell, its state (on/off, 1/0) and location on the board (col, row).
 */
class Cell {
    static count = 0;
    constructor(col, row) {
        this.col = col;
        this.row = row;
        Cell.count++;
        this.cellNo = Cell.count;
        this.cellState = Math.round(Math.random());
    }

    /**
     * Initializes the rendered cells based on the randomly generated cell state specific to
     * each cell object. Has to be called on a cell that has already been rendered.
     */
    initializeState() {
        if(this.cellState === 0) {
            this.getCell().style.backgroundColor = "black";
        } else {
            this.getCell().style.backgroundColor = "white";
        }

        this.getCell().style.width = "100%";
        this.getCell().style.height = "100%";
    }

    /**
     * Flips the state of a cell and turns its background color corresponding to that state.
     * (1 --> On, white)
     * (0 --> Off, black)
     */
    flipState() {
        if(this.cellState === 1) {
            this.cellState = 0;
            this.getCell().style.backgroundColor = "black";
        } else {
            this.cellState = 1;
            this.getCell().style.backgroundColor = "white";
        }
    }

    /**
     * Adds the cell on the board.
     * @returns {string} A string representing the HTML element with a class name
     * corresponding to the NO of the cell.
     */
    renderCell() {
        return `<button class="cell${this.cellNo}" type="button"></button>`;
    }

    /**
     * Finds and returns the element corresponding to this cell object.
     * @returns {Element} The Cell button element on the DOM corresponding to the NO of the cell.
     */
    getCell() {
        return document.querySelector(`.cell${this.cellNo}`);
    }
}

