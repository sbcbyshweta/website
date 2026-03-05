import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ShoppingCart, Check, CreditCard, Smartphone, Truck, Lock, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products as allProducts } from "@/data/products";

function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-border/50">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative bg-silk-gradient h-72 overflow-hidden cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="text-yellow-400 text-sm tracking-widest">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-5 pb-5 border-b border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center px-4 py-2.5 bg-secondary text-foreground rounded-full font-medium hover:bg-primary/10 transition-all duration-300 text-sm"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center group p-8 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Icon size={40} className="text-primary" />
        </div>
      </div>
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed font-light">{description}</p>
    </div>
  );
}

export default function Index() {
  const dressProducts = allProducts.filter(
    (p) => p.category === "kanha-ji-dresses"
  );
  const sareeProducts = allProducts.filter((p) => p.category === "sarees");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary/30 to-background py-12 sm:py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
            {/* Hero Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-block">
                <span className="text-primary font-serif text-lg font-semibold tracking-wide">
                  ✦ Divine Collection ✦
                </span>
              </div>

              <h1 className="heading-lg text-foreground mb-6 leading-tight">
                Divine Fashion for Kanha Ji & You
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg font-light">
                Explore exquisite, handcrafted attire that radiates divine
                beauty and elegance. Each piece is meticulously crafted with devotion and the finest fabrics.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/category/kanha-ji-dresses"
                  className="btn-primary"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/category/sarees"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold transition-all hover:bg-primary/5 uppercase tracking-wider text-sm"
                >
                  Explore Sarees
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span className="text-sm text-muted-foreground">100% Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span className="text-sm text-muted-foreground">14-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=600&h=750&fit=crop"
                  alt="Beautiful woman in traditional jewelry and saree"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Premium frame decoration */}
                <div className="absolute inset-0 border-8 border-primary/20 rounded-2xl pointer-events-none" />
              </div>

              {/* Floating decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-5 pointer-events-none">
          <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="mb-4 inline-block">
              <span className="text-primary font-serif text-lg font-semibold">
                ✦ Our Story ✦
              </span>
            </div>
            <h2 className="heading-md text-foreground mb-6">
              About SBC by Shweta
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              SBC by Shweta is dedicated to offering divine fashion for Lord Krishna and women alike.
              Our exquisite Kanha Ji dresses and handcrafted sarees are meticulously created from the
              finest fabrics with unwavering devotion, timeless elegance, and superior craftsmanship.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <FeatureCard
              icon={() => (
                <svg className="w-12 h-12 text-primary" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
              title="Premium Quality"
              description="Finest fabrics handpicked for luxury and durability"
            />

            <FeatureCard
              icon={() => (
                <svg className="w-12 h-12 text-primary" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
              title="Handcrafted"
              description="Meticulously crafted with devotion and expertise"
            />

            <FeatureCard
              icon={() => (
                <svg className="w-12 h-12 text-primary" fill="currentColor">
                  <path d="M18 6.5L12 3 6 6.5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12v-6z" />
                </svg>
              )}
              title="Trusted Delivery"
              description="Safe, secure and timely delivery to your doorstep"
            />
          </div>
        </div>
      </section>

      {/* Kanha Ji Dresses Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary font-serif text-lg font-semibold">
              ✦ Divine Dresses ✦
            </span>
            <h2 className="heading-md text-foreground mt-3 mb-4">
              Divine Kanha Ji Dresses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exquisite handcrafted dresses designed for Lord Krishna with premium fabrics and intricate embroidery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dressProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sarees Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary font-serif text-lg font-semibold">
              ✦ Saree Collection ✦
            </span>
            <h2 className="heading-md text-foreground mt-3 mb-4">
              Exquisite Sarees Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional and modern sarees crafted with premium silk and intricate details for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sareeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Security Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent via-accent/95 to-accent text-accent-foreground relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary rounded-full blur-3xl" />
        </div>

        {/* Peacock feather pattern */}
        <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
          <svg className="w-96 h-96" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 Q60 30 50 50 Q40 30 50 10" />
            <circle cx="50" cy="50" r="5" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="heading-md text-accent-foreground mb-4 font-light">100% Secure Payments</h2>
            <p className="text-xl text-accent-foreground/95 max-w-2xl mx-auto font-light">
              Your security is our paramount priority. All transactions are encrypted with the latest security protocols.
            </p>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { name: "VISA", Icon: CreditCard },
              { name: "Mastercard", Icon: CreditCard },
              { name: "UPI", Icon: Smartphone },
              { name: "COD", Icon: Truck },
            ].map((method) => (
              <div
                key={method.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center hover:bg-white/15 transition-all duration-300 border border-white/20"
              >
                <method.Icon size={32} className="mx-auto mb-2 text-accent-foreground" />
                <span className="font-semibold text-accent-foreground text-sm">
                  {method.name}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Lock size={24} className="text-accent-foreground" />
              <span className="text-sm font-light">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={24} className="text-accent-foreground" />
              <span className="text-sm font-light">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={24} className="text-accent-foreground" />
              <span className="text-sm font-light">Fraud Protection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-background to-secondary/50 border-t border-border py-16 md:py-20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <h4 className="font-serif text-2xl font-bold text-primary mb-4">SBC</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                Divine fashion for Lord Krishna and women alike, crafted with devotion and elegance.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-4">Shop</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/category/kanha-ji-dresses"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Kanha Ji Dresses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/sarees"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Sarees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/other-products"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Other Products
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-4">Customer</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-4">Legal</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>
              &copy; 2024 SBC by Shweta. All rights reserved. | Crafted with
              devotion and elegance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
