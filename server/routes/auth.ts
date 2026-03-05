import { RequestHandler } from "express";

const users = [
  {
    id: 1,
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    email: "client@test.com",
    password: "client123",
    role: "client",
  },
];

export const login: RequestHandler = (req, res) => {
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
};