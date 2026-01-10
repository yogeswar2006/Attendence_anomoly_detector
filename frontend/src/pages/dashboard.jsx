import { Link } from "react-router-dom";
import FileUpload from "./fileupload"
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  ClockIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/solid";



function Dashboard(){


    return(
        <> 
        <div class="min-h-screen bg-slate-950 text-white">
            <div class="flex justify-around items-center text-white p-4 " >
                <div>
                    <h1 class="text-3xl font-extrabold ">! Fraud AI</h1>
                </div>

                <div>
                    <h2 class="text-xl font-medium">FAQS</h2>
                </div>
            </div>
            <hr></hr>

            <h1 class="text-3xl font-bold text-center mt-10 mb-10">AI Attendence Anomaly Detector ! </h1>

            <div class="flex  justify-around items-center">
                <div class="flex flex-col gap-4 items-start">
                      <div class="flex flex-col gap-2 p-20   rounded-2xl bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(3,1,49,1)_38%,rgba(8,28,133,1)_76%,rgba(6,72,162,1)_88%,rgba(5,99,180,1)_100%)]">
                            <h2 class="text-3xl font-medium wrap-break-word md:w-110">Drop your csv file !
                             know the accuracy of attendence 
                             for students</h2>
                             <h3 class="font-normal wrap-break-word md:w-150">This system detects unusual attendance patterns 
                               that may indicate proxy attendance, system misuse, 
                                 or irregular student behavior using data-driven analysis.</h3>
                      </div>
                     
                </div>
                <div class="flex flex-col justify-center items-center gap-4">
                       <Link to={"upload_demo"} class="font-bold text-green-600 hover:text-red-600 text-2xl">DEMO for upload</Link>
                        <FileUpload/>
                </div>
            </div>


            <div class="flex flex-col justify-center  items-center gap-4 mt-10" >
                  <h1 class="text-2xl font-bold ">Types of Anomalies!</h1>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-amber-600 p-6 rounded-2xl text-xl">
                            <ArrowTrendingUpIcon class="h-10 w-10 text-slate-950 "/>
                            Unusually high attendence
                        </div>
                        <div class="bg-amber-600 p-6 rounded-2xl text-xl">
                            <BoltIcon class="h-10 w-10 text-slate-950 "/>
                            Sudden attendence spikes
                        </div>
                        <div class="bg-amber-600 p-6 rounded-2xl text-xl">
                           <ClockIcon class="h-10 w-10 text-slate-950 "/>
                            Irregular Check-in times
                        </div>
                        <div class="bg-amber-600 p-6 rounded-2xl text-xl">
                            <CalendarDaysIcon class="h-10 w-10 text-slate-950 "/>
                            Attendence inconsistent with 
class schedule
                        </div>
                        
                    </div>
            </div>

            <div class="flex flex-col justify-center items-center gap-4 mt-10 pb-10 ">
                <h1 class="text-2xl font-bold ">Why this MATTERS ? </h1>
                <div class="flex flex-col gap-2 w-[50%] p-2 rounded-2xl justify-center items-center  bg-green-500 font-medium text-xl text-slate-950">
                    <h1>Prevents proxy attendence</h1>
                    <h1>Improves academic integrity</h1>
                    <h1>Helps faculty intervene early</h1>
                    <h1>Reduces manual monitoring efforts</h1>
                </div>

            </div>
            </div>
        </>
    )
}

export default Dashboard