"use client";
import Link from "next/link";
import { FiHome, FiPackage, FiPlusCircle, FiSettings, FiBarChart2, FiMenu, FiX } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa6";
import { UserButton } from "@stackframe/stack";
import { useState } from "react";

const SideBar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { href: "/dashboard", icon: FiHome, label: "Dashboard" },
    { href: "/products", icon: FaCartArrowDown, label: "Products" },
    { href: "/add-product", icon: FiPlusCircle, label: "Add Product" },
    { href: "/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile logo on the left */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl text-[#D86BDB]"><FiPackage /></span>
          <h1 className="text-2xl font-bold text-[#D86BDB] hover:opacity-80 transition">Inventory Pro</h1>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 cursor-pointer bg-transparent text-[#D86BDB] rounded-lg"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 right-0 lg:left-0 z-40
          w-64 bg-gray-900 text-white min-h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-gray-800">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-2xl text-[#D86BDB]"><FiPackage /></span>
            <h1 className="text-2xl font-bold text-[#D86BDB] hover:opacity-80 transition">Inventory Pro</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <UserButton showUserInfo />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;