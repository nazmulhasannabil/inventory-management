import Link from "next/link";
import { FiHome, FiPackage, FiPlusCircle, FiSettings, FiBarChart2 } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa6";
import { UserButton } from "@stackframe/stack";

const SideBar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const navItems = [
    { href: "/dashboard", icon: FiHome, label: "Dashboard" },
    { href: "/products", icon: FaCartArrowDown, label: "Products" },
    { href: "/add-product", icon: FiPlusCircle, label: "Add Product" },
    { href: "/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6  border-gray-800">

        <div className="flex items-center gap-2">
          <span className="text-2xl text-[#D86BDB] cursor-pointer"><FiPackage /></span>
          <h1 className="text-2xl font-bold text-[#D86BDB] cursor-pointer">Inventory Pro</h1>
        </div>
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

                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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
  );
};

export default SideBar;