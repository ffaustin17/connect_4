import Slot from "./Slot";

function Board({numRows, numCols, boardData, transparent=false}){

    return (
        <div className={`grid grid-cols-5 gap-x-4 gap-y-1.5 ${transparent ? "" : "bg-gray-400 drop-shadow-xl"} rounded-md  px-5 py-2.5`}>
            {boardData.map((row, rowIndex)=>
            row.map((value, index)=>(
                
                <Slot key={`${rowIndex}-${index}`}
                    value={value}
                />
            
            )))}
        </div>
    )

}

export default Board;