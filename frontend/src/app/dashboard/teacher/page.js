"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiUsers, FiClipboard, FiBookOpen, FiCalendar } from "react-icons/fi";

export default function TeacherDashboard() {
  const cards = [
    {
      title: "Students",
      value: "320",
      icon: <FiUsers className="text-blue-600 text-2xl" />,
      accent: "border-l-4 border-blue-500",
    },
    {
      title: "Assignments",
      value: "24",
      icon: <FiClipboard className="text-green-600 text-2xl" />,
      accent: "border-l-4 border-green-500",
    },
    {
      title: "Upcoming Lectures",
      value: "5",
      icon: <FiCalendar className="text-yellow-600 text-2xl" />,
      accent: "border-l-4 border-yellow-500",
    },
    {
      title: "Courses",
      value: "3",
      icon: <FiBookOpen className="text-purple-600 text-2xl" />,
      accent: "border-l-4 border-purple-500",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "JavaScript Basics",
      date: "12 Oct 2025",
      status: "289 / 320",
    },
    {
      id: 2,
      title: "React Components",
      date: "10 Oct 2025",
      status: "295 / 320",
    },
    {
      id: 3,
      title: "Database Design",
      date: "8 Oct 2025",
      status: "310 / 320",
    },
  ];

  const lectures = [
    { subject: "HTML & CSS", time: "10:00 – 11:00 AM", room: "Lab 2" },
    {
      subject: "React State Management",
      time: "12:00 – 1:30 PM",
      room: "Room 5A",
    },
    { subject: "MongoDB Basics", time: "2:00 – 3:30 PM", room: "Lab 1" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white"
      >
        <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
        <p className="text-blue-100 text-sm mt-1">
          View your classes, assignments, and schedule at a glance.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`rounded-xl border ${card.accent} bg-white`}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                    {card.value}
                  </h3>
                </div>
                {card.icon}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Assignments Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id} className="hover:bg-gray-50">
                    <TableCell>{a.id}</TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell className="text-gray-600">{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Lectures Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Upcoming Lectures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lectures.map((lec, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{lec.subject}</p>
                  <p className="text-sm text-gray-500">{lec.time}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {lec.room}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
