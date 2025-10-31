"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function UpdatePasswordModal({ open, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);

  // Password strength detection
  useEffect(() => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[@$!%*?&]/.test(newPassword)) score++;
    setStrength(score);
  }, [newPassword]);

  const validate = () => {
    const newErrors = {};

    if (!oldPassword.trim())
      newErrors.oldPassword = "Current password required";

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password required";
    } else {
      const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongRegex.test(newPassword)) {
        newErrors.newPassword =
          "Must include uppercase, lowercase, number, and special character";
      }
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before continuing");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/update-password`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-lg">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Update Password
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Keep your account secure by changing your password.
          </p>
        </DialogHeader>

        <motion.form
          onSubmit={handleUpdate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 mt-4"
          noValidate
        >
          {/* Current Password */}
          <div className="space-y-2 relative">
            <Label className="text-sm font-medium">Current Password</Label>
            <div className="relative">
              <Input
                type={showOld ? "text" : "password"}
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`h-11 pr-10 rounded-xl border ${
                  errors.oldPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:ring-blue-500"
                } focus:ring-2 transition`}
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">New Password</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`h-11 pr-10 rounded-xl border ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:ring-blue-500"
                } focus:ring-2 transition`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPassword && (
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`h-1 w-full rounded-full transition-all ${
                    strength <= 2
                      ? "bg-red-500"
                      : strength === 3
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
                <span className="text-xs text-gray-500">
                  {strength <= 2
                    ? "Weak"
                    : strength === 3
                    ? "Medium"
                    : "Strong"}
                </span>
              </div>
            )}
            {errors.newPassword && (
              <p className="text-red-500 text-xs">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <Label className="text-sm font-medium">Confirm New Password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-11 pr-10 rounded-xl border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:ring-blue-500"
                } focus:ring-2 transition`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
