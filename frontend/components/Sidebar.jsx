"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiSettings,
  FiActivity,
  FiX,
} from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { SiGoogleclassroom } from "react-icons/si";
import { AiFillNotification } from "react-icons/ai";
import { MdPhoto } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ pathname, isMobileOpen, closeMobileMenu }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Prevent body scroll when sidebar open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMobileOpen]);

  // ✅ Fetch user role
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok && data.role) setUserRole(data.role);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
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
      { name: "Gallery", href: "/dashboard/clerk/gallery", icon: <MdPhoto /> },
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
      {
        name: "Circulars",
        href: "/dashboard/clerk/circulars",
        icon: <AiFillNotification />,
      },
    ],
  };

  const navItems = navByRole[userRole] || [];

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 bg-white dark:bg-neutral-950 
        border-r border-gray-200 dark:border-neutral-800 shadow-xl sticky top-0 h-screen"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {userRole
              ? `${
                  userRole.charAt(0).toUpperCase() + userRole.slice(1)
                } Dashboard`
              : "Dashboard"}
          </h2>
        </div>

        <ScrollArea className="flex-1 p-3">
          {loading ? (
            <div className="text-gray-400 text-sm animate-pulse">
              Loading...
            </div>
          ) : navItems.length > 0 ? (
            <nav className="flex flex-col gap-1 mt-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full flex items-center gap-3 justify-start rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500/15 to-orange-500/10 text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          ) : (
            <p className="text-gray-400 text-sm mt-4">
              No access or not logged in.
            </p>
          )}
        </ScrollArea>

        <div className="p-4 border-t border-gray-100 dark:border-neutral-800 text-center text-sm text-gray-500 dark:text-gray-400">
          {userRole ? `Logged in as ${userRole}` : "Not logged in"}
        </div>
      </aside>

      {/* ✅ Mobile Sidebar + Overlay */}
      <AnimatePresence>
        {hasMounted && isMobileOpen && (
          <>
            {/* 🔥 Overlay to dim and block scroll */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[44]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* 🔥 Animated Sidebar */}
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="md:hidden fixed inset-y-0 left-0 z-[45] w-64 bg-white dark:bg-neutral-950 
              border-r border-gray-200 dark:border-neutral-800 flex flex-col shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {userRole
                    ? `${
                        userRole.charAt(0).toUpperCase() + userRole.slice(1)
                      } Dashboard`
                    : "Dashboard"}
                </h2>
                <button
                  onClick={closeMobileMenu}
                  className="md:hidden text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition"
                >
                  <FiX size={22} />
                </button>
              </div>

              <ScrollArea className="flex-1 p-3">
                {loading ? (
                  <div className="text-gray-400 text-sm animate-pulse">
                    Loading...
                  </div>
                ) : navItems.length > 0 ? (
                  <nav className="flex flex-col gap-1 mt-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.name}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Link href={item.href} onClick={closeMobileMenu}>
                            <Button
                              variant="ghost"
                              className={`w-full flex items-center gap-3 justify-start rounded-lg text-sm font-medium transition-all duration-200
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-orange-500/15 to-orange-500/10 text-orange-600 dark:text-orange-400"
                                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                              }`}
                            >
                              <span className="text-lg">{item.icon}</span>
                              <span>{item.name}</span>
                            </Button>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                ) : (
                  <p className="text-gray-400 text-sm mt-4">
                    No access or not logged in.
                  </p>
                )}
              </ScrollArea>

              <div className="p-4 border-t border-gray-100 dark:border-neutral-800 text-center text-sm text-gray-500 dark:text-gray-400">
                {userRole ? `Logged in as ${userRole}` : "Not logged in"}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
