import { LogOutIcon, LogInIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"

const CheckInButton = ({ todayRecord, onAction }) => {

    const [loading, setLoading] = useState(false)

    const handleAttendance = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onAction()
        }, 200);
    }

    if (todayRecord?.checkOut) {
        return (
            <div className="flex flex-col justify-center items-center p-8 bg-gray-100 rounded-2xl border border-gray-300">
                <h3 className="text-lg font-bold text-gray-900">Work Day Completed</h3>
                <p className="text-gray-500 text-sm mt-1">Great job! See you tomorrow</p>
            </div>
        )
    }

    const isCheckedIn = !!todayRecord?.isCheckedIn

    return (
        <div className="absolute bottom-4 right-4 flex flex-col z-10">
            <button onClick={handleAttendance} disabled={loading} className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl text-gray-200 bg-linear-to-br ${isCheckedIn ? 'from-gray-700 to-gray-900' : 'from-brand-accent/70 to-brand-secondary'}`}>
                {loading ? <Loader2Icon className="size-7 animate-spin" /> : isCheckedIn ? <LogOutIcon className="size-7" /> : <LogInIcon className="size-7" />}
                <div className="relative flex flex-col items-center text-center">
                    <h2 className="text-lg font-medium mb-1">{loading ? 'Processing...' : isCheckedIn ? 'Clock Out' : 'Clock In'}</h2>
                    <p className="text-xs opacity-80">{isCheckedIn ? 'Click to end your shift' : 'Start your work day'}</p>
                </div>
            </button>
        </div>
    )
}

export default CheckInButton