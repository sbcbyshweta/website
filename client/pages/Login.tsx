import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      // Signup Validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      alert("Signup is disabled in demo. Please login.");
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

      // Save logged in user
      localStorage.setItem("user", JSON.stringify(data));

      // 🔥 ROLE BASED REDIRECT
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100.SyntaxError-80px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">

            <div className="text-center mb-8">
              <span className="text-4xl font-bold text-primary">SBC</span>
              <p className="text-sm text-primary font-medium tracking-widest">
                Shweta
              </p>
            </div>

            <div className="flex gap-2 mb-8 border-b border-border">
              <button
                onClick={() => setIsLogin(true)}
                className={`pb-3 font-medium text-sm ${
                  isLogin
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`pb-3 font-medium text-sm ${
                  !isLogin
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-lg mt-6"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}