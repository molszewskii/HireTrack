import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const access_token = localStorage.getItem('access_token');
        if(access_token){
            setIsLoggedIn(true);
        }
    },[])

    
    return(
        <div className="flex flex-col bg-linear-to-br from-[#1b253b] to-[#2a4571] w-xs">
            <h2 className="text-white text-2xl p-6 font-semibold">Job Tracker</h2>
            {isLoggedIn ? (
                <div className="flex flex-col px-2 min-h-1/3 justify-evenly border-y border-y-[#364B78]">
                    <button type="button" className="px-4 py-2 rounded-md hover:bg-[#455F99] hover:scale-102 text-white font-bold" onClick={()=>navigate('/dashboard')}>Dashboard</button>
                    <button type="button" className="px-4 py-2 rounded-md hover:bg-[#455F99] hover:scale-102 text-white font-bold">Statistics</button>
                    <button type="button" className="px-4 py-2 rounded-md hover:bg-[#455F99] hover:scale-102  text-white font-bold">Notifications</button>
                    <button type="button" className="px-4 py-2 rounded-md hover:bg-[#455F99] hover:scale-102 text-white font-bold">Settings</button>
                </div>
            ):(
                <div>
                    <button type="button" className="px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 hover:scale-105 text-white font-bold">Sign In</button>
                    <button type="button" className="px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 hover:scale-105 text-white font-bold">Sign Up</button>
                </div>
            )}
        </div>
    )
}

export default Navbar;