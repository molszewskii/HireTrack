import { useState } from "react";
import api from "../api/api";
import InputField from "./InputField";
import DropdownMenu from "./DropdownMenu";

interface AddModalProps {
  onJobAdded: () => void;
  onClose: () => void;
}

const AddModal = ({ onJobAdded, onClose }: AddModalProps) => {
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    status: 'applied',
  });
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const buttons = [
    {label: "applied"},
    {label: "offer"},
    {label: "interview"},
    {label: "rejected"},
  ]
  const handleAdd = async () => {
    try {
      await api.post('jobapplication/', formData);
      onJobAdded();
      onClose();
    } catch (err) {
      console.error("Problem z dodawaniem:", err);
      alert("Failed to add job application");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectStatus = (selectedStatus: string) =>{
    setFormData((prev)=>({
      ...prev,
      status: selectedStatus,
    }));
    setOpenDropdownMenu(false);
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <form
        className="bg-[#253352] p-8 rounded-2xl shadow-2xl flex flex-col gap-5 min-w-112.5 border border-white/10"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-white">Add Job Application</h2>
          <p className="text-white/50 text-sm mt-1">Fill in the details of your new application</p>
        </div>

        <div className="relative space-y-4">
          <InputField 
            label="Company" 
            name="company_name" 
            value={formData.company_name} 
            onChange={handleChange} 
          />
          <InputField 
            label="Position" 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
          />
          <InputField 
            label="Status" 
            name="status" 
            readOnly
            value={formData.status} 
            onChange={handleChange}
            onClick={()=>setOpenDropdownMenu(!openDropdownMenu)}
          />
          {openDropdownMenu && <DropdownMenu options={buttons} onSelect={handleSelectStatus}/>}
          
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white/5 text-white/70 py-2.5 rounded-xl hover:bg-white/10 transition-all font-medium border border-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-500 transition-all font-bold shadow-lg shadow-blue-900/20"
          >
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;