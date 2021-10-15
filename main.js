
const makePlayer=(name,type)=>{
        const getName=()=>name;
        const getType=()=>type;
        const isTurn=true;

        return {getName,getType,isTurn};
}

const gameBoard=(function(){
    return { boardArray:[
        [],
        [],
        []    
    ],
    allMoves:0
}
    
})();

const displayPlayer=(function(){
    const displayH3=document.querySelector(".announcement");
    function declareWinner(winner){
        if(winner==="Tie"){
            displayH3.textContent=`It's a ${winner}!`
            
        }else{
            displayH3.textContent=`The winner is: ${winner}!`;
        }
    }
    function nextPlayer(playerName){
        displayH3.textContent=`The next player is ${playerName}`;
    }
    
    return {declareWinner,nextPlayer}
})();



const playBoard=(function(){
    const player1=makePlayer('Player1','x');
    const player2=makePlayer('Player2','0');     
    player2.isTurn=false;
    let winner;
    let endRound=false; 
    let done="";  

    displayPlayer.nextPlayer(player1.getName());
    function addType(){
        console.log('click',done,endRound)
         done=searchWinner(gameBoard.boardArray); 
         
        endRound=false;
        if(done===player1.getName() || done===player2.getName() || done==='Tie'){
            
            endRound=true;
            winner=done;
            displayPlayer.declareWinner(winner);
        }
        if(!endRound){
            if(player1.isTurn && this.dataset.value===''){
                this.classList.add("x")                                                        
                player1.isTurn=false;
                player2.isTurn=true;
                gameBoard.allMoves++;
                this.setAttribute('data-player',player1.getName());
                this.setAttribute('data-value',player1.getType());                
                gameBoard.boardArray[+this.dataset.posx][+this.dataset.posy]=player1.getType();  
                displayPlayer.nextPlayer(player2.getName());
                done=searchWinner(gameBoard.boardArray);                
                if(done===player1.getName() || done===player2.getName() || done==='Tie'){
                    
                    endRound=true;
                    winner=done;
                    displayPlayer.declareWinner(winner);
                }                
                            
                
            }else if(player2.isTurn && this.dataset.value===''){    
                this.classList.add("o");                                
                player2.isTurn=false;
                player1.isTurn=true;
                gameBoard.boardArray[+this.dataset.posx][+this.dataset.posy]=player2.getType();     
                gameBoard.allMoves++;                
                this.setAttribute('data-player',player2.getName());
                this.setAttribute('data-value',player2.getType());
                displayPlayer.nextPlayer(player1.getName());
                done=searchWinner(gameBoard.boardArray);
                if(done===player1.getName() || done===player2.getName() || done==='Tie'){
                    
                    endRound=true;
                    winner=done;
                    displayPlayer.declareWinner(winner);
                }
            }            
        }
        
        
        
    }

    function searchWinner(board){
        //horizontal search
        let match;
        let type;        
        
        for (let i = 0; i < board.length; i++) {
            match = 1;
            type = board[i][0];
            if (type === 'x' || type === '0') {
                for (let j = 1; j < board[i].length; j++) {
                    if (board[i][j] != type) {
                        break;
                    } else if (board[i][j] === type) {
                        match++;
                        
                    }
                    if (match === 3) {
                        return player1.getType() === type ? player1.getName() : player2.getName();
                    }
                }
            }

        }

        //vertical search
        for (let i = 0; i < board.length; i++) {
            
            match = 1;
            type = board[0][i];  
                     
            if ((type === 'x' || type === '0') && board[i].length>0) {                
                for(let j=1;j<board.length;j++){
                    if(board[j][i]!=type){
                        break;
                    }else if(board[j][i]===type){
                        match++;
                    }
                }if (match === 3) {
                    return player1.getType() === type ? player1.getName() : player2.getName();
                }
            }       
        
        }

        //diagonal search

        if(board[1][1]){
            type=board[1][1];
            if(board[0][0]===type && board[2][2]===type){
                return player1.getType() === type ? player1.getName() : player2.getName();
            }else if(board[0][2]===type && board[2][0]===type){
                return player1.getType() === type ? player1.getName() : player2.getName();
            }
        }
        if(gameBoard.allMoves===9){
            return "Tie";
        }
    }

    return {addType,searchWinner,endRound,done,player1,player2}
})();

const displayBoard=(function(){
          
        //board = gameBoard.boardArray;
        const length = gameBoard.boardArray.length;
        const boardGrid = document.querySelector('.gameBoard');        
        boardGrid.setAttribute("style", `grid-template-rows: repeat(${length},1fr);`);
        boardGrid.setAttribute("style", `grid-template-columns: repeat(${length},1fr);`);

        function display(){
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    let newDiv = document.createElement('div');
                    //newDiv.textContent = gameBoard.boardArray[i][j];                    
                    newDiv.setAttribute("data-posx", i);
                    newDiv.setAttribute("data-posy", j);
                    newDiv.setAttribute("data-value","");
                    newDiv.addEventListener('click', playBoard.addType);
                    newDiv.style.cursor="pointer";
                    boardGrid.appendChild(newDiv);
                }
    
            }   
        }  

        
        display();
    return {
       boardGrid,display
    }
    
})();

const resetGame=(function(){
    length=gameBoard.boardArray.length;    
    
    const resetButton=document.querySelector('.reset');
    resetButton.addEventListener('click',(e)=>{
        //e.preventDefault();
        document.querySelectorAll(".gameBoard * ")
        .forEach((e)=>e.parentNode.removeChild(e)) ; 
        gameBoard.boardArray=[
            [],
            [],
            []
        ];
        gameBoard.allMoves=0;
        displayBoard.display();
        displayPlayer.nextPlayer(playBoard.player1.getName());
        
        console.log(gameBoard.boardArray, gameBoard.allMoves);
    })
    
    
})();




