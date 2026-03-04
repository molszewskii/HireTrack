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

    if(loading) return <p>Job applications are loading, please wait...</p>

    return(
        <div>
            <h2>Your applications</h2>
            <ul>
                {applications.map(app => (
                    <li key={app.id}>{app.company_name} - {app.position}</li>
                ))}
            </ul>
        </div>
    )

};

export default Dashboard;