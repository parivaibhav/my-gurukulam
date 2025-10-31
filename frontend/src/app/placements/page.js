"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const placements = [
  {
    id: 1,
    name: "Aarav Patel",
    role: "Software Engineer",
    company: "Google",
    batch: "Batch 2024",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Microsoft",
    batch: "Batch 2024",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Data Analyst",
    company: "Amazon",
    batch: "Batch 2023",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 4,
    name: "Neha Verma",
    role: "Backend Developer",
    company: "TCS",
    batch: "Batch 2023",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 5,
    name: "Ankit Singh",
    role: "Full Stack Developer",
    company: "Infosys",
    batch: "Batch 2022",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: 6,
    name: "Simran Kaur",
    role: "UI/UX Designer",
    company: "Accenture",
    batch: "Batch 2023",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: 7,
    name: "Rahul Gupta",
    role: "Mobile Developer",
    company: "Wipro",
    batch: "Batch 2024",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 8,
    name: "Sneha Patel",
    role: "Software Tester",
    company: "Capgemini",
    batch: "Batch 2023",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    id: 9,
    name: "Vikram Joshi",
    role: "System Engineer",
    company: "IBM",
    batch: "Batch 2022",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: 10,
    name: "Anjali Mehta",
    role: "Cloud Engineer",
    company: "Oracle",
    batch: "Batch 2024",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
  },
];

export default function PlacementsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 sm:px-12 py-28">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-gray-800"
        >
          🎓 Our Proud Placements
        </motion.h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 place-items-center">
          {placements.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-4 border-4 border-orange-200 hover:border-orange-500 transition-all duration-300">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {student.name}
              </h2>
              <p className="text-orange-600 text-sm font-medium mt-1">
                {student.role}
              </p>
              <p className="text-gray-500 text-sm">{student.company}</p>
              <p className="mt-1 text-xs text-gray-400 italic">
                {student.batch}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
