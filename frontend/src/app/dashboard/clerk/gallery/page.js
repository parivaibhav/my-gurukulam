"use client";

import { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";

export default function ClerkGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  // Fetch gallery photos
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("http://localhost:5000/api/clerk/gallery"); // your API route
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  // Upload photo
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/clerk/gallery", {
        method: "POST",
        body: formData,
      });
      const newPhoto = await res.json();
      setPhotos([newPhoto, ...photos]);
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  // Delete photo
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      await fetch(`http://localhost:5000/api/clerk/gallery/${id}`, { method: "DELETE" });
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading gallery...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-6 flex gap-2 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className="border px-3 py-2 rounded"
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
                alt="Gallery"
                className="w-full h-48 object-cover"
              />
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
