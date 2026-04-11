import { dummyEmployeeData, DEPARTMENTS } from "@/assets/dummyData/dummyData"
import EmployeeCard from "@/components/employee/EmployeeCard"
import EmployeeForm from "@/components/employee/EmployeeForm"
import { Search, Plus, X } from "lucide-react"
import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"

const EmployeesPage = () => {

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [query, setQuery] = useState({
    search: '',
    department: ''
  })

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setEmployees(dummyEmployeeData.filter((emp) => query.department ? emp.department === query.department : emp))
    setTimeout(() => {
      setLoading(false)
    }, 200);
  }, [query.department])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const filtered = employees.filter((emp) => `${emp.firstName} ${emp.lastName} ${emp.position}`.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()))

  const handleInput = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }

  const handleEdit = (e) => {
    setEditEmployee(e)
  }

  const handleEditSuccess = () => {
    setEditEmployee(null)
    fetchEmployees()
  }

  const handleCreateSuccess = ()=>{
    setShowCreateModal(false)
    fetchEmployees()
  }

  return (
    <div className="animate-fade-in">

      {/* ========= Header ========= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* ========= Search bar ========= */}
      <div>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <input type="text" placeholder="Search employees..." className="w-full pl-10!" value={query.search} name="search" onChange={handleInput} />
          </div>

          <select name="department" value={query.department} onChange={handleInput} className="max-w-40">
            <option>All Departments</option>
            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>{deptName}</option>
            ))}
          </select>

        </div>
      </div>

      {/* ========= Employee Cards ========= */}
      {loading ?
        <div className="flex justify-center p-12">
          <div className="animate-spin size-8 border-2 border-brand-accent border-t-transparent rounded-full" />
        </div>
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.length > 0 ?
            (
              filtered.map((emp) => <EmployeeCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={handleEdit} />)
            )
            :
            <p className="col-span-full text-center py-16 text-gray-400 bg-gray-100 rounded-2xl border border-dashed border-gray-200">No employee found</p>
          }
        </div>
      }

      {/* ============ Create Employee Modal ============ */}

      {showCreateModal &&
        <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowCreateModal(false)}>
          <div className="fixed inset-0" />
         <div className="relative bg-gray-50 rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add New Employee</h2>
                <p className="text-sm text-gray-500 mt-0.5">Create a user account and employee profile</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6">
              <EmployeeForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreateModal(false)} />
            </div>
          </div>
        </div>}

      {/* ============ Edit Employee Modal ============ */}
      {editEmployee && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm" onClick={() => setEditEmployee(null)}>
          <div className="relative bg-gray-50 rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Employee</h2>
                <p className="text-sm text-gray-500 mt-0.5">Update employee details</p>
              </div>
              <button onClick={() => setEditEmployee(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6">
              <EmployeeForm initialData={editEmployee} onSuccess={handleEditSuccess} onCancel={() => setEditEmployee(null)} />
            </div>
          </div>
        </div>
      )}

    </div >
  )
}

export default EmployeesPage