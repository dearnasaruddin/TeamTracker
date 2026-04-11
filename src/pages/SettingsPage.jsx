import { dummyProfileData } from "@/assets/dummyData/dummyData"
import ChangePasswordModal from "@/components/settings/ChangePasswordModal"
import ProfileForm from "@/components/settings/ProfileForm"
import Loading from "@/components/shared/Loading"
import { Lock } from "lucide-react"
import { useState, useEffect } from "react"

const SettingsPage = () => {

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(() => {
      setLoading(false)
    }, 200);
  }

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) return <Loading />

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}
      {/* ========== Change Password trigger ========== */}
      <div className="card max-w-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-200 rounded-lg">
            <Lock className="size-5 text-gray-600" />
          </div>
          <div>
            <h6 className="font-medium text-gray-900">Password</h6>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>
        <button onClick={() => setShowPasswordModal(true)} className="btn-secondary text-sm">
          Change
        </button>
      </div>
      <ChangePasswordModal open={showPasswordModal} onClose={()=>setShowPasswordModal(false)}/>
    </div>
  )
}

export default SettingsPage