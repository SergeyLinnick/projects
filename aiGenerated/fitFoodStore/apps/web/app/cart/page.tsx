import { CartItem } from "@/components/cart-item";
import { CartValidationDisplay } from "@/components/cart-validation-display";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      {/* Cart Validation Display */}
      <CartValidationDisplay />

      <div className="max-w-2xl mx-auto">
        <CartItem />
      </div>
    </div>
  );
}
