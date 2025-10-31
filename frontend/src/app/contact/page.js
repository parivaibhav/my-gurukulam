"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { BsSend } from "react-icons/bs";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-red-50 pt-24 pb-20 px-6 sm:px-12">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            Contact Us
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you — whether you have a question, need
            support, or just want to say hello.
          </p>
        </section>

        {/* Contact Info Section */}
        <section className="max-w-6xl mx-auto mb-24 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <FiMapPin size={32} className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              Shastri Swami Shree Dharmajivandasji Institute of Information
              Technology
              <br /> Gurukul, Junagadh, Gujarat, India
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <FiMail size={32} className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">info@sssdiitgurukul.edu.in</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <FiPhone size={32} className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">+91 8799064890</p>
          </motion.div>
        </section>

        {/* Google Map */}
        <section className="max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden"
          >
            <iframe
              title="SSSDIIT Gurukul Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18218.186899713615!2d70.4368337442894!3d21.51432259787837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39580196e0464f39%3A0x884d1f8bdbff1e1b!2sShastri%20Swami%20Shree%20Dharmajivandasji%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1760252946512!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-center text-gray-800 mb-10"
          >
            Send Us a Message
          </motion.h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-transparent border-b-2 border-gray-300 focus:border-red-500 outline-none transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-transparent border-b-2 border-gray-300 focus:border-red-500 outline-none transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              className="col-span-1 sm:col-span-2 w-full min-h-40 p-4 bg-transparent border-b-2 border-gray-300 focus:border-red-500 outline-none transition"
            ></textarea>
            <div className="col-span-1 sm:col-span-2 text-center flex  align-middle justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-red-600 text-white px-6 sm:px-10 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Send Message <BsSend size={20} />
              </motion.button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
