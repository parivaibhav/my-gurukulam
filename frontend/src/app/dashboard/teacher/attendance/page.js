"use client";

import { useState, useEffect } from "react";

export default function TeacherAttendance() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses for this teacher
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/teacher/courses"); // API route
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }
    fetchCourses();
  }, []);

  // Fetch classes for selected course
  useEffect(() => {
    if (!selectedCourse) return;
    async function fetchClasses() {
      try {
        const res = await fetch(
          `/api/teacher/classes?course=${selectedCourse}`
        );
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    }
    fetchClasses();
  }, [selectedCourse]);

  // Fetch students for selected class
  useEffect(() => {
    if (!selectedClass) return;
    setLoading(true);
    async function fetchStudents() {
      try {
        const res = await fetch(`/api/teacher/students?class=${selectedClass}`);
        const data = await res.json();
        // Initialize attendance status for each student
        setStudents(data.map((student) => ({ ...student, present: false })));
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [selectedClass]);

  // Handle attendance toggle
  const toggleAttendance = (id) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  // Submit attendance
  const handleSubmit = async () => {
    if (!selectedClass || !selectedCourse)
      return alert("Select course and class first.");
    try {
      const res = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: selectedCourse,
          class: selectedClass,
          attendance: students.map((s) => ({
            studentId: s.id,
            present: s.present,
          })),
        }),
      });
      if (res.ok) alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Failed to submit attendance:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Mark Attendance</h1>

      {/* Select Course & Class */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedClass("");
            setStudents([]);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-3 py-2 rounded"
          disabled={!selectedCourse}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      {students.length === 0 ? (
        <p className="text-gray-600">No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.rollNo}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => toggleAttendance(student.id)}
                      className="w-5 h-5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Button */}
      {students.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Attendance
        </button>
      )}
    </div>
  );
}
