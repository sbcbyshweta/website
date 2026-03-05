import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products as allProducts } from "@/data/products";
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Trash2, Check, X } from "lucide-react";

export default function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: "" });
  const [activeTab, setActiveTab] = useState("description");

  const product = allProducts.find((p) => p.id === Number(productId));
  const relatedProducts = allProducts.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  const inWishlist = product ? isInWishlist(product.id) : false;

  const productImages = [product?.image || "", product?.image || "", product?.image || ""];

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem(`reviews-${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-lg text-muted-foreground text-center">
            Product not found
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    });
    alert(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.text.trim()) return;

    const review = {
      id: Date.now(),
      rating: newReview.rating,
      text: newReview.text,
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));
    setNewReview({ rating: 5, text: "" });
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : product.rating.toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-8 md:mb-12 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            to={`/category/${product.category}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
          <span>›</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative bg-white rounded-lg border border-border overflow-hidden mb-4 group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />

              {/* Image Zoom Buttons */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? productImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === productImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Stock Badge */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Title */}
            <h1 className="heading-sm text-foreground mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(parseFloat(avgRating)) ? "" : "opacity-30"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {avgRating} ({reviews.length + product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl line-through text-muted-foreground">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-sm text-green-600 font-semibold">
                  Save ₹
                  {(product.originalPrice - product.price).toLocaleString()}{" "}
                  ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              <div className={`flex items-center gap-2 text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? (
                  <>
                    <Check size={18} />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <X size={18} />
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Available Colors
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-2 border border-border rounded-lg text-sm hover:border-primary transition-colors"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Select Size
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 border border-border rounded hover:border-primary hover:bg-secondary transition-all font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3 w-max">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className="w-12 h-12 border border-border rounded hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center ${
                  inWishlist
                    ? "bg-red-50 border-red-200"
                    : "border-border hover:border-primary"
                }`}
              >
                <Heart
                  size={20}
                  className={inWishlist ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <button className="w-12 h-12 border border-border rounded-lg hover:bg-secondary transition-all flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-2 pt-6 border-t border-border">
              <div className="flex gap-3 text-sm">
                <Check size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Premium quality fabrics</span>
              </div>
              <div className="flex gap-3 text-sm">
                <Check size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Handcrafted with devotion</span>
              </div>
              <div className="flex gap-3 text-sm">
                <Check size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Free returns within 14 days</span>
              </div>
              <div className="flex gap-3 text-sm">
                <Check size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Secure & encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary -mb-[2px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
                <h3 className="font-semibold text-foreground mt-6 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">
                      Made from premium {product.category === "sarees" ? "silk" : "cotton"} fabric
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">
                      Exquisite hand embroidery and detailing
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">
                      Suitable for special occasions and celebrations
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">Easy to wear and maintain</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {/* Review Form */}
                <form onSubmit={handleAddReview} className="mb-8 pb-8 border-b border-border">
                  <h3 className="font-semibold text-foreground mb-4">Leave a Review</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-3xl transition-colors ${
                            star <= newReview.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.text}
                      onChange={(e) =>
                        setNewReview({ ...newReview, text: e.target.value })
                      }
                      placeholder="Share your experience with this product..."
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Post Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground mb-4">
                    Customer Reviews ({reviews.length + product.reviews})
                  </h3>

                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {review.author}
                            </p>
                            <div className="text-yellow-400">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {review.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="heading-md text-foreground mb-8">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border/50"
                >
                  <div className="relative bg-silk-gradient h-48 overflow-hidden">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground mb-2 line-clamp-2">
                      {relProduct.name}
                    </h3>
                    <p className="text-primary font-bold text-lg">
                      ₹{relProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
