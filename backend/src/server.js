const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api', weatherRoutes);

app.listen(port, () => {
  console.log(`Weather backend server running on port ${port}`);
});