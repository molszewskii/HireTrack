interface DropdownOption{
    label: string;
}
interface DropdownMenuProps{
    options: DropdownOption[];
    onSelect: (value: string) => void;
}

const DropdownMenu = ({options, onSelect }: DropdownMenuProps) =>{
    return(
        <div className="absolute bg-[#253352] border border-white/10 rounded-lg shadow-xl w-full flex flex-col">
            {options.map((option, index)=>(
                <button key={index} type="button" className="hover:bg-[#3b5386] rounded-md p-2"
                        onClick={()=>onSelect(option.label)}>
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default DropdownMenu;