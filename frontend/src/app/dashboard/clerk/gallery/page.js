"use client";

import { useState, useEffect, useRef } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ClerkGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fileInputRef = useRef(null);

  // ✅ Fetch gallery photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get("/gallery");
        setPhotos(res.data);
      } catch (error) {
        toast.error("Failed to fetch gallery");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // ✅ Upload photo
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file.");
    if (!title.trim()) return toast.error("Please enter a title.");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      const res = await api.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPhotos([res.data, ...photos]);
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete photo
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this photo?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/gallery/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
      toast.success("Photo deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete photo.");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading gallery...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-6 flex flex-col sm:flex-row gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Enter photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto flex-1"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={uploading}
        >
          <FiPlus /> {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery */}
      {photos.length === 0 ? (
        <p className="text-gray-600">No photos in the gallery yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group border rounded overflow-hidden"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 bg-black/60 text-white text-sm w-full text-center py-1">
                {photo.title}
              </div>
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
