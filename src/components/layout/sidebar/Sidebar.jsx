import { MenuIcon } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import SidebarContent from "./SidebarContent"

const Sidebar = () => {

    const { pathname } = useLocation()
    const [username, setUsername] = useState('Nasar Uddin')
    const [mobileOpen, setMobileOpen] = useState(false)


    // ======== Handle mobile sidebar func ========
    const handleMobileSidebar = () => {
        setMobileOpen((prev) => !prev)
    }

    // ======== Close mobile sidebar on route change ========
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    return (
        <>
            {/* ============ Mobile hamburger btn ============ */}
            <button onClick={handleMobileSidebar} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-gray-200 rounded-lg shadow-lg border border-gray-300">
                <MenuIcon size={20} />
            </button>

            {/* ============ Mobile overlay ============ */}
            <div onClick={handleMobileSidebar} className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>

            {/* ============ Sidebar Desktop ============ */}
            <aside className="hidden lg:flex flex-col h-full w-68 bg-linear-to-b from-brand-primary via-brand-primary to-brand-secondary text-gray-200 shrink-0 border-r border-gray-300">
                <SidebarContent pathname={pathname} username={username}/>
            </aside>

            {/* ============ Sidebar Mobile ============ */}
            <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-brand-primary via-brand-primary to-brand-secondary text-gray-200 z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent pathname={pathname} username={username} setMobileOpen={setMobileOpen}/>
            </aside>
        </>
    )
}

export default Sidebar