class Cell {

    constructor(id) {
        this.id = id;
        this.isOccupied = false;
        this.occupiedBy = 'unknown';
    }

    setCellOccupied() {
        this.isOccupied = true;
    }

    setCellOccupiedByElement(elem) {
        this.occupiedBy = elem;
    }

    isCellOccupied() {
        if (this.isOccupied === true) {
            return true;
        } else {
            return false;
        }
    }
}
