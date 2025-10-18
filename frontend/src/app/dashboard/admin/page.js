"use client";

import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiActivity, FiSettings } from "react-icons/fi";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Total Students",
      value: "1,240",
      icon: <FiUsers className="text-blue-500 text-3xl" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Teachers",
      value: "48",
      icon: <FiFileText className="text-green-500 text-3xl" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Pending Fees",
      value: "₹85,000",
      icon: <FiActivity className="text-yellow-500 text-3xl" />,
      color: "from-yellow-100 to-yellow-50",
    },
    {
      title: "System Settings",
      value: "Manage",
      icon: <FiSettings className="text-purple-500 text-3xl" />,
      color: "from-purple-100 to-purple-50",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-3xl shadow-lg"
      >
        <h1 className="text-3xl sm:text-4xl font-bold">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-blue-100 mt-2 text-sm sm:text-base">
          Here’s a quick overview of what’s happening in your institution today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            className={`p-6 rounded-3xl shadow-md bg-gradient-to-br ${card.color} hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {card.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>
              <div className="p-3 bg-white rounded-full shadow-sm">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                  #
                </th>
                <th className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                  Activity
                </th>
                <th className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                  User
                </th>
                <th className="px-4 py-3 text-gray-600 text-sm sm:text-base">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1,
                  activity: "Added new teacher",
                  user: "Clerk A",
                  time: "2 hours ago",
                },
                {
                  id: 2,
                  activity: "Published timetable",
                  user: "Teacher B",
                  time: "4 hours ago",
                },
                {
                  id: 3,
                  activity: "Updated fees record",
                  user: "Admin",
                  time: "1 day ago",
                },
              ].map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.activity}</td>
                  <td className="px-4 py-3">{row.user}</td>
                  <td className="px-4 py-3 text-gray-500">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
