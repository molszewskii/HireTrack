const InputField = ({label, ...props}: any)=>{
    return(
    <div className="mb-3">
        <label className="block text-sm font-bold mb-1">{label}</label>
        <input
            className="w-full border-2 rounded-md p-2 hover:border-gray-400 transition-colors" 
      {...props}
      />
    </div>
    )
  
}

export default InputField;