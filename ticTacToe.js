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

    placeMarker(row,col,marker){
        this.board[row][col] = marker;
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
gameBoard.placeMarker


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


    playRound(){
        const row = Number(prompt('which row? 0,1,2'));
        const col = Number(prompt('which column? 0,1,2'));
        console.log(row,col);

        gameBoard.placeMarker(row,col,this.currPlayer.marker);
        console.log(gameBoard.board);

        if (this.currPlayer === player1){
            this.currPlayer = player2;
        }else{
            this.currPlayer = player1;
        }
       

    },


    startGame(){
        for (let i=0;i<9; i++){
            this.playRound();
        }
    }


};
gameBoard.checkWin();
gameFlow.startGame();


