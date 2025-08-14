"use client";

import { useCartStore } from "@/lib/store";

export function SyncStatus() {
  const { isSyncing, items } = useCartStore();

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg text-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span>Статус:</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                isSyncing
                  ? "bg-yellow-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {isSyncing ? "Синхронізується" : "Готово"}
            </span>
          </div>
          <div>Товарів: {items.length}</div>
          <div>
            Загальна кількість:{" "}
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
