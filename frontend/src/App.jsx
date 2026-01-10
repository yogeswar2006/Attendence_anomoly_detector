import { useState } from 'react'
import Dashboard from './pages/dashboard'
import { Route, Routes } from 'react-router-dom'
import Demo_upload from './pages/demo_upload'
import Analysing from './pages/analyzing'
import DataProvider from './pages/dataProvider'
import Output from './pages/results_dashB'
import { ToastContainer } from "react-toastify";

function App() {


  return (
    <>
    <DataProvider>
      <Analysing>
         <Routes>

              <Route  path='/' element={<Dashboard/>} />
              <Route path='/upload_demo' element={<Demo_upload/>}/>
              <Route path='/analysing' element={<Analysing/>} />
              <Route path='/output'element={<Output/>} />

          </Routes>
        </Analysing>
    </DataProvider>

     <ToastContainer   position="top"
                       autoClose={3000}
                       hideProgressBar={false}
                       newestOnTop={true}
                       closeOnClick
                       pauseOnHover/>
    </>
  ) 
}

export default App
