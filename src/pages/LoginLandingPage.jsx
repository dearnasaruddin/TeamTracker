import LoginLeftSide from "@/components/login/LoginLeftSide"
import { ArrowRightIcon } from "lucide-react"
import { UserIcon } from "lucide-react"
import { ShieldIcon } from "lucide-react"
import { Link } from "react-router-dom"

const LoginLandingPage = () => {

  const portalOptions = [
    {
      to: '/login/admin',
      title: 'Admin Portal',
      description: 'Manage employees, departments, payroll and system configurations.',
      icon: ShieldIcon
    },
    {
      to: '/login/employee',
      title: 'Employee Portal',
      description: 'View your profile, track attendance, request time off and access payslips.',
      icon: UserIcon
    },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* =========== Header =========== */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium tracking-tight mb-3">Welcome Back</h2>
            <p>Select your portal to securely access the system.</p>
          </div>

          {/* =========== Portals List =========== */}
          <div className="space-y-4">
            {portalOptions.map((portal) => (
              <Link key={portal.to} to={portal.to} className="group block border rounded-lg p-5 sm:p-6 transition-all duration-300">
                <div className="flex items-center justify-between gap-4 sm:gap-5">
                  <h3 className="text-lg mb-1">{portal.title}</h3>
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all"/>
                </div>
              </Link>
            ))}
          </div>

          {/* =========== Footer =========== */}
        </div>
      </div>
    </div>
  )
}

export default LoginLandingPage