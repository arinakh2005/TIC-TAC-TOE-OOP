'use strict'
let game;

function createNewGame() {
    game = new Game();

    let select = document.getElementById("game-area");
    const size = +(select.value);
    if (size <= 3){
        select.value = 3;
        alert('Мінімальний розмір поля 3х3!');
    } else if (size > 100) {
        select.value = 100;
        alert('Максимальний розмір поля 100х100!');
    }

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
    if (game.getGameMap().isPlayerWon() === game.getGameMap().getNobodyWonFlag()) {
        setTimeout(function() { game.getDrawMessage(); }, 200);
        setTimeout(restartGame, 500);
        return true;
    } else if (game.getGameMap().isPlayerWon()) {
        setTimeout(function() { game.getWinnerMessage(); }, 200);
        setTimeout(restartGame, 500);
        return true;
    } else {
        return false;
    }
}

function restartGame() {
    if(game) game.getGameMap().clearGameMap();
    createNewGame();
}




