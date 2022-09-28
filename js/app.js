const gameBoard = (() => {
    let gameBoard = ["x", "o", "x", "x", "o", "x", "o", "x", "o"];
    const renderGameBoard = () => {
        for(let i = 0; i < gameBoard.length ; i++){
            let gameBoardCell = document.querySelector(`.index-${i+1}`);
            gameBoardCell.textContent = gameBoard[i];
        }
o   }

    return({renderGameBoard})
})();

const displayController = (() => {

})();

const player = (name) => {
    const getName = () => name
    return({getName});
}
