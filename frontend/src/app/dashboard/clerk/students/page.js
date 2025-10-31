"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";

export default function ManageStudents() {
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // 📌 Fetch all classes
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

  // 📌 Fetch students dynamically
  const fetchStudents = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`http://localhost:5000/api/students?${query}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  // 📌 Apply filters dynamically
  useEffect(() => {
    const selectedClassData = classes.find(
      (c) => c.className === selectedClass && c.courseName === selectedCourse
    );

    if (selectedCourse || selectedClass) {
      fetchStudents({
        classId: selectedClassData?._id,
        course: selectedCourse,
      });
    } else {
      fetchStudents();
    }
  }, [selectedCourse, selectedClass, classes]);

  // 📌 Extract unique filter lists
  const courses = [...new Set(classes.map((c) => c.courseName))];
  const classNames = [
    ...new Set(
      classes
        .filter((c) => !selectedCourse || c.courseName === selectedCourse)
        .map((c) => c.className)
    ),
  ];

  // 📌 Delete student
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/students/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete student");

        toast.success("Student deleted");
        fetchStudents({
          course: selectedCourse,
          className: selectedClass,
        });
      } catch {
        toast.error("Error deleting student");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🎓 Manage Students</h1>

      {/* --- Filters --- */}
      <Card className="shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Select Course */}
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

          {/* Select Class */}
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

          {/* Add Student Button */}
          <Button
            className="sm:ml-auto mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/dashboard/clerk/students/create")}
          >
            + Add Student
          </Button>
        </CardContent>
      </Card>

      {/* --- Student Table --- */}
      {students.length > 0 ? (
        <Card className="shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle>👨‍🎓 Students List</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left p-2">#</th>
                  <th className="text-left p-2">GR No</th>
                  <th className="text-left p-2">Roll No</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-left p-2">Class</th>
                  <th className="text-left p-2">Profile</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{s.grNumber}</td>
                    <td className="p-2">{s.rollNumber}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.course}</td>
                    <td className="p-2">{s.class}</td>
                    <td className="p-2">
                      {s.profileImage ? (
                        <img
                          src={`http://localhost:5000${s.profileImage}`}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="p-2 flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/dashboard/clerk/students/edit/${s._id}`)
                        }
                      >
                        <LiaEditSolid />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(s._id)}
                      >
                        <RiDeleteBin4Fill className="text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No students found for this selection.
        </div>
      )}
    </div>
  );
}
