"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { MdFileUpload, MdDelete, MdDownload } from "react-icons/md";
import api from "@/lib/api";

export default function ClerkCirculars() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 📌 Fetch circulars on mount
  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const res = await api.get("/circulars");
        setCirculars(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Unable to load circulars.");
      }
    };
    fetchCirculars();
  }, []);

  // 📤 Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required!");
    if (!file) return toast.error("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title.trim());
    formData.append("description", description.trim() || "No description");

    try {
      setLoading(true);
      const res = await api.post("/circulars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCirculars((prev) => [res.data.circular, ...prev]);
      toast.success("Circular uploaded successfully!");

      // ✅ Reset fields & close modal
      setTitle("");
      setDescription("");
      setFile(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this circular?"))
      return;

    try {
      await api.delete(`/circulars/${id}`);
      setCirculars((prev) => prev.filter((c) => c._id !== id));
      toast.success("Circular deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete circular.");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-10  dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto space-y-8"
      >
{/* 🔼 Header with Upload Button */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border border-gray-200 dark:border-neutral-800 py-6 sm:py-8 px-5 sm:px-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm">
  <div className="space-y-1">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text tracking-tight">
      Circulars Management
    </h2>
    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
      Upload, manage, and view all official circulars here.
    </p>
  </div>

  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white dark:from-gray-100 dark:to-gray-300 dark:text-black dark:hover:from-gray-200 dark:hover:to-gray-100 font-medium rounded-[10px] transition-all duration-200 shadow-sm hover:shadow-md">
        <MdFileUpload className="text-lg sm:text-xl" />
        <span className="hidden sm:inline">Upload Circular</span>
        <span className="sm:hidden">Upload</span>
      </Button>
    </DialogTrigger>

    <DialogContent className="max-w-md w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-lg">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 font-semibold">
          Upload New Circular
        </DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleUpload}
        className="space-y-4 mt-3"
        autoComplete="off"
      >
        <div className="space-y-1">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter circular title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Input
            id="description"
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="file" className="text-sm font-medium">
            Upload File
          </Label>
          <Input
            id="file"
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <DialogFooter className="flex justify-end space-x-3 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setFile(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</div>


        {/* 📚 Uploaded Circulars */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Recent Circulars
          </h3>

          <ScrollArea className="h-[65vh] p-2 sm:p-4 rounded-lg border border-gray-100 dark:border-neutral-800">
            {circulars.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-sm sm:text-base">
                No circulars uploaded yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {circulars.map((circular) => (
                  <motion.div
                    key={circular._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="group relative rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900  transition-all duration-300">
                      <CardContent className="p-4 sm:p-5 space-y-2">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-base truncate">
                          {circular.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {circular.description}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 text-sm"
                          >
                            <a
                              href={circular.fileUrl?.url}
                              download={circular.fileUrl?.filename}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MdDownload /> Download
                            </a>
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(circular._id)}
                            className="flex items-center gap-1 text-sm"
                          >
                            <MdDelete /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </motion.div>
    </div>
  );
}
