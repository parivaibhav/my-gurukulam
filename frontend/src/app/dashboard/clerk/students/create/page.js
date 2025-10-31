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
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // ✅ Field-level errors

  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
    age: "",
    fatherName: "",
    classId: "",
    profileImage: null,
  });

  useEffect(() => {
    setMounted(true);
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clerk/classes");
      if (!res.ok) throw new Error("Failed to fetch classes");
      const data = await res.json();
      setClasses(data);
      setFilteredClasses(data);
    } catch {
      toast.error("Failed to load classes");
    }
  };

  useEffect(() => {
    if (search === "") setFilteredClasses(classes);
    else {
      setFilteredClasses(
        classes.filter((cls) =>
          `${cls.courseName} ${cls.className} ${cls.year}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [search, classes]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudent({ ...student, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;

    if (!student.name.trim()) newErrors.name = "Full name is required";
    if (!student.email.trim()) newErrors.email = "Email is required";

    if (!student.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!mobileRegex.test(student.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";

    const ageNum = Number(student.age);
    if (!student.age.trim()) newErrors.age = "Age is required";
    else if (isNaN(ageNum) || ageNum < 16 || ageNum > 21)
      newErrors.age = "Age must be between 16 and 21 years";

    if (!student.classId) newErrors.classId = "Class selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop if errors exist

    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in student) formData.append(key, student[key]);

      const res = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        body: formData,
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
          profileImage: null,
        });
        setPreview(null);
        setErrors({});
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to add student");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <Card className="max-w-3xl mx-auto shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            🧑‍🎓 Add New Student
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            encType="multipart/form-data"
          >
            {/* Name */}
            <div>
              <Input
                placeholder="Full Name *"
                value={student.name}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                placeholder="Email *"
                type="email"
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <Input
                placeholder="Mobile Number *"
                type="text"
                value={student.mobileNumber}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[0-9]*$/.test(val) && val.length <= 10)
                    setStudent({ ...student, mobileNumber: val });
                }}
                maxLength={10}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Father’s Name */}
            <div>
              <Input
                placeholder="Father’s Name"
                value={student.fatherName}
                onChange={(e) =>
                  setStudent({ ...student, fatherName: e.target.value })
                }
              />
            </div>

            {/* Location */}
            <div>
              <Input
                placeholder="Location"
                value={student.location}
                onChange={(e) =>
                  setStudent({ ...student, location: e.target.value })
                }
              />
            </div>

            {/* Age */}
            <div>
              <Input
                placeholder="Age (16–21)"
                type="number"
                min={16}
                max={21}
                value={student.age}
                onChange={(e) =>
                  setStudent({ ...student, age: e.target.value })
                }
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            {/* Profile Image */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium">Profile Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mt-2 border"
                />
              )}
            </div>

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
                <SelectContent className="max-h-60 overflow-auto">
                  <div className="p-2 sticky top-0 bg-white z-10">
                    <Input
                      placeholder="Search classes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.courseName} — {cls.className} ({cls.year})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-class" disabled>
                      No classes found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.classId && (
                <p className="text-red-500 text-xs mt-1">{errors.classId}</p>
              )}
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
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
