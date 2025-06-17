"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

interface AppState {
  users: User[]
  selectedUser: User | null
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setSelectedUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      users: [],
      selectedUser: null,
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSelectedUser: (user) => set({ selectedUser: user }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...updates } : user)),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    {
      name: "app-store",
    },
  ),
)
