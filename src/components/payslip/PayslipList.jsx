import { format } from "date-fns"
import { Download } from "lucide-react"

const PayslipList = ({ payslips, isAdmin }) => {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="table-modern">
                    <thead>
                        <tr>
                            {isAdmin && <th>Employee</th>}
                            <th>Period</th>
                            <th>Basic Salary</th>
                            <th>Net Salary</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payslips.length > 0 ? (
                            payslips.map((payslip) => {
                                return (
                                    <tr key={payslip._id || payslip.id}>

                                        {/* ========= Employee Name ========= */}
                                        {isAdmin &&
                                            <td className="text-gray-900">
                                                <span className="mr-1">{payslip.employee?.firstName}</span>
                                                {payslip.employee?.lastName}
                                            </td>
                                        }

                                        {/* ========= Period ========= */}
                                        <td className="text-gray-500">
                                            {format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}
                                        </td>

                                        {/* ========= Basic Salary ========= */}
                                        <td className="text-gray-500">
                                            ${payslip.basicSalary?.toLocaleString()}
                                        </td>

                                        {/* ========= Net Salary ========= */}
                                        <td className="text-gray-800 font-medium">
                                            ${payslip.netSalary?.toLocaleString()}
                                        </td>

                                        {/* ========= Action Buttons ========= */}
                                        <td className="text-center">
                                            <button onClick={() => window.open(`/print/payslip/${payslip._id || payslip.id}`)} className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10 cursor-pointer">
                                                <Download className="size-3 mr-1.5" />
                                                Download
                                            </button>
                                        </td>

                                    </tr>
                                )
                            })

                        ) : (
                            // ====== Empty State ======
                            <tr>
                                <td colSpan={isAdmin ? 5 : 4} className="text-center py-12 text-gray-400">No payslips found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PayslipList