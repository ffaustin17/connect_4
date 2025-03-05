
function Piece({pieceVal}){
    const color = pieceVal === 1 ? "bg-red-400" : "bg-yellow-400";

    return (
        <div className={`w-full h-full ${color} rounded-full`}></div>
    )
}

export default Piece; 