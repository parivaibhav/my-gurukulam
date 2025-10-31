"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, Mail, Phone, Home, User } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Submitting your form...");
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("🎉 Admission form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          address: "",
        });
      } else {
        toast.error("⚠️ Something went wrong!");
      }
    } catch (error) {
      toast.error("❌ Network error!");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen  dark:from-gray-900 dark:to-black flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          <Card className="relative overflow-hidden border-none  bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl mt-10">
            {/* Gradient Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />

            <CardHeader className="text-center space-y-2 mt-4">
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-yellow-400 flex justify-center items-center gap-2">
                <GraduationCap className="w-8 h-8" />
                Admission Form
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fill in your details to apply for admission.
              </p>
            </CardHeader>

            <CardContent className="px-6 py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* --- GRID SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="group">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <User className="w-4 h-4 text-orange-500" /> Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-1 transition-all focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Mail className="w-4 h-4 text-orange-500" /> Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="mt-1 transition-all focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4 text-orange-500" /> Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="mt-1 transition-all focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </div>

                  {/* Course */}
                  <div>
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <GraduationCap className="w-4 h-4 text-orange-500" />{" "}
                      Course
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, course: value })
                      }
                    >
                      <SelectTrigger className="mt-1 transition-all focus:ring-2 focus:ring-orange-400">
                        <SelectValue placeholder="Select your course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="bsc">B.Sc IT</SelectItem>
                        <SelectItem value="mca">MCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address (Full Width) */}
                <div>
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Home className="w-4 h-4 text-orange-500" /> Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="mt-1 transition-all focus:ring-2 focus:ring-orange-400"
                    rows={3}
                  />
                </div>

                <CardFooter className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Submit Admission Form
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
