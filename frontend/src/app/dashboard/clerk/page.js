"use client";

import { motion } from "framer-motion";
import { FiFileText, FiImage, FiCalendar, FiUsers } from "react-icons/fi";

export default function ClerkDashboard() {
  const cards = [
    {
      title: "Pending Fees",
      value: "₹120,500",
      icon: <FiFileText className="text-blue-500 text-3xl" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Students",
      value: "1,240",
      icon: <FiUsers className="text-green-500 text-3xl" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Gallery Items",
      value: "128",
      icon: <FiImage className="text-yellow-500 text-3xl" />,
      color: "from-yellow-100 to-yellow-50",
    },
    {
      title: "Upcoming Timetable",
      value: "5 Classes",
      icon: <FiCalendar className="text-purple-500 text-3xl" />,
      color: "from-purple-100 to-purple-50",
    },
  ];

  const recentFees = [
    { id: 1, student: "Aarav Patel", amount: "₹10,000", status: "Paid" },
    { id: 2, student: "Priya Sharma", amount: "₹12,000", status: "Pending" },
    { id: 3, student: "Rohit Kumar", amount: "₹9,500", status: "Paid" },
  ];

  const galleryItems = [
    { id: 1, title: "Annual Day 2025", date: "05 Oct 2025" },
    { id: 2, title: "Science Exhibition", date: "12 Sep 2025" },
    { id: 3, title: "Sports Meet", date: "20 Aug 2025" },
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
        <h1 className="text-3xl font-bold">Welcome, Clerk 🗂️</h1>
        <p className="text-blue-100 mt-1">
          Manage fees, student records, gallery, and timetable here.
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

      {/* Recent Fees Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Fees Payments
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="pb-2">#</th>
              <th className="pb-2">Student Name</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentFees.map((f) => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{f.id}</td>
                <td>{f.student}</td>
                <td>{f.amount}</td>
                <td
                  className={`font-medium ${
                    f.status === "Paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {f.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Gallery Items
        </h2>
        <ul className="space-y-3">
          {galleryItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span className="text-sm font-medium text-blue-600">
                {item.date}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
