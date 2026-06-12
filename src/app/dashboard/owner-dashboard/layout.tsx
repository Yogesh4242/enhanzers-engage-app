import type { ReactNode } from "react";
import Sidebar from "./components/sidepanel";
import Navbar from "./components/topnav";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Dashboard - Engage from Enhanzers",
  description:
    "A complete restaurant loyalty and customer retention platform.",
};



export default function OwnerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A]">

      <Sidebar />

      <div className="ml-64 flex min-h-screen flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}