import api from "@/api/axios"
import LeaveApplyModal from "@/components/leave/LeaveApplyModal"
import LeaveHistory from "@/components/leave/LeaveHistory"
import Loading from "@/components/shared/Loading"
import { useAuth } from "@/context/AuthContext"
import { ThermometerIcon, UmbrellaIcon, PalmtreeIcon, PlusIcon } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"

const LeavePage = () => {

  const { user } = useAuth()
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const isAdmin = user?.role === 'ADMIN'

  // ======== Fetch Leaves =========
  const fetchLeaves = useCallback(async () => {
    try {
      const res = await api.get('/leave')
      setLeaves(res.data.data || [])
      if (res.data.employee?.isDeleted) setIsDeleted(true)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaves()
  }, [fetchLeaves])

  if (loading) return <Loading />

  // =========== Calculate Leave Stats =========
  const approvedLeaves = leaves.filter((l) => l.status === 'APPROVED')
  const sickCount = approvedLeaves.filter((l) => l.type === 'SICK').length
  const casualCount = approvedLeaves.filter((l) => l.type === 'CASUAL').length
  const annualCount = approvedLeaves.filter((l) => l.type === 'ANNUAL').length

  const leaveStats = [
    { label: 'Sick Leave', value: sickCount, icon: ThermometerIcon },
    { label: 'Casual Leave', value: casualCount, icon: UmbrellaIcon },
    { label: 'Annual Leave', value: annualCount, icon: PalmtreeIcon }
  ]

  return (
    <div className="animate-fade-in">

      {/* ========= Page Header ========= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">{isAdmin ? 'Manage leave applications' : 'Your leave history and requests'}</p>
        </div>

        {/* ========= Apply for Leave Button ========= */}
        {!isAdmin && !isDeleted && (
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            <PlusIcon className="size-4" /> Apply for Leave
          </button>
        )}
      </div>

      {/* ========= Leave Stats ========= */}
      {!isAdmin &&
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {leaveStats.map((s) => (
            <div key={s.label} className="card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-brand-secondary group-hover:bg-brand-accent/80" />
              <div className="p-3 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors duration-200">
                <s.icon className="size-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">{s.value} <span className="text-sm font-normal text-gray-400">taken</span></p>
              </div>
            </div>
          ))}
        </div>
      }

      {/* ========= Leave History & Apply Modal ========= */}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      <LeaveApplyModal open={showModal} onClose={() => setShowModal(false)} onSuccess={fetchLeaves} />
    </div>
  )
}

export default LeavePage