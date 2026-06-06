'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from "@/lib/supabase/client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User as UserIcon, 
  Mail, 
  Building, 
  ArrowLeft, 
  Save, 
  Loader2, 
  LogOut, 
  Shield,
  CheckCircle2
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Profile form states
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    async function getProfile() {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/login')
        return
      }

      setUser(user)
      // Populate fields from user metadata if they exist
      setFullName(user.user_metadata?.full_name || '')
      setBusinessName(user.user_metadata?.business_name || '')
      setLoading(false)
    }

    getProfile()
  }, [router, supabase.auth])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage('')

    const { error } = await supabase.auth.updateUser({
      data: { 
        full_name: fullName,
        business_name: businessName
      }
    })

    if (!error) {
      setSuccessMessage('Profile metadata updated successfully!')
      setTimeout(() => setSuccessMessage(''), 4000)
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#2A2A2A] animate-spin" />
          <p className="text-sm font-medium text-[#2A2A2A]/60">Syncing secure profile token...</p>
        </div>
      </div>
    )
  }

  const avatarSeed = user?.id || user?.email || 'demo-seed'
  const avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed}&backgroundColor=E5E7EB`

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2A2A2A] antialiased px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#2A2A2A]/70 hover:text-black transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <button 
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Profile Card Container */}
        <div className="bg-white rounded-2xl border border-[#2A2A2A]/10 p-6 sm:p-10 shadow-sm">
          
          {/* Header User Info Block */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-[#2A2A2A]/10 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#2A2A2A]/5 border border-[#2A2A2A]/20 overflow-hidden flex items-center justify-center shadow-sm">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{fullName || 'Account Member'}</h1>
              <p className="text-sm text-[#2A2A2A]/60 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail size={14} /> {user?.email}
              </p>
              <div className="inline-flex items-center gap-1 bg-[#2A2A2A]/5 text-[#2A2A2A] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
                <Shield size={10} /> Verified User
              </div>
            </div>
          </div>

          {/* Success Banner Alert */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm animate-fadeIn">
              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Configuration Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A2A2A]/70 mb-2">
                Full Identity Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]/40" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Carter"
                  className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#2A2A2A] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A2A2A]/70 mb-2">
                Restaurant / Agency Entity Name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]/40" />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Bistro Central"
                  className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#2A2A2A] transition"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#2A2A2A] text-[#F7F5F0] py-3.5 rounded-xl font-semibold hover:bg-black transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving Configuration...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Update Profile Info
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}