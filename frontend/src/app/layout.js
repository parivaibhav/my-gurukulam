import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "SSSDIIT GURUKUL - JUNAGADH",
  description:
    "Shastri Shree Dharamjivandasji Institute of Technology - Junagadh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/gurukul-logo.png" />
      </head>

      <body className={inter.className}>
        <Toaster position="top-center" />  
        {children}
         <ChatBot />
      </body>
    </html>
  );
}
