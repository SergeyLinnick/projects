export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FitFood Store</h3>
            <p className="text-gray-300">
              Ваш надійний партнер для здорового харчування та фітнесу.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@fitfoodstore.com</p>
              <p>Телефон: +380 44 123 45 67</p>
              <p>Адреса: м. Київ, вул. Прикладова, 1</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Інформація</h3>
            <div className="space-y-2 text-gray-300">
              <p>Про нас</p>
              <p>Доставка та оплата</p>
              <p>Повернення товару</p>
              <p>Політика конфіденційності</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 FitFood Store. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
} 