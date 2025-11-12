"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiPackage, FiPlusCircle, FiSettings, FiMenu } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa6";
import { UserButton } from "@stackframe/stack";

// Reusable shimmer loading placeholder component
const LoadingPlaceholder = ({ customClass = "" }: { customClass?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${customClass}`} />
);

// Routes that should not display sidebar
const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];

/**
 * Sidebar skeleton component displayed during page loading
 */
function SidebarLoadingState() {
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
          <h1 className="text-xl font-bold text-[#D86BDB]">Inventory Pro</h1>
        </Link>
      </div>

      {/* Mobile menu button skeleton */}
      <div className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-transparent text-[#D86BDB] rounded-lg">
        <FiMenu className="text-2xl" />
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-900 text-white min-h-screen flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#D86BDB] cursor-pointer">
              <FiPackage />
            </span>
            <h1 className="text-2xl font-bold text-[#D86BDB] cursor-pointer">
              Inventory Pro
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
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
}

/**
 * Main content area skeleton with loading placeholders
 */
function ContentLoadingSkeleton({ hasSidebar = true }: { hasSidebar?: boolean }) {
  return (
    <main className={`${hasSidebar ? 'lg:ml-0' : ''} p-4 md:p-6 lg:p-8 mt-16 lg:mt-0`}>
      {/* Page title section */}
      <section className="mb-6 md:mb-8">
        <LoadingPlaceholder customClass="h-6 md:h-8 w-24 md:w-32 mb-2" />
        <LoadingPlaceholder customClass="h-3 md:h-4 w-48 md:w-64" />
      </section>

      {/* Top metrics and chart row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
        {/* Metrics card skeleton */}
        <article className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <LoadingPlaceholder customClass="h-5 md:h-6 w-20 md:w-24 mb-4 md:mb-6" />
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="text-center">
                <LoadingPlaceholder customClass="h-6 md:h-8 w-12 md:w-16 mx-auto mb-2" />
                <LoadingPlaceholder customClass="h-3 md:h-4 w-16 md:w-20 mx-auto mb-1" />
                <div className="flex items-center justify-center">
                  <LoadingPlaceholder customClass="h-2 md:h-3 w-6 md:w-8" />
                  <LoadingPlaceholder customClass="h-2 md:h-3 w-2 md:w-3 ml-1 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Chart card skeleton */}
        <article className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <LoadingPlaceholder customClass="h-5 md:h-6 w-32 md:w-40" />
          </div>
          <LoadingPlaceholder customClass="h-40 md:h-48 w-full" />
        </article>
      </section>

      {/* Bottom analytics row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Stock levels list skeleton */}
        <article className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <LoadingPlaceholder customClass="h-5 md:h-6 w-20 md:w-24" />
          </div>
          <div className="space-y-2 md:space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <LoadingPlaceholder customClass="w-3 h-3 rounded-full" />
                  <LoadingPlaceholder customClass="h-3 md:h-4 w-20 md:w-24" />
                </div>
                <LoadingPlaceholder customClass="h-3 md:h-4 w-12 md:w-16" />
              </div>
            ))}
          </div>
        </article>

        {/* Efficiency donut chart skeleton */}
        <article className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <LoadingPlaceholder customClass="h-5 md:h-6 w-16 md:w-20" />
          </div>
          <div className="flex items-center justify-center">
            <LoadingPlaceholder customClass="w-40 h-40 md:w-48 md:h-48 rounded-full" />
          </div>
          <div className="mt-4 md:mt-6 space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LoadingPlaceholder customClass="w-3 h-3 rounded-full" />
                  <LoadingPlaceholder customClass="h-3 md:h-4 w-20 md:w-24" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

/**
 * Root loading component - displays during page transitions
 */
export default function Loading() {
  const currentRoute = usePathname();

  // Determine if sidebar should be rendered based on current route
  const shouldShowSidebar = !PUBLIC_ROUTES.includes(currentRoute);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {shouldShowSidebar && <SidebarLoadingState />}
      <ContentLoadingSkeleton hasSidebar={shouldShowSidebar} />
    </div>
  );
}
