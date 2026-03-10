import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import type { JobApplication } from "../types/JobApplication";
import api from "../api/api";
import StatsCards from "./dashboard/StatsCards";
import JobTable from "./dashboard/JobTable";

const Dashboard = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [addClicked, setAddClicked] = useState(false);

  const fetchData = () => {
    api.get<JobApplication[]>("jobapplication/")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) console.error(err.response?.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedJob]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Do you really want to delete this job application?")) return;
    try {
      await api.delete(`jobapplication/${id}/`);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (err) {
      alert("Failed to remove job application");
    }
  };

  if (loading && applications.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#1b253b] text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-8 bg-[#1b253b] text-white">
      <StatsCards applications={applications} />

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight border-l-4 border-[#344f76] pl-4">
          Your Job Applications
        </h2>
        <button
          className="py-2.5 px-6 rounded-lg text-white font-bold bg-[#344f76] hover:bg-[#455F99] transition-all hover:scale-105 shadow-lg"
          onClick={() => setAddClicked(true)}
        >
          + Add New
        </button>
      </div>

      <JobTable 
        applications={applications} 
        onEdit={setSelectedJob} 
        onDelete={handleDelete} 
      />

      {selectedJob && <EditModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      {addClicked && <AddModal onJobAdded={fetchData} onClose={() => setAddClicked(false)} />}
    </div>
  );
};

export default Dashboard;