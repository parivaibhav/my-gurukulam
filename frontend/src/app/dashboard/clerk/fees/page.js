"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function ClerkFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFee, setNewFee] = useState({
    studentName: "",
    className: "",
    amount: "",
    status: "Pending",
  });

  // Fetch fees from backend
  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await fetch("/api/clerk/fees"); // your API route
        const data = await res.json();
        setFees(data);
      } catch (error) {
        console.error("Failed to fetch fees:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFees();
  }, []);

  // Add new fee
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/clerk/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFee),
      });
      const savedFee = await res.json();
      setFees([savedFee, ...fees]);
      setNewFee({
        studentName: "",
        className: "",
        amount: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Failed to add fee:", error);
    }
  };

  // Delete fee
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fee?")) return;
    try {
      await fetch(`http://localhost:5000/api/clerk/fees/${id}`, { method: "DELETE" });
      setFees(fees.filter((fee) => fee.id !== id));
    } catch (error) {
      console.error("Failed to delete fee:", error);
    }
  };

  // Payment simulation
  const handlePayment = async (id) => {
    // Replace this later with real payment gateway
    if (!confirm("Proceed with payment?")) return;
    try {
      await fetch(`http://localhost:5000/api/clerk/fees/pay/${id}`, { method: "POST" });
      setFees(
        fees.map((fee) => (fee.id === id ? { ...fee, status: "Paid" } : fee))
      );
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading fees...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Fees</h1>

      {/* Add New Fee Form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end"
      >
        <input
          type="text"
          placeholder="Student Name"
          value={newFee.studentName}
          onChange={(e) =>
            setNewFee({ ...newFee, studentName: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={newFee.className}
          onChange={(e) => setNewFee({ ...newFee, className: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newFee.amount}
          onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-full sm:col-auto"
        >
          <FiPlus /> Add Fee
        </button>
      </form>

      {/* Fees Table */}
      {fees.length === 0 ? (
        <p className="text-gray-600">No fee records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{fee.studentName}</td>
                  <td className="px-4 py-2">{fee.className}</td>
                  <td className="px-4 py-2">${fee.amount}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      fee.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {fee.status}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {fee.status === "Pending" && (
                      <button
                        onClick={() => handlePayment(fee.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(fee.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
