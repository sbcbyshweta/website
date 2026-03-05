import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Loader, Check } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="text-center">
            <h2 className="heading-sm text-foreground mb-4">Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Please add items to your cart before checkout.
            </p>
            <Link
              to="/category/kanha-ji-dresses"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const initializeRazorpay = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      handleRazorpayPayment();
    };
    script.onerror = () => {
      alert("Failed to load payment gateway. Please try again.");
      setIsLoading(false);
    };
    document.body.appendChild(script);
  };

  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_1DP5ibkZiHnrPh", // Replace with your actual Razorpay key
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "SBC by Shweta",
      description: `Order from SBC by Shweta - ${cart.length} items`,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#8b6434", // Primary color from your theme
      },
      handler: (response: any) => {
        // Payment successful
        console.log("Payment successful:", response);

        // Store order details
        const order = {
          id: `ORD-${Date.now()}`,
          paymentId: response.razorpay_payment_id,
          amount: total,
          items: cart,
          customer: formData,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
          `order-${order.id}`,
          JSON.stringify(order)
        );

        // Clear cart and redirect
        clearCart();
        navigate(`/order-success/${order.id}`);
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setIsLoading(false);
  };

  const handleCOD = () => {
    if (!validateForm()) return;

    const order = {
      id: `ORD-${Date.now()}`,
      paymentId: "",
      amount: total,
      items: cart,
      customer: formData,
      status: "pending",
      paymentMethod: "cod",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`order-${order.id}`, JSON.stringify(order));
    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>
          <h1 className="heading-md text-foreground">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-6 md:p-8">
              {/* Delivery Address */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-foreground mb-6">
                  Delivery Address
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-8 border-t border-border">
                <h2 className="font-semibold text-lg text-foreground mb-6">
                  Payment Method
                </h2>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-foreground">
                        Online Payment (Razorpay)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pay with UPI, Credit/Debit Card, Net Banking, Wallets
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-foreground">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>
                </div>

                {/* Payment Button */}
                <button
                  onClick={
                    paymentMethod === "razorpay"
                      ? initializeRazorpay
                      : handleCOD
                  }
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader size={18} className="animate-spin" />}
                  {isLoading
                    ? "Processing..."
                    : paymentMethod === "razorpay"
                    ? "Pay Now"
                    : "Place Order"}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 h-fit sticky top-24">
              <h2 className="font-semibold text-foreground text-lg mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pb-6 border-b border-border">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="text-foreground font-medium line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-foreground font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Shipping {subtotal > 500 ? "(Free)" : ""}
                  </span>
                  <span className="text-foreground font-medium">
                    {subtotal > 500 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground text-lg">
                    Total
                  </span>
                  <span className="font-bold text-primary text-2xl">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-muted-foreground">
                <p className="flex gap-2">
                  <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>Secure & encrypted payment</span>
                </p>
                <p className="flex gap-2">
                  <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>14-day return guarantee</span>
                </p>
                <p className="flex gap-2">
                  <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>100% authentic products</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
