import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// --- Profile ---
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// --- Daily data ---
router.get("/daily", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.daily);
});

router.put("/daily", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  user.daily = { ...user.daily, ...req.body };
  await user.save();
  res.json({ success: true });
});

// --- Weekly goals ---
router.get("/weekly", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.weekly);
});

router.put("/weekly", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  user.weekly = { ...user.weekly, ...req.body };
  await user.save();
  res.json({ success: true });
});

// --- Favorites ---
router.get("/favorites", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.favorites || []);
});

router.post("/favorites", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const { item } = req.body;
  if (!user.favorites.includes(item)) user.favorites.push(item);
  await user.save();
  res.json({ success: true, favorites: user.favorites });
});

// --- Activity map ---
router.get("/activity", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.activity || {});
});

router.put("/activity", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const { date, minutes } = req.body;
  user.activity.set(date, minutes);
  await user.save();
  res.json({ success: true });
});

export default router;
