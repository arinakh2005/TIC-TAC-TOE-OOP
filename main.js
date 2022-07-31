'use strict'
let game;

function createNewGame() {
    game = new Game();

    let select = document.getElementById("game-area");
    const size = +(select.value);
    select = document.getElementById("game-mode");
    game.setMode(+(select.value));
    game.setGameMap(size);
    game.getGameMap().buildGameMap();

    document.getElementById('btn-start').setAttribute('disabled', 'true');

    if (game.getMode() === 0) {
        game.setFirstPlayer(1);
        game.setSecondPlayer(2);
        game.setPlayerWhoMadeLastStep(2);
    } else if (game.getMode() === 1) {
        game.setFirstPlayer(3);
        game.setSecondPlayer(0)
        game.setPlayerWhoMadeLastStep(0);
    }

    document.getElementById('btn-start').setAttribute('disabled', 'true');
    let buttonClear = document.getElementById('btn-clear');
    buttonClear.removeAttribute('disabled')
}

function doStep(id) {
    if (game.getGameMap().isCellAvailableForStep(id)) {
        return;
    }
    if (game.getMode() === 0) {
        document.getElementById('player-number').innerText = `Хід: гравець ${game.getPlayerWhoMadeLastStep().getPlayerType()}`;
        game.doStepInModePlayerWithPlayer(id);
        isGameOver();
    } else if (game.getMode() === 1) {
        game.doStepInModePlayerWithComputer(id);
    }
}

function isGameOver() {
    if (game.getGameMap().checkWin()) {
        setTimeout(function() { game.getWinnerMessage(); }, 100);
        setTimeout(restartGame, 300);
        return true;
    }
}

function restartGame() {
    if(game) game.getGameMap().clearGameMap();
    createNewGame();
}




