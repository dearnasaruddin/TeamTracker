import { UsersIcon, Building2Icon, CalendarIcon, FileTextIcon } from "lucide-react"

const AdminDashboard = ({data}) => {

    const stats = [
        {
            icon: UsersIcon,
            value: data.totalEmployees,
            label: 'Total Employees',
            description: 'Active workforce'
        },
        {
            icon: Building2Icon,
            value: data.totalDepartments,
            label: 'Departments',
            description: 'Organization units'
        },
        {
            icon: CalendarIcon,
            value: data.todayAttendance,
            label: "Today's Attendance",
            description: 'Checked in today'
        },
        {
            icon: FileTextIcon,
            value: data.pendingLeaves,
            label: 'Pending Leaves',
            description: 'Awaiting approval'
        },
    ]

  return (
    <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Welcome back, Admin - here's your overview
                </p>
            </div>

            {/* ============ Cards ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white/90 rounded-lg border border-gray-300 hover:-translate-y-0.5 transition-all duration-300 p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between">
                        <div>
                            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-brand-secondary group-hover:bg-brand-accent/80" />
                            <p className="text-sm font-medium text-gray-700">{s.label}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                        </div>
                        <s.icon className="size-10 p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors duration-200" />
                    </div>
                ))}
            </div>

        </div>
  )
}

export default AdminDashboard