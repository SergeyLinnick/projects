# Cookie-based State Management

Цей проект використовує cookies замість localStorage для збереження стану корзини, що забезпечує кращу підтримку SSR та синхронізацію між сервером та клієнтом.

## 📁 Структура файлів

```
lib/
├── store.ts           # Zustand store з cookie persistence
├── cookies.ts         # Утиліти для роботи з cookies
└── server-cookies.ts  # Серверні хуки для доступу до cookies
```

## 🔧 Основні компоненти

### 1. `store.ts` - Zustand Store

- Використовує `createJSONStorage` для cookie persistence
- Автоматично зберігає стан в cookies
- Підтримує всі операції з корзиною

### 2. `cookies.ts` - Cookie Утиліти

- `getCookie(name)` - отримання значення cookie
- `setCookie(name, value, days)` - встановлення cookie
- `deleteCookie(name)` - видалення cookie
- `parseCookies(header)` - парсинг cookie header для SSR

### 3. `server-cookies.ts` - Серверні хуки

- `getServerCart()` - отримання даних корзини на сервері
- `getServerCartItemCount()` - кількість товарів в корзині
- `getServerCartTotalPrice()` - загальна вартість корзини

## 🚀 Використання

### Клієнтська сторона:

```typescript
import { useCartStore } from "@/lib/store";

const { addToCart, items } = useCartStore();
```

### Серверна сторона:

```typescript
import { getServerCartItemCount } from "@/lib/server-cookies";

export default function Layout() {
  const cartItemCount = getServerCartItemCount();
  // Використовуйте cartItemCount для SSR
}
```

## ✅ Переваги cookies над localStorage

1. **SSR підтримка** - дані доступні на сервері
2. **Краща синхронізація** - між сервером та клієнтом
3. **Автоматичне надсилання** - з кожним HTTP запитом
4. **Безпека** - можна встановити httpOnly, secure флаги

## ⚠️ Обмеження

1. **Розмір** - cookies мають обмеження 4KB
2. **Надсилання** - cookies надсилаються з кожним запитом
3. **Браузерні обмеження** - деякі браузери можуть блокувати cookies

## 🔒 Безпека

- Cookies мають `SameSite=Lax` для захисту від CSRF
- Термін дії встановлено на 30 днів
- Дані зберігаються тільки на клієнті

## 📱 Гідратація

Для уникнення проблем з гідратацією використовуйте `mounted` стан:

```typescript
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

// Показуйте UI тільки після монтування
{mounted && <CartIndicator count={itemCount} />}
```
