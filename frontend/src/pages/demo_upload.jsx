

function Demo_upload(){

    return(
        <>


          <div className="bg-black  min-h-screen w-full flex flex-col gap-5 text-white">
            <div className="flex bg-gray-800 rounded-b-2xl p-5 flex-col justify-center items-center bg-cover min-h-100 bg-center  " style={{ backgroundImage: "url('./src/assets/demo_img.png')" }}>
                 <div className="flex flex-col gap-3 bg-slate-900 p-15 rounded-2xl backdrop-blur-lg" >
                    <h1 className="text-2xl font-medium">Turning attendance data into actionable insights.</h1>
                    <h1 className="text-2xl font-medium">Detect attendance anomalies before they become problems</h1>
                    <h1 className="text-2xl font-medium">See attendance risks. Act early.</h1>
                 </div>
                 {/* <div>
                    <img src="./src/assets/demo_img.png" className="rounded-xl"></img>
                 </div> */}
            </div>

            <div className="text-center text-3xl text-green-600 mb-10 ">Steps to follow</div>

            <div className="flex flex-col gap-5"> 
                <div className="flex justify-center md:gap-30 items-center">
                      <div className="bg-blue-700 font-extrabold text-3xl p-20 rounded-t-4xl rounded-bl-4xl">
                         Step 1
                      </div>

                    <div className="flex flex-col ">
                         <div className="text-xl font-bold mb-3">Make sure your CSV file have these colums in order:</div>
                     <ol className="flex flex-col gap-2">
                        <li>student_id</li>
                        <li>attendance_ratio</li>
                        <li>avg_checkin_hour</li>
                        <li>checkin_variance</li>
                        <li>consecutive_absent_days</li>
                        <li>attendance_change</li>
                        
                     </ol>
                    </div>
                </div>

              <div className="flex justify-center md:gap-20 items-center">
                      <div className="bg-blue-700 font-extrabold text-3xl p-20 rounded-t-4xl rounded-bl-4xl">
                         Step 2
                      </div>

                    <div className="text-start">
                         <div className="text-2xl font-medium">Drag and Drop your CSV file in dropbox</div>                     
                    </div>
                </div>


              <div className="flex justify-center md:gap-20 items-center">
                      <div className="bg-blue-700 font-extrabold text-3xl p-20 rounded-t-4xl rounded-bl-4xl">
                         Step 3
                      </div>

                    <div className="text-start">
                         <div className="text-xl font-bold">Click <span className="bg-lime-400 mx-6 text-slate-950 p-2 rounded hover:bg-amber-500 hover:cursor-pointer font-bold ">UPLOAD</span> button & click <span className="bg-lime-400 text-slate-950 p-2 rounded mx-3 hover:bg-amber-500 hover:cursor-pointer font-bold ">ANALYZE</span>button</div>
                     
                    </div>
                </div>

                
              </div>
          </div>
        </>
    )
}

export default Demo_upload