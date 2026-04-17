import api from "@/api/axios"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard"
import Loading from "@/components/shared/Loading"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "sonner"

const DashboardPage = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard').then((res) => {
      setData(res.data)
    })
      .catch(err => toast.error(err.response?.data?.error || err?.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (!data) return <p className='text-center text-gray-500 py-12'>Failed to load dashboard</p>

  if (data.role === 'ADMIN') {
    return <AdminDashboard data={data} />
  } else {
    return <EmployeeDashboard data={data} />
  }

}

export default DashboardPage