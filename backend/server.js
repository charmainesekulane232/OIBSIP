const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Use an environment variable for the API key or replace with your key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIzaSyD0MiNUVgxMZaxiV3JaPjPGYxPbKV4c82E');

app.post('/calculate-bmi', async (req, res) => {
    try {
        const { weight, height, gender } = req.body;
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5flash' });

        const prompt = `My height is ${height} cm and my weight is ${weight} kg, and I am ${gender}');. Can you calculate my BMI and provide a short friendly health advice?`;

        const result = await model.generateContent({ prompt });

        // Normalize response text depending on SDK shape
        let advice = '';
        if (result && result.response && typeof result.response.text === 'function') {
            advice = result.response.text();
        } else if (result && result.response && typeof result.response === 'string') {
            advice = result.response;
        } else {
            advice = JSON.stringify(result);
        }

        res.json({ advice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to Gemini');
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

        