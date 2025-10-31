"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaLightbulb,
  FaGraduationCap,
  FaHandshake,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AnimatedCounter from "../../components/AnimatedCounter";

export default function Home() {
  const heroBg =
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/DSC_0026-scaled-1.jpg";
  const departments = ["BCA", "BSC.IT"];

  const whyUsCards = [
    {
      title: "Innovative Learning",
      desc: "We emphasize creativity and innovation through hands-on experience and modern teaching methods.",
      icon: <FaLightbulb className="text-4xl text-yellow-500" />,
    },
    {
      title: "Experienced Faculty",
      desc: "Our faculty members bring both academic excellence and industry expertise to every classroom.",
      icon: <FaChalkboardTeacher className="text-4xl text-blue-500" />,
    },
    {
      title: "Industry Collaboration",
      desc: "We partner with industries to ensure students gain practical exposure and internship opportunities.",
      icon: <FaHandshake className="text-4xl text-green-500" />,
    },
    {
      title: "Holistic Development",
      desc: "Beyond academics, we focus on leadership, ethics, and personal growth of our students.",
      icon: <FaGraduationCap className="text-4xl text-purple-500" />,
    },
  ];

  const campusImages = [
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/7-1-768x576-1.jpeg",
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/6-2-768x512-1.jpeg",
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/6.jpeg",
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/4-1-1.jpeg",
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/1T3A6122-768x512-1.jpg",
    "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/8.jpeg",
  ];

  const placements = [
    {
      name: "Rohan Mehta",
      role: "Software Engineer",
      company: "Google",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Anjali Sharma",
      role: "Data Analyst",
      company: "Amazon",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Vikram Singh",
      role: "UI/UX Designer",
      company: "Microsoft",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Priya Patel",
      role: "Backend Developer",
      company: "Facebook",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Arjun Rao",
      role: "Frontend Developer",
      company: "Apple",
      img: "https://randomuser.me/api/portraits/men/78.jpg",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col w-full bg-gray-50 text-gray-900 mt-4">
        {/* HERO SECTION */}
        <section
          className="relative w-full h-[100vh] bg-cover bg-center flex items-end justify-start"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          {/* Content */}
          <motion.div
            className="relative z-10 text-left px-6 sm:px-12 pb-16 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-orange-600 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              Shree Swaminarayan Gurukul - Junagadh
            </motion.h1>

            <motion.p
              className="text-gray-200 text-lg sm:text-xl leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Where tradition meets technology — nurturing brilliance,
              innovation, and values for a brighter tomorrow.
            </motion.p>
          </motion.div>
        </section>
        {/* WHY US */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {whyUsCards.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6  hover:-translate-y-2 transition-all text-center border"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        {/* DEPARTMENTS */}
        <section className="max-w-7xl mx-auto px-6 py-24 ">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Departments
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {departments.map((dept) => (
              <motion.div
                key={dept}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/70  border border-gray-100 rounded-2xl p-6 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-red-400">
                      {dept}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      The {dept} department focuses on both academic and
                      practical excellence, empowering students for a bright
                      future.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        {/* CAMPUS LIFE */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Campus Life
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {campusImages.map((src, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl shadow-lg group"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="w-full h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-lg mt-10 max-w-3xl mx-auto">
            Our lush green campus offers a perfect blend of learning and
            spirituality. Students experience a vibrant mix of academics,
            sports, culture, and discipline that shape their overall
            personality.
          </p>
        </section>
        {/* WEBSITE VISITOR COUNT */}
        {/* STATS SECTION: Visitors, Placed Students, Alumni */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-500 text-white text-center">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Website Visitors */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-6xl font-extrabold mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
              >
                <AnimatedCounter count={1534} />
              </motion.div>
              <p className="text-lg opacity-80">Website Visitors</p>
            </motion.div>

            {/* Placed Students */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="text-6xl font-extrabold mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
              >
                <AnimatedCounter count={256} />
              </motion.div>
              <p className="text-lg opacity-80">Placed Students</p>
            </motion.div>

            {/* Alumni */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="text-6xl font-extrabold mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
              >
                <AnimatedCounter count={1200} />
              </motion.div>
              <p className="text-lg opacity-80">Proud Alumni</p>
            </motion.div>
          </div>
        </section>

        {/* MODERN PLACEMENTS CAROUSEL */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden relative">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Placements
          </h2>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 w-max"
              initial={{ x: 0 }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              {[...placements, ...placements].map((p, i) => (
                <motion.div
                  key={i}
                  className="flex-none w-64 bg-white/70 backdrop-blur-md rounded-3xl p-6 text-center cursor-pointer hover:scale-105 transform transition-all"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-red-400">
                    {p.name}
                  </h3>
                  <p className="text-gray-600">{p.role}</p>
                  <p className="text-gray-500 font-medium mt-1">{p.company}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/placements">
              <Button className="bg-gradient-to-r from-orange-600 to-red-400 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all">
                View All Placements
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-24 bg-gradient-to-r from-orange-600 to-red-500 text-white">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Ready to Explore More About Us?
          </motion.h2>
          <p className="text-lg mb-8">
            Join our journey of innovation, discipline, and excellence in
            education.
          </p>
          <div className="flex justify-center">
            <Link href="/about">
              <Button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 20s linear infinite;
        }
      `}</style>
    </>
  );
}
