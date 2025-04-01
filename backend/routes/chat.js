const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // ✅ Correct import
const router = express.Router();
require("dotenv").config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Invalid message prompt" });
    }

    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
        const response = await model.generateContent({ contents: [{ role: "user", parts: [{ text: message }] }] });

        console.log("Full Response:", JSON.stringify(response, null, 2));

        const reply = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log("Extracted Text:", reply);

        res.json({ reply });
    } catch (err) {
        console.error("Error communicating with Gemini API:", err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
