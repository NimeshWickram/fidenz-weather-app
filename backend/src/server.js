const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Debug environment variables
console.log('Environment variables:');
console.log('PORT:', process.env.PORT);
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ?
    process.env.OPENWEATHER_API_KEY.substring(0, 8) + '...' : 'NOT SET');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Weather backend server running on port ${port}`);
});