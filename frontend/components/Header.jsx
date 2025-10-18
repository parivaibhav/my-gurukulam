"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [isScrolled, setIsScrolled] = useState(false); // header scroll
  const [isMoreOpen, setIsMoreOpen] = useState(false); // mobile "More"
  const [isDesktopMoreOpen, setIsDesktopMoreOpen] = useState(false); // desktop "More"

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Placements", href: "/placements" },
    { name: "Syllabus", href: "/syllabus" },
    { name: "Photo Gallery", href: "/gallery" },
  ];

  const moreLinks = [
    { name: "Events", href: "/events" },
    { name: "Admissions", href: "/admissions" },
    { name: "Faculty", href: "/faculty" },
    { name: "Careers", href: "/careers" },
    { name: "FAQ", href: "/faq" },
  ];

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const desktopDropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-white/70 shadow-md"
          : "bg-white shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/gurukul-logo.png"
            alt="gurukul logo"
            width={50}
            height={50}
            priority
          />
          <span className="text-lg md:text-xl font-semibold text-gray-800">
            SSSDIIT Gurukul
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* Desktop More Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDesktopMoreOpen(true)}
            onMouseLeave={() => setIsDesktopMoreOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200">
              More <MdKeyboardArrowDown size={18} />
            </button>
            <AnimatePresence>
              {isDesktopMoreOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={desktopDropdownVariants}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                >
                  {moreLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.05 },
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none transition-transform"
        >
          {isOpen ? <IoCloseSharp size={28} /> : <HiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-screen w-3/4 sm:w-2/5 bg-white/90 backdrop-blur-md shadow-2xl z-[100] flex flex-col px-6 py-8 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/gurukul-logo.png"
                    alt="gurukul logo"
                    width={40}
                    height={40}
                  />
                  <span className="text-lg font-semibold text-gray-800">
                    SSSDIIT Gurukul
                  </span>
                </div>
                <IoCloseSharp
                  size={28}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer"
                />
              </div>

              <motion.nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-gray-700 font-medium text-3xl hover:text-blue-600 transition-all duration-200"
                    >
                      {link.name} <FiArrowUpRight size={28} />
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile More Dropdown */}
                <motion.div>
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="flex items-center gap-2 text-gray-700 font-medium text-3xl hover:text-blue-600 transition-all duration-200"
                  >
                    More <MdKeyboardArrowDown size={28} />
                  </button>
                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0, height: 0 },
                          visible: {
                            opacity: 1,
                            height: "auto",
                            transition: {
                              staggerChildren: 0.05,
                              when: "beforeChildren",
                            },
                          },
                        }}
                        className="ml-4 mt-3 flex flex-col space-y-3 overflow-hidden"
                      >
                        {moreLinks.map((link) => (
                          <motion.div key={link.name} variants={itemVariants}>
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-2 text-gray-600 text-2xl hover:text-blue-600 transition-all duration-150"
                            >
                              {link.name} <FiArrowUpRight size={22} />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                  Login
                </motion.button>
              </motion.nav>

              <motion.div className="mt-auto pt-10 text-sm text-gray-400 text-center">
                © {new Date().getFullYear()} Gurukul Institute - Junagadh
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
