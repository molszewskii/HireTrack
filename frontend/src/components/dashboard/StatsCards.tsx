import type { JobApplication } from "../../types/JobApplication";

const StatsCards = ({ applications }: { applications: JobApplication[] }) => {
  const stats = [
    { label: "Total Sent", value: applications.length, color: "text-white", sub: "Applications" },
    { label: "In Progress", value: applications.filter(a => a.status === 'applied').length, color: "text-blue-400", sub: "Pending" },
    { label: "Interviews", value: applications.filter(a => a.status === 'interview').length, color: "text-green-400", sub: "Active" },
    { label: "Success Rate", value: `${applications.length > 0 ? Math.round((applications.filter(a => a.status === 'interview').length / applications.length) * 100) : 0}%`, color: "text-purple-400", sub: "Conversion" },
  ];

  return (
    <div className="w-full flex flex-col text-left mb-8">
        <h4 className="text-white/90 uppercase text-xs font-bold tracking-widest mb-4">
            Keep track of your applications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
            <div key={i} className="bg-[#253352]/40 border border-white/10 p-6 rounded-xl hover:bg-[#253352]/60 transition-all shadow-lg">
            <h2 className="text-white/60 text-sm font-medium mb-1">{stat.label}</h2>
            <div className="flex items-baseline gap-2 border-t border-white/5 pt-3">
                <p className={`text-4xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-white/40 italic">{stat.sub}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default StatsCards;