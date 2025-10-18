"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          {/* Logo & About */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/head-logo.jpg"
                alt="Gurukul Logo"
                width={270}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Gurukul is dedicated to providing the best educational resources
              and guidance for students and teachers alike.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <div className="flex gap-10">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-blue-600 transition"
                  >
                    Login
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition">
                    Addmissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 transition"
                  >
                    Circulars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-blue-600 transition"
                  >
                    Carrers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 text-sm">
              123 College Road, Junagadh, Gujrat
            </p>
            <p className="text-gray-600 text-sm">Phone: 078783 81388</p>
            <p className="text-gray-600 text-sm">Email: sssdiit@gurukul.com</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-600 transition text-lg"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com/sssdiit_college"
                className="hover:text-pink-500 transition text-lg"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://instagram.com/sssdiit_college"
                className="hover:text-blue-400 transition text-lg"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-blue-700 transition text-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition text-lg"
                aria-label="LinkedIn"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="hover:text-blue-700 transition text-lg"
                aria-label="LinkedIn"
              >
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-gray-500 text-sm pb-4">
          &copy; {new Date().getFullYear()} Shastri Shree Dharamjivandasji
          Institute of Technology Gurukul. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
