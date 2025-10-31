"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddPlacementModal from "@/components/AddPlacementModal";
import PlacementCard from "@/components/PlacementCard";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function PlacementManager() {
  const [open, setOpen] = useState(false);
  const [placements, setPlacements] = useState([]); // ✅ Always an array
  const [loading, setLoading] = useState(true);

  const fetchPlacements = async () => {
    try {
      const res = await api.get("/placements");
      // ✅ Safe access in case API response changes
      const data = res?.data?.placements || [];
      setPlacements(data);
    } catch (err) {
      console.error("Fetch placements error:", err);
      toast.error("Failed to load placements");
      setPlacements([]); // ✅ Prevent undefined state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const handleSave = (newPlacement) => {
    setPlacements((prev) => [newPlacement, ...prev]);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading placements...</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">📋 Placement Drives</h1>
        <Button onClick={() => setOpen(true)}>+ Add Placement</Button>
      </div>

      <AddPlacementModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />

      {placements.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">No placements yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {placements.map((p) => (
            <PlacementCard key={p._id} placement={p} />
          ))}
        </div>
      )}
    </div>
  );
}
