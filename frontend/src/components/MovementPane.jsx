
import Board from "./Board";

const NUM_ROWS = 1;


function getMoveData(piecePosition, numCols, playerVal){
    const moveData = Array(NUM_ROWS).fill(Array(numCols).fill(0));

    moveData[0][piecePosition] = playerVal;

    return moveData;
}

function MovementPane({numCols, piecePosition, playerVal}){

   const moveData = getMoveData(piecePosition, numCols, playerVal);

    return(
        <>
            <Board numRows={NUM_ROWS} numCols={numCols} boardData={moveData} transparent={true}/>
        </>
    )

}

export default MovementPane;