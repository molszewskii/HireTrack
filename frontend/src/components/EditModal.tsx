import { useState } from "react";
import type { JobApplication } from "../types/JobApplication";
import api from "../api/api";
import InputField from "./InputField";

interface EditModalProps {
  job: JobApplication;
  onClose: () => void;
}

const EditModal = ({ job, onClose }: EditModalProps) => {
  const [formData, setFormData] = useState<JobApplication>(job);

  const handleEdit = async (id: number) => {
    try {
      await api.put(`jobapplication/${id}/`, formData);
      onClose();
    } catch (err) {
      console.error("Problem z edycją:", err);
      alert("Failed to save changes");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <form
        className="bg-[#253352] p-8 rounded-2xl shadow-2xl flex flex-col gap-5 min-w-[450px] border border-white/10"
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit(job.id);
        }}
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-white">Edit application</h2>
          <p className="text-white/50 text-sm mt-1">Update information about {job.company_name}</p>
        </div>

        <div className="space-y-4">
          <InputField label="Company" name="company_name" value={formData.company_name} onChange={handleChange} />
          <InputField label="Position" name="position" value={formData.position} onChange={handleChange} />
          <InputField label="Status" name="status" value={formData.status} onChange={handleChange} />
          <InputField label="Date" name="applied_date" type="date" value={formData.applied_date} onChange={handleChange} />
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;