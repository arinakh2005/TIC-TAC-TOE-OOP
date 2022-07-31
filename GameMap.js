class GameMap {

    constructor(size) {
        this.size = size;
        this.cell = Cell;
        this.allCells = [];
        this.occupiedCells = [];
        this.numberOfCellsToWin = 3;
    }

    buildGameMap() {
        const table = document.querySelector('table');
        for (let i = 0; i < this.size; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < this.size; j++) {
                const td = document.createElement('td');
                td.classList.add("cell");
                let id = `cell${((i * this.size) + j)}`;
                td.setAttribute('id', `${id}`);
                this.cell = new Cell(id);
                td.setAttribute('onclick', `doStep("${id}")`);
                this.allCells.push(this.cell);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        const box = document.getElementsByClassName('table-game')[0];
        box.style.visibility = 'visible';
    }

    isCellAvailableForStep(idHTML) {
        let id = +(idHTML.slice(4,6));
        if (this.allCells[id].isCellOccupied()) return true;
    }

    clearGameMap() {
        let elem = document.getElementsByClassName("table")[0];
        elem.parentNode.removeChild(elem);
        const spaceForTableGrid = document.getElementsByClassName('table-game')[0];
        const table = document.createElement('table');
        table.classList.add('table');
        spaceForTableGrid.appendChild(table);

        elem = document.getElementById("player-number");
        elem.parentNode.removeChild(elem);
        const spaceForLabelWithPlayersNumber = document.getElementsByClassName('table-game')[0];
        const labelWithPlayersNumber = document.createElement('p');
        labelWithPlayersNumber.id = 'player-number';
        labelWithPlayersNumber.textContent = "Хід: ...";
        spaceForLabelWithPlayersNumber.appendChild(labelWithPlayersNumber);

        this.allCells = [];
        this.occupiedCells = [];
        this.cell= null;
        document.getElementById('btn-start').setAttribute('disabled', 'false');
    }

    isAllCellsFilled() {
        let counter = 0;
        this.allCells.forEach(function(item) {
            if (item.isOccupied === true) counter++;
        });
        if (counter === this.size ** 2) return true;
    }

    checkWin() {
        function checkMainDiagonal(size, allCells) {
            let index1;
            let index2;
            let allowableIndexes = [];

            if (size === 3) {
                allowableIndexes = [0];
            } else if (size === 4) {
                allowableIndexes = [0, 1, 4, 5];
            } else if (size === 5) {
                allowableIndexes = [0, 1, 2, 5, 6, 7, 10, 11, 12];
            }

            let k = 0;
            let i = 0;
            while (k < allowableIndexes.length) {
                i = allowableIndexes[k];
                index1 = i + size + 1;
                index2 = i + 2 * (size + 1);
                if (allCells[i].occupiedBy === 'circle' && allCells[index1].occupiedBy === 'circle' && allCells[index2].occupiedBy === 'circle' ||
                    allCells[i].occupiedBy === 'cross' && allCells[index1].occupiedBy === 'cross' && allCells[index2].occupiedBy === 'cross') {
                    return true;
                }
                i = allowableIndexes[k];
                k++;
            }
        }

        function checkAntiDiagonal(size, allCells) {
            let index1;
            let index2;
            let allowableIndexes = [];

            if (size === 3) {
                allowableIndexes = [2];
            } else if (size === 4) {
                allowableIndexes = [2, 3, 6, 7];
            } else if (size === 5) {
                allowableIndexes = [2, 3, 4, 7, 8, 9, 12, 13, 14];
            }

            let k = 0;
            let i = 0;
            while (k < allowableIndexes.length) {
                i = allowableIndexes[k];
                index1 = i + size - 1;
                index2 = i + 2 * (size - 1);
                if (allCells[i].occupiedBy === 'circle' && allCells[index1].occupiedBy === 'circle' && allCells[index2].occupiedBy === 'circle' ||
                    allCells[i].occupiedBy === 'cross' && allCells[index1].occupiedBy === 'cross' && allCells[index2].occupiedBy === 'cross') {
                    return true;
                }
                i = allowableIndexes[k];
                k++;
            }
        }

        // Check for row
        let step = 0;
        do {
            for (let i = this.size - this.numberOfCellsToWin - step; i < (this.size * this.size); i += this.numberOfCellsToWin + (this.size - this.numberOfCellsToWin)) {
                if (this.allCells[i].occupiedBy === 'circle' && this.allCells[i + 1].occupiedBy === 'circle' && this.allCells[i + 2].occupiedBy === 'circle' ||
                    this.allCells[i].occupiedBy === 'cross' && this.allCells[i + 1].occupiedBy === 'cross' && this.allCells[i + 2].occupiedBy === 'cross') {
                    return true;
                }
            }
            step++;
        } while (this.size - this.numberOfCellsToWin - step >= 0);

        //Check for column
        step = this.size - this.numberOfCellsToWin;
        let index2;
        let index1;
        for (let i = 0; i < (this.size*(step+1)); i++) {
            index1 = i + this.numberOfCellsToWin + step;
            index2 = i + 2 * (this.numberOfCellsToWin + step);
            if (this.allCells[i].occupiedBy === 'circle' && this.allCells[index1].occupiedBy === 'circle' && this.allCells[index2].occupiedBy === 'circle' ||
                this.allCells[i].occupiedBy === 'cross' && this.allCells[index1].occupiedBy === 'cross' && this.allCells[index2].occupiedBy === 'cross') {
                return true;
            }
        }

        //Check for diagonal
        if (checkMainDiagonal(this.size, this.allCells)) return true;
        if (checkAntiDiagonal(this.size, this.allCells)) return true;

        // Check empty Cells
        if (this.isAllCellsFilled()) {
            setTimeout(this.getDrawMessage, 200);
            setTimeout(restart, 500);
        }
    }

    getDrawMessage() {
        alert("Нічия");
    }
}
