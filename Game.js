'use strict'
const gameMode = {
    playerWithPlayer: 0,
    playerWithComputer: 1,
}

const gameMark = {
    cross: 'cross',
    circle: 'circle'
}

class Game {
    constructor() {
        this.gameMap;
        this.firstPlayer;
        this.secondPlayer;
        this.currentPlayer;
        this.mode;
        this.lastRole = gameMark.circle;
    }

    initialize() {
        let select = document.getElementById("game-area");
        const size = +(select.value);
        select = document.getElementById("game-mode");
        this.mode = +(select.value);
        this.gameMap = new GameMap(size);
        this.gameMap.buildGameMap();

        document.getElementById('btn-start').setAttribute('disabled', 'true');
        if (this.mode === 0) {
            this.firstPlayer = new Player(1);
            this.secondPlayer = new Player(2);
            this.currentPlayer = new Player(2);
        } else if (this.mode === 1) {
            this.firstPlayer = new Player(3);
            this.secondPlayer = new Player(0); // It's computer!
            this.currentPlayer = new Player(0);
        }
    }

    playerStepWithComputer(id) {
        if (this.lastRole === gameMark.circle) {
            let elem = document.getElementById(id);
            elem.innerHTML = `<img src="./${gameMark.cross}.png">`;
            let i = +(id.slice(4, 6));
            this.gameMap.allCells[i].setCellOccupied();
            game.gameMap.allCells[i].setCellOccupiedByElement(gameMark.cross);
            this.currentPlayer = this.secondPlayer;
        }
        if (isGameOver()) return;
        let temp = this;
        setTimeout(function() { temp.computerStep(); }, 300);
    }

    generateNumberOfCell() {
        return (Math.floor(Math.random() * (this.gameMap.size**2)));
    }

    computerStep() {
        let id = this.generateNumberOfCell();
        if (this.gameMap.allCells[id].isCellOccupied()) {
            this.computerStep();
        } else {
            let idHTML = `cell${id}`;
            document.getElementById(idHTML).innerHTML = `<img src="./${gameMark.circle}.png">`;
            this.gameMap.allCells[id].setCellOccupied();
            game.gameMap.allCells[id].setCellOccupied(gameMark.circle);
            this.currentPlayer = this.firstPlayer;
            isGameOver();
        }
    }

    playerWithPlayerStep(id) {
        if (this.lastRole === gameMark.cross) {
            this.lastRole = gameMark.circle;
            let cell = document.getElementById(id);
            cell.innerHTML = `<img src="./${gameMark.circle}.png">`;
            game.gameMap.occupiedCells.push(id);
            let i = +(id.slice(4, 6));
            game.gameMap.allCells[i].setCellOccupied();
            game.gameMap.allCells[i].setCellOccupiedByElement(gameMark.circle);
            this.currentPlayer = this.secondPlayer;
            return;
        }

        if (this.lastRole === gameMark.circle) {
            this.lastRole = gameMark.cross;
            let cell = document.getElementById(id);
            cell.innerHTML = `<img src="./${gameMark.cross}.png">`;
            game.gameMap.occupiedCells.push(id);
            let i = +(id.slice(4, 6));
            game.gameMap.allCells[i].setCellOccupied();
            game.gameMap.allCells[i].setCellOccupiedByElement(gameMark.cross);
            this.currentPlayer = this.firstPlayer;
            return;
        }
    }

    getWinnerMessage() {
        if (this.mode === 1) {
            if (this.currentPlayer.getPlayerType() === 3) {
                alert("Переміг комп'ютер!");
            } else {
                alert("Переміг гравець!");
            }
        } else {
            alert(`Переміг гравець ${this.currentPlayer.getPlayerType()}`);
        }
    }
}
