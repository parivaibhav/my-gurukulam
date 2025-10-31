"use client";

import { motion } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      title: "Holistic Education",
      description:
        "We nurture intellectual, cultural, and moral development, balancing technology with traditional values.",
    },
    {
      title: "Innovation & Leadership",
      description:
        "Our programs encourage creativity, problem-solving, and leadership in real-world scenarios.",
    },
    {
      title: "Community & Culture",
      description:
        "We promote social responsibility, teamwork, and a thriving cultural environment for all students.",
    },
  ];

  const faculty = [
    {
      name: "Mr. Ripal Pandya",
      subject: "ASP.NET",
      experience: "10 years",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Mr. Milind Anandpara",
      subject: "J2EE",
      experience: "8 years",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Mr. Rajdeep Joshi",
      subject: "Python",
      experience: "7 years",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Mr. Nimiesh Ranpariya",
      subject: "PHP",
      experience: "12 years",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Mr. Pradip Rudkhiya",
      subject: "DBMS, PHP",
      experience: "9 years",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Mr. Chitan Kakkad",
      subject: "SAD",
      experience: "11 years",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      name: "Mr. Bittu Khoda",
      subject: "C++, JAVA, Data Sturucture ",
      experience: "11 years",
      avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-28 mt-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
        >
          About SSSDIIT Gurukul
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-sm"
        >
          Dedicated to providing a holistic education, SSSDIIT Gurukul fosters
          innovation, leadership, and cultural values, empowering students to
          excel in academics and life.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-red-700 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To foster a learning environment that integrates modern technology
            with traditional values, cultivating innovation, leadership, and
            ethical responsibility in our students.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.48-PM.jpeg"
            alt="Campus"
            width={600}
            height={400}
            className="rounded-3xl w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-red-700 mb-12"
        >
          Our Core Values
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-br from-red-50 to-red-100 hover:scale-105 cursor-pointer transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-red-500 mb-2">
                {val.title}
              </h3>
              <p className="text-gray-600">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Faculty Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-red-700 mb-12"
        >
          Meet Our Faculty
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center ">
          {faculty.map((teacher, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={teacher.avatar}
                  alt={teacher.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full border-2 border-red-500"
                />
              </motion.div>
              <h3 className="text-xl font-semibold text-red-500">
                {teacher.name}
              </h3>
              <p className="text-gray-600">{teacher.subject}</p>
              <p className="text-gray-400 text-sm">{teacher.experience}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
