"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function Header() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration compatibility
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FitFood Store
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Головна
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Товари
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative group">
              <div className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <svg
                  className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
