"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiPlusCircle,
  FiBriefcase,
  FiUploadCloud,
} from "react-icons/fi";

export default function ClerkPlacements() {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    package: "",
    date: "",
    batch: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Mock data for demo
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        studentName: "Riya Sharma",
        company: "TCS",
        role: "Software Engineer",
        package: "4.5 LPA",
        date: "2025-09-10",
        batch: "2025",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        id: 2,
        studentName: "Arjun Mehta",
        company: "Infosys",
        role: "System Analyst",
        package: "5 LPA",
        date: "2025-08-22",
        batch: "2024",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
      },
    ];
    setPlacements(mockData);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let imageUrl = preview;
    if (editingId) {
      setPlacements(
        placements.map((p) =>
          p.id === editingId ? { ...p, ...form, image: imageUrl } : p
        )
      );
      setEditingId(null);
    } else {
      const newPlacement = {
        id: Date.now(),
        ...form,
        image: imageUrl,
      };
      setPlacements([...placements, newPlacement]);
    }

    setForm({
      studentName: "",
      company: "",
      role: "",
      package: "",
      date: "",
      batch: "",
      image: null,
    });
    setPreview(null);
  };

  const handleEdit = (placement) => {
    setForm({
      studentName: placement.studentName,
      company: placement.company,
      role: placement.role,
      package: placement.package,
      date: placement.date,
      batch: placement.batch,
      image: placement.image,
    });
    setPreview(placement.image);
    setEditingId(placement.id);
  };

  const handleDelete = (id) => {
    setPlacements(placements.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiBriefcase className="text-blue-500" /> Placement Records
        </h1>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md grid md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Student Name
          </label>
          <input
            type="text"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="e.g. Riya Sharma"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="e.g. Infosys"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Role / Position
          </label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="e.g. Software Developer"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Package (CTC)
          </label>
          <input
            type="text"
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="e.g. 5 LPA"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Batch
          </label>
          <input
            type="text"
            value={form.batch}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="e.g. 2025"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Placement Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Student Image
          </label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <FiUploadCloud size={28} />
                  <p className="text-sm mt-1">Upload</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <FiPlusCircle />
            {editingId ? "Update Record" : "Add Placement"}
          </button>
        </div>
      </motion.form>

      {/* Placement List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">
            No placement records yet. Add one! 🧑‍💼
          </p>
        ) : (
          placements.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md space-y-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.studentName}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {p.studentName}
                  </h2>
                  <p className="text-gray-500 text-sm">{p.batch} Batch</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                <span className="font-medium">Company:</span> {p.company}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Role:</span> {p.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Package:</span> {p.package}
              </p>
              <p className="text-sm text-gray-400">📅 {p.date}</p>

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
