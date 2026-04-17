import { Toaster } from "@/components/ui/sonner"
import { Navigate, Route, Routes } from "react-router-dom"
import CommonLayout from "./components/layout/CommonLayout"
import DashboardPage from "./pages/DashboardPage"
import LeavePage from "./pages/LeavePage"
import PayslipsPage from "./pages/PayslipsPage"
import SettingsPage from "./pages/SettingsPage"
import EmployeesPage from "./pages/EmployeesPage"
import PrintPayslipPage from "./pages/PrintPayslipPage"
import LoginLandingPage from "./pages/LoginLandingPage"
import LoginForm from "./components/login/LoginForm"
import AttendancePage from "./pages/AttendancePage"

function App() {

  return (
    <>
      <Toaster position="top-center" richColors />

      <Routes>
        <Route path="/login" element={<LoginLandingPage />} />

        <Route path="/login/admin" element={<LoginForm role='admin' title='Admin Portal' subtitle='Sing in to manage the organization'/>} />
        <Route path="/login/employee" element={<LoginForm role='employee' title='Employee Portal' subtitle='Sing in to access your account'/>} />

        <Route element={<CommonLayout />} >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/payslips" element={<PayslipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/print/payslip/:id" element={<PrintPayslipPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
