import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AIImageGenerator from "@/components/AIImageGenerator";
import { products as initialProducts } from "@/data/products";
import { Plus, Edit2, Trash2, Eye, ChevronDown, ChevronUp, X, Check } from "lucide-react";

interface Product {
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

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    category: "kanha-ji-dresses",
    description: "",
    rating: 4.5,
    reviews: 0,
    inStock: true,
    sku: "",
    colors: [],
    sizes: [],
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  // Filter and search products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.sku) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...formData, id: editingId } : p
        ) as Product[]
      );
      setEditingId(null);
    } else {
      // Add new product
      const newProduct: Product = {
        ...formData,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
      } as Product;
      setProducts([...products, newProduct]);
    }

    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      category: "kanha-ji-dresses",
      description: "",
      rating: 4.5,
      reviews: 0,
      inStock: true,
      sku: "",
      colors: [],
      sizes: [],
    });
    setColorInput("");
    setSizeInput("");
    setGeneratedImage(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEditProduct = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowAddForm(true);
    setGeneratedImage(product.image);
  };

  const handleImageGenerated = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
    setGeneratedImage(imageUrl);
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData({
        ...formData,
        colors: [...(formData.colors || []), colorInput],
      });
      setColorInput("");
    }
  };

  const handleRemoveColor = (color: string) => {
    setFormData({
      ...formData,
      colors: formData.colors?.filter((c) => c !== color),
    });
  };

  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setFormData({
        ...formData,
        sizes: [...(formData.sizes || []), sizeInput],
      });
      setSizeInput("");
    }
  };

  const handleRemoveSize = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes?.filter((s) => s !== size),
    });
  };

  // Check if user is authenticated as admin
  const isAdmin = localStorage.getItem("adminUser");
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="heading-sm text-foreground mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-8">
              You need admin credentials to access this panel.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-md text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage products, generate AI images, and control your e-commerce store
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Products</p>
            <p className="text-3xl font-bold text-primary">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">In Stock</p>
            <p className="text-3xl font-bold text-green-600">
              {products.filter((p) => p.inStock).length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ₹{products
                .reduce((sum, p) => sum + p.price * 10, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">Categories</p>
            <p className="text-3xl font-bold text-primary">3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {/* Controls */}
              <div className="p-6 border-b border-border space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-foreground">
                    Products
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(true);
                      setEditingId(null);
                      resetForm();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="kanha-ji-dresses">Kanha Ji Dresses</option>
                    <option value="sarees">Sarees</option>
                    <option value="other-products">Other Products</option>
                  </select>
                </div>
              </div>

              {/* Product List */}
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Product Image */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.sku} • ₹{product.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {product.inStock ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <Check size={14} />
                                In Stock
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <X size={14} />
                                Out of Stock
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === product.id ? null : product.id
                              )
                            }
                            className="p-2 text-muted-foreground hover:bg-secondary rounded transition-colors"
                          >
                            {expandedId === product.id ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-primary hover:bg-secondary rounded transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedId === product.id && (
                        <div className="mt-4 pt-4 border-t border-border text-sm space-y-2">
                          <p className="text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                          {product.colors && product.colors.length > 0 && (
                            <p className="text-muted-foreground">
                              <strong>Colors:</strong> {product.colors.join(", ")}
                            </p>
                          )}
                          {product.sizes && product.sizes.length > 0 && (
                            <p className="text-muted-foreground">
                              <strong>Sizes:</strong> {product.sizes.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No products found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg text-foreground">
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    className="p-1 hover:bg-secondary rounded"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* AI Image Generator */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <AIImageGenerator
                      category={
                        (formData.category as
                          | "kanha-ji-dresses"
                          | "sarees"
                          | "other-products") || "kanha-ji-dresses"
                      }
                      description={formData.description || ""}
                      size={formData.sizes?.[0]}
                      onImageGenerated={handleImageGenerated}
                    />
                  </div>

                  {/* Or use uploaded image */}
                  {generatedImage && (
                    <div>
                      <img
                        src={generatedImage}
                        alt="Product"
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    </div>
                  )}

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter product name"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    >
                      <option value="kanha-ji-dresses">Kanha Ji Dresses</option>
                      <option value="sarees">Sarees</option>
                      <option value="other-products">Other Products</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.price || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            originalPrice: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>
                  </div>

                  {/* SKU */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      SKU *
                    </label>
                    <input
                      type="text"
                      value={formData.sku || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      placeholder="e.g., SKU-001"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the product..."
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Colors
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        placeholder="Add a color"
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddColor();
                            e.preventDefault();
                          }
                        }}
                      />
                      <button
                        onClick={handleAddColor}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.colors?.map((color) => (
                        <span
                          key={color}
                          className="inline-flex items-center gap-2 px-2 py-1 bg-secondary rounded text-sm"
                        >
                          {color}
                          <button
                            onClick={() => handleRemoveColor(color)}
                            className="text-foreground hover:text-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Sizes
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        placeholder="Add a size"
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddSize();
                            e.preventDefault();
                          }
                        }}
                      />
                      <button
                        onClick={handleAddSize}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.sizes?.map((size) => (
                        <span
                          key={size}
                          className="inline-flex items-center gap-2 px-2 py-1 bg-secondary rounded text-sm"
                        >
                          {size}
                          <button
                            onClick={() => handleRemoveSize(size)}
                            className="text-foreground hover:text-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* In Stock */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <input
                        type="checkbox"
                        checked={formData.inStock || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inStock: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      In Stock
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={handleAddProduct}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                      {editingId ? "Update" : "Add"} Product
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                      className="flex-1 py-2 border border-border rounded-lg hover:bg-secondary transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
