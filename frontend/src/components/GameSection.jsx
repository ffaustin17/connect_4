import { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import MovementPane from "./MovementPane";
import isGameWon from "../logic/isGameWon";

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

//function to determine if the game is a draw
function isDraw(boardData){
    return !boardData[0].includes(0);
}

//function to get the game over object
function getGameOverStatus(lastPlayerPos, boardData){
    const gameOver = {status: false, outcome: ""};

    if(isGameWon(lastPlayerPos, boardData)){
        gameOver.status = true;
        gameOver.outcome = "GAME_WON";
    }
    else if(isDraw(boardData)){
        gameOver.status = true;
        gameOver.outcome = "DRAW";
    }
    
    return gameOver;
}

//function to get empty board
function getEmptyBoard(numRows){
    return Array.from({length: numRows}, ()=>[]);
}

function GameSection({numRows = 7, numCols = 5}){
    console.log(`component (re-)rendered`);
    //-------------state variables-----------------------------------------------------

    //console.log("game section rendered.")
    //how the game board is stored at first. We follow a stack based matrix at first because of the nature of the game
    //the data will have to be appropriately transformed for rendering purposes
    const [gameData, setGameData] = useState(getEmptyBoard(numRows));
    const [piecePosition, setPiecePosition] = useState(0);
    const [playerVal, setPlayerVal] = useState(1);
    const [aiTargetPos, setAiTargetPos] = useState(null); //helps the AI remember where it wants to drop the piece across re-renders

    //extract board data from game data
    const boardData = toBoardData(gameData, numRows, numCols);
    const isGameOver = getGameOverStatus(piecePosition, boardData);

    //console.log(boardData);

    //-------------logic-----------------------------------------------------

    //reset logic
    const handleReset = () =>{
        setGameData(getEmptyBoard(numRows));
        setPiecePosition(0);
        setPlayerVal(1);
        setAiTargetPos(null);
    }

    //AI movemement logic
    const handleAIMove = useCallback( () =>{
        //console.log(`@handleAIMove`);

        setTimeout(()=>{
            let targetColumn; //the col the AI intends to move at a particular render

            if(aiTargetPos === null){
                //console.log(`ai target position is null - determining it right now`)
                const availableCols = [];

                //Find all valid columns
                for(let col = 0; col < numCols; col++){
                    if(gameData[col].length < numRows){
                        availableCols.push(col);
                    }
                }

                if(availableCols.length === 0) return; //no valid moves

                targetColumn = availableCols[Math.floor(Math.random()* availableCols.length)]; //random ai move for now
                setAiTargetPos(targetColumn); //store target for next render.
            }
            else{
                targetColumn = aiTargetPos;
            }

            //console.log(`ai target and targetColumn are found. The value is: ${targetColumn}`);


            console.log(`The current value of piecePosition is ${piecePosition}`)
            if(piecePosition < targetColumn){
                setPiecePosition(prev => prev + 1);
            }
            else if(piecePosition > targetColumn){
                setPiecePosition(prev => prev - 1);
            }
            else{
                setGameData(prev=>prev.map((row, rowIndex)=>{
                    let newRow = [...row];

                    if(rowIndex === piecePosition) newRow.push(playerVal);

                    return newRow;
                }));

                setPlayerVal(prev => prev === 1 ? 2 : 1);
                setAiTargetPos(null);
            }
            }, 1000);
    }, [aiTargetPos, gameData, numCols, numRows, piecePosition, playerVal]);



    //useEffect to listen for keydown events and change the piece position accordingly
    useEffect(()=>{
        //console.log(`useEffect is called.`);

        if(isGameOver.status === true) return;

        //only listen for keyboard input when it is the player's turn
        if(playerVal !== 1){
            handleAIMove();
            
        }
        else{
            //console.log("@useEffect 1");
            function handleKeyDown(event){
                switch(event.key){
                    case "ArrowRight":
                        setPiecePosition(prev=>(prev < (numCols - 1) ? prev + 1 : prev));
                        break;
                    case "ArrowLeft":
                        setPiecePosition(prev=>(prev > 0 ? prev - 1 : prev));
                        break;
                    case "d":
                        console.log("in d condition")
                        console.log(gameData)
                        if(gameData[piecePosition].length < numRows){
                            setGameData(prev=>prev.map((row, rowIndex)=>{
                                let newRow = [...row];

                                if(rowIndex === piecePosition) newRow.push(playerVal);

                                return newRow;
                            }));

                            setPlayerVal(prev => prev === 1 ? 2 : 1);
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
        }
    }, [numCols, numRows, piecePosition, playerVal, gameData, handleAIMove, isGameOver.status])


    
    let lastPlayer = playerVal === 1 ? 2 : 1;
    

    //-------------Rendering-----------------------------------------------------

    return(
        <div className="flex flex-col py-4 px-8 gap-2 rounded-md shadow-md">
            <div className="flex items-center justify-center">
                <MovementPane numCols={numCols} piecePosition={piecePosition} playerVal={playerVal}/>
            </div>
            <div className="flex items-center justify-center">
                <Board numRows={numRows} numCols={numCols} boardData={boardData}/>
            </div>
            {isGameOver.status === true && (
                <div className="flex flex-col items-center justify-center">
                    <p>{isGameOver.outcome === "DRAW" ? "Game ended in a draw" : `player ${lastPlayer} won the game.`}</p>
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer p-4 text-white rounded-lg"
                        onClick={handleReset}
                        >Start another game
                    </button>
                </div>
                
            )}
            
        </div>
    )
}

export default GameSection;