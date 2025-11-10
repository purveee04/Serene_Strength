import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai"; // New Import
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// Initialize the Gemini client using the key from the .env file
// The library automatically finds the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

// 🧠 Personalized AI Assistant route
router.post("/", protect, async (req, res) => {
    const { message } = req.body;
    const user = req.user;
    
    // Crash Prevention Checks (Keep these active!)
    if (!user || !Array.isArray(user.chatHistory)) {
        console.error("User object or chat history is missing/invalid after protect middleware.");
        return res.status(403).json({ message: "Session data not complete. Please log in again." });
    }
    
    if (!message) return res.status(400).json({ error: "Message is required." });

    try {
        // --- Crash Prevention: Ensure nested objects exist ---
        const preferences = user.preferences || {};
        const traits = user.traits || {};
        // ----------------------------------------------------

        // 🔹 1. Construct System Prompt & History
        const systemPrompt = `
        You are Serene, a friendly AI wellness assistant.
        Adapt your tone based on user preferences:
        - Preferred language: ${preferences.language || "English"}
        - AI tone: ${preferences.aiTone || "friendly"}
        - User interests: ${(preferences.interests && preferences.interests.join(", ")) || "general wellness"}

        The user’s typical wellness goals include: 
        ${(traits.topicsOfInterest && traits.topicsOfInterest.join(", ")) || "fitness, nutrition, mindfulness"}.

        Be brief, warm, and helpful. Offer suggestions if relevant.
        `;

        // Map chatHistory to Gemini's format (Role: 'user' or 'model')
        const history = user.chatHistory
            .slice(-5) // Use last 5 messages for context
            .map((chat) => ({
                role: chat.sender === "user" ? "user" : "model", // 'model' is Gemini's name for the assistant
                parts: [{ text: chat.message || chat.response || '' }],
            }));
            
        // 🔹 2. Send to Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Fast, low-cost model for chat
            contents: [
                ...history, // Past chat history
                { role: "user", parts: [{ text: message }] } // Current user message
            ],
            config: {
                systemInstruction: systemPrompt, // System prompt is passed separately
            }
        });

        // Gemini's response structure is simpler
        const reply = response.text; 

        if (!reply) {
            console.error("Gemini returned an empty response.");
            return res.status(500).json({ error: "Gemini service returned an empty reply." });
        }

        // 🔹 3. Save new chat to user's history
        user.chatHistory.push(
            { message, sender: "user" },
            { response: reply, sender: "assistant" }
        );
        user.traits.lastActive = new Date();

        res.json({ reply });
    } catch (error) {
        // Log the full error to see any network issues or invalid API key errors
        console.error("CRASH DUMP IN /api/ask ROUTE (Gemini Error):", error);
        res.status(500).json({ error: "Internal Server Processing Error. Check your Gemini API Key." });
    }
});

export default router;