import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Roads of Curiosity",
  description: "Photography and stories by Rik Alexander Nelissen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
