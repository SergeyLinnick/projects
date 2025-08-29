import { z } from "zod";

// Validation schema for individual cart item
export const CartItemSchema = z.object({
  id: z.string().min(1, "ID товару обов'язковий"),
  name: z
    .string()
    .min(1, "Назва товару обов'язкова")
    .max(200, "Назва занадто довга"),
  price: z
    .number()
    .positive("Ціна має бути додатньою")
    .max(100000, "Ціна занадто висока"),
  image: z.string().url("Неправильне посилання на зображення"),
  quantity: z
    .number()
    .int("Кількість має бути цілим числом")
    .positive("Кількість має бути додатньою")
    .max(100, "Кількість занадто велика"),
});

// Validation schema for cart operations
export const CartOperationSchema = z.object({
  action: z.enum(["add", "remove", "update", "clear"]),
  item: CartItemSchema.optional(),
  itemId: z.string().optional(),
  quantity: z.number().optional(),
});

// Validation schema for cart state
export const CartStateSchema = z.object({
  items: z.array(CartItemSchema).max(50, "Занадто багато товарів в корзині"),
  totalItems: z.number().min(0).max(1000, "Загальна кількість занадто велика"),
  totalPrice: z
    .number()
    .min(0)
    .max(1000000, "Загальна вартість занадто висока"),
});

// Validation schema for cart sync data
export const CartSyncSchema = z.object({
  type: z.literal("CART_UPDATE"),
  items: z.array(CartItemSchema),
  timestamp: z.number().positive(),
  tabId: z.string().min(1),
});

// Validation schema for cart validation request
export const CartValidationRequestSchema = z.object({
  items: z.array(CartItemSchema),
  userId: z.string().optional(), // Optional for guest users
  sessionId: z.string().optional(),
});

// Validation schema for cart validation response
export const CartValidationResponseSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(z.string()),
  warnings: z.array(z.string()),
  suggestions: z.array(z.string()).optional(),
  maxAllowedItems: z.number().default(50),
  maxAllowedPrice: z.number().default(1000000),
});

// Type exports
export type CartItem = z.infer<typeof CartItemSchema>;
export type CartOperation = z.infer<typeof CartOperationSchema>;
export type CartState = z.infer<typeof CartStateSchema>;
export type CartSync = z.infer<typeof CartSyncSchema>;
export type CartValidationRequest = z.infer<typeof CartValidationRequestSchema>;
export type CartValidationResponse = z.infer<
  typeof CartValidationResponseSchema
>;

// Validation functions
export const validateCartItem = (item: unknown): CartItem => {
  return CartItemSchema.parse(item);
};

export const validateCartState = (state: unknown): CartState => {
  return CartStateSchema.parse(state);
};

export const validateCartSync = (sync: unknown): CartSync => {
  return CartSyncSchema.parse(sync);
};

export const validateCartOperation = (operation: unknown): CartOperation => {
  return CartOperationSchema.parse(operation);
};
