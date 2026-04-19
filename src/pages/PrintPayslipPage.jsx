import api from "@/api/axios"
import { dummyPayslipData } from "@/assets/dummyData/dummyData"
import Loading from "@/components/shared/Loading"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const PrintPayslipPage = () => {

  const { id } = useParams()
  const [payslip, setPayslip] = useState(null)
  const [loading, setLoading] = useState(true)

  // ========= Fetch Payslip Data =========
  useEffect(() => {
    api.get(`/payslips/${id}`).then((res) => setPayslip(res.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />
  if (!payslip) return <p className="text-center py-12 text-gray-400">Payslip not found</p>

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 animate-fade-in">

      {/* ========= Page Title ========= */}
      <div className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">PAYSLIP</h1>
        <p className="text-gray-500 text-sm mt-1">{format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}</p>
      </div>

      {/* ========= Employee Information ========= */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Employee Name</p>
          <p className="font-semibold text-gray-900">{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Position</p>
          <p className="font-semibold text-gray-900">{payslip.employee?.position}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
          <p className="font-semibold text-gray-900">{payslip.employee?.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Period</p>
          <p className="font-semibold text-gray-900">{format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}</p>
        </div>
      </div>
      <div className="rounded-xl border border-gray-300 overflow-hidden mb-8">
        <table className="w-full text-sm">

          {/* ========= Table Header ========= */}
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 text-xs tex-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-right py-3 px-4 text-xs tex-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>

          {/* ========= Table Body ========= */}
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-3 px-4 text-gray-700">Basic Salary</td>
              <td className="text-right py-3 px-4 text-gray-900 font-medium">${payslip.basicSalary?.toLocaleString()}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-3 px-4 text-gray-700">Allowances</td>
              <td className="text-right py-3 px-4 text-gray-900 font-medium">+${payslip.allowances?.toLocaleString()}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-3 px-4 text-gray-700">Deductions</td>
              <td className="text-right py-3 px-4 text-gray-900 font-medium">-${payslip.deductions?.toLocaleString()}</td>
            </tr>
            <tr className="border-t-2 border-gray-300 bg-gray-100">
              <td className="py-3 px-4 font-bold text-gray-900">Net Salary</td>
              <td className="text-right py-3 px-4 font-bold text-gray-900 text-lg">${payslip.netSalary?.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========= Print Button ========= */}
      <div className="text-center">
        <button className="btn-primary print:hidden" onClick={() => window.print()}>Print Payslip</button>
      </div>
    </div>
  )
}

export default PrintPayslipPage