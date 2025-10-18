"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TeacherBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  // Mock data fetch (replace with API)
  useEffect(() => {
    const mockBlogs = [
      {
        id: 1,
        title: "React Hooks Explained",
        content: "Hooks are a new addition in React 16.8...",
        date: "2025-10-14",
      },
      {
        id: 2,
        title: "Understanding Next.js Routing",
        content: "Next.js provides a powerful file-based routing system...",
        date: "2025-10-12",
      },
    ];
    setBlogs(mockBlogs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setBlogs(
        blogs.map((b) =>
          b.id === editingId
            ? { ...b, ...form, date: new Date().toISOString().split("T")[0] }
            : b
        )
      );
      setEditingId(null);
    } else {
      const newBlog = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
      };
      setBlogs([...blogs, newBlog]);
    }
    setForm({ title: "", content: "" });
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content });
    setEditingId(blog.id);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          📚 Teacher Blogs
        </h1>
      </div>

      {/* Blog Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4"
      >
        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Blog Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
            Blog Content
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border p-2 rounded-md h-32 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            placeholder="Write your blog content..."
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          <FiPlusCircle />
          {editingId ? "Update Blog" : "Publish Blog"}
        </button>
      </motion.form>

      {/* Blog List */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">
            No blogs yet. Start writing one! ✍️
          </p>
        ) : (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md space-y-3"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{blog.content}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <span>{blog.date}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
