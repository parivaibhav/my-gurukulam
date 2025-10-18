"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const images = [
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.48-PM.jpeg",
      alt: "Campus View",
    },
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.49-PM-2.jpeg",
      alt: "Students in Class",
    },
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.49-PM.jpeg",
      alt: "Tech Lab",
    },
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.48-PM.jpeg",
      alt: "Library",
    },
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.48-PM.jpeg",
      alt: "Sports Activity",
    },
    {
      src: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.48-PM.jpeg",
      alt: "Event Celebration",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 text-center mt-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
          Photo Gallery
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl drop-shadow-sm">
          Explore moments from campus life, events, and activities at SSSDIIT
          Gurukul.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={400}
                className="w-full h-60 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
