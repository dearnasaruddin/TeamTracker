import { Trash2Icon, PencilIcon } from "lucide-react"

const EmployeeCard = ({ employee, onDelete, onEdit }) => {

    const handleDelete = async ()=>{
        if(!confirm('Are you sure you want to delete this employee?')) return
    }

    return (
        <div className="group relative card card-hover overflow-hidden">

            <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-accent/5">
                <div className="size-full flex items-center justify-center">
                    {/* ======= Circle Avatar ======= */}
                    <div className="size-20 rounded-full bg-linear-to-br from-brand-accent/20 to-gray-200 flex items-center justify-center">
                        <span className="text-2xl font-medium text-brand-accent/50">
                            {employee.firstName[0]}{employee.lastName[0]}
                        </span>
                    </div>

                </div>
            </div>

            {/* ======= Dept Badge ======= */}
            <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-gray-600 rounded-lg shadow-md">{employee.department || 'Remote'}</span>
                {employee.isDeleted && <span className="bg-red-500/60 font-medium text-gray-200 px-2.5 py-1 text-xs rounded">DELETED</span>}
            </div>

            {!employee.isDeleted && (
                <div className="absolute inset-0 bg-linear-to-t from-brand-accent/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                    <button onClick={()=>onEdit(employee)} className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-brand-accent/80 rounded-xl shadow-lg transition-all hover:scale-105">
                        <PencilIcon className="size-4"/>
                    </button>
                    <button onClick={handleDelete} className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50">
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            )}

            {/* ========= Name & Position ========= */}
            <div className="p-5">
                <h3 className="text-gray-900">{employee.firstName} {employee.lastName}</h3>
                <p className="text-xs text-gray-500">{employee.position}</p>
            </div>
        </div>
    )
}

export default EmployeeCard