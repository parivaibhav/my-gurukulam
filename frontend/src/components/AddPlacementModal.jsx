"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function AddPlacementModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    package: "",
    location: "",
    driveDate: null,
    description: "",
    selectedStudents: [{ name: "", profileImage: "", profileImageFile: null }],
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  // 🧩 Generic field handler
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🧩 Handle student field changes
  const handleStudentChange = (index, field, value) => {
    const updated = [...form.selectedStudents];
    updated[index][field] = value;
    setForm({ ...form, selectedStudents: updated });
  };

  // 🧩 Handle image file + preview
  const handleFileChange = (index, file) => {
    if (!file) return;
    handleStudentChange(index, "profileImageFile", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      handleStudentChange(index, "profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ➕ Add/remove student row
  const addStudentRow = () => {
    setForm({
      ...form,
      selectedStudents: [
        ...form.selectedStudents,
        { name: "", profileImage: "", profileImageFile: null },
      ],
    });
  };

  const removeStudentRow = (index) => {
    const updated = form.selectedStudents.filter((_, i) => i !== index);
    setForm({ ...form, selectedStudents: updated });
  };

  // 💾 Save placement
  const handleSave = async () => {
    try {
      const cleanStudents = form.selectedStudents.filter(
        (s) => s.name.trim() !== ""
      );

      const formData = new FormData();
      formData.append("companyName", form.companyName);
      formData.append("jobRole", form.jobRole);
      formData.append("package", form.package);
      formData.append("location", form.location);
      if (form.driveDate)
        formData.append("driveDate", form.driveDate.toISOString());
      formData.append("description", form.description);

      // ✅ Send student list as JSON
      formData.append("selectedStudents", JSON.stringify(cleanStudents));

      // ✅ Append image files
      cleanStudents.forEach((s) => {
        if (s.profileImageFile) {
          formData.append("profileImages", s.profileImageFile);
        }
      });

      // ✅ API request (backend expects /placements)
      const res = await api.post("/placements", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Placement added successfully!");
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error("❌ Add Placement Error:", err);
      toast.error(err.response?.data?.message || "Error adding placement");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border border-border/40 shadow-2xl rounded-2xl bg-white dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            🎓 Add Placement Drive
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-6 py-2">
            {/* 🏢 Company Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  placeholder="e.g. Infosys"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
              </div>
              <div>
                <Label>Job Role</Label>
                <Input
                  placeholder="e.g. Software Engineer"
                  value={form.jobRole}
                  onChange={(e) => handleChange("jobRole", e.target.value)}
                />
              </div>
            </div>

            {/* 💰 Package + 📍 Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Package</Label>
                <Input
                  placeholder="e.g. 6 LPA"
                  value={form.package}
                  onChange={(e) => handleChange("package", e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  placeholder="e.g. Bangalore"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>

            {/* 📅 Drive Date */}
            <div>
              <Label>Drive Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {form.driveDate ? (
                      format(form.driveDate, "dd MMM yyyy")
                    ) : (
                      <span>Select date</span>
                    )}
                    <Calendar className="h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                  <CalendarComponent
                    mode="single"
                    selected={form.driveDate}
                    onSelect={(date) => {
                      setCalendarOpen(false);
                      handleChange("driveDate", date);
                    }}
                    fromYear={2023}
                    toYear={2026}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 📝 Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                rows="3"
                placeholder="Brief about the drive..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* 👩‍🎓 Selected Students */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <Label className="font-semibold text-base">
                  Selected Students
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStudentRow}
                >
                  <PlusCircle size={16} /> Add Student
                </Button>
              </div>

              {form.selectedStudents.map((s, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-border/30 rounded-xl p-3 shadow-sm mb-3">
                    <CardContent className="grid md:grid-cols-2 gap-3 p-0">
                      <div>
                        <Label>Student Name</Label>
                        <Input
                          placeholder="e.g. Rahul Sharma"
                          value={s.name}
                          onChange={(e) =>
                            handleStudentChange(index, "name", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Profile Image</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(index, e.target.files[0])
                            }
                          />
                          {s.profileImage && (
                            <img
                              src={s.profileImage}
                              alt="Preview"
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                          )}
                          {form.selectedStudents.length > 1 && (
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeStudentRow(index)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Placement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
