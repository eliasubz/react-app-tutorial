const express = require('express');
const openai = require('openai');
const router = express.Router();

openai.apiKey = process.env.OPEN_API_KEY;

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid message prompt' });
    }
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
        });
        res.json({ reply: response.data.choices[0].text });
    } catch (err) {
        console.error('Error communicating with ChatGPT:', err);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;