import {
  CartItem,
  CartValidationRequest,
  CartValidationResponse,
  validateCartItem,
  validateCartState,
} from "./validation";
import { getServerCart } from "./server-cookies";

// Business rules for cart validation
const CART_LIMITS = {
  MAX_ITEMS: 50,
  MAX_QUANTITY_PER_ITEM: 100,
  MAX_TOTAL_PRICE: 1000000,
  MAX_TOTAL_ITEMS: 1000,
  MIN_PRICE: 0.01,
  MAX_PRICE_PER_ITEM: 100000,
} as const;

// Security rules
const SECURITY_RULES = {
  MAX_ITEMS_PER_REQUEST: 10,
  MAX_PRICE_CHANGE_PERCENT: 50, // Max 50% price change between validations
  SUSPICIOUS_PATTERNS: [
    "javascript:",
    "data:",
    "vbscript:",
    "<script",
    "onerror=",
    "onload=",
  ],
} as const;

export class CartValidator {
  private previousValidation: CartValidationResponse | null = null;
  private validationHistory: CartValidationResponse[] = [];

  /**
   * Validate cart state with comprehensive checks
   */
  async validateCart(
    request: CartValidationRequest
  ): Promise<CartValidationResponse> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    try {
      // Basic validation
      const validationResult = this.validateBasicStructure(request.items);
      errors.push(...validationResult.errors);
      warnings.push(...validationResult.warnings);

      // Business rules validation
      const businessValidation = this.validateBusinessRules(request.items);
      errors.push(...businessValidation.errors);
      warnings.push(...businessValidation.warnings);
      suggestions.push(...businessValidation.suggestions);

      // Security validation
      const securityValidation = this.validateSecurity(request.items);
      errors.push(...securityValidation.errors);
      warnings.push(...securityValidation.warnings);

      // Anomaly detection
      const anomalyValidation = this.detectAnomalies(request.items);
      errors.push(...anomalyValidation.errors);
      warnings.push(...anomalyValidation.warnings);

      // Check for suspicious patterns
      const securityCheck = this.checkSuspiciousPatterns(request.items);
      errors.push(...securityCheck.errors);

      const isValid = errors.length === 0;

      const response: CartValidationResponse = {
        isValid,
        errors,
        warnings,
        suggestions,
        maxAllowedItems: CART_LIMITS.MAX_ITEMS,
        maxAllowedPrice: CART_LIMITS.MAX_TOTAL_PRICE,
      };

      // Store validation history
      this.validationHistory.push(response);
      if (this.validationHistory.length > 10) {
        this.validationHistory.shift();
      }

      this.previousValidation = response;
      return response;
    } catch (error) {
      console.error("Cart validation error:", error);
      return {
        isValid: false,
        errors: ["Помилка валідації корзини"],
        warnings: [],
        maxAllowedItems: CART_LIMITS.MAX_ITEMS,
        maxAllowedPrice: CART_LIMITS.MAX_TOTAL_PRICE,
      };
    }
  }

  /**
   * Validate basic structure and data types
   */
  private validateBasicStructure(items: CartItem[]) {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!Array.isArray(items)) {
      errors.push("Корзина має бути масивом товарів");
      return { errors, warnings };
    }

    if (items.length === 0) {
      warnings.push("Корзина порожня");
      return { errors, warnings };
    }

    // Validate each item
    items.forEach((item, index) => {
      try {
        validateCartItem(item);
      } catch (error) {
        if (error instanceof Error) {
          errors.push(`Товар ${index + 1}: ${error.message}`);
        }
      }
    });

    return { errors, warnings };
  }

  /**
   * Validate business rules
   */
  private validateBusinessRules(items: CartItem[]) {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Check item count limits
    if (items.length > CART_LIMITS.MAX_ITEMS) {
      errors.push(
        `Занадто багато різних товарів: ${items.length}/${CART_LIMITS.MAX_ITEMS}`
      );
    }

    if (totalItems > CART_LIMITS.MAX_TOTAL_ITEMS) {
      errors.push(
        `Загальна кількість товарів занадто велика: ${totalItems}/${CART_LIMITS.MAX_TOTAL_ITEMS}`
      );
    }

    if (totalPrice > CART_LIMITS.MAX_TOTAL_PRICE) {
      errors.push(
        `Загальна вартість занадто висока: ${totalPrice}/${CART_LIMITS.MAX_TOTAL_PRICE}`
      );
    }

    // Check individual item limits
    items.forEach((item, index) => {
      if (item.quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM) {
        errors.push(
          `Товар ${index + 1}: кількість занадто велика (${item.quantity}/${CART_LIMITS.MAX_QUANTITY_PER_ITEM})`
        );
      }

      if (item.price < CART_LIMITS.MIN_PRICE) {
        errors.push(`Товар ${index + 1}: ціна занадто низька (${item.price})`);
      }

      if (item.price > CART_LIMITS.MAX_PRICE_PER_ITEM) {
        errors.push(
          `Товар ${index + 1}: ціна занадто висока (${item.price}/${CART_LIMITS.MAX_PRICE_PER_ITEM})`
        );
      }
    });

    // Suggestions for optimization
    if (totalItems > 50) {
      suggestions.push(
        "Розгляньте можливість замовлення оптом для зниження вартості"
      );
    }

    if (items.length > 20) {
      suggestions.push(
        "Розгляньте можливість розбиття замовлення на кілька частин"
      );
    }

    return { errors, warnings, suggestions };
  }

  /**
   * Validate security aspects
   */
  private validateSecurity(items: CartItem[]) {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for suspicious patterns in text fields
    items.forEach((item, index) => {
      const suspiciousPatterns = SECURITY_RULES.SUSPICIOUS_PATTERNS;

      suspiciousPatterns.forEach((pattern) => {
        if (
          item.name.toLowerCase().includes(pattern.toLowerCase()) ||
          item.image.toLowerCase().includes(pattern.toLowerCase())
        ) {
          errors.push(`Товар ${index + 1}: виявлено підозрілий патерн`);
        }
      });

      // Check for extremely long text
      if (item.name.length > 200) {
        warnings.push(`Товар ${index + 1}: назва занадто довга`);
      }

      // Check for suspicious URLs
      if (
        !item.image.startsWith("http") ||
        item.image.includes("javascript:")
      ) {
        errors.push(`Товар ${index + 1}: підозріле посилання на зображення`);
      }
    });

    return { errors, warnings };
  }

  /**
   * Detect anomalies in cart data
   */
  private detectAnomalies(items: CartItem[]) {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!this.previousValidation) {
      return { errors, warnings };
    }

    const currentTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const previousTotal = this.previousValidation.maxAllowedPrice;

    // Check for significant price changes
    if (previousTotal > 0) {
      const priceChangePercent =
        Math.abs((currentTotal - previousTotal) / previousTotal) * 100;

      if (priceChangePercent > SECURITY_RULES.MAX_PRICE_CHANGE_PERCENT) {
        warnings.push(
          `Значна зміна вартості корзини: ${priceChangePercent.toFixed(1)}%`
        );
      }
    }

    // Check for rapid changes
    if (this.validationHistory.length >= 2) {
      const recentValidations = this.validationHistory.slice(-3);
      const rapidChanges = recentValidations.filter(
        (v) => v.errors.length > 0
      ).length;

      if (rapidChanges >= 2) {
        warnings.push("Виявлено швидкі зміни в корзині");
      }
    }

    return { errors, warnings };
  }

  /**
   * Check for suspicious patterns
   */
  private checkSuspiciousPatterns(items: CartItem[]) {
    const errors: string[] = [];

    // Check for duplicate items with different prices
    const priceMap = new Map<string, number>();
    items.forEach((item) => {
      if (priceMap.has(item.id) && priceMap.get(item.id) !== item.price) {
        errors.push(`Різні ціни для одного товару: ${item.id}`);
      }
      priceMap.set(item.id, item.price);
    });

    // Check for items with zero or negative prices
    items.forEach((item, index) => {
      if (item.price <= 0) {
        errors.push(`Товар ${index + 1}: некоректна ціна`);
      }
    });

    return { errors };
  }

  /**
   * Get validation statistics
   */
  getValidationStats() {
    return {
      totalValidations: this.validationHistory.length,
      successRate:
        this.validationHistory.filter((v) => v.isValid).length /
        this.validationHistory.length,
      commonErrors: this.getCommonErrors(),
      lastValidation: this.previousValidation,
    };
  }

  /**
   * Get most common errors
   */
  private getCommonErrors() {
    const errorCounts = new Map<string, number>();

    this.validationHistory.forEach((validation) => {
      validation.errors.forEach((error) => {
        errorCounts.set(error, (errorCounts.get(error) || 0) + 1);
      });
    });

    return Array.from(errorCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([error, count]) => ({ error, count }));
  }
}

// Export singleton instance
export const cartValidator = new CartValidator();
