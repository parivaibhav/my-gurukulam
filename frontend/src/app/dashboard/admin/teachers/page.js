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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [editTeacher, setEditTeacher] = useState(null); // store teacher being edited
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
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_URL}/api/admin/teachers/${editTeacher._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editTeacher),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update teacher");
      }
      const updated = await res.json();
      setTeachers(teachers.map((t) => (t._id === updated._id ? updated : t)));
      setIsEditDialogOpen(false);
      setEditTeacher(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (teacher) => {
    setEditTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Teachers</h1>
          <p className="text-gray-500">Add, view, and remove teachers</p>
        </div>

        {/* Add Teacher Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <FiPlus className="text-lg" /> Add Teacher
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
              <DialogFooter className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
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

      {/* Teachers Table */}
      {loading ? (
        <p className="text-gray-600">Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <div className="text-gray-500 text-center py-12 border rounded-xl bg-gray-50">
          No teachers found.
        </div>
      ) : (
        <ScrollArea className="h-[65vh] border bg-white rounded-xl shadow-sm">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-left font-semibold text-gray-700 px-4 py-2">
                  #
                </TableHead>
                <TableHead className="text-left font-semibold text-gray-700 px-4 py-2">
                  Email
                </TableHead>
                <TableHead className="text-left font-semibold text-gray-700 px-4 py-2">
                  Mobile Number
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700 px-4 py-2">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {teachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b hover:bg-gray-50 transition-all ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2">{teacher.email}</TableCell>
                    <TableCell className="px-4 py-2">
                      {teacher.mobileNumber}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-blue-600"
                        onClick={() => openEditDialog(teacher)}
                      >
                        <FiEdit />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleDelete(teacher._id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </ScrollArea>
      )}

      {/* Edit Teacher Modal */}
      {editTeacher && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateTeacher} className="space-y-4 mt-2">
              <Input
                type="email"
                placeholder="Email"
                required
                value={editTeacher.email}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Mobile Number"
                required
                value={editTeacher.mobileNumber}
                onChange={(e) =>
                  setEditTeacher({
                    ...editTeacher,
                    mobileNumber: e.target.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Password (Leave blank to keep unchanged)"
                value={editTeacher.password || ""}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, password: e.target.value })
                }
              />
              <DialogFooter className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditTeacher(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
