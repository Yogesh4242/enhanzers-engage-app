// src/components/campaigns/CreateCampaignWizard.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, Smartphone, Mail, Filter, Check, X, Send, Calendar, Clock, Users, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CreateCampaignWizardProps {
  template: any;
  onBack: () => void;
}

interface CampaignData {
  name: string;
  type: "sms" | "email";
  detail1: string;
  detail2: string;
  detail3: string;
  rewardValue: string;
  storeName: string;
  subject: string;
  subtitle: string;
  audience: string;
  schedule: "now" | "later";
  scheduleDate: string;
  scheduleTime: string;
}

export default function CreateCampaignWizard({ template, onBack }: CreateCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState<"design" | "audience">("design");
  const [activeTab, setActiveTab] = useState<"creative" | "sms" | "email">("sms");
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dayPreference: [] as string[],
    timePreference: [] as string[],
    visitRange: [0, 1]
  });

  const [campaign, setCampaign] = useState<CampaignData>({
    name: template?.title || "Mother's Day Special",
    type: "sms",
    detail1: "This mother's day spoil",
    detail2: "your mum with delicious dinner &",
    detail3: "enjoy 20% Off. Book your tables today!",
    rewardValue: "20",
    storeName: "Nom Bomb Burgers",
    subject: "Give Mom the Gift of Pampering!",
    subtitle: "Home is wherever your mom is. So this Mother's Day treat your mom with delicious delights at 25% Off!",
    audience: "all",
    schedule: "now",
    scheduleDate: "",
    scheduleTime: "",
  });

  const smsPreviewText = `${campaign.storeName}: ${campaign.detail1} ${campaign.detail2} ${campaign.detail3} Enjoy ${campaign.rewardValue}% Off. Click here to redeem via Reelo`;
  const smsLength = smsPreviewText.length;
  const smsCredits = Math.ceil(smsLength / 160);

  const handleSendCampaign = async () => {
    setSending(true);
    
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: campaignError } = await supabase.from("campaigns").insert({
        business_id: user?.id,
        name: campaign.name,
        type: campaign.type,
        content: campaign.type === "sms" ? smsPreviewText : campaign.subtitle,
        subject: campaign.subject,
        audience_count: 4,
        status: campaign.schedule === "now" ? "sent" : "scheduled",
        scheduled_at: campaign.schedule === "later" ? `${campaign.scheduleDate}T${campaign.scheduleTime}` : null,
        created_by: user?.id,
      });
      
      if (campaignError) throw campaignError;
      
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        onBack();
      }, 2000);
      
    } catch (error) {
      console.error("Error sending campaign:", error);
      alert("Failed to send campaign. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleTestCampaign = () => {
    setTestSuccess(true);
    console.log(`Test ${campaign.type === "sms" ? "SMS" : "Email"} campaign:`, {
      message: campaign.type === "sms" ? smsPreviewText : campaign.subject,
      to: "test@example.com"
    });
    setTimeout(() => setTestSuccess(false), 3000);
  };

  const toggleDayFilter = (day: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      dayPreference: prev.dayPreference.includes(day)
        ? prev.dayPreference.filter(d => d !== day)
        : [...prev.dayPreference, day]
    }));
  };

  const toggleTimeFilter = (time: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      timePreference: prev.timePreference.includes(time)
        ? prev.timePreference.filter(t => t !== time)
        : [...prev.timePreference, time]
    }));
  };

  return (
    <div className="fixed inset-0 top-[65px] bg-white flex flex-col font-sans z-40 antialiased">
      {/* Success Toasts */}
      {sendSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          ✅ Campaign sent successfully!
        </div>
      )}
      {testSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          📱 Test campaign sent! Check console for details.
        </div>
      )}
      
      {/* Header Action Bar */}
      <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white w-full shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
            <ArrowLeft size={14} /> Back
          </button>
          <h2 className="text-sm font-bold text-slate-800">Edit your Campaign</h2>
        </div>

        <div>
          {currentStep === "design" ? (
            <button 
              onClick={() => setCurrentStep("audience")}
              className="px-5 py-2 bg-[#00A79D] text-white text-xs font-bold rounded-xl hover:bg-[#00928a] shadow-sm flex items-center gap-2 transition"
            >
              Select Audience &rarr;
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleTestCampaign}
                className="px-4 py-2 border border-[#00A79D] text-[#00A79D] text-xs font-bold rounded-xl hover:bg-emerald-50 transition"
              >
                Send Test Campaign
              </button>
              <button 
                onClick={handleSendCampaign}
                disabled={sending}
                className="px-4 py-2 bg-[#00A79D] text-white text-xs font-bold rounded-xl hover:bg-[#00928a] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} /> {sending ? "Sending..." : "Send Campaign"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Split Screen Content */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* LEFT PANEL - Live Preview */}
        <div className="w-1/2 bg-[#E6F3F2] p-8 flex flex-col items-center justify-start overflow-y-auto relative">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200/40 w-full max-w-sm justify-center gap-6 mb-8">
            {(["creative", "sms", "email"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "sms") setCampaign({ ...campaign, type: "sms" });
                  if (tab === "email") setCampaign({ ...campaign, type: "email" });
                }}
                className={`pb-2 text-xs font-bold capitalize transition-all border-b-2 ${
                  activeTab === tab 
                    ? "border-slate-800 text-slate-900" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CREATIVE PREVIEW */}
          {activeTab === "creative" && (
            <div className="w-full max-w-xs bg-black rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 min-h-[520px] flex flex-col text-white overflow-hidden relative">
              <div className="bg-white rounded-[32px] flex-1 text-slate-900 flex flex-col overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#2D5A4B] flex items-center justify-center text-white text-[8px] font-black leading-none shadow-sm">
                    {campaign.storeName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] text-slate-400">4.8 ★</span>
                </div>
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 aspect-square flex items-center justify-center text-5xl mb-4 shadow-inner">
                  {template?.imageUrl ? (
                    <img src={template.imageUrl} alt="template" className="w-full h-full object-cover" />
                  ) : (
                    "🥞"
                  )}
                </div>
                <h3 className="text-lg font-black text-center text-slate-900 tracking-tight leading-snug">
                  {campaign.detail1.split(" ").slice(0, 5).join(" ")}...
                </h3>
                <p className="text-[10px] text-center text-slate-400 mt-3 leading-relaxed px-2 line-clamp-3">
                  {campaign.subtitle.substring(0, 80)}...
                </p>
                <div className="mt-auto border-t border-dashed border-slate-200 pt-3 text-center">
                  <span className="text-[10px] tracking-wider text-[#00A79D] block uppercase font-bold">
                    Get {campaign.rewardValue}% OFF
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SMS PREVIEW */}
          {activeTab === "sms" && (
            <div className="w-full max-w-sm bg-transparent flex flex-col items-center justify-center pt-4">
              <div className="w-72 border-x-4 border-t-4 border-b-[12px] border-slate-300 rounded-[44px] bg-slate-50 p-4 min-h-[460px] flex flex-col shadow-xl relative">
                <div className="w-12 h-12 rounded-full bg-[#00A79D] text-white font-bold flex items-center justify-center mx-auto mb-2 text-lg shadow-md">R</div>
                <span className="text-[10px] font-semibold text-slate-400 text-center block mb-4">mReelo</span>
                
                <div className="bg-[#2D4A4F] text-slate-100 text-xs p-3 rounded-2xl shadow-lg leading-relaxed">
                  <span className="font-bold block text-white border-b border-white/10 pb-1 mb-1">{campaign.storeName}:</span>
                  <p className="mt-1 leading-relaxed">{smsPreviewText}</p>
                  <span className="text-[#00A79D] font-semibold block mt-2 underline cursor-pointer text-[11px]">Click reelo.io/redeem</span>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-[10px] text-slate-400 font-medium">
                    SMS length: {smsLength} / {smsCredits} credit{smsCredits > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center max-w-xs">
                Your customers receive Campaign creative on SMS & Email
              </p>
            </div>
          )}

          {/* EMAIL PREVIEW */}
          {activeTab === "email" && (
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] text-slate-500 ml-2">reelo Campaign</span>
              </div>
              <div className="p-5">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Subject Line</span>
                  <p className="text-sm font-bold text-slate-800">{campaign.subject}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 min-h-[200px] text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#00A79D] flex items-center justify-center text-white font-bold mb-3 shadow-md">R</div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2">{campaign.storeName}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs">{campaign.subtitle}</p>
                  <div className="mt-4 bg-[#00A79D] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">
                    Get {campaign.rewardValue}% OFF
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Editable Fields */}
        <div className="w-1/2 border-l border-slate-200 bg-white overflow-y-auto p-8">
          
          {currentStep === "design" ? (
            <div className="space-y-8 max-w-xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Editable fields for {activeTab === "sms" ? "SMS" : "Email"} Campaign
                </h3>
                <p className="text-xs text-slate-400">
                  This {activeTab === "sms" ? "SMS template is registered on DLT Platform" : "email template supports HTML formatting"}. 
                  You can edit the highlighted text.
                  <a href="#" className="text-[#00A79D] ml-1 hover:underline">Learn more</a>
                </p>
              </div>

              <div className="space-y-5">
                {/* SMS-specific fields */}
                {activeTab === "sms" && (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <label>Detail 1 <span className="text-[#00A79D] font-normal">(editable)</span></label>
                        <span className="text-slate-400 font-normal">{campaign.detail1.length} / 30 characters</span>
                      </div>
                      <input
                        type="text"
                        value={campaign.detail1}
                        onChange={(e) => setCampaign({ ...campaign, detail1: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <label>Detail 2 <span className="text-[#00A79D] font-normal">(editable)</span></label>
                        <span className="text-slate-400 font-normal">{campaign.detail2.length} / 30 characters</span>
                      </div>
                      <input
                        type="text"
                        value={campaign.detail2}
                        onChange={(e) => setCampaign({ ...campaign, detail2: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <label>Detail 3 <span className="text-[#00A79D] font-normal">(editable)</span></label>
                        <span className="text-slate-400 font-normal">{campaign.detail3.length} / 30 characters</span>
                      </div>
                      <input
                        type="text"
                        value={campaign.detail3}
                        onChange={(e) => setCampaign({ ...campaign, detail3: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                      />
                    </div>
                  </>
                )}

                {/* Common fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Reward Value (%)</label>
                    <input
                      type="number"
                      value={campaign.rewardValue}
                      onChange={(e) => setCampaign({ ...campaign, rewardValue: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <label>Store Name</label>
                      <span className="text-slate-400 font-normal">{campaign.storeName.length} / 25 chars</span>
                    </div>
                    <input
                      type="text"
                      value={campaign.storeName}
                      onChange={(e) => setCampaign({ ...campaign, storeName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Email-specific fields */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Email Subject</label>
                    <input
                      type="text"
                      value={campaign.subject}
                      onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Campaign Subtitle / Body</label>
                    <textarea
                      rows={4}
                      value={campaign.subtitle}
                      onChange={(e) => setCampaign({ ...campaign, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#00A79D] focus:bg-white transition resize-none"
                    />
                  </div>
                </div>

                {/* Campaign Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Campaign Link</label>
                  <input
                    type="text"
                    readOnly
                    value="https://reelo.io/redeem/MOMSDAY2024"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-slate-400">This link will be included in your campaign automatically</p>
                </div>
              </div>
            </div>
          ) : (
            /* AUDIENCE SELECTION STEP */
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Who do you want to send?</h3>
                <p className="text-xs text-slate-400">Select the customer group that should receive this campaign.</p>
              </div>

              <div className="space-y-4">
                {/* All Customers Option */}
                <button 
                  onClick={() => setCampaign({ ...campaign, audience: "all" })}
                  className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                    campaign.audience === "all" ? "border-[#00A79D] bg-[#EEFAF9]" : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">All Customers - 4</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">All customers including imported customers</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${campaign.audience === "all" ? "border-[#00A79D]" : "border-slate-300"}`}>
                    {campaign.audience === "all" && <div className="w-2.5 h-2.5 bg-[#00A79D] rounded-full" />}
                  </div>
                </button>

                {/* Target Groups Option */}
                <button 
                  onClick={() => setCampaign({ ...campaign, audience: "group" })}
                  className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                    campaign.audience === "group" ? "border-[#00A79D] bg-[#EEFAF9]" : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-slate-500" />
                      <span className="text-xs font-bold text-slate-900 block">Target Groups</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Choose from pre-packed segments</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${campaign.audience === "group" ? "border-[#00A79D]" : "border-slate-300"}`}>
                    {campaign.audience === "group" && <div className="w-2.5 h-2.5 bg-[#00A79D] rounded-full" />}
                  </div>
                </button>

                {/* Advanced Filters Option */}
                <button 
                  onClick={() => {
                    setCampaign({ ...campaign, audience: "advanced" });
                    setShowAdvancedModal(true);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                    campaign.audience === "advanced" ? "border-[#00A79D] bg-[#EEFAF9]" : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <Filter size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Advanced filters</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Make your own customer group</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${campaign.audience === "advanced" ? "border-[#00A79D]" : "border-slate-300"}`}>
                    {campaign.audience === "advanced" && <div className="w-2.5 h-2.5 bg-[#00A79D] rounded-full" />}
                  </div>
                </button>
              </div>

              {/* Schedule Section */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <label className="text-xs font-bold text-slate-700 block">When do you want to send it?</label>
                <p className="text-xs text-slate-400">You can send it now or, schedule it for later.</p>
                
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                    campaign.schedule === "now" ? "border-[#00A79D] bg-[#EEFAF9]" : "border-slate-200 hover:border-slate-300"
                  }`}>
                    <input
                      type="radio"
                      name="schedule"
                      value="now"
                      checked={campaign.schedule === "now"}
                      onChange={() => setCampaign({ ...campaign, schedule: "now" })}
                      className="w-4 h-4 accent-[#00A79D]"
                    />
                    <div>
                      <p className="font-medium text-slate-800 text-sm">Send Now</p>
                      <p className="text-xs text-slate-400">Campaign will be sent immediately</p>
                    </div>
                  </label>

                  <label className={`flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    campaign.schedule === "later" ? "border-[#00A79D] bg-[#EEFAF9]" : "border-slate-200 hover:border-slate-300"
                  }`}>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="schedule"
                        value="later"
                        checked={campaign.schedule === "later"}
                        onChange={() => setCampaign({ ...campaign, schedule: "later" })}
                        className="w-4 h-4 accent-[#00A79D]"
                      />
                      <div>
                        <p className="font-medium text-slate-800 text-sm">Schedule it for later</p>
                        <p className="text-xs text-slate-400">Choose date and time</p>
                      </div>
                    </div>
                    {campaign.schedule === "later" && (
                      <div className="flex gap-3 pl-8">
                        <div className="flex-1 relative">
                          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="date"
                            value={campaign.scheduleDate}
                            onChange={(e) => setCampaign({ ...campaign, scheduleDate: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#00A79D]"
                          />
                        </div>
                        <div className="flex-1 relative">
                          <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="time"
                            value={campaign.scheduleTime}
                            onChange={(e) => setCampaign({ ...campaign, scheduleTime: e.target.value })}
                            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#00A79D]"
                          />
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Audience Count Summary */}
                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Sending Campaign to</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {campaign.audience === "all" ? "4" : campaign.audience === "group" ? "12" : "0"} Customers
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-[#EEFAF9] rounded-full flex items-center justify-center">
                      <Users size={18} className="text-[#00A79D]" />
                    </div>
                  </div>
                  <div className="mt-2 flex gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Mail size={10} /> Email reachable: {campaign.audience === "all" ? "4" : "8"}</span>
                    <span className="flex items-center gap-1"><Smartphone size={10} /> SMS reachable: {campaign.audience === "all" ? "4" : "8"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showAdvancedModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Filter Customers</h4>
                <p className="text-xs text-slate-400 mt-0.5">These are some of the filters people use most often.</p>
              </div>
              <button 
                onClick={() => setShowAdvancedModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              {/* Visit Range Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Visit Quantifiers Threshold Range</span>
                  <span className="bg-[#EEFAF9] text-[#00A79D] px-2 py-0.5 rounded-md text-[10px]">
                    {selectedFilters.visitRange[0]} - {selectedFilters.visitRange[1]} Visits
                  </span>
                </div>
                <div className="relative pt-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div className="absolute h-1.5 bg-[#00A79D] rounded-full left-0 right-0" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
                  <span>0</span>
                  <span>1</span>
                  <span>5</span>
                  <span>10+</span>
                </div>
              </div>

              {/* Day Preference */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Day Preference</span>
                <div className="grid grid-cols-2 gap-3">
                  {["Weekend", "Weekday"].map((day) => (
                    <label
                      key={day}
                      onClick={() => toggleDayFilter(day)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        selectedFilters.dayPreference.includes(day)
                          ? "border-[#00A79D] bg-[#EEFAF9]"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.dayPreference.includes(day)}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-[#00A79D]"
                      />
                      <span className="text-xs font-medium text-slate-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Preference */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Time Preference</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Morning (5am - 11:59am)",
                    "Afternoon (12pm - 3:59pm)",
                    "Evening (4pm - 7:59pm)",
                    "Night (8pm - 4:59am)"
                  ].map((time) => (
                    <label
                      key={time}
                      onClick={() => toggleTimeFilter(time)}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                        selectedFilters.timePreference.includes(time)
                          ? "border-[#00A79D] bg-[#EEFAF9]"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.timePreference.includes(time)}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-[#00A79D]"
                      />
                      <span className="text-[11px] font-medium text-slate-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between gap-3">
              <button 
                onClick={() => setSelectedFilters({ dayPreference: [], timePreference: [], visitRange: [0, 1] })}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 transition"
              >
                Clear All
              </button>
              <div className="flex gap-3">
                <span className="text-sm text-slate-500 self-center">
                  {selectedFilters.dayPreference.length + selectedFilters.timePreference.length} filters selected
                </span>
                <button 
                  onClick={() => setShowAdvancedModal(false)}
                  className="px-5 py-2 bg-[#00A79D] hover:bg-[#00928a] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}