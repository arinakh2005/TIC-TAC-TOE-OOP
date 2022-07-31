'use strict'
let game;

function playNewGame() {
    game = new Game();
    game.initialize();
    document.getElementById('btn-start').setAttribute('disabled', 'true');
    let buttonClear = document.getElementById('btn-clear');
    buttonClear.removeAttribute('disabled')
}

function restart() {
    if(game) game.gameMap.clearGameMap();
    playNewGame();
}

function doStep(id) {
    if (game.gameMap.isCellAvailableForStep(id)) return;

    if (game.mode === 0) {
        document.getElementById('player-number').innerText = `Хід: гравець ${game.currentPlayer.getPlayerType()}`;
        game.playerWithPlayerStep(id);
        isGameOver();
    } else if (game.mode === 1) {
        game.playerStepWithComputer(id);
    }
}

function isGameOver() {
    if (game.gameMap.checkWin()) {
        setTimeout(function() { game.getWinnerMessage(); }, 100);
        setTimeout(restart, 300);
        return true;
    }
}
