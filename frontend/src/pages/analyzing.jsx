import DataProvider from "./dataProvider"
import { DataContext } from "./dataProvider"
import { useContext } from "react"


function Analysing({children}){
  const {Analysing,setAnalysing}=useContext(DataContext)

  

  if (Analysing){
    return <>
        <div class="flex bg-slate-950 justify-center items-center min-h-screen">
           <div class="flex flex-col justify-center items-center w-100 h-80 bg-amber-600 rounded-2xl">
               <img></img>
               <h1 class="rounded-2xl">Analysing ...</h1>
           </div>
           </div>
    </>
  }
  return <>{children}</>
}


export default Analysing