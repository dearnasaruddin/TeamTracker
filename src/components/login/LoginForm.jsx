import { Link, useNavigate } from "react-router-dom"
import LoginLeftSide from "./LoginLeftSide"
import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react";
import { EyeOffIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const LoginForm = ({ role, title, subtitle }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    showPassword: false
  });
  const { login } = useAuth()
  const navigate = useNavigate()

  // ========= Input handler func =========
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ========= Password hide/show func =========
  const handleShowPassword = () => {
    setStatus((prev) => ({ ...prev, showPassword: !prev.showPassword }))
  }

  // ========= Submit func =========
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({
      ...status,
      error: '',
      loading: true
    })
    try {
      await login(formData.email, formData.password, role)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.error || error.massage || 'Login failed')
    } finally {
      setStatus({
        ...status,
        loading: false
      })
    }
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in">

          {/* ========== Back Btn ========== */}
          <Link to='/login' className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary text-sm mb-10 transition-colors">
            <ArrowLeftIcon size={16} /> Back to portals
          </Link>

          {/* ========== Title & Subtitle ========== */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">{title}</h1>
            <p className="text-sm sm:text-base mt-2 text-gray-600">{subtitle}</p>
          </div>

          {/* ========== Error State ========== */}
          {status.error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
              <div className="size-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {status.error}
            </div>
          )}

          {/* ========== Form ========== */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* ========== Email input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com" />
            </div>

            {/* ========== Password input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">

                <input
                  type={status.showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="placeholder:translate-y-1 pr-11" placeholder="********" />

                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  {status.showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>

              </div>
            </div>

            {/* ========== Submit btn ========== */}
            <button type="submit"
              disabled={status.loading}
              className="w-full py-3! btn-primary flex justify-center items-center cursor-pointer">
              {status.loading ? <Loader2Icon className='animate-spin size-4 mr-2' /> : 'Log in'}
            </button>

          </form>

        </div>
      </div>

    </div>
  )
}

export default LoginForm