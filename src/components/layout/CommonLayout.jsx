import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"
import { useAuth } from "@/context/AuthContext"
import Loading from "../shared/Loading"

const CommonLayout = () => {

    const {user, loading} = useAuth()

    if(loading) return <Loading/>
    if(!user) return <Navigate to={'/login'}/>

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