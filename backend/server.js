const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {})//, useUnifiedTopogoly: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.error(error));

const chatRoute = require('./routes/chat.js');
app.use('/chat', chatRoute);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));