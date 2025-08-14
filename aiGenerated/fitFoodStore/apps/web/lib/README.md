# Cookie-based State Management with Cross-Tab Synchronization

Цей проект використовує cookies замість localStorage для збереження стану корзини, що забезпечує кращу підтримку SSR та синхронізацію між сервером та клієнтом. **Нова функціональність**: автоматична синхронізація корзини між різними вкладками браузера.

## 📁 Структура файлів

```
lib/
├── store.ts                    # Zustand store з cookie persistence та cross-tab sync
├── cookies.ts                  # Утиліти для роботи з cookies
├── server-cookies.ts           # Серверні хуки для доступу до cookies
├── sync-test-utils.ts          # Утиліти для тестування синхронізації
└── README.md                   # Ця документація

components/
├── sync-indicator.tsx          # Індикатор синхронізації
└── sync-debugger.tsx           # Debug компонент (тільки для розробки)

hooks/
└── use-cross-tab-sync.ts       # Хук для роботи з cross-tab sync
```

## 🔧 Основні компоненти

### 1. `store.ts` - Zustand Store з Cross-Tab Sync

- Використовує `createJSONStorage` для cookie persistence
- **Ново**: Автоматична синхронізація між вкладками
- Підтримує `BroadcastChannel` API та fallback на storage events
- Включає стан `isSyncing` для відстеження синхронізації

### 2. `cookies.ts` - Cookie Утиліти

- `getCookie(name)` - отримання значення cookie
- `setCookie(name, value, days)` - встановлення cookie
- `deleteCookie(name)` - видалення cookie
- `parseCookies(header)` - парсинг cookie header для SSR

### 3. `server-cookies.ts` - Серверні хуки

- `getServerCart()` - отримання даних корзини на сервері
- `getServerCartItemCount()` - кількість товарів в корзині
- `getServerCartTotalPrice()` - загальна вартість корзини

### 4. **Ново**: Cross-Tab Synchronization

- `sync-indicator.tsx` - показує статус синхронізації
- `sync-debugger.tsx` - debug інструменти для розробки
- `use-cross-tab-sync.ts` - хук для роботи з синхронізацією

## 🚀 Використання

### Клієнтська сторона:

```typescript
import { useCartStore } from "@/lib/store";

const { addToCart, items, isSyncing } = useCartStore();
```

### Серверна сторона:

```typescript
import { getServerCartItemCount } from "@/lib/server-cookies";

export default function Layout() {
  const cartItemCount = getServerCartItemCount();
  // Використовуйте cartItemCount для SSR
}
```

### Cross-Tab Sync:

```typescript
import { useCrossTabSync } from "@/hooks/use-cross-tab-sync";

const { tabId, syncCount, isSyncing, testSync } = useCrossTabSync();
```

## 🔄 Cross-Tab Synchronization

### Як це працює:

1. **BroadcastChannel API** (сучасні браузери):
   - Створює канал `cart-sync` для комунікації між вкладками
   - Відправляє повідомлення при кожній зміні корзини
   - Автоматично оновлює стан в інших вкладках

2. **Storage Events** (fallback для старих браузерів):
   - Використовує `storage` event для синхронізації
   - Автоматично спрацьовує при зміні cookies
   - Забезпечує сумісність з усіма браузерами

3. **Автоматична синхронізація**:
   - При додаванні/видаленні товару
   - При зміні кількості
   - При очищенні корзини

### Переваги:

✅ **Миттєва синхронізація** між вкладками  
✅ **Автоматичне оновлення** без перезавантаження  
✅ **Fallback механізми** для різних браузерів  
✅ **Візуальні індикатори** статусу синхронізації  
✅ **Debug інструменти** для розробки

## 🧪 Тестування синхронізації

### 1. Відкрийте кілька вкладок з вашим сайтом

### 2. Додайте товар в корзину в одній вкладці

### 3. Перевірте, що корзина автоматично оновилася в інших вкладках

### 4. Використовуйте debug компонент для моніторингу

### Debug компонент показує:

- Унікальний ID вкладки
- Кількість синхронізацій
- Час останньої синхронізації
- Поточний статус
- Тестові функції

## ✅ Переваги cookies над localStorage

1. **SSR підтримка** - дані доступні на сервері
2. **Краща синхронізація** - між сервером та клієнтом
3. **Автоматичне надсилання** - з кожним HTTP запитом
4. **Безпека** - можна встановити httpOnly, secure флаги
5. **Cross-tab sync** - автоматична синхронізація між вкладками

## ⚠️ Обмеження

1. **Розмір** - cookies мають обмеження 4KB
2. **Надсилання** - cookies надсилаються з кожним запитом
3. **Браузерні обмеження** - деякі браузери можуть блокувати cookies
4. **Синхронізація** - може бути затримка в 100-200ms між вкладками

## 🔒 Безпека

- Cookies мають `SameSite=Lax` для захисту від CSRF
- Термін дії встановлено на 30 днів
- Дані зберігаються тільки на клієнті
- Cross-tab sync використовує безпечні канали комунікації

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

## 🚀 Наступні кроки

1. **Тестування синхронізації** - відкрийте кілька вкладок
2. **Моніторинг продуктивності** - використовуйте debug компонент
3. **Оптимізація** - налаштуйте затримки синхронізації
4. **Розширення** - додайте синхронізацію для інших даних
