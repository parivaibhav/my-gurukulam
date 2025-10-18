"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner"; // modern toast library
import { Loader2 } from "lucide-react"; // modern loader icon

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("🗑️ Blog deleted successfully!");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("❌ Error deleting blog");
    }
  };

  return (
    <div className="p-6 md:p-10  min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
          <Link
            href="/dashboard/admin/blogs/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FiPlus className="text-lg" /> Add Blog
          </Link>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-20 text-gray-600">
            <Loader2 className="animate-spin mr-2" /> Loading blogs...
          </div>
        )}

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20 text-gray-600 bg-white rounded-xl shadow-sm">
            <p>No blogs found.</p>
          </div>
        )}

        {/* Blog Table */}
        {!loading && blogs.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr
                    key={blog._id || index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{blog.title}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {typeof blog.author === "object"
                        ? blog.author?.name || "Unknown"
                        : blog.author}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3 text-lg">
                      <Link
                        href={`/dashboard/admin/blogs/edit/${blog._id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
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
    </div>
  );
}
