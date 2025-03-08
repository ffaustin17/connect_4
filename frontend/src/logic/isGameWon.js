//function to determine if the game is won
export default function isGameWon(lastPlayerCol, boardData){
    const num_rows = boardData.length;

    //determine who was the last player and fully locate where they last played
    let lastPlayerRow;
    let playerVal;

    for(let rowIndex = 0; rowIndex < num_rows; rowIndex++){
        if(boardData[rowIndex][lastPlayerCol] !== 0){
            playerVal = boardData[rowIndex][lastPlayerCol];
            lastPlayerRow = rowIndex;

            break;
        }
    }

    if(!playerVal && !lastPlayerRow) return false; 


    //get the reference points for each directions
    let currCol;
    let currRow;

    //track the distances of each reference points with the cell played by the last player
    let rightDistance = 0;
    let leftDistance = 0;
    let rightTopDistance = 0;
    let rightBottomDistance = 0;
    let leftTopDistance = 0;
    let leftBottomDistance = 0;

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
        if(i !== 0) rightDistance++;
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
        if(i !== 0) leftDistance++;
    }
    
    if(rightDistance + leftDistance >= 3) return true;

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

        if(i !== 0) rightTopDistance++;
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

        if(i !== 0 ) leftBottomDistance++;
    }

    if(rightTopDistance + leftBottomDistance >= 3) return true;

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

        if(i !== 0 ) rightBottomDistance++;
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

        if(i !== 0) leftTopDistance++;
    }

    if(leftTopDistance + rightBottomDistance >= 3) return true;

    let canCheckDown = (uppermostCellRow <= 3);

    //actual win sequence checks
    let potentialWinSequence = [];

    if(canCheckDown){
        potentialWinSequence = [];

        for(let rowIndex = lastPlayerRow; rowIndex < lastPlayerRow + 4; rowIndex++){
            potentialWinSequence.push(boardData[rowIndex][lastPlayerCol]);
        }

        if(potentialWinSequence.filter((val)=>val === playerVal).length === 4) return true;
    }

    return false;
}

