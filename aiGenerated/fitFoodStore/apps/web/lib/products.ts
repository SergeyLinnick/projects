// Mock products data - replace with real API calls
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: 'Протеїновий коктейль "FitFuel"',
    price: 450,
    description:
      "Високоякісний протеїновий коктейль з натуральними інгредієнтами для підтримки м'язової маси та відновлення після тренувань.",
    image: "https://picsum.photos/400/300?random=1",
    category: "Протеїни",
  },
  {
    id: "2",
    name: 'BCAA амінокислоти "MuscleMax"',
    price: 320,
    description:
      "Комплекс амінокислот для швидкого відновлення м'язів та зменшення болю після тренувань.",
    image: "https://picsum.photos/400/300?random=2",
    category: "Амінокислоти",
  },
  {
    id: "3",
    name: 'Креатин моногідрат "PowerPlus"',
    price: 280,
    description:
      "Чистий креатин для підвищення сили та витривалості під час тренувань.",
    image: "https://picsum.photos/400/300?random=3",
    category: "Креатин",
  },
  {
    id: "4",
    name: 'Вітамінно-мінеральний комплекс "HealthBoost"',
    price: 380,
    description:
      "Повний комплекс вітамінів та мінералів для підтримки здоров'я та імунної системи.",
    image: "https://picsum.photos/400/300?random=4",
    category: "Вітаміни",
  },
  {
    id: "5",
    name: 'Омега-3 жирні кислоти "FishOil Pro"',
    price: 420,
    description:
      "Високоякісні омега-3 жирні кислоти для здоров'я серця та судин.",
    image: "https://picsum.photos/400/300?random=5",
    category: "Жирні кислоти",
  },
  {
    id: "6",
    name: 'Пре-тренувальний комплекс "EnergyRush"',
    price: 350,
    description:
      "Енергетичний комплекс для підвищення продуктивності та фокусу під час тренувань.",
    image: "https://picsum.photos/400/300?random=6",
    category: "Пре-тренування",
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((product) => product.id === id) || null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockProducts.filter((product) => product.category === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}
