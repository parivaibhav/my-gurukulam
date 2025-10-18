"use client";

import { motion } from "framer-motion";
import { FiUsers, FiBookOpen, FiClipboard, FiCalendar } from "react-icons/fi";

export default function TeacherDashboard() {
  const cards = [
    {
      title: "My Students",
      value: "320",
      icon: <FiUsers className="text-blue-500 text-3xl" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Assignments Posted",
      value: "24",
      icon: <FiClipboard className="text-green-500 text-3xl" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Upcoming Lectures",
      value: "5",
      icon: <FiCalendar className="text-yellow-500 text-3xl" />,
      color: "from-yellow-100 to-yellow-50",
    },
    {
      title: "Courses",
      value: "3",
      icon: <FiBookOpen className="text-purple-500 text-3xl" />,
      color: "from-purple-100 to-purple-50",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "JavaScript Basics",
      date: "12 Oct 2025",
      status: "Submitted: 289 / 320",
    },
    {
      id: 2,
      title: "React Components",
      date: "10 Oct 2025",
      status: "Submitted: 295 / 320",
    },
    {
      id: 3,
      title: "Database Design",
      date: "8 Oct 2025",
      status: "Submitted: 310 / 320",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-3xl font-bold">Welcome, Teacher 👩‍🏫</h1>
        <p className="text-blue-100 mt-1">
          Track your students, assignments, and upcoming lectures here.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl shadow-sm bg-gradient-to-br ${card.color} hover:shadow-lg transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
              </div>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assignments Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Assignments
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="pb-2">#</th>
              <th className="pb-2">Assignment Title</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{a.id}</td>
                <td>{a.title}</td>
                <td>{a.date}</td>
                <td className="text-gray-500">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Upcoming Lectures Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Lectures
        </h2>
        <ul className="space-y-3">
          {[
            {
              subject: "HTML & CSS",
              time: "10:00 AM - 11:00 AM",
              room: "Lab 2",
            },
            {
              subject: "React State Management",
              time: "12:00 PM - 1:30 PM",
              room: "Room 5A",
            },
            {
              subject: "MongoDB Basics",
              time: "2:00 PM - 3:30 PM",
              room: "Lab 1",
            },
          ].map((lec, i) => (
            <li
              key={i}
              className="p-4 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{lec.subject}</p>
                <p className="text-sm text-gray-500">{lec.time}</p>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {lec.room}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
