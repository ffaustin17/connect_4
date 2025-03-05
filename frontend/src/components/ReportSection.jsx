
//form that the player/user can use to share their review of the experience
function ReportSection(){
    return(
    <form className="flex flex-col gap-2">
        <label className="font-bold text-center">Did You Enjoy Your Experience? Did you encounter any bugs? Let me know what you think down below! :</label>
        <textarea className="rounded-md shadow-md border-1"></textarea>
        <div className="flex items-center justify-center">
        <button className="bg-blue-400 rounded-md hover:bg-blue-500 p-2">
            Submit Report
        </button>
        </div>
        
    </form>
    )
}

export default ReportSection;