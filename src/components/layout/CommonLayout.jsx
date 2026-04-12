import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"

const CommonLayout = () => {
    return (
        <div className="flex h-screen">

            {/* ========= Sidebar ========= */}
            <div>
                <Sidebar />
            </div>

            {/* ========= Children ========= */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 pt-16 sm:x-6 sm:pb-6 lg:pt-6 lg:p-8 max-w-400 mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default CommonLayout