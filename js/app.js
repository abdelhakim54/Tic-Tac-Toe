const gameBoard = (() => {
    let gameBoard = [];
    const gameGrid = document.getElementsByClassName("grid");

    const getGameGrid = () => gameGrid;

    const renderGameBoard = () => {
        for(let i = 0; i < gameBoard.length ; i++){
            let gameBoardCell = document.querySelector(`.card[data-index = "${i}"]`);
            gameBoardCell.textContent = gameBoard[i];
        }
   }

   const addMark = (index, mark) => {
    if (!gameBoard[index]){
        gameBoard[index] = mark
    }

    const isGameOver = () => {
        
    }
}

    return({renderGameBoard,
        getGameGrid,
        addMark
    });
})();

const displayController = (() => {
    /*const Game() = (player1) => {

    }*/
})();

const player = (name, mark) => {
    const getMark = () => mark
    const getName = () => name
    const playTurn = () => {
        for(let i = 0 ; i< gameBoard.getGameGrid().length ; i++){
            gameBoard.getGameGrid()[i].addEventListener("click", function(e){
                gameBoard.addMark(+e.target.dataset.index, mark)
                gameBoard.renderGameBoard();
            })
        }
    }

    

    return({getName, getMark, playTurn});
}


const hakim = player("hakim", "x");

hakim.playTurn();