"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import Labs from "../public/Labs.json";
import { AiFillSignal } from "react-icons/ai";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-purple-200 text-gray-800 px-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex items-center justify-between py-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D86BDB] cursor-pointer flex items-center justify-center"><AiFillSignal className="text-4xl text-[#265678]" /><span>InventoryPro</span></h1>
        <button className=" bg-[#6ABBFB] text-white px-6 py-3 rounded hover:bg-[#5d9fd1]  text-lg transition">Get Started</button>
      </nav>

      <section className="flex justify-between items-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-16">
          <h2 className="text-3xl text-[#265678] md:text-4xl font-bold mb-4">
            Smart Inventory Management Made Simple
          </h2>
          <p className="text-lg md:text-xl text-[#466880] max-w-2xl mb-8">
            Track stock, manage suppliers, and monitor analytics — all in one intuitive dashboard designed for modern businesses.
          </p>
          <Link
            href="/sign-in"
            className="bg-[#6ABBFB] text-white px-6 py-3 rounded hover:bg-[#5d9fd1] text-lg transition"
          >
            Login
          </Link>
        </section>

        {/* Illustration / Image (optional) */}
        <section className="mt-16">
          <div className="w-full max-w-3xl mx-auto">
            <Lottie animationData={Labs} loop={true} style={{ width: '120%', height: 400 }} />
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </main>
  );
}
