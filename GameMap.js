class GameMap {

    #currentCell;
    #allCells = [];
    #occupiedCells = [];
    #numberOfCellsToWin = 3;

    constructor(size) {
        this.size = size;
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
                this.#currentCell = new Cell(id);
                td.setAttribute('onclick', `doStep("${id}")`);
                this.#allCells.push(this.#currentCell);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        const box = document.getElementsByClassName('table-game')[0];
        box.style.visibility = 'visible';
    }

    clearGameMap() {
        let elem = document.getElementsByClassName("table")[0];
        elem.parentNode.removeChild(elem);

        let spaceForElement = document.getElementsByClassName('table-game')[0];

        const gameMap = document.createElement('table');
        gameMap.classList.add('table');
        spaceForElement.appendChild(gameMap);

        elem = document.getElementById("player-number");
        elem.parentNode.removeChild(elem);

        const labelWithPlayersNumber = document.createElement('p');
        labelWithPlayersNumber.id = 'player-number';
        labelWithPlayersNumber.textContent = "Хід: ...";
        spaceForElement.appendChild(labelWithPlayersNumber);

        this.#allCells = [];
        this.#occupiedCells = [];
        this.#currentCell = null;
        document.getElementById('btn-start').setAttribute('disabled', 'false');
    }

    checkWin() {
        if (wonInRow(this.size, this.#allCells, this.#numberOfCellsToWin)) return true;
        if (wonInColumn(this.size, this.#allCells,this.#numberOfCellsToWin)) return true;
        if (wonInMainDiagonal(this.size, this.#allCells)) return true;
        if (wonInAntiDiagonal(this.size, this.#allCells)) return true;

        if (this.isAllCellsFilled()) {
            setTimeout(this.getDrawMessage, 200);
            setTimeout(restartGame, 500);
        }

        function wonInRow(size, allCells, numberOfCellsToWin) {
            let step = 0;
            do {
                for (let i = size - numberOfCellsToWin - step; i < (size * size); i += numberOfCellsToWin + (size - numberOfCellsToWin)) {
                    if (allCells[i].occupiedBy === 'circle' && allCells[i + 1].occupiedBy === 'circle' && allCells[i + 2].occupiedBy === 'circle' ||
                        allCells[i].occupiedBy === 'cross' && allCells[i + 1].occupiedBy === 'cross' && allCells[i + 2].occupiedBy === 'cross') {
                        return true;
                    }
                }
                step++;
            } while (size - numberOfCellsToWin - step >= 0);
        }

        function wonInColumn(size, allCells, numberOfCellsToWin) {
            let step = size - numberOfCellsToWin;
            let index2;
            let index1;
            for (let i = 0; i < (size * (step + 1)); i++) {
                index1 = i + numberOfCellsToWin + step;
                index2 = i + 2 * (numberOfCellsToWin + step);
                if (allCells[i].occupiedBy === 'circle' && allCells[index1].occupiedBy === 'circle' && allCells[index2].occupiedBy === 'circle' ||
                    allCells[i].occupiedBy === 'cross' && allCells[index1].occupiedBy === 'cross' && allCells[index2].occupiedBy === 'cross') {
                    return true;
                }
            }
        }

        function wonInMainDiagonal(size, allCells) {
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

        function wonInAntiDiagonal(size, allCells) {
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
    }

    isCellAvailableForStep(idHTML) {
        let id = +(idHTML.slice(4,6));
        if (this.#allCells[id].isCellOccupied()){
            return true;
        }
    }

    isAllCellsFilled() {
        let counter = 0;
        this.#allCells.forEach(function(item) {
            if (item.isOccupied === true) {
                counter++;
            }
        });
        if (counter === this.size ** 2) {
            return true;
        }
    }

    getDrawMessage() {
        alert("Нічия");
    }

    getCurrentCell() {
        return this.#currentCell;
    }

    setCurrentCell(cellId) {
        this.#currentCell = new Cell(cellId);
    }

    getAllCells() {
        return this.#allCells;
    }

    setAllCells(allCells) {
        this.#allCells = allCells;
    }

    getOccupiedCells() {
        return this.#occupiedCells;
    }

    setOccupiedCells(occupiedCells) {
        this.#occupiedCells = occupiedCells;
    }

    getNumberOfCellsToWin() {
        return this.#numberOfCellsToWin;
    }
}
