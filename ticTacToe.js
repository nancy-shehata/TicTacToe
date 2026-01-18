const gameBoard = {
    board: [],

    initialize(){              // create board 
        for (let row=0; row<3;row++){
            this.board[row]=[];
            for (let col=0; col<3; col++){
                    this.board[row][col]=null;
            }
        }
    },

    createUI(){
        const boardContainer = document.querySelector(".board-container");

        for (let row=0;row<3;row++){
            for (let col=0; col<3;col++){
                const boardCell = document.createElement('div');
                boardCell.classList.add("boardCell");

                boardCell.dataset.row = row;
                boardCell.dataset.col = col;

                boardCell.addEventListener("click",()=>{
                    if (gameFlow.gameOver) return;


                    const row = Number(boardCell.dataset.row);
                    const col = Number(boardCell.dataset.col);
                    console.log({row},{col})
                    
                    const marker = gameFlow.currPlayer.marker;
                    console.log({marker})

                    const success = gameBoard.placeMarker(row,col,marker);

                    

                    if(success){
                        boardCell.textContent = marker;
                        
                        const winner = gameBoard.checkWin();
                        if(winner){
                            alert(`${winner} wins!`);
                            gameFlow.gameOver = true;
                            return;     // dont switch if game is over
                        }
                        gameFlow.switchPlayer();
                    }
                });
                boardContainer.appendChild(boardCell);
            }
        }
 
            //restart button
            const restartButton = document.querySelector(".restart-btn");
            restartButton.addEventListener("click",() =>{
                gameFlow.restartGame();
            });


    },

    placeMarker(row,col,marker){
        if(this.board[row][col] != null){
            return false;       // failed to place marker
        }else{
        this.board[row][col] = marker;
       return true;        // successfully placed marker
       }
    },


    checkWin(){
        const winningCombos = [     // 8 winning patterns
        // Rows
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        // Columns
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        // Diagonals
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
        ];
        
        for (let combo of winningCombos){       // combo is one winning pattern with 3 positions 
            const [a,b,c] = combo;      // split combo into 3 variables 

            if (this.board[a[0]][a[1]] !== null &&      // each variable has a coordinate e.g. (x,y) but here its (0,1)
                this.board [a[0]][a[1]] === this.board[b[0]][b[1]] &&
                this.board [a[0]][a[1]] === this.board[c[0]][c[1]] ){
                    return this.board[a[0]][a[1]];
            }
        }
        return null; // if no winner 
    }
}
gameBoard.initialize();
gameBoard.createUI();


function Player(marker){
    this.marker = marker;
    this.listMarker = function(){
        console.log(this.marker);
    }
}
const player1 = new Player("X");
const player2 = new Player("O");
player1.listMarker();
player2.listMarker();


const gameFlow = {
    currPlayer: player1,
    gameOver: false ,


    playRound(row,col){

        let validMove = false;
        validMove = gameBoard.placeMarker(row,col,marker);

        if(!validMove){
            return;     // do nothing
        }

        const winner = gameBoard.checkWin();
        if(winner){
            alert (`${winner} won!`);
            return true;
        }
        this.switchPlayer();
    },
        

    switchPlayer(){ 
        // switch turns 
        if (this.currPlayer === player1){
            this.currPlayer = player2;
        }else{
            this.currPlayer = player1;
        }
        return false;

    },


    restartGame(){
        for (let row=0; row<3; row++){
            for (let col=0;col<3;col++){
                gameBoard.board[row][col]= null;
            }
        }

        const boardCells = document.querySelectorAll(".boardCell")
        boardCells.forEach(boardcell =>{
            boardcell.textContent = "";
        });


        this.gameOver = false;
        this.currPlayer = player1
    }
};
gameFlow.restartGame();



