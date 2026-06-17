"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBookOpen, FiCompass } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Главная", icon: <FiHome size={20} /> },
    { href: "/cuisines", label: "Кухни", icon: <GiKnifeFork size={20} /> },
    { href: "/recipes", label: "Рецепты", icon: <FiBookOpen size={20} /> },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <FiCompass size={28} className="text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Recipes World
            </span>
          </Link>

          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-amber-400 border-b-2 border-amber-400 pb-1"
                    : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}