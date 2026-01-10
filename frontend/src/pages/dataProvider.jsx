import { createContext,useState } from "react"
import Analysing from "./analyzing"

export const DataContext = createContext()


function DataProvider({children}){

    const [Analysing,setAnalysing]=useState(false)
    const [output,setoutput]=useState(null)
    const [summary,setSummary]=useState(null)
    const [students,setStudents]=useState(null)

    return(
      <DataContext.Provider value={{Analysing,setAnalysing,output,setoutput,summary,setSummary,students,setStudents}}>
        {children}
      </DataContext.Provider>
    )
}

export default DataProvider