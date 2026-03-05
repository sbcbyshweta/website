import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useWishlist } from "@/context/WishlistContext";
import { LogOut, Heart, MapPin, User, Package, Trash2, Plus, Edit2 } from "lucide-react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface SavedAddress {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      navigate("/login");
      return;
    }

    // Load saved addresses
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }

    // Load orders
    const allOrders: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("order-")) {
        allOrders.push(JSON.parse(localStorage.getItem(key) || "{}"));
      }
    }
    setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddAddress = (newAddress: SavedAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((a) => a.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="heading-md text-foreground">My Account</h1>
            <p className="text-muted-foreground">
              Welcome, {userData.firstName}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {/* Profile Info */}
              <div className="p-6 border-b border-border bg-gradient-to-br from-primary/10 to-accent/5">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-3 shadow-md">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
                <p className="font-semibold text-foreground text-lg">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>

              {/* Navigation */}
              <nav className="p-3 space-y-1">
                {[
                  { id: "orders", label: "My Orders", icon: Package },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  { id: "profile", label: "Profile", icon: User },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-semibold text-lg text-foreground mb-6">
                  My Orders & Tracking
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const statusSteps = ["pending", "confirmed", "shipped", "delivered"];
                      const currentStep = statusSteps.indexOf(order.status || "pending");

                      return (
                        <div
                          key={order.id}
                          className="border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold text-foreground text-base">
                                Order #{order.id.substring(0, 8)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <span
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.status === "confirmed"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>

                          {/* Order Tracking Timeline */}
                          <div className="mb-6 py-4">
                            <div className="flex justify-between items-center mb-4">
                              {["Pending", "Confirmed", "Shipped", "Delivered"].map(
                                (step, idx) => (
                                  <div key={step} className="flex flex-col items-center flex-1">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                        idx <= currentStep
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-border text-muted-foreground"
                                      }`}
                                    >
                                      ✓
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-2 text-center">
                                      {step}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="flex justify-between">
                              {["", "", ""].map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`h-1 flex-1 mx-1 rounded-full transition-colors ${
                                    idx < currentStep
                                      ? "bg-primary"
                                      : "bg-border"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-border pt-4 flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {order.items.length} item
                                {order.items.length !== 1 ? "s" : ""}
                              </p>
                              <p className="font-bold text-primary text-lg">
                                ₹{order.amount.toLocaleString()}
                              </p>
                            </div>
                            <Link
                              to={`/order-success/${order.id}`}
                              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package
                      size={48}
                      className="text-muted-foreground mx-auto mb-4 opacity-50"
                    />
                    <p className="text-muted-foreground mb-4 text-base">
                      No orders yet
                    </p>
                    <Link
                      to="/category/kanha-ji-dresses"
                      className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-semibold text-lg text-foreground mb-6">
                  My Wishlist
                </h2>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <p className="font-medium text-foreground mb-2 line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-primary font-bold mb-3">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Link
                              to={`/product/${item.id}`}
                              className="flex-1 py-2 bg-primary text-primary-foreground rounded text-center text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="flex-1 py-2 border border-border text-red-600 rounded text-center text-sm font-medium hover:bg-red-50 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart
                      size={48}
                      className="text-muted-foreground mx-auto mb-4 opacity-50"
                    />
                    <p className="text-muted-foreground mb-4">
                      No items in wishlist
                    </p>
                    <Link
                      to="/category/kanha-ji-dresses"
                      className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg text-foreground">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() => {
                      const newAddress: SavedAddress = {
                        id: Date.now().toString(),
                        firstName: "",
                        lastName: "",
                        phone: "",
                        address: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        country: "India",
                        isDefault: false,
                      };
                      handleAddAddress(newAddress);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Plus size={18} />
                    Add New
                  </button>
                </div>

                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-foreground">
                            {addr.firstName} {addr.lastName}
                          </h3>
                          {addr.isDefault && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {addr.address}
                          <br />
                          {addr.city}, {addr.state} {addr.zipCode}
                          <br />
                          {addr.country}
                          <br />
                          {addr.phone}
                        </p>

                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-border rounded text-foreground hover:bg-secondary transition-colors text-sm font-medium">
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 border border-border rounded text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin
                      size={48}
                      className="text-muted-foreground mx-auto mb-4 opacity-50"
                    />
                    <p className="text-muted-foreground mb-4">
                      No saved addresses
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg text-foreground">
                    Profile Settings
                  </h2>
                  {!editingProfile && (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:bg-secondary rounded-lg transition-colors text-sm font-medium"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>
                  )}
                </div>

                {editingProfile ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.firstName}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.lastName}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="flex-1 py-2 border border-border rounded-lg hover:bg-secondary transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          First Name
                        </p>
                        <p className="text-foreground font-medium">
                          {userData.firstName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Last Name
                        </p>
                        <p className="text-foreground font-medium">
                          {userData.lastName}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="text-foreground font-medium">
                        {userData.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Phone
                      </p>
                      <p className="text-foreground font-medium">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
