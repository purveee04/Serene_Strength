import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();
connectDB();

const app = express();

// --- CORRECTION START ---
// Set the allowed origin dynamically based on your local setup.
// If your frontend is running via Live Server (e.g., http://127.0.0.1:5500), use that.
// If you want to be flexible, you can temporarily set it to '*' for development.
// IMPORTANT: Only use '*' for local development. Use the specific origin in production.
const allowedOrigin = '*';

// If you are still facing issues, temporarily use: const allowedOrigin = '*'; 

app.use(cors({
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
// The explicit use of res.setHeader below is often redundant when using the cors middleware correctly, 
// but is kept here for debugging/security emphasis, using the same allowedOrigin.

app.use((req, res, next) => {
    // This allows the specific client origin you need
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization'); // Added Authorization header
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Handle the Preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});
// --- CORRECTION END ---
app.use("/api/user", userRoutes);
app.use(express.json());

app.use("/api/ask", aiRoutes);
app.use("/api/auth", authRoutes); 

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  res.json({ message: "Registered successfully" });
});

app.get('/', (req, res) => {
    res.send('Server is running and healthy.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀Server running on port ${PORT}`);
});