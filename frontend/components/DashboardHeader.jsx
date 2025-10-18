"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiKey } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";

export default function DashboardHeader({ onToggleSidebar }) {
  const pathname = usePathname();
  const [user, setUser] = useState({ name: "Admin User", role: "admin" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const getTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    const section = parts[parts.length - 1];
    return section
      ? section.charAt(0).toUpperCase() + section.slice(1)
      : "Dashboard";
  };

  const handleUpdatePassword = () => {
    // Redirect to password update page
    window.location.href = "/dashboard/update-password";
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-6 py-3">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <FiMenu size={20} />
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
          {getTitle()}
        </h1>
      </div>

      {/* Right: User menu */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium capitalize text-gray-700">
                {user.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={handleUpdatePassword}>
              <FiKey className="mr-2" /> Update Password
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <IoLogOutOutline className="mr-2 text-red-600 hover:text-red-600" /> Logout
            </DropdownMenuItem>
            {/* You can add more menu items here if needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
