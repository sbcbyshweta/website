import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

import loginBg from "@/assets/login.jpg";
import logo from "@/assets/dark_logo.jpg";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  /* -------------------------------- */
  /* Redirect if already logged in    */
  /* -------------------------------- */

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {

      const parsed = JSON.parse(user);

      if (parsed.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    }

  }, [navigate]);


  /* -------------------------------- */
  /* Input change handler             */
  /* -------------------------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* -------------------------------- */
  /* Create separate user storage     */
  /* -------------------------------- */

  const createUserStorage = (email: string) => {

    const key = email.toLowerCase();

    if (!localStorage.getItem(`cart_${key}`)) {
      localStorage.setItem(`cart_${key}`, JSON.stringify([]));
    }

    if (!localStorage.getItem(`wishlist_${key}`)) {
      localStorage.setItem(`wishlist_${key}`, JSON.stringify([]));
    }

    if (!localStorage.getItem(`orders_${key}`)) {
      localStorage.setItem(`orders_${key}`, JSON.stringify([]));
    }

  };


  /* -------------------------------- */
  /* Form submit                      */
  /* -------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError("");

    if (!isLogin) {

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      alert("Signup disabled in demo. Please login.");
      setIsLogin(true);

      return;

    }

    try {

      setLoading(true);

      const response = await fetch("http://localhost:8080/api/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),

      });

      const data = await response.json();

      if (!response.ok) {

        setError(data.message || "Login failed");
        return;

      }

      /* Save logged in user */

      localStorage.setItem("user", JSON.stringify(data));

      /* Create user storage */

      createUserStorage(data.email);

      /* Role based redirect */

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    }

    catch {

      setError("Server error. Try again.");

    }

    finally {

      setLoading(false);

    }

  };


  /* -------------------------------- */
  /* UI                               */
  /* -------------------------------- */

  return (

    <div className="relative min-h-screen">

      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      />

      {/* Dark + Blur Overlay */}

      <div className="absolute inset-0 bg-black/40 backdrop" />

      <Header />


      {/* Right aligned login card */}

      <div className="relative flex justify-end items-center min-h-[calc(100vh-80px)] px-10">

        <div className="w-full max-w-2xl">

          {/* Glass Card */}

          <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-12">

            {/* Logo */}

            <div className="flex justify-center mb-8">

              <Link to="/" className="flex items-center">

                <img
                  src={logo}
                  alt="company logo"
                  className="h-40 w-auto object-contain"
                />

              </Link>

            </div>


            {/* Tabs */}

            <div className="flex mb-8 border-b border-white/30">

              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-3 text-sm font-medium ${
                  isLogin
                    ? "text-white border-b-2 border-white"
                    : "text-white/60"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 pb-3 text-sm font-medium ${
                  !isLogin
                    ? "text-white border-b-2 border-white"
                    : "text-white/60"
                }`}
              >
                Sign Up
              </button>

            </div>


            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (

                <div>

                  <label className="text-sm mb-2 block text-white">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/30 border border-white/40 rounded-lg text-white placeholder-white/70"
                      placeholder="Enter your name"
                    />

                  </div>

                </div>

              )}


              {/* Email */}

              <div>

                <label className="text-sm mb-2 block text-white">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/30 border border-white/40 rounded-lg text-white placeholder-white/70"
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              {/* Password */}

              <div>

                <label className="text-sm mb-2 block text-white">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-white/30 border border-white/40 rounded-lg text-white placeholder-white/70"
                    placeholder="Enter password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {error && (
                <p className="text-red-300 text-sm">{error}</p>
              )}


              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#f6c88f] to-[#e6a96b] text-white hover:opacity-90 transition"
              >

                {loading
                  ? "Logging in..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}