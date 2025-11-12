"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import Labs from "../public/Labs.json";
import { AiFillSignal } from "react-icons/ai";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-purple-200 text-gray-800 px-4 md:px-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between py-4 md:py-6 gap-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D86BDB] cursor-pointer flex items-center justify-center">
          <AiFillSignal className="text-3xl md:text-4xl text-[#265678]" />
          <span>InventoryPro</span>
        </h1>
        
        <Link
            href="/sign-in"
            className="bg-[#6ABBFB] text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-[#5d9fd1] text-base md:text-lg transition"
          >
            Login
          </Link>
      </nav>

      <section className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full max-w-6xl">
        {/* Hero Section */}
        <section className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 md:mt-16 flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#265678]">
            Smart Inventory Management Made Simple
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#466880] max-w-2xl mb-6 md:mb-8">
            Track stock, manage suppliers, and monitor analytics — all in one intuitive dashboard designed for modern businesses.
          </p>
          <button className="bg-[#6ABBFB] text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-[#5d9fd1] text-base md:text-lg transition">
          Get Started
        </button>
          
        </section>

        {/* Illustration / Image */}
        <section className="mt-8 md:mt-16 flex-1 w-full max-w-md lg:max-w-3xl">
          <div className="w-full mx-auto">
            <Lottie 
              animationData={Labs} 
              loop={true} 
              style={{ width: '100%', height: 'auto', maxHeight: 400 }} 
            />
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="mt-8 md:mt-16 py-4 md:py-6 text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </main>
  );
}
