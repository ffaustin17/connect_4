import GameSection from "./components/GameSection"
import Header from "./components/Header"
import ReportSection from "./components/ReportSection"



function App() {


  return (
    <div>
      <div className="w-full h-screen flex flex-col p-1">
        <Header/>
        <GameSection/>
      </div>
      <ReportSection/>
    </div>
    
  )
}

export default App
