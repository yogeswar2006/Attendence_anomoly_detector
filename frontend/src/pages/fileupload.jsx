
import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./dataProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";


export default function FileUpload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploaded,setUploaded]=useState(false)
  const {Analysing,setAnalysing,setoutput,setSummary,setStudents}=useContext(DataContext)
  const [job_id,setJob_id]=useState(null)
  const navigate = useNavigate()
  

  const handleUploads = async ()=>{
       try{
             if(file){
              const formData= new FormData()
              formData.append("file",file)
                 const response = await axios.post("https://attendence-anomoly-detector.onrender.com/api/upload/",formData)
                 console.log(response.data)
                 setJob_id(response.data.job_id)
                
                 setUploaded(true)
                 toast.success("File uploaded successfull, click Analyze !")
             }else{
                
                toast.error("Failed to Upload, please check format of your file!")
             }
       }catch(error){
        console.log(error)
        toast.error("Failed to Upload, please check format of your file!")
       }
  }

  const handleAnalyze =async ()=>{
      

       try{
            setAnalysing(true)
            const response = await axios.post("https://attendence-anomoly-detector.onrender.com/api/analyze/",{"job_id":job_id})
            console.log(response.data);
            setSummary(response.data.summary)
            setStudents(response.data.students)
            navigate('/output')
            

       }catch (error){
            console.log(error)
            toast.error("Failed to Analyze , please follow demo process!")
            

       }finally{
              setAnalysing(false)
       }
       
  }

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
  };

  return (
    <>
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      className="w-60 h-60 flex flex-col justify-center items-center
                 border-2 border-dashed border-gray-400
                 rounded-xl cursor-pointer
                 hover:border-blue-500 hover:bg-[#32de84] hover:text-slate-950"
    >
      <p className="text-gray-600 hover:text-slate-950">Drag & drop your file</p>
      <p className="text-sm text-gray-400">or click to upload</p>

      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {file && (
        <p className="mt-2 text-sm text-gray-700">
          {file.name}
        </p>
      )}
    </div>
    <div class="flex gap-1">
     <button class="bg-lime-400 text-slate-950 p-2 rounded hover:bg-amber-500 hover:cursor-pointer font-bold " onClick={handleUploads} disabled={!file | uploaded}  >UPLOAD</button>
     <button class="bg-lime-400 text-slate-950 p-2 rounded hover:bg-amber-500 hover:cursor-pointer font-bold" onClick={handleAnalyze} disabled={!uploaded}  >ANALYZE</button>
     </div>
      <ToastContainer position="top-right" 
                       autoClose={3000}
                       hideProgressBar={false}
                       
                       closeOnClick
                       pauseOnHover />
    </>
  );
}
