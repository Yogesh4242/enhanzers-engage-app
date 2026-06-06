// src/app/dashboard/owner-dashboard/campaigns/CampaignDetails.tsx
"use client";

import { ArrowLeft, Mail, Smartphone, MessageCircle, Users, Eye, Edit, Copy, Trash2, Send, BarChart3, Target, Clock, CheckCircle, AlertCircle, Download, Share2, TrendingUp, Zap } from "lucide-react";

interface CampaignDetailsProps {
  campaign: any;
  onBack: () => void;
}

export default function CampaignDetails({ campaign, onBack }: CampaignDetailsProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail size={22} />;
      case "sms": return <Smartphone size={22} />;
      case "whatsapp": return <MessageCircle size={22} />;
      default: return <Mail size={22} />;
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "email": return "from-blue-500 to-cyan-500";
      case "sms": return "from-green-500 to-emerald-500";
      case "whatsapp": return "from-emerald-500 to-teal-500";
      default: return "from-blue-500 to-cyan-500";
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "sent": return { icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50 border border-emerald-200", label: "Sent" };
      case "scheduled": return { icon: Clock, color: "text-sky-700", bg: "bg-sky-50 border border-sky-200", label: "Scheduled" };
      case "draft": return { icon: AlertCircle, color: "text-stone-600", bg: "bg-stone-100 border border-stone-200", label: "Draft" };
      default: return { icon: AlertCircle, color: "text-stone-600", bg: "bg-stone-100 border border-stone-200", label: status };
    }
  };

  const StatusIcon = getStatusConfig(campaign.status).icon;

  const metrics = [
    { label: "Recipients", value: campaign.audience.toLocaleString(), sub: "total audience", icon: Users, color: "text-[#2A2A2A]", iconColor: "text-[#2A2A2A]/50", bg: "bg-[#2A2A2A]/5" },
    { label: "Open Rate", value: campaign.openRate, sub: "+5.2% vs avg", icon: TrendingUp, color: "text-emerald-600", iconColor: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Click Rate", value: campaign.clickRate || "42%", sub: "engagement", icon: Target, color: "text-blue-600", iconColor: "text-blue-500", bg: "bg-blue-50" },
    { label: "Conversion", value: "28%", sub: "from clicks", icon: Zap, color: "text-purple-600", iconColor: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#2A2A2A]/50 hover:text-[#2A2A2A] transition-all group text-xs font-black uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to campaigns
      </button>

      <div className="bg-white border border-[#2A2A2A]/8 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#2A2A2A]/8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getTypeGradient(campaign.type)} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                {getTypeIcon(campaign.type)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <h2 className="text-2xl font-black text-[#2A2A2A] tracking-tighter uppercase">{campaign.name}</h2>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusConfig(campaign.status).bg} ${getStatusConfig(campaign.status).color}`}>
                    <StatusIcon size={10} />
                    {getStatusConfig(campaign.status).label}
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase text-[#2A2A2A]/45 tracking-wide">
                  Created on {campaign.sentDate || "March 15, 2024"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl bg-[#2A2A2A]/5 hover:bg-[#2A2A2A]/10 transition-colors group" title="Edit">
                <Edit size={16} className="text-[#2A2A2A]/55 group-hover:text-[#2A2A2A]" />
              </button>
              <button className="p-2.5 rounded-xl bg-[#2A2A2A]/5 hover:bg-[#2A2A2A]/10 transition-colors group" title="Duplicate">
                <Copy size={16} className="text-[#2A2A2A]/55 group-hover:text-[#2A2A2A]" />
              </button>
              <button className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition-colors border border-red-100 shadow-sm" title="Delete">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#2A2A2A]/8 bg-[#FDFBF7]/30">
          {metrics.map((m, i) => (
            <div key={m.label} className={`p-5 text-center ${i < metrics.length - 1 ? "border-r border-[#2A2A2A]/8" : ""}`}>
              <p className="text-[10px] font-black text-[#2A2A2A]/45 uppercase tracking-widest mb-2">{m.label}</p>
              <p className={`text-3xl font-black tracking-tighter ${m.color} leading-none mb-1.5`}>{m.value}</p>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${m.bg}`}>
                <span className={`text-[10px] font-black uppercase tracking-wider ${m.iconColor}`}>{m.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Text Area Body Blocks */}
        <div className="p-6 border-b border-[#2A2A2A]/8">
          <h3 className="text-xs font-black text-[#2A2A2A] mb-3 flex items-center gap-2 uppercase tracking-widest">
            <Eye size={14} className="text-blue-500" />
            Message Content Setup
          </h3>
          <div className="bg-[#FDFBF7] rounded-xl p-4 border border-[#2A2A2A]/8 shadow-inner">
            {campaign.type === "email" ? (
              <div className="space-y-3">
                <div className="bg-white rounded-lg px-3 py-2 border border-[#2A2A2A]/8">
                  <p className="text-[10px] text-[#2A2A2A]/40 mb-0.5 uppercase tracking-widest font-black">Subject Line</p>
                  <p className="text-sm text-[#2A2A2A] font-bold">{campaign.subject || "No subject"}</p>
                </div>
                <p className="text-sm font-medium text-[#2A2A2A]/70 whitespace-pre-wrap leading-relaxed px-1">
                  {campaign.content}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-xl px-4 py-3 border border-[#2A2A2A]/8">
                  <p className="text-sm font-medium text-[#2A2A2A]/70 whitespace-pre-wrap leading-relaxed">
                    {campaign.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#2A2A2A]/40 uppercase tracking-wider">
                  <span className="font-mono">MSG_{campaign.id}</span>
                  <span>{campaign.content?.length || 0} characters total</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Analytics Grid Charts */}
        <div className="p-6 border-b border-[#2A2A2A]/8">
          <h3 className="text-xs font-black text-[#2A2A2A] mb-3 flex items-center gap-2 uppercase tracking-widest">
            <BarChart3 size={14} className="text-purple-500" />
            Performance Metric Flow
          </h3>
          <div className="bg-[#FDFBF7] rounded-xl p-5 border border-[#2A2A2A]/8">
            <div className="flex items-end gap-2 h-24 mb-3">
              {[40, 68, 55, 72, 60, 45, 58].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-[#2A2A2A]/25 to-[#2A2A2A]/5 transition-all hover:from-[#2A2A2A]/40" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#2A2A2A]/35 tracking-wider">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d} className="flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Panel Actions */}
        <div className="p-5 flex gap-3 bg-white">
          <button className="flex-1 py-3 bg-[#2A2A2A] hover:bg-black text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-md hover:scale-[1.01]">
            <Send size={14} />
            Send Again
          </button>
          <button className="px-4 py-3 bg-[#2A2A2A]/5 hover:bg-[#2A2A2A]/10 text-[#2A2A2A]/65 hover:text-[#2A2A2A] rounded-xl transition-all border border-[#2A2A2A]/8" title="Download report">
            <Download size={14} />
          </button>
          <button className="px-4 py-3 bg-[#2A2A2A]/5 hover:bg-[#2A2A2A]/10 text-[#2A2A2A]/65 hover:text-[#2A2A2A] rounded-xl transition-all border border-[#2A2A2A]/8" title="Share">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}