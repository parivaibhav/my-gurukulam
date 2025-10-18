"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch(`${API_URL}/api/admin/teachers`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTeachers(Array.isArray(data) ? data : data.teachers || []);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/teachers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/teachers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add teacher");
      }
      const addedTeacher = await res.json();
      setTeachers([...teachers, addedTeacher]);
      setNewTeacher({ email: "", mobileNumber: "", password: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Teachers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <FiPlus /> Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTeacher} className="space-y-4 mt-2">
              <Input
                type="email"
                placeholder="Email"
                required
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Mobile Number"
                required
                value={newTeacher.mobileNumber}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, mobileNumber: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                required
                value={newTeacher.password}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, password: e.target.value })
                }
              />
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Adding..." : "Add Teacher"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p className="text-gray-600">No teachers found.</p>
      ) : (
        <ScrollArea className="h-[60vh]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {teachers.map((teacher) => (
                <motion.div
                  key={teacher._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">
                      {teacher.email}
                    </p>
                    <p className="text-gray-600">
                      Mobile: {teacher.mobileNumber}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="icon"
                      variant="outline"
                      asChild
                      className="text-blue-600"
                    >
                      <a href={`/dashboard/admin/teachers/edit/${teacher._id}`}>
                        <FiEdit />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleDelete(teacher._id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
