import type { JobApplication } from "../../types/JobApplication";

interface JobTableProps {
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (id: number) => void;
}

const JobTable = ({ applications, onEdit, onDelete }: JobTableProps) => {
  if (applications.length === 0) {
    return <div className="p-10 text-center text-white/40 italic">No applications found.</div>;
  }

  return (
    <div className="w-full bg-[#253352]/30 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] bg-[#344f76]/50 p-4 text-xs font-bold uppercase tracking-wider text-white/60 border-b border-white/10">
        <div>Company</div><div>Position</div><div>Status</div><div>Date</div><div className="text-right">Actions</div>
      </div>
      <div className="divide-y divide-white/5">
        {applications.map(app => (
          <div key={app.id} className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr] p-4 text-sm items-center hover:bg-white/5 transition-colors group">
            <div className="font-semibold text-white group-hover:text-blue-300">{app.company_name}</div>
            <div className="text-white/80 italic">{app.position}</div>
            <div><span className="px-3 py-1 rounded-full bg-[#344f76] text-blue-200 text-[11px] font-bold uppercase border border-blue-400/20">{app.status}</span></div>
            <div className="text-white/50">{app.applied_date}</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => onEdit(app)} className="py-2 px-4 bg-blue-500/10 hover:bg-blue-500/30 text-blue-400 rounded-md transition-all">Edit</button>
              <button onClick={() => onDelete(app.id)} className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-md transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTable;