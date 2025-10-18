"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminClerks() {
  const [clerks, setClerks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClerk, setEditingClerk] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: "success"|"error", message: string }

  useEffect(() => {
    async function fetchClerks() {
      try {
        const res = await fetch(`${API_URL}/api/admin/clerks`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setClerks(Array.isArray(data) ? data : data.clerks || []);
      } catch (error) {
        console.error("Failed to fetch clerks:", error);
        setClerks([]);
        setNotification({ type: "error", message: "Failed to fetch clerks." });
      } finally {
        setLoading(false);
      }
    }
    fetchClerks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this clerk?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/clerks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setClerks(clerks.filter((clerk) => clerk._id !== id));
      setNotification({
        type: "success",
        message: "Clerk deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Error deleting clerk." });
    }
  };

  const openModalForEdit = (clerk) => {
    setEditingClerk(clerk);
    setFormData({
      email: clerk.email,
      mobileNumber: clerk.mobileNumber,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingClerk
        ? `${API_URL}/api/admin/clerks/${editingClerk._id}`
        : `${API_URL}/api/admin/clerks`;
      const method = editingClerk ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Request failed");
      }

      const updatedClerk = await res.json();
      if (editingClerk) {
        setClerks(
          clerks.map((c) => (c._id === updatedClerk._id ? updatedClerk : c))
        );
        setNotification({
          type: "success",
          message: "Clerk updated successfully!",
        });
      } else {
        setClerks([...clerks, updatedClerk]);
        setNotification({
          type: "success",
          message: "Clerk added successfully!",
        });
      }

      setFormData({ email: "", mobileNumber: "", password: "" });
      setEditingClerk(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading clerks...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-3 rounded ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Clerks</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <FiPlus /> Add Clerk
        </Button>
      </div>

      {clerks.length === 0 ? (
        <p className="text-gray-600">No clerks found.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clerks.map((clerk) => (
                <tr key={clerk._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{clerk.email}</td>
                  <td className="px-4 py-2">{clerk.mobileNumber}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => openModalForEdit(clerk)}
                    >
                      <FiEdit className="text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(clerk._id)}
                    >
                      <FiTrash2 className="text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg w-full animate-fade-in">
          <DialogHeader>
            <DialogTitle>
              {editingClerk ? "Edit Clerk" : "Add Clerk"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Mobile Number"
              required
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? "Saving..."
                  : editingClerk
                  ? "Update Clerk"
                  : "Add Clerk"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
