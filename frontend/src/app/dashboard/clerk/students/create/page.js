"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AddStudentPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
    age: "",
    fatherName: "",
    classId: "",
  });

  // Fetch classes on mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      toast.error("Failed to load classes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.name ||
      !student.email ||
      !student.mobileNumber ||
      !student.classId
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        toast.success("🎉 Student added successfully");
        setStudent({
          name: "",
          email: "",
          mobileNumber: "",
          location: "",
          age: "",
          fatherName: "",
          classId: "",
        });
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to add student");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            🧑‍🎓 Add New Student
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              placeholder="Full Name *"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
            <Input
              placeholder="Email *"
              type="email"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
            <Input
              placeholder="Mobile Number *"
              type="number"
              value={student.mobileNumber}
              onChange={(e) =>
                setStudent({ ...student, mobileNumber: e.target.value })
              }
            />
            <Input
              placeholder="Father’s Name"
              value={student.fatherName}
              onChange={(e) =>
                setStudent({ ...student, fatherName: e.target.value })
              }
            />
            <Input
              placeholder="Location"
              value={student.location}
              onChange={(e) =>
                setStudent({ ...student, location: e.target.value })
              }
            />
            <Input
              placeholder="Age"
              type="number"
              value={student.age}
              onChange={(e) => setStudent({ ...student, age: e.target.value })}
            />

            {/* Class Selector */}
            <div className="col-span-1 md:col-span-2">
              <Select
                value={student.classId}
                onValueChange={(val) =>
                  setStudent({ ...student, classId: val })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class *" />
                </SelectTrigger>
                <SelectContent>
                  {classes.length > 0 ? (
                    classes.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.courseName} — {cls.className} ({cls.year})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No classes found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Adding..." : "Add Student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
