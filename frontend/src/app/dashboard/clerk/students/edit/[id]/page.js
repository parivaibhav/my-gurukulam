"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditStudent() {
  const router = useRouter();
  const { id } = useParams();

  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
    age: "",
    fatherName: "",
    classId: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all classes for dropdown
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

  // ✅ Fetch single student
  useEffect(() => {
    if (!id) return;
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`);
        const data = await res.json();
        setStudent({
          name: data.name || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          location: data.location || "",
          age: data.age || "",
          fatherName: data.fatherName || "",
          classId: data.classId?._id || "",
        });
      } catch (err) {
        toast.error("Failed to load student data");
      }
    };
    fetchStudent();
  }, [id]);

  // ✅ Update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        toast.success("Student updated successfully");
        router.push("/dashboard/clerk/students");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to update student");
      }
    } catch {
      toast.error("Error updating student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="shadow-lg border border-gray-200 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>✏️ Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Mobile Number</Label>
                <Input
                  type="tel"
                  value={student.mobileNumber}
                  onChange={(e) =>
                    setStudent({ ...student, mobileNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Father’s Name</Label>
                <Input
                  value={student.fatherName}
                  onChange={(e) =>
                    setStudent({ ...student, fatherName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  value={student.age}
                  onChange={(e) =>
                    setStudent({ ...student, age: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={student.location}
                  onChange={(e) =>
                    setStudent({ ...student, location: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Class</Label>
                <select
                  value={student.classId}
                  onChange={(e) =>
                    setStudent({ ...student, classId: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.courseName} - {cls.className} ({cls.year})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Updating..." : "Update Student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
