export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "kanha-ji-dresses" | "sarees" | "other-products";
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  sku: string;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  // Kanha Ji Dresses
  {
    id: 1,
    name: "Peacock Feather Dress",
    price: 1499,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
    category: "kanha-ji-dresses",
    description:
      "Divine dress with peacock feather embroidery, perfect for Lord Krishna celebrations",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    sku: "SKU-001",
    colors: ["Navy Blue", "Gold", "White"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Golden Rajwadi Dress",
    price: 1699,
    originalPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1617179783962-19c565cfb126?w=500&h=600&fit=crop",
    category: "kanha-ji-dresses",
    description:
      "Exquisite Rajwadi design with golden embroidery and premium fabric",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    sku: "SKU-002",
    colors: ["Gold", "Maroon"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Floral Yellow Dress",
    price: 1599,
    originalPrice: 1899,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=600&fit=crop",
    category: "kanha-ji-dresses",
    description: "Bright floral yellow dress with traditional embroidery",
    rating: 4.4,
    reviews: 82,
    inStock: true,
    sku: "SKU-003",
    colors: ["Yellow", "Golden Yellow"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Red Embroidered Dress",
    price: 1799,
    originalPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1595777712821-3d272076d344?w=500&h=600&fit=crop",
    category: "kanha-ji-dresses",
    description: "Rich red dress with intricate hand embroidery",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    sku: "SKU-004",
    colors: ["Red", "Deep Red"],
    sizes: ["S", "M", "L", "XL"],
  },

  // Sarees
  {
    id: 5,
    name: "Red Kanjivaram Silk Saree",
    price: 5999,
    originalPrice: 7999,
    image:
      "https://images.unsplash.com/photo-1505299726314-52581ce3e44a?w=500&h=600&fit=crop",
    category: "sarees",
    description:
      "Traditional red Kanjivaram silk saree with intricate zari work",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    sku: "SKU-005",
    colors: ["Red", "Maroon"],
    sizes: ["Free Size"],
  },
  {
    id: 6,
    name: "Royal Blue Patola Saree",
    price: 4999,
    originalPrice: 6499,
    image:
      "https://images.unsplash.com/photo-1623883626032-e5c2f63c95e8?w=500&h=600&fit=crop",
    category: "sarees",
    description: "Elegant royal blue Patola saree with traditional patterns",
    rating: 4.6,
    reviews: 118,
    inStock: true,
    sku: "SKU-006",
    colors: ["Blue", "Navy Blue"],
    sizes: ["Free Size"],
  },
  {
    id: 7,
    name: "Green & Gold Banarasi Silk Saree",
    price: 6999,
    originalPrice: 8999,
    image:
      "https://images.unsplash.com/photo-1617179783962-19c565cfb126?w=500&h=600&fit=crop",
    category: "sarees",
    description:
      "Luxurious green and gold Banarasi silk saree with traditional weaving",
    rating: 4.7,
    reviews: 187,
    inStock: true,
    sku: "SKU-007",
    colors: ["Green", "Sea Green"],
    sizes: ["Free Size"],
  },
  {
    id: 8,
    name: "Pink Silk Saree with Gold Border",
    price: 4499,
    originalPrice: 5999,
    image:
      "https://images.unsplash.com/photo-1632457200667-bdc6dfcf7e6f?w=500&h=600&fit=crop",
    category: "sarees",
    description: "Beautiful pink silk saree with gold border detailing",
    rating: 4.5,
    reviews: 92,
    inStock: true,
    sku: "SKU-008",
    colors: ["Pink", "Rose Pink"],
    sizes: ["Free Size"],
  },

  // Other Products
  {
    id: 9,
    name: "Gold Plated Bangles Set",
    price: 1299,
    originalPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop",
    category: "other-products",
    description: "Beautiful gold plated bangles set with traditional design",
    rating: 4.4,
    reviews: 64,
    inStock: true,
    sku: "SKU-009",
    colors: ["Gold", "Rose Gold"],
    sizes: ["Free Size"],
  },
  {
    id: 10,
    name: "Pearl Necklace Set",
    price: 1999,
    originalPrice: 2699,
    image:
      "https://images.unsplash.com/photo-1599643478584-15054e929fc0?w=500&h=600&fit=crop",
    category: "other-products",
    description: "Elegant pearl necklace set with matching earrings",
    rating: 4.7,
    reviews: 78,
    inStock: true,
    sku: "SKU-010",
    colors: ["White", "Cream"],
    sizes: ["Free Size"],
  },
  {
    id: 11,
    name: "Traditional Maang Tika",
    price: 899,
    originalPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1599643482521-04cd1fc3b25d?w=500&h=600&fit=crop",
    category: "other-products",
    description: "Traditional maang tika with intricate stone work",
    rating: 4.6,
    reviews: 102,
    inStock: true,
    sku: "SKU-011",
    colors: ["Gold", "Silver"],
    sizes: ["Free Size"],
  },
  {
    id: 12,
    name: "Kundan Earrings",
    price: 699,
    originalPrice: 999,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop",
    category: "other-products",
    description: "Beautiful kundan earrings with precious stones",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    sku: "SKU-012",
    colors: ["Gold", "Multicolor"],
    sizes: ["Free Size"],
  },
];

export const filterByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const filterByPrice = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
};

export const sortProducts = (
  products: Product[],
  sortBy: "price-asc" | "price-desc" | "rating" | "newest"
): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

export const searchProducts = (
  products: Product[],
  query: string
): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};
