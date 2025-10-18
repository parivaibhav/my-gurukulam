"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DashboardHeader from "../../../components/DashboardHeader";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setMobileOpen(!mobileOpen);
  const closeSidebar = () => setMobileOpen(false);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar
        pathname={pathname}
        isMobileOpen={mobileOpen}
        closeMobileMenu={closeSidebar}
      />

      <div className="flex-1 flex flex-col">
        {/* Header with hamburger for mobile */}
        <DashboardHeader onToggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="p-6 md:p-8 flex-1 relative">
          {children}

          {/* Toast notifications */}
          <Toaster position="top-right" richColors closeButton />
        </main>
      </div>

      {/* Optional: backdrop overlay when mobile sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}
