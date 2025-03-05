import { FaSun } from "react-icons/fa";


function Header(){
    return(
        <header className="flex items-center justify-between p-2 bg-gray-200 rounded-md shadow-md">
            {/*title of the app*/}
            <h1 className="flex gap-1 text-5xl font-bold"><p>Connect</p><p className="text-amber-700">4</p></h1>

            {/*header options component*/}
            <div className="flex gap-1 items-center justify-center">
                {/*app appearance theme icon*/}
                <button className="text-center p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                    <FaSun/>
                </button>
                {/*sign in option button */}
                <button className="hover:bg-gray-300 text-center p-2 rounded-md cursor-pointer">Sign In</button>
            </div>
        </header>
    )
}

export default Header;