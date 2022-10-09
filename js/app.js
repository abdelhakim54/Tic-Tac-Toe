const gameBoard = (() => {
    let gameBoard = ["","","","","","","","",""];
    const gameGrid = document.querySelectorAll(".grid");

    const getGameGrid = () => gameGrid;
    const getGameBoard = () => gameBoard;

    const addMark = (index, mark) => {
            gameBoard[index] = mark ;
       }

    const restartGameBoard = () => {
        gameBoard = ["","","","","","","","",""];
    }

    return ({getGameGrid,
        getGameBoard,
        addMark,
        restartGameBoard
    });
}
)();

const Player = (name, mark) => {
    const getMark = () => mark;
    const getName = () => name;

    return({getName, getMark});
}

const displayController = (() => {

    const endGameModal = document.querySelector(".end-game-modal");
    const message = document.querySelector(".modal p");
    const roundMessage = document.querySelector(".display-controller");



    gameBoard.getGameGrid().forEach(element => {
        element.addEventListener("click", (e) => {
            if(gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.PlayRound(+e.target.dataset.index);
            renderGameBoard();
    });
})

    const renderGameBoard = () => {
        for(let i = 0; i < gameBoard.getGameBoard().length ; i++){
            let gameBoardCell = document.querySelector(`.card[data-index = "${i}"]`);
            gameBoardCell.textContent = gameBoard.getGameBoard()[i];
        }
   }

   const setTurnMessage = (sign) =>{
    roundMessage.textContent = `Player ${sign}'s Turn`;
   }

   const displayDrawMessage = () => {
    message.textContent = "It's a Draw";
    displayEndGameModal();
   }

   const DisplayWinner = (winner) => {
    message.textContent = `${winner.getName()} has won`;
    displayEndGameModal();
   }

   const displayEndGameModal = () => {
    endGameModal.classList.add("visible");
   }

   const hideEndGameModal = () =>{
    endGameModal.classList.remove("visible");    
   }
   return({renderGameBoard,
        setTurnMessage,
        displayDrawMessage,
        DisplayWinner,
        hideEndGameModal
    });

})();


const gameController = (() => {
    const PlayerX = Player("Player X","x");
    const PlayerY = Player("Player O", "o");

    const playAgain = document.querySelector("#restart-game");
    const restartGame = document.querySelector("#restart");
    
    let round =  1;
    let isOver = false;

    const getIsOver = () => isOver;

    const getCurrentPlayerTurn = () => {
        return round % 2 == 0 ? PlayerY : PlayerX;
    };

    const PlayRound = (fieldIndex) => {
        
        let currentPlayer = getCurrentPlayerTurn();
        gameBoard.addMark(fieldIndex, currentPlayer.getMark());
        if(checkWinner(currentPlayer.getMark())){
            displayController.DisplayWinner(currentPlayer);
            isOver = true;
            return;
        }
        
        if(round == 9){
            isOver = true;
            displayController.displayDrawMessage();
            return;
        }

        
        round++;
        displayController.setTurnMessage(getCurrentPlayerTurn().getMark());
    }

    const checkWinAlongRows = (sign) => {/*can be optimized */
        let rows = [0, 0, 0]
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++ ){
                if(gameBoard.getGameBoard()[3*i + j] == sign){
                    rows[i] += 1
                }
            }
        }

        return rows.includes(3);
    }

    const checkWinAlongColumns = (sign) => {/*can be optimized          Not Working*/
        let cols = [0, 0, 0]
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++ ){
                if(gameBoard.getGameBoard()[3*j + i] == sign){
                    cols[i] += 1
                }
            }
        }
        return cols.includes(3);
    }

    const checkWinAlongDiagonals = (sign) => {/*can be optimized */
        let diags = [0,0]
        for (let i = 0; i < 3; i++){
            if(gameBoard.getGameBoard()[4*i] == sign){
                diags[0] += 1;
            }
            if(gameBoard.getGameBoard()[2*(i+1)] == sign){
                diags[1] += 1;
            }
        }
        return diags.includes(3);
    }



    const checkWinner = (sign) => {
        return(checkWinAlongRows(sign) || checkWinAlongColumns(sign) || checkWinAlongDiagonals(sign));
    }

    const reset = () => {
        round = 1;
        isOver = false;
        gameBoard.restartGameBoard();
        displayController.renderGameBoard();
        displayController.setTurnMessage(PlayerX.getMark());
    }

    playAgain.addEventListener("click", () => {
        reset();
        displayController.hideEndGameModal();
    })

    restartGame.addEventListener("click", reset);

    return({PlayRound,
    getIsOver})
}
)();
