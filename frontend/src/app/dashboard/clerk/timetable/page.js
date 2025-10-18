"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function ClerkTimeTable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newEntry, setNewEntry] = useState({
    className: "",
    subject: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  // Fetch timetable entries
  useEffect(() => {
    async function fetchTimetable() {
      try {
        const res = await fetch("http://localhost:5000/api/clerk/timetable"); // your API route
        const data = await res.json();
        setTimetable(data);
      } catch (error) {
        console.error("Failed to fetch timetable:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTimetable();
  }, []);

  // Add new entry
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/clerk/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const savedEntry = await res.json();
      setTimetable([savedEntry, ...timetable]);
      setNewEntry({
        className: "",
        subject: "",
        day: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Failed to add entry:", error);
    }
  };

  // Delete entry
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      await fetch(`http://localhost:5000/api/clerk/timetable/${id}`, { method: "DELETE" });
      setTimetable(timetable.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading timetable...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Class Timetable</h1>

      {/* Add new entry form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 items-end"
      >
        <input
          type="text"
          placeholder="Class Name"
          value={newEntry.className}
          onChange={(e) =>
            setNewEntry({ ...newEntry, className: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={newEntry.subject}
          onChange={(e) =>
            setNewEntry({ ...newEntry, subject: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <select
          value={newEntry.day}
          onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <input
          type="time"
          value={newEntry.startTime}
          onChange={(e) =>
            setNewEntry({ ...newEntry, startTime: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="time"
          value={newEntry.endTime}
          onChange={(e) =>
            setNewEntry({ ...newEntry, endTime: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-full sm:col-auto"
        >
          <FiPlus /> Add Entry
        </button>
      </form>

      {/* Timetable Table */}
      {timetable.length === 0 ? (
        <p className="text-gray-600">No timetable entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{entry.className}</td>
                  <td className="px-4 py-2">{entry.subject}</td>
                  <td className="px-4 py-2">{entry.day}</td>
                  <td className="px-4 py-2">{entry.startTime}</td>
                  <td className="px-4 py-2">{entry.endTime}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Optional: Edit feature can be added here */}
                    <button
                      onClick={() => handleDelete(entry.id)}
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
