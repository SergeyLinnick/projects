'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export function CartItem() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Корзина порожня</h3>
        <p className="text-gray-500 mb-6">Додайте товари з каталогу</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Перейти до каталогу
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
            <p className="text-gray-500">{item.price} грн</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-12 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              {item.price * item.quantity} грн
            </p>
          </div>
          
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-900">Загальна сума:</span>
          <span className="text-2xl font-bold text-blue-600">{total} грн</span>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Очистити корзину
          </button>
          <Link
            href="/checkout"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Оформити замовлення
          </Link>
        </div>
      </div>
    </div>
  )
} 