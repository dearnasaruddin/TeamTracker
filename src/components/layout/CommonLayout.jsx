import { Outlet } from "react-router-dom"

const CommonLayout = () => {
    return (
        <div className="flex h-screen">
            <p>Sidebar</p>
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8 max-w-400 mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default CommonLayout