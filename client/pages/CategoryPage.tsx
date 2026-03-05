import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { products as allProducts, filterByPrice, sortProducts, searchProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Search, Filter, X, ShoppingCart } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function CategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const category = location.pathname.split("/").pop() || "kanha-ji-dresses";

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const getCategoryTitle = () => {
    switch (category) {
      case "kanha-ji-dresses":
        return "Kanha Ji Dresses";
      case "sarees":
        return "Exquisite Sarees";
      case "other-products":
        return "Other Products";
      default:
        return "Products";
    }
  };

  // Filter products
  const categoryProducts = allProducts.filter((p) => p.category === category);
  
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Apply search
    if (searchQuery) {
      filtered = searchProducts(filtered, searchQuery);
    }

    // Apply price filter
    filtered = filterByPrice(filtered, minPrice, maxPrice);

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors?.some((c) => selectedColors.includes(c))
      );
    }

    // Apply sorting
    filtered = sortProducts(filtered as any, sortBy as any);

    return filtered;
  }, [searchQuery, minPrice, maxPrice, selectedColors, sortBy, category]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Get unique colors
  const allColors = Array.from(
    new Set(categoryProducts.flatMap((p) => p.colors || []))
  );

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
    // Show toast notification (you can add this later)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Category Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="heading-md text-foreground mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors md:hidden"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block md:col-span-1 bg-white rounded-lg border border-border p-6 h-fit sticky top-24`}
          >
            <div className="flex justify-between items-center md:hidden mb-4">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-secondary rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                Price Range
              </h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  ₹{minPrice} - ₹{maxPrice}
                </div>
              </div>
            </div>

            {/* Color Filter */}
            {allColors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3 text-sm">
                  Colors
                </h4>
                <div className="space-y-2">
                  {allColors.map((color) => (
                    <label key={color} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedColors([...selectedColors, color]);
                          } else {
                            setSelectedColors(
                              selectedColors.filter((c) => c !== color)
                            );
                          }
                          setCurrentPage(1);
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-foreground">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {(selectedColors.length > 0 ||
              minPrice > 0 ||
              maxPrice < 10000) && (
              <button
                onClick={() => {
                  setSelectedColors([]);
                  setMinPrice(0);
                  setMaxPrice(10000);
                  setCurrentPage(1);
                }}
                className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Sort */}
            <div className="mb-6 flex justify-between items-center">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border/50"
                    >
                      {/* Image */}
                      <div
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="relative bg-silk-gradient h-64 overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            -
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            %
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                        >
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="text-yellow-400 text-sm">
                            {"★".repeat(Math.round(product.rating))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-primary font-bold text-lg">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all active:scale-95 text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                          >
                            <ShoppingCart size={16} />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8 pb-8">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "border border-border hover:bg-secondary"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedColors([]);
                    setMinPrice(0);
                    setMaxPrice(10000);
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
