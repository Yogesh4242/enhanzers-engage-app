// src/app/dashboard/owner-dashboard/campaigns/page.tsx
"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import SidePanel from "../components/sidepanel";
import TemplateLibrary from "./TemplateLibrary";
import CreateCampaignWizard from "./CreateCampaignWizard";

export default function CampaignsPage() {
  const [view, setView] = useState<"templates" | "create">("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <SidePanel />

      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 hidden border-b border-[#E5E5E5] bg-white/80 px-8 py-5 backdrop-blur-md lg:block">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
                Campaigns
              </h2>
              <p className="mt-0.5 text-sm text-[#737373]">
                Create and manage your marketing campaigns
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2 transition-colors focus-within:border-black focus-within:bg-white">
                <Search size={14} className="text-[#A3A3A3]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 bg-transparent text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3]"
                />
              </div>

              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black">
                <Bell size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {view === "templates" && (
            <TemplateLibrary
              onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                setView("create");
              }}
              onStartFromScratch={() => {
                setSelectedTemplate(null);
                setView("create");
              }}
            />
          )}

          {view === "create" && (
            <CreateCampaignWizard
              template={selectedTemplate}
              onBack={() => setView("templates")}
            />
          )}
        </div>
      </main>
    </div>
  );
}