"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

const faqs = [
  {
    question: "What is Gurkulam College?",
    answer:
      "Gurkulam College is an educational institution that blends traditional learning values with modern education methods, focusing on overall student development.",
  },
  {
    question: "What programs or courses are offered?",
    answer:
      "We offer undergraduate and postgraduate programs across multiple disciplines including BCA, Bsc.it, MCA.",
  },
  {
    question: "How can I apply for admission?",
    answer:
      "Students can apply through the college admission office or via the official admission form available during the enrollment period. Entrance exams may apply to certain programs.",
  },
  {
    question: "What facilities are available on campus?",
    answer:
      "Our campus offers a digital library, well-equipped laboratories, sports complex, hostel accommodation, cafeteria, and Wi-Fi-enabled classrooms.",
  },
  {
    question: "Is there a uniform or dress code?",
    answer:
      "Yes, students are expected to follow the prescribed dress code or uniform guidelines as per college policy to maintain discipline and decorum.",
  },
  {
    question: "Does the college provide hostel facilities?",
    answer:
      "Yes, separate hostels are available for boys with 24x7 security, mess facilities, and study areas.",
  },
  {
    question: "How can I get my ID card or library card?",
    answer:
      "After admission confirmation, students can collect their ID and library cards from the administrative office within the first week of classes.",
  },
  {
    question: "Are there extracurricular activities?",
    answer:
      "Yes, students are encouraged to participate in sports, cultural events, clubs, and annual fests to build confidence and teamwork skills.",
  },
  {
    question: "How can I contact the administration?",
    answer:
      "You can visit the admin office during working hours or email us through the college contact form available on the website.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <section className="min-h-screen mt-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-4"
          >
         Frequently Asked Questions
          </motion.h1>
          <p className="text-gray-600 mb-12">
            Find answers to frequently asked questions about SSSDIIT Gurukul College.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-blue-600 w-6 h-6" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Gurkulam College. All rights reserved.
        </footer>
      </section>
      <Footer />
    </>
  );
}
