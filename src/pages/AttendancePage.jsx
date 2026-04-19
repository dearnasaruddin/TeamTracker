import api from "@/api/axios"
import AttendanceHistory from "@/components/attendance/AttendanceHistory"
import AttendanceStats from "@/components/attendance/AttendanceStats"
import CheckInButton from "@/components/attendance/CheckInButton"
import Loading from "@/components/shared/Loading"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

const AttendancePage = () => {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  // ===== fetch attendance history =====
  const fetchData = useCallback(async () => {
    try {
      const res = await api.get('/attendance')
      const json = res.data
      setHistory(json.data || [])
      if (json.employee?.isDeleted) setIsDeleted(true)
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <Loading />

  // ===== find today's record =====
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRecord = history.find((r) => new Date(r.date).toDateString() === today.toDateString())

  return (
    <div className="animate-fade-in">

      {/* ========= Page Header ========= */}
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work hours and daily check-ins</p>
      </div>

      {isDeleted ? (
        // ====== warning for deleted employee ======
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600">You can no longer clock in or out because your employee records have been marked as deleted.</p>
        </div>
      ) : (
        // ===== check-in button ======
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      {/* ========= Attendance Stats and History ========= */}
      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  )
}

export default AttendancePage