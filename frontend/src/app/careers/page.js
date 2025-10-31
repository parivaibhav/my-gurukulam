"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const jobOpenings = [
  {
    id: 1,
    title: "Frontend Developer (React.js)",
    location: "Remote / India",
    type: "Full-time",
    description:
      "We are looking for a creative React developer who can build smooth, modern UIs with Next.js and Tailwind CSS.",
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    location: "Pune / Remote",
    type: "Full-time",
    description:
      "Looking for an experienced Node.js developer to build secure and scalable backend APIs with Express and MongoDB.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    description:
      "We need a passionate designer who can craft engaging user interfaces and collaborate effectively with developers.",
  },
];

export default function CareerPage() {
  const [openJob, setOpenJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    toast.loading("Submitting application...");
    setTimeout(() => {
      toast.success("Application submitted successfully!");
      setFormData({ name: "", email: "", resume: "", message: "" });
      setOpenJob(null);
    }, 1200);
  };

  return (
    <>
      <Header />
      <section className="min-h-screen  dark:from-gray-900 dark:to-gray-800 py-20 px-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-red-500 dark:text-blue-400 mb-4">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
            Be a part of a passionate team shaping the future of online
            education. Explore our current openings below.
          </p>
        </motion.div>

        {/* Job Cards */}
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobOpenings.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="border-blue-100 dark:border-gray-700 shadow-md hover:shadow-lg transition h-full flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600 dark:text-blue-400">
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <span className="font-medium">Location:</span>{" "}
                        {job.location}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <span className="font-medium">Type:</span> {job.type}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                        {job.description}
                      </p>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 mt-auto">
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => setOpenJob(job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Apply Dialog */}
        <AnimatePresence>
          {openJob && (
            <Dialog open={!!openJob} onOpenChange={() => setOpenJob(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-red-600 dark:text-blue-400">
                    Apply for {openJob.title}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label>Resume (Link)</Label>
                    <Input
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      placeholder="Paste your resume link (e.g. Google Drive)"
                    />
                  </div>
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us why you're a great fit!"
                      rows={3}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Submit Application
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
}
