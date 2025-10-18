"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    className: "",
    dueDate: "",
  });

  // Fetch assignments from backend
  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await fetch("/api/teacher/assignments"); // your API route
        const data = await res.json();
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, []);

  // Add new assignment
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });
      const savedAssignment = await res.json();
      setAssignments([savedAssignment, ...assignments]);
      setNewAssignment({ title: "", description: "", className: "", dueDate: "" });
    } catch (error) {
      console.error("Failed to add assignment:", error);
    }
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await fetch(`/api/teacher/assignments/${id}`, { method: "DELETE" });
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading assignments...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Assignments</h1>

      {/* Add New Assignment Form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end"
      >
        <input
          type="text"
          placeholder="Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Class Name"
          value={newAssignment.className}
          onChange={(e) => setNewAssignment({ ...newAssignment, className: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          value={newAssignment.dueDate}
          onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-full sm:col-auto"
        >
          <FiPlus /> Add Assignment
        </button>
        <input
          type="text"
          placeholder="Description"
          value={newAssignment.description}
          onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
          className="border px-3 py-2 rounded col-span-full"
          required
        />
      </form>

      {/* Assignments Table */}
      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{assignment.title}</td>
                  <td className="px-4 py-2">{assignment.className}</td>
                  <td className="px-4 py-2">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{assignment.description}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Optional Edit Feature */}
                    <FiEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                    <button
                      onClick={() => handleDelete(assignment.id)}
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
