"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ImagePlus, Tag as TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in the title and content.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to publish a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Read response once safely
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      if (!res.ok) throw new Error(data.message || "Failed to publish blog");

      toast.success("🎉 Blog published successfully!");
      router.push("/dashboard/admin/blogs");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error publishing blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">New Blog</h1>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish"}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4 md:px-0">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image */}
          <div>
            <Label className="mb-2">Cover Image</Label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <ImagePlus className="w-12 h-12 mb-2" />
                  <p>Click or drag to upload cover image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label className="mb-2">Blog Title</Label>
            <Input
              placeholder="Title of your blog..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category + Tags */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Label className="mb-2">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Campus Life">Campus Life</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="mb-2 flex items-center gap-2">
                <TagIcon className="w-4 h-4 text-gray-500" /> Tags
              </Label>
              <Input
                placeholder="e.g. college, notice, event"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label className="mb-2">Write your story</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your story..."
              className="min-h-[300px]"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
