import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = localStorage.getItem("adminUser");

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Placeholder for actual logo image */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:shadow-lg transition-shadow">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-none">
                SBC
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Shweta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              to="/category/kanha-ji-dresses"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Kanha Ji Dress
            </Link>
            <Link
              to="/category/sarees"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Saree
            </Link>
            <Link
              to="/category/other-products"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Other Products
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-primary hover:text-primary/80 transition-colors font-medium text-sm border-l border-border pl-8"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex">
              <Search size={20} className="text-foreground" />
            </button>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ShoppingCart size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/dashboard"
              className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex"
            >
              <User size={20} className="text-foreground" />
            </Link>

            <Link
              to="/login"
              className="btn-primary text-xs md:text-sm hidden md:inline-block"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-border">
            <Link
              to="/"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/category/kanha-ji-dresses"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Kanha Ji Dress
            </Link>
            <Link
              to="/category/sarees"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Saree
            </Link>
            <Link
              to="/category/other-products"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Other Products
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 mt-4 text-center btn-primary text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
