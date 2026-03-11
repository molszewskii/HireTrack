import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart3, Bell, Settings, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            setIsLoggedIn(true);
        }
    }, []);

    const activeClass = (path: string) => 
        location.pathname === path 
        ? "bg-[#344F76] text-white shadow-lg" 
        : "text-white/60 hover:bg-[#455F99]/30 hover:text-white";

    return (
        <div className="flex flex-col h-screen bg-linear-to-br from-[#1b253b] to-[#2a4571] w-64 border-r border-white/5">
            <div className="flex items-center gap-3 p-8 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                </div>
                <h2 className="text-white text-xl font-bold tracking-tight">Job Tracker</h2>
            </div>

            {isLoggedIn ? (
                <nav className="flex flex-col px-4 gap-2 flex-1">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Main Menu</p>
                    
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/dashboard')}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/statistics')}`}>
                        <BarChart3 size={18} />
                        Statistics
                    </button>

                    <button className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/notifications')}`}>
                        <Bell size={18} />
                        Notifications
                    </button>

                    <div className="mt-auto mb-8">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Preferences</p>
                        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/settings')}`}>
                            <Settings size={18} />
                            Settings
                        </button>
                    </div>
                </nav>
            ) : (
                <div className="mt-auto p-6 space-y-3">
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
                    >
                        <LogIn size={18} />
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/register')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
                    >
                        <UserPlus size={18} />
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    );
}

export default Navbar;