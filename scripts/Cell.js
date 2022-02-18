class Cell {
    static count = 0;
    constructor(col, row) {
        this.col = col;
        this.row = row;
        Cell.count++;
        this.cellNo = Cell.count;
        this.cellState = Math.round(Math.random());
    }

    setState() {
        if(this.cellState === 0) {
            this.getCell().style.backgroundColor = "black";
        } else {
            this.getCell().style.backgroundColor = "white";
        }
    }

    flipState() {
        if(this.isOn()) {
            this.cellState = 0;
            this.getCell().style.backgroundColor = "black";
        } else {
            this.cellState = 1;
            this.getCell().style.backgroundColor = "white";
        }
    }

    isOn() {
        if(this.cellState === 1) {
            return true;
        } else {
            return false;
        }
    }

    renderCell() {
        return `<button class="cell${this.cellNo}" type="button"></button>`;
    }

    getCell() {
        return document.querySelector(`.cell${this.cellNo}`);
    }
}

