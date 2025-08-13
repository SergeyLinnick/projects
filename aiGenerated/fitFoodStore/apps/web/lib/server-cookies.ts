import { cookies } from "next/headers";
import { parseCookies } from "./cookies";

// Server-side hook for getting cart data from cookies
export function getServerCart() {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart-storage");

  if (!cartCookie?.value) {
    return { items: [] };
  }

  try {
    const parsed = JSON.parse(cartCookie.value);
    return parsed.state || { items: [] };
  } catch (error) {
    console.error("Error parsing cart cookie:", error);
    return { items: [] };
  }
}

// Server-side hook for getting cart items count
export function getServerCartItemCount(): number {
  const cart = getServerCart();
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

// Server-side hook for getting cart total price
export function getServerCartTotalPrice(): number {
  const cart = getServerCart();
  return cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
