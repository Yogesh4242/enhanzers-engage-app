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
  

      <main >
        {/* Header */}
        

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
  );
}