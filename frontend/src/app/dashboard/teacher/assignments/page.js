"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    classId: "",
    dueDate: null,
  });

  // Fetch assignments and classes
  useEffect(() => {
    async function fetchData() {
      try {
        const [assignRes, classRes] = await Promise.all([
          fetch("/api/teacher/assignments"),
          fetch("/api/classes"),
        ]);

        const [assignData, classData] = await Promise.all([
          assignRes.json(),
          classRes.json(),
        ]);

        setAssignments(assignData);
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add new assignment
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });

      const saved = await res.json();
      setAssignments([saved, ...assignments]);

      setNewAssignment({
        title: "",
        description: "",
        classId: "",
        dueDate: null,
      });
    } catch (error) {
      console.error("Failed to add assignment:", error);
    }
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await fetch(`/api/teacher/assignments/${id}`, { method: "DELETE" });
      setAssignments(assignments.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-muted-foreground">Loading...</div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Add Assignment Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            Add Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAdd}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Title */}
            <Input
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
              required
            />

            {/* Class Dropdown */}
            <Select
              value={newAssignment.classId}
              onValueChange={(val) =>
                setNewAssignment({ ...newAssignment, classId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.length === 0 ? (
                  <SelectItem disabled value="none">
                    No classes found
                  </SelectItem>
                ) : (
                  classes.map((cls, index) => (
                    <SelectItem
                      key={cls._id || cls.id || index}
                      value={cls._id || cls.id || `class-${index}`}
                    >
                      {cls.className} ({cls.courseName} - {cls.year})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newAssignment.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newAssignment.dueDate ? (
                    format(newAssignment.dueDate, "PPP")
                  ) : (
                    <span>Pick Due Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newAssignment.dueDate}
                  onSelect={(date) =>
                    setNewAssignment({ ...newAssignment, dueDate: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Description */}
            <Textarea
              placeholder="Assignment Description"
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  description: e.target.value,
                })
              }
              className="sm:col-span-2 lg:col-span-3"
              required
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full sm:col-span-2 lg:col-span-3 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Assignment
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* All Assignments Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            All Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <p className="text-muted-foreground">No assignments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((a) => (
                    <TableRow key={a._id}>
                      <TableCell>{a.title}</TableCell>
                      <TableCell>
                        {classes.find((c) => c._id === a.classId)
                          ? `${
                              classes.find((c) => c._id === a.classId).className
                            } (${
                              classes.find((c) => c._id === a.classId)
                                .courseName
                            } - ${
                              classes.find((c) => c._id === a.classId).year
                            })`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {a.dueDate ? format(new Date(a.dueDate), "PPP") : "—"}
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate">
                        {a.description}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(a._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
