'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  Loader2, 
  CheckCircle2, 
  Building 
} from 'lucide-react'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', venue: '', message: '' })
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    
    // Simulate API pipeline latency context
    await new Promise((resolve) => setTimeout(resolve, 1200))
    
    setSending(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', venue: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2A2A2A] antialiased px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#2A2A2A]/70 hover:text-black transition">
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          
          {/* Left Block Text & Infrastructure Coordinates */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4">Connect with Our Team</h1>
              <p className="text-[#2A2A2A]/70 text-sm sm:text-base leading-relaxed">
                Have structural integration setup queries or enterprise cluster operational constraints? Drop a log message inside our queue parameters.
              </p>
            </div>

            <div className="h-px bg-[#2A2A2A]/10 w-full pt-2" />

            <div className="space-y-4 text-sm font-medium text-[#2A2A2A]/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A]/5 flex items-center justify-center border border-[#2A2A2A]/10">
                  <Mail size={14} />
                </div>
                <span>contact@enhanzers.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2A2A2A]/5 flex items-center justify-center border border-[#2A2A2A]/10">
                  <MapPin size={14} />
                </div>
                <span>Chennai, Corporate Office Ecosystem</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Card Block */}
          <div className="md:col-span-3 bg-white p-6 sm:p-10 rounded-2xl border border-[#2A2A2A]/10 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Transmission Successful</h3>
                <p className="text-sm text-[#2A2A2A]/70 max-w-sm mx-auto">
                  Your message block has pinned into our active customer relations database pipeline. Expect follow-up dispatch flags shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-bold border border-[#2A2A2A]/20 rounded-lg hover:bg-[#F7F5F0] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2A2A2A]/60 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="Alex" 
                      className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A2A2A] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2A2A2A]/60 mb-2">Corporate Email</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="alex@brand.com" 
                      className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A2A2A] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2A2A2A]/60 mb-2">Venue / Organization Context</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]/30" />
                    <input 
                      type="text"
                      value={formState.venue}
                      onChange={(e) => setFormState({...formState, venue: e.target.value})}
                      placeholder="Enhanzers Outlet" 
                      className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#2A2A2A] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2A2A2A]/60 mb-2">Message Payload</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-[#2A2A2A]/30" />
                    <textarea 
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="Specify your system integration configurations or requirements here..." 
                      className="w-full bg-[#F7F5F0] border border-[#2A2A2A]/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#2A2A2A] transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#2A2A2A] text-[#F7F5F0] py-3.5 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Transferring Message Data...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Dispatch Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}