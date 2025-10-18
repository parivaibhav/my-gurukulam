"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiEdit, FiTrash2, FiPlus, FiFilter } from "react-icons/fi";
import { toast } from "sonner";

export default function ManageStudents() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", rollNo: "" });
  const [editStudent, setEditStudent] = useState(null);

  // Fetch all classes from backend
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clerk/classes");
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      toast.error("Failed to load classes");
    }
  };

  // Fetch students dynamically
  const fetchStudents = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`/api/clerk/students?${query}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  // Handle Filter Changes
  useEffect(() => {
    if (selectedCourse || selectedClass || selectedYear) {
      fetchStudents({
        courseName: selectedCourse,
        className: selectedClass,
        year: selectedYear,
      });
    }
  }, [selectedCourse, selectedClass, selectedYear]);

  // Add new student
  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.rollNo || !selectedClass)
      return toast.error("Please fill all fields");

    const res = await fetch("/api/clerk/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newStudent,
        classId: selectedClass,
      }),
    });

    if (res.ok) {
      toast.success("Student added successfully");
      setNewStudent({ name: "", rollNo: "" });
      fetchStudents({
        courseName: selectedCourse,
        className: selectedClass,
        year: selectedYear,
      });
    } else toast.error("Failed to add student");
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    await fetch(`/api/clerk/students/${id}`, { method: "DELETE" });
    toast.success("Student deleted");
    fetchStudents({
      courseName: selectedCourse,
      className: selectedClass,
      year: selectedYear,
    });
  };

  // Update student
  const handleUpdateStudent = async () => {
    const res = await fetch(`/api/clerk/students/${editStudent._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editStudent),
    });

    if (res.ok) {
      toast.success("Student updated");
      setEditStudent(null);
      fetchStudents({
        courseName: selectedCourse,
        className: selectedClass,
        year: selectedYear,
      });
    } else toast.error("Failed to update student");
  };

  // Extract unique filters
  const courses = [...new Set(classes.map((c) => c.courseName))];
  const classNames = [
    ...new Set(
      classes
        .filter((c) => !selectedCourse || c.courseName === selectedCourse)
        .map((c) => c.className)
    ),
  ];
  const years = [
    ...new Set(
      classes
        .filter(
          (c) =>
            (!selectedCourse || c.courseName === selectedCourse) &&
            (!selectedClass || c.className === selectedClass)
        )
        .map((c) => c.year)
    ),
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🎓 Manage Students</h1>

      {/* --- Filter Section --- */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Select
            onValueChange={setSelectedCourse}
            value={selectedCourse || ""}
          >
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedClass} value={selectedClass || ""}>
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classNames.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedYear} value={selectedYear || ""}>
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr} value={yr}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* --- Student Management --- */}
      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>👨‍🎓 Students List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Student Form */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="Roll No."
                value={newStudent.rollNo}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, rollNo: e.target.value })
                }
              />
              <Button onClick={handleAddStudent}>
                <FiPlus className="mr-2" /> Add
              </Button>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Roll No</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-right p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((s, i) => (
                      <tr
                        key={s._id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{s.rollNo}</td>
                        <td className="p-2">{s.name}</td>
                        <td className="p-2 flex justify-end gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditStudent(s)}
                          >
                            <FiEdit className="text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteStudent(s._id)}
                          >
                            <FiTrash2 className="text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-3 text-gray-500">
                        No students found for this selection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* --- Edit Modal --- */}
      {editStudent && (
        <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
              <Input
                value={editStudent.rollNo}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, rollNo: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditStudent(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStudent}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
