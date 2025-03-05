import Piece from "./Piece";




function Slot({value}){

    return(
        <div className={` rounded-full w-[32px] h-[32px] md:w-[64px] md:h-[64px] ${value===0? "bg-white" : ""}`} >
            {value !== 0 ? <Piece pieceVal={value}/> : null}
        </div>
    )
}

export default Slot;