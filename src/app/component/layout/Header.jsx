"use client";

import Link from "next/link";
import { CheckSquare, Plus, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Board", href: "#board" },
];

export default function Header({ onAddTask }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <CheckSquare size={21} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Assessment
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                index === 0
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-95"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}