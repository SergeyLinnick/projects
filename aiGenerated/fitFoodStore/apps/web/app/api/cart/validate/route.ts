import { NextRequest, NextResponse } from "next/server";
import { cartValidator } from "@/lib/cart-validator";
import { CartValidationRequestSchema } from "@/lib/validation";
import { getServerCart } from "@/lib/server-cookies";

export async function POST(request: NextRequest) {
  try {
    // Get cart data from cookies
    const serverCart = getServerCart();

    // Parse request body
    const body = await request.json();

    // Validate request schema
    const validationRequest = CartValidationRequestSchema.parse({
      ...body,
      items: body.items || serverCart.items,
    });

    // Perform cart validation
    const validationResult =
      await cartValidator.validateCart(validationRequest);

    // Return validation result
    return NextResponse.json(validationResult, { status: 200 });
  } catch (error) {
    console.error("Cart validation API error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Помилка валідації корзини",
          details: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get validation statistics
    const stats = cartValidator.getValidationStats();

    // Get current cart for validation
    const serverCart = getServerCart();
    const currentValidation = await cartValidator.validateCart({
      items: serverCart.items,
    });

    return NextResponse.json({
      stats,
      currentValidation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cart validation stats API error:", error);

    return NextResponse.json(
      { error: "Помилка отримання статистики валідації" },
      { status: 500 }
    );
  }
}
