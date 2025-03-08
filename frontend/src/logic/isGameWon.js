//function to determine if the game is won
export default function isGameWon(lastPlayerCol, boardData){
    const num_rows = boardData.length;
    const num_cols = boardData[0].length;

    //determine who was the last player and fully locate where they last played
    let lastPlayerRow;
    let playerVal;

    for(let rowIndex = 0; rowIndex < num_rows; rowIndex++){
        if(boardData[rowIndex][lastPlayerCol] !== 0){
            //console.log("entered the condition")
            playerVal = boardData[rowIndex][lastPlayerCol];
            lastPlayerRow = rowIndex;

            break;
        }
    }

    if(!playerVal && !lastPlayerRow) return false; 


    //get the reference points for each directions
    let currCol;
    let currRow;

    //get the col position of the rightmost uninterrupted cell for left checks
    let rightmostCellCol;

    for(let i = 0; i < 4; i++){
        currCol = lastPlayerCol + i;

        try{
            if(boardData[lastPlayerRow][currCol] !== playerVal){
                rightmostCellCol = currCol - 1;
                break;
            }
        }
        catch{
            rightmostCellCol = currCol - 1;
            break;
        }

        rightmostCellCol = currCol;
    }

    //get the col position of the leftmost uninterrupted cell for right checks
    let leftmostCellCol;

    for(let i = 0; i < 4; i++){
        currCol = lastPlayerCol - i;

        try{
            if(boardData[lastPlayerRow][currCol] !== playerVal){
                leftmostCellCol = currCol + 1;
                break;
            }
        }
        catch{
            leftmostCellCol = currCol + 1;
            break;
        }
        

        leftmostCellCol = currCol;
    }

    //get the row position of the uppermost uninterrupted cell for down checks
    let uppermostCellRow = lastPlayerRow;

    //get the row and col positions of the top cell in the right diagonal line from the last player cell
    let rightDiagonalTop = {row: 0, pos: 0};

    for(let i = 0; i < 4; i++){
        currRow = lastPlayerRow - i;
        currCol = lastPlayerCol + i;

        try{
            if(boardData[currRow][currCol] !== playerVal){
                rightDiagonalTop.row = currRow + 1;
                rightDiagonalTop.col = currCol - 1;
                break;
            }
    
        }
        catch{
            rightDiagonalTop.row = currRow + 1;
            rightDiagonalTop.col = currCol - 1;
            break;
        }

        rightDiagonalTop.row = currRow;
        rightDiagonalTop.col = currCol;
    }

    //get the row and col positions of the top cell in the right diagonal line from the last player cell
    let rightDiagonalBottom = {row: 0, pos: 0};

    for(let i = 0; i < 4; i++){
        currCol = lastPlayerCol + i;
        currRow = lastPlayerRow + i;

        try{
            if(boardData[currRow][currCol] !== playerVal){
                rightDiagonalBottom.row = currRow - 1;
                rightDiagonalBottom.col = currCol - 1;
                break;
            }
        }
        catch{
            //console.error(`error happened @rightDiagonalTop cell determination operation: ${err.message}`);
            rightDiagonalBottom.row = currRow - 1;
            rightDiagonalBottom.col = currCol - 1;
            break;
        }

        rightDiagonalBottom.row = currRow;
        rightDiagonalBottom.col = currCol;

    }

    //get the row and col positions of the top cell in the right diagonal line from the last player cell
    let leftDiagonalTop = {row: 0, pos: 0};

    for(let i = 0; i < 4; i++){
        currCol = lastPlayerCol - i;
        currRow = lastPlayerRow - i;

        try{
            if(boardData[currRow][currCol] !== playerVal){
                leftDiagonalTop.row = currRow + 1;
                leftDiagonalTop.col = currCol + 1;
                break;
            }
        }
        catch{
            leftDiagonalTop.row = currRow + 1;
            leftDiagonalTop.col = currCol + 1;
            break;
        }

        leftDiagonalTop.row = currRow;
        leftDiagonalTop.col = currCol;

    }

    //get the row and col positions of the top cell in the right diagonal line from the last player cell
    let leftDiagonalBottom = {row: 0, pos: 0};

    for(let i = 0; i < 4; i++){
        currCol = lastPlayerCol - i;
        currRow = lastPlayerRow + i;

        try{
            if(boardData[currRow][currCol] !== playerVal){
                leftDiagonalBottom.row = currRow - 1;
                leftDiagonalBottom.col = currCol + 1;
                break;
            }
        }
        catch{
            leftDiagonalBottom.row = currRow - 1;
            leftDiagonalBottom.col = currCol + 1;
            break;
        }

        leftDiagonalBottom.row = currRow;
        leftDiagonalBottom.col = currCol;
    }

    //to let us know if we should even attempt checks
    let canCheckRight = (leftmostCellCol + 3 < num_cols);
    let canCheckLeft = (rightmostCellCol  >= 3);
    let canCheckDown = (uppermostCellRow <= 3);

    //diagonal checks
    let canCheckRightDiagonalFromTop = leftDiagonalTop.row <= 3 && (leftDiagonalTop.col + 3 < num_cols);
    let canCheckRightDiagonalFromBottom = leftDiagonalBottom.row >= 3 && (leftDiagonalBottom.col + 3 < num_cols);
    let canCheckLeftDiagonalFromTop = rightDiagonalTop.row <= 3 && (rightDiagonalTop.col >= 3);
    let canCheckLeftDiagonalFromBottom = rightDiagonalBottom.row >= 3 && (rightDiagonalBottom.col >= 3);


    //actual win sequence checks
    let potentialWinSequence = [];

    if(canCheckRight){
        potentialWinSequence = boardData[lastPlayerRow].slice(leftmostCellCol, leftmostCellCol + 4).filter((val)=> val === playerVal);
        if(potentialWinSequence.length === 4) return true;
    }

    //check right-down diagonal
    if(canCheckRightDiagonalFromTop){
        potentialWinSequence = [];
        let currentRowIndex = leftDiagonalTop.row;
        let currentColIndex = leftDiagonalTop.col;

        for(let i = 0; i < 4; i++){
            potentialWinSequence.push(boardData[currentRowIndex][currentColIndex]);
            currentRowIndex++;
            currentColIndex++;
        }

        if(potentialWinSequence.filter((val)=> val === playerVal).length === 4) return true;
    }

    //check right-up diagonal
    if(canCheckRightDiagonalFromBottom){
        potentialWinSequence = [];
        let currentRowIndex = leftDiagonalBottom.row;
        let currentColIndex = leftDiagonalBottom.col;

        for(let i = 0; i < 4; i++){
            potentialWinSequence.push(boardData[currentRowIndex][currentColIndex]);
            currentRowIndex--;
            currentColIndex++;
        }

        if(potentialWinSequence.filter((val)=> val === playerVal).length === 4) return true;
    }

    if(canCheckLeft){
        potentialWinSequence = [];
        potentialWinSequence =boardData[lastPlayerRow].slice(rightmostCellCol - 3, rightmostCellCol + 1).filter((val)=>val === playerVal);
        if(potentialWinSequence.length === 4) return true;
    }

    //check left-up diagonal
    if(canCheckLeftDiagonalFromTop){
        potentialWinSequence = [];
        let currentRowIndex = rightDiagonalTop.row;
        let currentColIndex = rightDiagonalTop.col;

        for(let i = 0; i < 4; i++){
            potentialWinSequence.push(boardData[currentRowIndex][currentColIndex]);
            currentRowIndex++;
            currentColIndex--;
        }

        if(potentialWinSequence.filter((val)=> val === playerVal).length === 4) return true;
    }
    //check right-up diagonal
    if(canCheckLeftDiagonalFromBottom){
        potentialWinSequence = [];
        let currentRowIndex = rightDiagonalBottom.row;
        let currentColIndex = rightDiagonalBottom.col;

        for(let i = 0; i < 4; i++){
            potentialWinSequence.push(boardData[currentRowIndex][currentColIndex]);
            currentRowIndex--;
            currentColIndex--;
        }

        if(potentialWinSequence.filter((val)=> val === playerVal).length === 4) return true;
    }

    if(canCheckDown){
        potentialWinSequence = [];

        for(let rowIndex = lastPlayerRow; rowIndex < lastPlayerRow + 4; rowIndex++){
            potentialWinSequence.push(boardData[rowIndex][lastPlayerCol]);
        }

        if(potentialWinSequence.filter((val)=>val === playerVal).length === 4) return true;
    }

    return false;
}

