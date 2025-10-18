"use client";

import Link from "next/link";
import { motion } from "framer-motion";



export default function NotFound() {
  return (
    <>
 
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-md"
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-600 mb-6">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-all"
            >
              Go Back Home
            </motion.button>
          </Link>
        </motion.div>

      </main>
    
    </>
  );
}
