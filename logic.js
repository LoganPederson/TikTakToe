/*
Tik Tak Toe Logic
---------------------
1. Three X's or O's in a row wins the game
2. Game Grid is 3x3 squares
3. Space may be X, O, or Blank.
4. Draws May Occur
*/


class Game{
    constructor(){
        // List where key cooresponds to position on the board, value will be a string "x" "o"
        this.board = [
            null,null,null,
            null,null,null,
            null,null,null
        ]

        this.score = 0
        this.turn = 'player1'
        this.finished = false;
    }
    
    run(){
        this.createVisualBoard()
        this.onClickFunctionality()
    }
    createVisualBoard(){
        for(let x=0; x<this.board.length; x++){
            let squareDiv = document.createElement("div")
            squareDiv.style.border = '5px solid black'
            squareDiv.style.width = '50px'
            squareDiv.style.height = '50px'
            squareDiv.style.backgroundColor = 'grey'
            squareDiv.style.display = 'inline-block'
            squareDiv.id = x
            squareDiv.className = 'square'
            squareDiv.innerHTML = this.board[x]
            const gameBoardDiv = document.getElementById('gameBoard')
            gameBoardDiv.appendChild(squareDiv);
        }   
    }
    onClickFunctionality(){
        let squareDiv = document.getElementsByClassName('square')
        for(let index=0; index < squareDiv.length; index++){
            squareDiv[index].addEventListener('click', this.handleClick.bind(this, index));
        }
    }
    handleClick(index){
        // index cooresponds to the gameboard coordinates
        // ie: 0 is top left, 8 is bottom right going from left to right.
        if(!this.finished){
            if(this.board[index] === null){

                if(this.turn === 'player1'){
                    var selection = 'X'
                    this.turn = 'player2'
                }
                else{
                    var selection = 'O'
                    this.turn = 'player1'
                }
                this.board[index]=selection
                document.getElementById(index).innerHTML = selection
                this.evaluateWin(this.board, true)
            }
            else{
                alert('Please choose a empty square!')
            }
        }
        else{
            alert('The Game has ended! Please reset!')
        }
    }
    evaluateWin(board, realBoard){
        let index = 4 // start from middle square
        let horizontal = board[index]+board[index+1]+board[index-1]
        let vertical = board[index]+board[index+3]+board[index-3]
        let diagnal1 = board[index]+board[index+4]+board[index-4]
        let diagnal2 = board[index]+board[index+2]+board[index-2]
        let leftside = board[index-1]+board[index+2]+board[index-4]
        let rightside = board[index+1]+board[index-2]+board[index+4]
        let topside = board[index-2]+board[index-3]+board[index-4]
        let bottomside = board[index+2]+board[index+3]+board[index+4]

        let winConditions = [horizontal, vertical, diagnal1, diagnal2, leftside, rightside, topside, bottomside]
        let winList = ['XXX','OOO']
        let winningString = ''
        let winningStraight = ''
        for(let index=0; index<winConditions.length; index++){
            if(winList.includes(winConditions[index])){
                winningString = winConditions[index]
                switch(index){
                    case 0:
                        winningStraight='horizontal'
                        break
                    case 1:
                        winningStraight='vertical'
                        break
                    case 2:
                        winningStraight='diagnal1'
                        break
                    case 3:
                        winningStraight='diagnal2'
                        break
                    case 4:
                        winningStraight='leftside'
                        break
                    case 5:
                        winningStraight='rightside'
                        break
                    case 6:
                        winningStraight='topside'
                        break
                    case 7:
                        winningStraight='bottomside'
                        break
                }
            }
        }
        if(realBoard === true){
            if(winningString != ''){
                let player
                if(winningString==='XXX'){
                    player='Player1'
                }
                else{
                    player='Player2'
                }
                const gameBoardDiv = document.getElementById("gameBoard"); 
                const winningText = document.createElement("h1");
                const resetButton = document.createElement('button')
                resetButton.classList.add('reset-button')
                resetButton.innerHTML = 'Reset Game'
                resetButton.addEventListener('click',this.resetGame)
                winningText.classList.add('winning-text')
                winningText.innerHTML = `${player} Wins!!`
                gameBoardDiv.appendChild(winningText)
                gameBoardDiv.appendChild(resetButton)

                this.drawWinLine(winningStraight)
                this.finished = true;
            }
            if(this.board.includes(null) && !this.finished){
                let nullsInArray = 0
                for(let x=0; x<this.board.length; x++){
                    if (this.board[x] === null){
                        nullsInArray++
                    }
                }
                if(nullsInArray <=2){
                    this.evlauateDraw();
                }
            }
        }
        else{
            if(winningString!=''){
                return true
            }
            else{
                return false
            }
        }
    }
    evlauateDraw(){
        // draw logic here, perhaps only if 1 or 2 empty squares then run
        // checks to see if those squares where x or o, would anyone win
        let nulls = []
        for(let x=0; x<this.board.length;x++){
            if(this.board[x] === null){
                nulls.push(x)
            }
        }
        let outcomes = []
        for(let index in nulls){
            if(nulls.length === 2){
                let tempBoard = [...this.board]
                tempBoard[nulls[index]] = 'X'
                if(this.evaluateWin(tempBoard, false)){
                    outcomes.push('win')
                }
                else{outcomes.push('draw')}
                tempBoard = [...this.board]
                tempBoard[nulls[index]] = 'O'
                if(this.evaluateWin(tempBoard, false)){
                    outcomes.push('win')
                }
                else{outcomes.push('draw')}
            }
            else{
                if(this.turn === 'player1'){
                    let tempBoard = [...this.board]
                    tempBoard[nulls[index]] = 'X'
                    if(this.evaluateWin(tempBoard, false)){
                        outcomes.push('win')
                    }
                }
                else if(this.turn === 'player2'){
                    let tempBoard = [...this.board]
                    tempBoard[nulls[index]] = 'O'
                    if(this.evaluateWin(tempBoard, false)){
                        outcomes.push('win')
                    }
                }
            }
        }
        if(!outcomes.includes('win')){
            const gameBoardDiv = document.getElementById("gameBoard"); 
            const drawText = document.createElement("h1");
            const resetButton = document.createElement('button')
            resetButton.classList.add('reset-button')
            resetButton.innerHTML = 'Reset Game'
            resetButton.addEventListener('click',this.resetGame)
            drawText.classList.add('winning-text')
            drawText.innerHTML = `CAT!`
            drawText.style.left = '60px'
            gameBoardDiv.appendChild(drawText)
            gameBoardDiv.appendChild(resetButton)
            this.finished = true;
        }

    }
    drawWinLine(winningStraight){
        let win = winningStraight
        let winLine = []
        console.log(winningStraight)
        const [a, b, c] = winLine;
        const gameBoardDiv = document.getElementById("gameBoard"); 
        const line = document.createElement("div");
        line.classList.add("win-line");
        gameBoardDiv.appendChild(line);
        const lineClass = document.getElementsByClassName('win-line')[0]
        switch(win){
            case 'horizontal':
                winLine = [3,4,5]
                lineClass.style.top ='87.5px'
                lineClass.style.transform = "rotate(0deg)"
                document.documentElement.style.setProperty('--grow-width','175px')
                break
            case 'vertical':
                winLine = [1,4,7]
                lineClass.style.top ='5px'
                lineClass.style.left = '96px'
                lineClass.style.width = '5px'
                lineClass.style.height = '0px'
                lineClass.style.transform = "rotate(180deg)"
                document.documentElement.style.setProperty('--grow-width','5px')
                document.documentElement.style.setProperty('--grow-height','174px')
                break
            case 'diagnal1':
                winLine = [0,4,8]
                lineClass.style.top ='0px'
                lineClass.style.width = '0px'
                lineClass.style.height = '5px'
                lineClass.style.transform = "rotate(45deg)"
                break
            case 'diagnal2': // default settings
                winLine = [2,4,6]
                break
            case 'leftside':
                winLine = [0,3,6]
                lineClass.style.top = '5px'
                lineClass.style.left = '35px'
                lineClass.style.height = '0px'
                lineClass.style.width = '5px'
                lineClass.style.transform = 'rotate(180deg)'
                document.documentElement.style.setProperty('--grow-width','5px')
                document.documentElement.style.setProperty('--grow-height','174px')

                break
            case 'rightside':
                winLine = [2,5,8]
                winLine = [0,3,6]
                lineClass.style.top = '5px'
                lineClass.style.left = '157.5px'
                lineClass.style.height = '0px'
                lineClass.style.width = '5px'
                lineClass.style.transform = 'rotate(180deg)'
                document.documentElement.style.setProperty('--grow-width','5px')
                document.documentElement.style.setProperty('--grow-height','174px')
                break
            case 'topside':
                winLine = [0,1,2]
                lineClass.style.top ='27px'
                lineClass.style.transform = "rotate(0deg)"
                document.documentElement.style.setProperty('--grow-width','175px')
                break
            case 'bottomside':
                winLine = [6,7,8]
                lineClass.style.top ='150px'
                lineClass.style.transform = "rotate(0deg)"
                document.documentElement.style.setProperty('--grow-width','175px')
                break
        }
      
    }
    resetGame(){
        // refresh page for reset
        location.reload();
    }
}
    

let newGame = new Game();
newGame.run()



/*
Q: How will we hold the game state?

A:
-We could use an array, with coordinates?* as the key,
-and X,O,Empty as the values.

-We could use a list, and use topleft as 0 going left
to right until 8 is reached in the botttom right
*/