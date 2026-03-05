import React, { createContext, useContext, useState, useEffect } from "react";

export interface AdminProduct {
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

interface AdminContextType {
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, "id">) => void;
  updateProduct: (id: number, product: Partial<AdminProduct>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => AdminProduct | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<AdminProduct[]>([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("admin_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("admin_products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Omit<AdminProduct, "id">) => {
    const newProduct: AdminProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<AdminProduct>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find((p) => p.id === id);
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
