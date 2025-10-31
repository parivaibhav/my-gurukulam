"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiKey } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdatePasswordModal from "@/components/UpdatePasswordModal";

export default function DashboardHeader({ onToggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState({ name: "Admin User", role: "admin" });
  const [isMounted, setIsMounted] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // ✅ modal state

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!isMounted) return null;

  const getTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    const section = parts[parts.length - 1];
    return section
      ? section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")
      : "Dashboard";
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 border-b border-gray-200 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={onToggleSidebar}
          >
            <FiMenu size={22} />
          </Button>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {getTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3">
                <Avatar className="w-9 h-9 ring-2 ring-gray-200 dark:ring-neutral-700">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-100">
                    {user.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-md bg-white dark:bg-neutral-900"
            >
              <DropdownMenuItem onClick={() => setShowPasswordModal(true)}>
                <FiKey className="mr-2 text-gray-600 dark:text-gray-300" />
                Update Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-neutral-800"
              >
                <IoLogOutOutline className="mr-2 text-red-600" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ✅ Reusable modal (shared for all roles) */}
      <UpdatePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
}
