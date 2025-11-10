import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import protect from "./middleware/authMiddleware.js";

const router = express.Router();

// REGISTER (same as before)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username,email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// mongoose.connect("mongodb://127.0.0.1:27017/serene_strength")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection failed:", err));

// app.listen(5000, () => console.log("Server running on port 5000"));
// LOGIN (creates JWT token)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------------------------------------------
// NEW ROUTE: DELETE USER ACCOUNT
// Endpoint: DELETE /api/auth/delete-account
// ------------------------------------------------------------------
router.post("/delete-account", protect, async (req, res) => {
    try {
        // The 'protect' middleware ensures req.user is set.
        const userIdToDelete = req.user._id; 
        
        // Find and remove the user from the database
        const result = await User.findByIdAndDelete(userIdToDelete);

        if (!result) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        // Success Response
        res.status(200).json({ message: 'Account deleted successfully.' });

    } catch (error) {
        console.error('Account deletion failed:', error);
        res.status(500).json({ message: 'Server error during account deletion.' });
    }
});
export default router;
