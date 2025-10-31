"use client";

import { useState } from "react";
import { FaDownload, FaBook } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

const syllabusData = {
  BCA: [
    { sem: 1, file: "/syllabus/bca-sem1.pdf" },
    { sem: 2, file: "/syllabus/bca-sem2.pdf" },
    { sem: 3, file: "/syllabus/bca-sem3.pdf" },
    { sem: 4, file: "/syllabus/bca-sem4.pdf" },
    { sem: 5, file: "/syllabus/bca-sem5.pdf" },
    { sem: 6, file: "/syllabus/bca-sem6.pdf" },
  ],
  "BSc.IT": [
    { sem: 1, file: "/syllabus/bscit-sem1.pdf" },
    { sem: 2, file: "/syllabus/bscit-sem2.pdf" },
    { sem: 3, file: "/syllabus/bscit-sem3.pdf" },
    { sem: 4, file: "/syllabus/bscit-sem4.pdf" },
    { sem: 5, file: "/syllabus/bscit-sem5.pdf" },
    { sem: 6, file: "/syllabus/bscit-sem6.pdf" },
  ],
};

export default function SyllabusPage() {
  const [course, setCourse] = useState("BCA");
  const [semester, setSemester] = useState("All");

  const filtered = syllabusData[course].filter(
    (item) => semester === "All" || item.sem === Number(semester)
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 px-6 py-20">
        <section className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3 flex items-center justify-center gap-3">
              <FaBook className="text-orange-600" />
              Course Syllabus
            </h1>
            <p className="text-gray-600">
              Browse and download syllabus PDFs for BCA & BSc.IT — Semesters 1
              to 6.
            </p>
          </div>

          <Separator className="max-w-xl mx-auto mb-10 bg-orange-200" />

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            {/* Course Selector */}
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-52 bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-400">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BSc.IT">BSc.IT</SelectItem>
              </SelectContent>
            </Select>

            {/* Semester Selector */}
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-52 bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-400">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Semesters</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    Semester {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <Card
                key={item.sem}
                className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {course} — Semester {item.sem}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between items-center gap-3">
                  <p className="text-gray-500 text-sm">
                    Download the syllabus for {course} semester {item.sem}.
                  </p>
                  <Button
                    asChild
                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg mt-3 w-full"
                  >
                    <a href={item.file} download>
                      <FaDownload className="mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Data */}
          {filtered.length === 0 && (
            <p className="text-gray-500 mt-10">
              No syllabus available for this selection.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
