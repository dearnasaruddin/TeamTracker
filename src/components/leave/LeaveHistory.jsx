import { Loader2, X, Check } from "lucide-react"
import { useState } from "react"
import { format } from 'date-fns'
import api from "@/api/axios"
import { toast } from "sonner"

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {

    const [processing, setProcessing] = useState(null)

    // ========= Handle Approve/Reject Leave (Admin) =========
    const handleStatusUpdate = async (id, status) => {
        setProcessing(id)
        try {
            await api.patch(`/leave/${id}`, { status })
            onUpdate()
        } catch (err) {
            toast.error(err?.response?.data?.error || err?.message)
        } finally {
            setProcessing(null)
        }
    }

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="table-modern">
                    {/* ========= Table Header ========= */}
                    <thead>
                        <tr>
                            {isAdmin && <th>Employee</th>}
                            <th>Type</th>
                            <th>Dates</th>
                            <th>Reason</th>
                            <th>Status</th>
                            {isAdmin && <th className="text-center">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length > 0 ? (
                            leaves.map((leave) => {
                                return (
                                    // ========= Employee Name =========
                                    <tr key={leave._id || leave.id}>
                                        {isAdmin &&
                                            <td className="text-gray-900">
                                                <span className='mr-1'>{leave.employee?.firstName}</span>
                                                {leave.employee?.lastName}
                                            </td>
                                        }

                                        // ========= Leave Type =========
                                        <td>
                                            <span className="badge bg-gray-200 text-gray-600">{leave.type}</span>
                                        </td>

                                        // ========= Leave Duration =========
                                        <td className="px-6 py-4 text-gray-600"><span className="whitespace-nowrap">{format(new Date(leave.startDate), "MMM dd")}</span> - <span className="whitespace-nowrap">{format(new Date(leave.endDate), "MMM dd, yyyy")}</span> </td>

                                        // ========= Leave Reason =========
                                        <td className="max-w-xs truncate text-gray-500" title={leave.reason}>
                                            {leave.reason}
                                        </td>

                                        // ========= Leave Status =========
                                        <td>
                                            <span className={`badge ${leave.status === 'APPROVED' ? 'badge-success' : leave.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`}>{leave.status}</span>
                                        </td>

                                        {/* ========= Action Buttons ========= */}
                                        {isAdmin &&
                                            <td>
                                                {leave.status === 'PENDING' &&
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(leave._id || leave.id, 'APPROVED')}
                                                            disabled={!!processing}
                                                            className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                                                            {processing === (leave._id || leave.id) ?
                                                                <Loader2 className="size-4 animate-spin" />
                                                                :
                                                                <Check className="size-4" />
                                                            }
                                                        </button>

                                                        <button
                                                            onClick={() => handleStatusUpdate(leave._id || leave.id, 'REJECTED')}
                                                            disabled={!!processing}
                                                            className="p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                                                            {processing === (leave._id || leave.id) ?
                                                                <Loader2 className="size-4 animate-spin" />
                                                                :
                                                                <X className="size-4" />
                                                            }
                                                        </button>
                                                    </div>
                                                }
                                            </td>
                                        }
                                    </tr>
                                )
                            })

                        ) : (
                            // ========== Empty State =========
                            <tr>
                                <td colSpan={isAdmin ? 6 : 4} className="text-center py-12 text-gray-400">No leave applications found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveHistory