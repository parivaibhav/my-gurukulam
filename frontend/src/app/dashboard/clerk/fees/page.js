"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ClerkFees() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all student fees from API
  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await fetch("/api/clerk/fees");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch student fees:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFees();
  }, []);

  // Handle payment update
  const handlePayment = async (studentId, semester) => {
    try {
      await fetch(`/api/clerk/fees/pay/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ semester }),
      });
      setStudents((prev) =>
        prev.map((s) =>
          s._id === studentId
            ? {
                ...s,
                fees: s.fees.map((f) =>
                  f.semester === semester ? { ...f, status: "Paid" } : f
                ),
              }
            : s
        )
      );
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };

  if (loading)
    return <p className="p-4 text-gray-600">Loading student fees...</p>;

  if (students.length === 0)
    return <p className="p-6 text-gray-600">No students found.</p>;

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Student Fee Management
      </motion.h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Student Name</th>
              <th className="px-4 py-2 border-b">Class</th>
              <th className="px-4 py-2 border-b">Semester</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              student.fees.map((fee) => (
                <tr
                  key={`${student._id}-${fee.semester}`}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.className}</td>
                  <td className="px-4 py-2">Semester {fee.semester}</td>
                  <td className="px-4 py-2 font-medium">${fee.amount}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      fee.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {fee.status}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {fee.status === "Pending" ? (
                      <button
                        onClick={() => handlePayment(student._id, fee.semester)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition flex items-center gap-2 mx-auto"
                      >
                        <FiCheckCircle /> Mark Paid
                      </button>
                    ) : (
                      <span className="flex items-center justify-center gap-2 text-green-600">
                        <FiCheckCircle /> Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
