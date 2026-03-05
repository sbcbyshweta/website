import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // -------------------------------
  // 🗄 Fake Database (Temporary)
  // -------------------------------

  const users = [
    {
      id: 1,
      email: "admin@test.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      email: "client1@test.com",
      password: "1234",
      role: "client",
    },
  ];

  let orders: any[] = [];

  // -------------------------------
  // 🔐 LOGIN API
  // -------------------------------

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  });

  // -------------------------------
  // 📝 PLACE ORDER (Client Only)
  // -------------------------------

  app.post("/api/orders", (req, res) => {
    const { userId, items, paymentMethod } = req.body;

    const newOrder = {
      id: orders.length + 1,
      userId,
      items,
      paymentMethod,
      status: "pending",
    };

    orders.push(newOrder);

    res.json(newOrder);
  });

  // -------------------------------
  // 📦 GET CLIENT ORDERS
  // -------------------------------

  app.get("/api/orders/:userId", (req, res) => {
    const userId = Number(req.params.userId);

    const userOrders = orders.filter(
      (order) => order.userId === userId
    );

    res.json(userOrders);
  });

  // -------------------------------
  // 👑 GET ALL ORDERS (Admin Only)
  // -------------------------------

  app.get("/api/admin/orders", (_req, res) => {
    res.json(orders);
  });

  // -------------------------------
  // 🏓 Ping
  // -------------------------------

  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Server running" });
  });

  return app;
}