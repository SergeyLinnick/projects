"use client";

import { useCrossTabSync } from "@/hooks/use-cross-tab-sync";
import { useState } from "react";

export function SyncDebugger() {
  const { tabId, lastSyncTime, syncCount, isSyncing, testSync, getSyncStats } =
    useCrossTabSync();
  const [showDetails, setShowDetails] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  const stats = getSyncStats();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">🔄 Синхронізація</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-gray-300 hover:text-white"
          >
            {showDetails ? "Сховати" : "Деталі"}
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Tab ID:</span>
            <span className="font-mono text-blue-300">{tabId}</span>
          </div>

          <div className="flex justify-between">
            <span>Синхронізації:</span>
            <span className={isSyncing ? "text-yellow-300" : "text-green-300"}>
              {syncCount}
            </span>
          </div>

          {lastSyncTime && (
            <div className="flex justify-between">
              <span>Остання:</span>
              <span className="text-gray-300">
                {lastSyncTime.toLocaleTimeString()}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Статус:</span>
            <span className={isSyncing ? "text-yellow-300" : "text-green-300"}>
              {isSyncing ? "Синхронізується..." : "Готово"}
            </span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Товарів в корзині:</span>
                <span>{stats.currentItemsCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Поточний стан:</span>
                <span
                  className={
                    stats.isCurrentlySyncing
                      ? "text-yellow-300"
                      : "text-green-300"
                  }
                >
                  {stats.isCurrentlySyncing ? "Синхронізація" : "Стабільний"}
                </span>
              </div>
            </div>

            <button
              onClick={testSync}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Тест синхронізації
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
