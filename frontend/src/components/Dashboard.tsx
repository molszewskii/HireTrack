import { useEffect, useState } from "react"
import type { JobApplication } from "../types/JobApplication"
import api from "../api/api";
import axios from "axios";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const Dashboard = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
    const [addClicked, setAddClicked] = useState(false);

    const fetchData = () => {
        api.get<JobApplication[]>('jobapplication/')
        .then(res => {
            setApplications(res.data);
            setLoading(false);
        }).catch(err => {
            if(axios.isAxiosError(err)){
                console.error(err.response?.data);
            }
            setLoading(false);
        })
    }

    useEffect(() => {     
        fetchData();
    }, [selectedJob]);

    const handleDelete = async (id: number) => {
        if(!window.confirm("Do you really want to delete this job application?")) return;
        try {
            await api.delete(`jobapplication/${id}/`);
            setApplications(applications.filter(app => app.id !== id));
        } catch(err) {
            alert("Failed to remove job application");
        }
    }

    if(loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-[#1b253b] text-white">
            <p className="animate-pulse">Loading applications...</p>
        </div>
    );

    return (
        <div className="min-h-screen w-full p-8 bg-[#1b253b] text-white">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight border-l-4 border-[#344f76] pl-4">
                    Your Job Applications
                </h2>
                <button 
                    className="py-2 px-6 rounded-lg text-white font-bold bg-[#344f76] hover:bg-[#455F99] transition-all hover:scale-105 shadow-lg"
                    onClick={() => setAddClicked(true)}
                >
                    + Add New
                </button>
            </div>
            
            <div className="w-full bg-[#253352]/30 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] bg-[#344f76]/50 p-4 text-xs font-bold uppercase tracking-wider text-white/60 border-b border-white/10">
                    <div>Company</div>
                    <div>Position</div>
                    <div>Status</div>
                    <div>Date</div>
                    <div className="text-right">Actions</div>
                </div>
                
                {applications.length === 0 ? (
                    <div className="p-10 text-center text-white/40 italic">
                        No applications found. Start by adding one!
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {applications.map(app => (
                            <div 
                                key={app.id} 
                                className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] p-4 text-sm items-center hover:bg-white/5 transition-colors group"
                            >
                                <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                                    {app.company_name}
                                </div>
                                <div className="text-white/80 italic">
                                    {app.position}
                                </div>
                                <div>
                                    <span className="px-3 py-1 rounded-full bg-[#344f76] text-blue-200 text-[11px] font-bold uppercase border border-blue-400/20">
                                        {app.status}
                                    </span>
                                </div>
                                <div className="text-white/50">
                                        {app.applied_date}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => setSelectedJob(app)}
                                        className="py-2 px-4 bg-blue-500/10 hover:bg-blue-500/30 text-blue-400 rounded-md transition-all"
                                        title="Edit"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(app.id)}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-md transition-all"
                                        title="Delete"
                                    >
                                        Delete
                                    </button>
                                </div>   
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedJob && <EditModal job={selectedJob} onClose={() => setSelectedJob(null)}/>}
            {addClicked && <AddModal onJobAdded={fetchData} onClose={() => setAddClicked(false)}/>}
        </div>
    );
};

export default Dashboard;