"use client";

import { useState } from "react";
import { FaDownload, FaBook } from "react-icons/fa";
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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-16 pt-30">
        <section className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaBook className="text-indigo-600" />
            Course Syllabus
          </h1>
          <p className="text-gray-600 mb-10">
            Download syllabus PDFs for BCA and BSc.IT students — Semester 1 to
            6.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="BCA">BCA</option>
              <option value="BSc.IT">BSc.IT</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  Semester {num}
                </option>
              ))}
            </select>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.sem}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {course} - Semester {item.sem}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Download the syllabus for {course} semester {item.sem}.
                  </p>
                </div>

                <a
                  href={item.file}
                  download
                  className="mt-4 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  <FaDownload /> Download
                </a>
              </div>
            ))}
          </div>

          {/* If no syllabus found */}
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
