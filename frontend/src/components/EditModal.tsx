import { useState } from "react";
import type { JobApplication } from "../types/JobApplication";
import api from "../api/api";
import InputField from "./InputField";

interface EditModalProps{
    job: JobApplication,
    onClose: () => void;
}

const EditModal = ({job, onClose}: EditModalProps) => {
    const [formData, setFormData] = useState<JobApplication>(job);

    const handleEdit = async(id: number)=>{
    try{
        console.log(formData)
        await api.put(`jobapplication/${id}/`,
            formData
        );
        console.log(formData)
        console.log("Edycja")
        onClose()
    }catch(err){
        console.error("There has been a problem with editing...",err)
        alert("Failed to save changes")
    }
    }

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }


   return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <form 
      className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 min-w-120"
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(job.id);
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Edit job application</h2>
      
      <InputField label="Company" name="company_name" value={formData.company_name} onChange={handleChange} />
      <InputField label="Position" name="position" value={formData.position} onChange={handleChange} />
      <InputField label="Status" name="status" value={formData.status} onChange={handleChange} />
      <InputField label="Data" name="applied_date" type="date" value={formData.applied_date} onChange={handleChange} />

      <div className="flex gap-2 mt-4">
        <button 
          type="submit" 
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        <button 
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </form>
  </div>
);
}

export default EditModal;