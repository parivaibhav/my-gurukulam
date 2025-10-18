"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiSettings,
  FiActivity,
} from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { SiGoogleclassroom } from "react-icons/si";

import { Button } from "@/components/ui/button"; // shadcn/ui button
import { ScrollArea } from "@/components/ui/scroll-area"; // shadcn/ui scrollable container

export default function Sidebar({ pathname, isMobileOpen, closeMobileMenu }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const navByRole = {
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: <FiActivity /> },
      {
        name: "Students",
        href: "/dashboard/admin/students",
        icon: <FiUsers />,
      },
      {
        name: "Teachers",
        href: "/dashboard/admin/teachers",
        icon: <FiFileText />,
      },
      { name: "Clerks", href: "/dashboard/admin/clerks", icon: <FiSettings /> },
      { name: "Blogs", href: "/dashboard/admin/blogs", icon: <FiBookOpen /> },
    ],
    teacher: [
      { name: "Dashboard", href: "/dashboard/teacher", icon: <FiActivity /> },
      {
        name: "Assignments",
        href: "/dashboard/teacher/assignments",
        icon: <FiFileText />,
      },
      {
        name: "Attendance",
        href: "/dashboard/teacher/attendance",
        icon: <FiUsers />,
      },
      { name: "Blogs", href: "/dashboard/teacher/blogs", icon: <FiBookOpen /> },
    ],
    clerk: [
      { name: "Dashboard", href: "/dashboard/clerk", icon: <FiActivity /> },
      { name: "Fees", href: "/dashboard/clerk/fees", icon: <FiSettings /> },
      {
        name: "Gallery",
        href: "/dashboard/clerk/gallery",
        icon: <FiFileText />,
      },
      {
        name: "Timetable",
        href: "/dashboard/clerk/timetable",
        icon: <FiBookOpen />,
      },
      {
        name: "Students",
        href: "/dashboard/clerk/students",
        icon: <FiUsers />,
      },
      {
        name: "Placements",
        href: "/dashboard/clerk/placements",
        icon: <GoGoal />,
      },
      {
        name: "Classes",
        href: "/dashboard/clerk/classes",
        icon: <SiGoogleclassroom />,
      },
    ],
  };

  const navItems = navByRole[userRole] || [];

  return (
    <aside
      className={`
    z-50 w-64 bg-white shadow-lg border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    md:sticky md:top-0 md:h-screen md:translate-x-0
    ${
      isMobileOpen
        ? "fixed inset-y-0 left-0 translate-x-0"
        : "fixed -translate-x-full md:translate-x-0"
    }
    flex flex-col
  `}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-2xl font-bold tracking-wide text-gray-800">
          {userRole
            ? `${
                userRole.charAt(0).toUpperCase() + userRole.slice(1)
              } Dashboard`
            : "Dashboard"}
        </h2>
      </div>

      {/* Scrollable Nav Links */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={closeMobileMenu}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className="w-full flex items-center gap-3 justify-start"
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">Logged in as {userRole}</span>
      </div>
    </aside>
  );
}
