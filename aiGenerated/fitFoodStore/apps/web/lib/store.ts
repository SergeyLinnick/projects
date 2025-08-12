import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id)
          
          if (existingItem) {
            // If item already exists, increase quantity
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          } else {
            // Add new item with quantity 1
            return {
              items: [...state.items, { ...item, quantity: 1 }]
            }
          }
        })
      },
      
      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter(item => item.id !== id)
            }
          }
          
          return {
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          }
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
) 