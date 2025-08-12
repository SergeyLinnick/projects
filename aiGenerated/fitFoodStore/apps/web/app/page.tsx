import { ProductList } from "@/components/product-list"

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ласкаво просимо до FitFood Store
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ваш надійний партнер для здорового харчування та фітнесу. 
          Знайдіть найкращі добавки для досягнення ваших цілей.
        </p>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярні товари</h2>
      <ProductList />
    </div>
  )
}
