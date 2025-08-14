import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getCookie, setCookie, deleteCookie } from "./cookies";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  // New methods for cross-tab sync
  syncFromOtherTab: (items: CartItem[]) => void;
  isSyncing: boolean;
}

// Cross-tab synchronization
let broadcastChannel: BroadcastChannel | null = null;
let storageListener: ((e: StorageEvent) => void) | null = null;

// Initialize cross-tab sync
const initializeCrossTabSync = () => {
  if (typeof window === "undefined") return;

  // Use BroadcastChannel API for modern browsers
  if ("BroadcastChannel" in window) {
    broadcastChannel = new BroadcastChannel("cart-sync");

    broadcastChannel.onmessage = (event) => {
      if (event.data.type === "CART_UPDATE") {
        // Update store from other tab
        useCartStore.getState().syncFromOtherTab(event.data.items);
      }
    };
  }

  // Fallback to storage event for older browsers
  storageListener = (e: StorageEvent) => {
    if (e.key === "cart-storage" && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed.state?.items) {
          useCartStore.getState().syncFromOtherTab(parsed.state.items);
        }
      } catch (error) {
        console.error("Error parsing cart data from storage event:", error);
      }
    }
  };

  window.addEventListener("storage", storageListener);
};

// Cleanup function
const cleanupCrossTabSync = () => {
  if (broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }

  if (storageListener && typeof window !== "undefined") {
    window.removeEventListener("storage", storageListener);
    storageListener = null;
  }
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isSyncing: false, // Ensure initial state is false

      addToCart: (item) => {
        console.log("➕ Adding to cart:", item.name);
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            // If item already exists, increase quantity
            const newItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );

            // Notify other tabs
            notifyOtherTabs(newItems);

            return { items: newItems, isSyncing: false };
          } else {
            // Add new item with quantity 1
            const newItems = [...state.items, { ...item, quantity: 1 }];

            // Notify other tabs
            notifyOtherTabs(newItems);

            return { items: newItems, isSyncing: false };
          }
        });
      },

      removeFromCart: (id) => {
        console.log("➖ Removing from cart:", id);
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);

          // Notify other tabs
          notifyOtherTabs(newItems);

          return { items: newItems, isSyncing: false };
        });
      },

      updateQuantity: (id, quantity) => {
        console.log("🔄 Updating quantity:", id, "to", quantity);
        set((state) => {
          let newItems;

          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            newItems = state.items.filter((item) => item.id !== id);
          } else {
            newItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
          }

          // Notify other tabs
          notifyOtherTabs(newItems);

          return { items: newItems, isSyncing: false };
        });
      },

      clearCart: () => {
        console.log("🗑️ Clearing cart");
        // Notify other tabs
        notifyOtherTabs([]);

        set({ items: [], isSyncing: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // New method for syncing from other tabs
      syncFromOtherTab: (items: CartItem[]) => {
        console.log("🔄 Syncing from other tab:", items.length, "items");
        set({ items, isSyncing: true });

        // Reset syncing flag after a short delay
        setTimeout(() => {
          console.log("✅ Syncing completed, resetting flag");
          set({ isSyncing: false });
        }, 100);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => ({
        getItem: (key) => getCookie(key),
        setItem: (key, value) => setCookie(key, value),
        removeItem: (key) => deleteCookie(key),
      })),
      onRehydrateStorage: () => {
        // Initialize cross-tab sync after store is hydrated
        initializeCrossTabSync();
      },
    }
  )
);

// Function to notify other tabs about cart changes
const notifyOtherTabs = (items: CartItem[]) => {
  if (typeof window === "undefined") return;

  // Use BroadcastChannel if available
  if (broadcastChannel) {
    broadcastChannel.postMessage({
      type: "CART_UPDATE",
      items,
      timestamp: Date.now(),
      tabId: Math.random().toString(36).substr(2, 9), // Simple tab identifier
    });
  }

  // Storage event will automatically trigger in other tabs
  // No need to manually trigger it
};

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", cleanupCrossTabSync);
}
