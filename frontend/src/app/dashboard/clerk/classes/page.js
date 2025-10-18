"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ClerkClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    courseName: "",
    className: "",
    year: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch all classes
  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await fetch(`${API_URL}/api/clerk/classes`);
        if (!res.ok) throw new Error("Failed to fetch classes");
        const data = await res.json();
        setClasses(Array.isArray(data) ? data : data.classes || []);
      } catch (error) {
        console.error(error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);

  // Add or Update class
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const method = editingClass ? "PUT" : "POST";
    const url = editingClass
      ? `${API_URL}/api/clerk/classes/${editingClass._id}`
      : `${API_URL}/api/clerk/classes`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save class");

      const savedClass = await res.json();

      if (editingClass) {
        setClasses((prev) =>
          prev.map((cls) => (cls._id === savedClass._id ? savedClass : cls))
        );
      } else {
        setClasses([...classes, savedClass]);
      }

      setFormData({ courseName: "", className: "", year: "" });
      setEditingClass(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete class
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      const res = await fetch(`${API_URL}/api/clerk/classes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setClasses(classes.filter((cls) => cls._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete class.");
    }
  };

  // Open modal for editing
  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      courseName: cls.courseName,
      className: cls.className,
      year: cls.year,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Classes</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setEditingClass(null);
                setFormData({ courseName: "", className: "", year: "" });
              }}
            >
              <FiPlus /> Add Class
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingClass ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Course Name</Label>
                <Input
                  placeholder="e.g. Computer Science"
                  value={formData.courseName}
                  onChange={(e) =>
                    setFormData({ ...formData, courseName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Class Name</Label>
                <Input
                  placeholder="e.g. BCA"
                  value={formData.className}
                  onChange={(e) =>
                    setFormData({ ...formData, className: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  placeholder="e.g. 1st Year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  required
                />
              </div>

              <DialogFooter className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? editingClass
                      ? "Updating..."
                      : "Adding..."
                    : editingClass
                    ? "Update"
                    : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes Grid */}
      {loading ? (
        <p className="text-gray-600">Loading classes...</p>
      ) : classes.length === 0 ? (
        <p className="text-gray-600">No classes found.</p>
      ) : (
        <ScrollArea className="h-[65vh]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {classes.map((cls) => (
                <motion.div
                  key={cls._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {cls.className}
                    </h2>
                    <p className="text-gray-700">{cls.courseName}</p>
                    <p className="text-gray-600 text-sm">{cls.year}</p>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(cls)}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(cls._id)}
                      className="text-red-600 hover:bg-red-50"
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
