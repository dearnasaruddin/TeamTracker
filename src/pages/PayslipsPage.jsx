import api from "@/api/axios"
import { dummyEmployeeData } from "@/assets/dummyData/dummyData"
import PayslipGenerateForm from "@/components/payslip/PayslipGenerateForm"
import PayslipList from "@/components/payslip/PayslipList"
import Loading from "@/components/shared/Loading"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

const PayslipsPage = () => {

  const [payslips, setPayslips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get('/payslips')
      setPayslips(res.data.data || [])
    } catch (error) {
      toast.error(err?.response?.data?.error || err?.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPayslips()
  }, [fetchPayslips])

  useEffect(() => {
    if(isAdmin) api.get('/employee').then((res)=>setEmployees(res.data.filter((e)=>e.isDeleted))).catch(()=>{})
  }, [isAdmin])

  if (loading) return <Loading />

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">{isAdmin ? 'Generate and manage employee payslips' : 'Your payslip history'}</p>
        </div>

        {isAdmin && <PayslipGenerateForm employees={employees} onSuccess={fetchPayslips} />}

      </div>

      <PayslipList payslips={payslips} isAdmin={isAdmin} />

    </div>
  )
}

export default PayslipsPage