import logo from '@/assets/images/teamtracker_white.svg'
import { FileTextIcon, SettingsIcon, XIcon, LogOutIcon, ChevronRightIcon, DollarSignIcon, CalendarIcon, UserIcon, LayoutGridIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarContent = ({ pathname, username, setMobileOpen }) => {

    // ========= Nav items data ========
    const role = "" || "EMPLOYEE";

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
        role === "ADMIN"
            ? { name: "Employees", href: "/employees", icon: UserIcon }
            : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
        { name: "Leave", href: "/leave", icon: FileTextIcon },
        { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
        { name: "Settings", href: "/settings", icon: SettingsIcon },
    ];

    const handleLogout = () => {
        window.location.href = '/login'
    }

    return (
        <>
            {/* ========= Brand header ========= */}
            <div className="px-5 pt-6 pb-5 border-b border-gray-600">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        {/* Logo */}
                        <div>
                            <img className='w-13.5' src={logo} alt="logo" />
                        </div>
                        {/* Project info */}
                        <div>
                            <h5 className='font-semibold text-sm text-gray-200 tracking-wide'>TeamTracker</h5>
                            <p className='text-xs text-gray-300'>Employee Management System</p>
                        </div>
                    </div>

                    {/* ========= Close button on mobile ========= */}
                    <button onClick={() => setMobileOpen(false)} className='lg:hidden text-gray-400 hover:text-gray-200 p-1'>
                        <XIcon size={20} />
                    </button>
                </div>
            </div>

            {/* ========= User Profile Card ========= */}
            {username &&
                <div className='mx-3  mt-4 mb-1 p-3 rounded-lg bg-gray-500/20 border border-gray-600'>
                    <div className="flex items-center gap-3">
                        {/* avatar */}
                        <div className='size-10 rounded-lg bg-gray-800 flex items-center justify-center ring-1 ring-gray-200/10 shrink-0'>
                            <span className='text-gray-300 text-xs font-semibold'>
                                {username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        {/* Name & designation */}
                        <div className='min-w-0'>
                            <p className='text-sm font-medium text-gray-200 truncate'>{username}</p>
                            <p className='text-xs text-gray-400 truncate'>{role === 'Admin' ? 'Administrator' : 'Employee'}</p>
                        </div>
                    </div>
                </div>
            }

            {/* ========= Section label ========= */}
            <div className='px-5 pt-5 pb-2'>
                <p className='text-xs font-semibold uppercase tracking-widest text-gray-400'>Navigation</p>
            </div>

            {/* ========= Navigation List ========= */}
            <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link key={item.name} to={item.href} className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 relative ${isActive ? 'bg-brand-accent/20 text-brand-accent' : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/30'}`}>

                            {/* active mark */}
                            {isActive && <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-brand-accent' />}

                            {/* icon */}
                            <item.icon className={`size-4 shrink-0 ${isActive ? 'text-brand-accent' : 'text-gray-300 group-hover:text-gray-200'}`} />

                            {/* name */}
                            <span className='flex-1'>{item.name}</span>
                            {isActive && <ChevronRightIcon className='size-3.5 text-brand-accent/50' />}
                        </Link>
                    )
                })}
            </div>

            {/* ========= Logout btn ========= */}
            <div className='p-3 border-t border-gray-500'>
                <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150 cursor-pointer'>
                    <LogOutIcon className='size-4' />
                    <span>Log out</span>
                </button>
            </div>
        </>
    )
}

export default SidebarContent