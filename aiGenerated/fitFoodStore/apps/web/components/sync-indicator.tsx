"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function SyncIndicator() {
  const { isSyncing } = useCartStore();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (isSyncing) {
      setShowIndicator(true);
    } else {
      // Hide indicator when syncing is complete
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 500); // Show for 500ms after syncing completes
      return () => clearTimeout(timer);
    }
  }, [isSyncing]);

  // Don't render if not showing
  if (!showIndicator) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300">
        <div className="w-3 h-3">
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
        </div>
        <span className="text-sm font-medium">
          {isSyncing ? "Синхронізація корзини..." : "Корзина оновлена"}
        </span>
      </div>
    </div>
  );
}
