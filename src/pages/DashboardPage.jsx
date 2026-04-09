import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "@/assets/dummyData/dummyData"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard"
import Loading from "@/components/shared/Loading"
import { useEffect } from "react"
import { useState } from "react"

const DashboardPage = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(dummyAdminDashboardData)
    setTimeout(()=>{
      setLoading(false)
    },300)
  }, [])

  if (loading) return <Loading />
  if (!data) return <p className='text-center text-gray-500 py-12'>Failed to load dashboard</p>

  if (data.role === 'ADMIN') {
    return <AdminDashboard data={data}/>
  } else {
    return <EmployeeDashboard data={data} />
  }

}

export default DashboardPage