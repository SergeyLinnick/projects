"use client";

import { useState, useCallback } from "react";
import { useCartStore } from "@/lib/store";
import {
  CartValidationResponse,
  CartValidationRequest,
} from "@/lib/validation";

interface ValidationState {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  isLoading: boolean;
  lastValidated: Date | null;
}

export function useCartValidation() {
  const { items } = useCartStore();
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
    isLoading: false,
    lastValidated: null,
  });

  /**
   * Validate cart on the server
   */
  const validateCart = useCallback(
    async (customItems?: typeof items): Promise<CartValidationResponse> => {
      setValidationState((prev) => ({ ...prev, isLoading: true }));

      try {
        const request: CartValidationRequest = {
          items: customItems || items,
          sessionId: Math.random().toString(36).substr(2, 9), // Simple session ID
        };

        const response = await fetch("/api/cart/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: CartValidationResponse = await response.json();

        setValidationState({
          isValid: result.isValid,
          errors: result.errors,
          warnings: result.warnings,
          suggestions: result.suggestions || [],
          isLoading: false,
          lastValidated: new Date(),
        });

        return result;
      } catch (error) {
        console.error("Cart validation error:", error);

        const errorResult: CartValidationResponse = {
          isValid: false,
          errors: ["Помилка валідації корзини"],
          warnings: [],
          maxAllowedItems: 50,
          maxAllowedPrice: 1000000,
        };

        setValidationState({
          isValid: false,
          errors: errorResult.errors,
          warnings: [],
          suggestions: [],
          isLoading: false,
          lastValidated: new Date(),
        });

        return errorResult;
      }
    },
    [items]
  );

  /**
   * Get validation statistics
   */
  const getValidationStats = useCallback(async () => {
    try {
      const response = await fetch("/api/cart/validate");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching validation stats:", error);
      return null;
    }
  }, []);

  /**
   * Quick validation check (client-side)
   */
  const quickValidate = useCallback((): ValidationState => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Basic client-side validation
    if (items.length === 0) {
      warnings.push("Корзина порожня");
    }

    if (items.length > 50) {
      errors.push("Занадто багато різних товарів");
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 1000) {
      errors.push("Загальна кількість товарів занадто велика");
    }

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (totalPrice > 1000000) {
      errors.push("Загальна вартість занадто висока");
    }

    // Check individual items
    items.forEach((item, index) => {
      if (item.quantity > 100) {
        errors.push(`Товар ${index + 1}: кількість занадто велика`);
      }

      if (item.price <= 0) {
        errors.push(`Товар ${index + 1}: некоректна ціна`);
      }

      if (item.name.length > 200) {
        warnings.push(`Товар ${index + 1}: назва занадто довга`);
      }
    });

    // Suggestions
    if (totalItems > 50) {
      suggestions.push("Розгляньте можливість замовлення оптом");
    }

    if (items.length > 20) {
      suggestions.push("Розгляньте можливість розбиття замовлення");
    }

    const isValid = errors.length === 0;

    const newState: ValidationState = {
      isValid,
      errors,
      warnings,
      suggestions,
      isLoading: false,
      lastValidated: new Date(),
    };

    setValidationState(newState);
    return newState;
  }, [items]);

  /**
   * Clear validation state
   */
  const clearValidation = useCallback(() => {
    setValidationState({
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
      isLoading: false,
      lastValidated: null,
    });
  }, []);

  /**
   * Auto-validate cart when items change
   */
  const autoValidate = useCallback(async () => {
    if (items.length > 0) {
      await validateCart();
    }
  }, [items, validateCart]);

  return {
    ...validationState,
    validateCart,
    getValidationStats,
    quickValidate,
    clearValidation,
    autoValidate,
  };
}
