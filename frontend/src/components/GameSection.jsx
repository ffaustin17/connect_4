import { useEffect, useState } from "react";
import Board from "./Board";
import MovementPane from "./MovementPane";

function toBoardData(gameData, numRows, numCols){
    const boardData = Array.from({length: numRows}, ()=>Array(numCols).fill(0));
    
    let rowIndex = 0;
    
    for(const row of gameData){
        let colIndex = 0;

        if(row.length === 0){
            rowIndex++;  
            continue;
        }

        for(const value of row){
            boardData[(numRows - 1) - colIndex][rowIndex] = value;
            colIndex++;
        }

        rowIndex++; 
    }

    return boardData;

}

//function to determine if the game is over and what is the outcome in said case
function isGameWon(lastPlayerPos, boardData){

    //console.log("@isGameWon");
    //console.log(boardData)

    //console.log(`last player pos: ${lastPlayerPos}`);

    const num_rows = boardData.length;
    const num_cols = boardData[0].length;

    //console.log(num_rows);
    //console.log(num_cols);

    let playerRowPos;
    let playerVal;

    //find who the last player was and the row where they played in the board.
    for(let rowIndex = 0; rowIndex < num_rows; rowIndex++){
        console.log("@ the loop")

        if(boardData[rowIndex][lastPlayerPos] !== 0){
            console.log("entered the condition")
            playerVal = boardData[rowIndex][lastPlayerPos];
            playerRowPos = rowIndex;

            break;
        }
    }


    //console.log(`player val: ${playerVal}`);
    //console.log(`player row pos: ${playerRowPos}`);

    if(!playerVal && !playerRowPos) return false;

    //to let us know if we should even attempt checks
    let canCheckRight = (lastPlayerPos + 3 < num_cols);
    let canCheckLeft = (lastPlayerPos  >= 3);
    let canCheckDown = (playerRowPos <= 3);
    let canCheckUp = (playerRowPos  - 3 >= 0); //this one is just for diagonal checks

    let potentialWinSequence = [];

    if(canCheckRight){
        //console.log("@right check")
        potentialWinSequence = boardData[playerRowPos].slice(lastPlayerPos, lastPlayerPos + 3).filter((val)=> val === playerVal);
        //console.log(`potential win sequence: ${potentialWinSequence}`)
        if(potentialWinSequence.length === 4) return true;

    }

    if(canCheckLeft){
        potentialWinSequence = [];
        //console.log("@left check")
        potentialWinSequence =boardData[playerRowPos].slice(0,lastPlayerPos + 1).filter((val)=>val === playerVal);
        //console.log("potential win sequence: ", potentialWinSequence)
        if(potentialWinSequence.length === 4) return true;
    }

    if(canCheckDown){
        potentialWinSequence = [];
        //console.log("@down check")

        for(let rowIndex = playerRowPos; rowIndex < playerRowPos + 4; rowIndex++){
            potentialWinSequence.push(boardData[rowIndex][lastPlayerPos]);
        }

        //console.log(`potential win sequence: ${potentialWinSequence}`)
        if(potentialWinSequence.length === 4) return true;
    }

    //console.log("didn't pass any checks")

    return false;
}





function GameSection({numRows = 7, numCols = 5}){
    //how the game board is stored at first. We follow a stack based matrix at first because of the nature of the game
    //the data will have to be appropriately transformed for rendering purposes
    const [gameData, setGameData] = useState(Array(numRows).fill(Array()));
    const [piecePosition, setPiecePosition] = useState(0);
    const [playerVal, setPlayerVal] = useState(1);


    //useeffect to listen for keydown events and change the piece position accordingly
    useEffect(()=>{
        function handleKeyDown(event){
            switch(event.key){
                case "ArrowRight":
                    setPiecePosition(prev=>(prev < (numCols - 1) ? prev + 1 : prev));
                    break;
                case "ArrowLeft":
                    setPiecePosition(prev=>(prev > 0 ? prev - 1 : prev));
                    break;
                case " ":
                    if(gameData[piecePosition].length < numRows){
                        setGameData(prev=>prev.map((row, rowIndex)=>{
                            let newRow = [...row];

                            if(rowIndex === piecePosition) newRow.push(playerVal);

                            return newRow;
                        }))
                }
                    break;
                default:
                    break;
            }
        }

        //add key listener
        window.addEventListener("keydown", handleKeyDown);

        //remove event listener on unmount
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [numCols,numRows, piecePosition, playerVal, gameData])


    //useEffect to switch players after a move
    useEffect(()=>{
        setPlayerVal(prev => prev === 1 ? 2 : 1);
    }, [gameData]);


    //extract board data from game data
    const boardData =toBoardData(gameData, numRows, numCols);

    let lastPlayer = playerVal === 1 ? 2 : 1;
    


    return(
        <div className="flex flex-col py-4 px-8 gap-2 rounded-md shadow-md">
            <div className="flex items-center justify-center">
                <MovementPane numCols={numCols} piecePosition={piecePosition} playerVal={playerVal}/>
            </div>
            <div className="flex items-center justify-center">
                <Board numRows={numRows} numCols={numCols} boardData={boardData}/>
            </div>
            {isGameWon(piecePosition, boardData) && <p className="text-center">{`player ${lastPlayer} won the game.`}</p>}
            
        </div>
    )
}

export default GameSection;