import { useEffect, useState } from "react"
import type { JobApplication } from "../types/JobApplication"
import api from "../api/api";
import axios from "axios";

const Dashboard = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.get<JobApplication[]>('jobapplication/')
        .then(res => {
            setApplications(res.data);
            setLoading(false);
        }).catch(err => {
            if(axios.isAxiosError(err)){
                console.error(err.response?.data);
                console.error(err.response?.status);
            }else{
                console.error(err.message);
            }
            setLoading(false);
        })
    },[]);

    const handleDelete= async(id: number)=>{
        if(!window.confirm("Do u reallly want to delete this job application?"))
            return;
        try{
            await api.delete(`jobapplication/${id}/`);
            setApplications(applications.filter(app => app.id !== id));
            console.log("Job application has been deleted successfully!")
        }catch(err){
            console.error("There has been an error while deleting...", err)
            alert("Failed to remove job application")
        }
    }

    if(loading) return <p>Job applications are loading, please wait...</p>

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-2">
                Your Job Applications
            </h2>
            
            {applications.length === 0 ? (
                <p className="text-gray-500 italic">Brak zapisanych aplikacji.</p>
            ) : (
                <ul className="space-y-4">
                    {applications.map(app => (
                        <li key={app.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div>
                                <h3 className="font-semibold text-lg text-blue-600 text-left">{app.company_name}</h3>
                                <p className="text-gray-600">{app.position} • <span className="text-sm font-medium px-6 py-1 bg-blue-100 rounded text-blue-800 ">{app.status}</span></p>
                            </div>
                            <button 
                                onClick={() => handleDelete(app.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all text-sm font-medium shadow-sm"
                            >
                                Usuń
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};

export default Dashboard;