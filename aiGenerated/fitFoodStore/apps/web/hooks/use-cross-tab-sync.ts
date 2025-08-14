"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function useCrossTabSync() {
  const { items, isSyncing } = useCartStore();
  const [tabId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncCount, setSyncCount] = useState(0);

  useEffect(() => {
    if (isSyncing) {
      setLastSyncTime(new Date());
      setSyncCount((prev) => prev + 1);
    }
  }, [isSyncing]);

  // Test function to manually trigger sync
  const testSync = () => {
    const testItem = {
      id: "test-sync",
      name: "Тестовий товар",
      price: 100,
      image: "https://picsum.photos/400/300?random=999",
      quantity: 1,
    };

    useCartStore.getState().addToCart(testItem);
  };

  // Get sync statistics
  const getSyncStats = () => ({
    tabId,
    lastSyncTime,
    syncCount,
    currentItemsCount: items.length,
    isCurrentlySyncing: isSyncing,
  });

  return {
    tabId,
    lastSyncTime,
    syncCount,
    isSyncing,
    testSync,
    getSyncStats,
  };
}
