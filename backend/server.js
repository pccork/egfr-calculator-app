// === BACKEND ===
// File: backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const egfrRoutes = require('./routes/egfrRoutes');
require('dotenv').config();

const useAtlas = process.env.USE_ATLAS === 'true';
const mongoUri = useAtlas ? process.env.MONGO_URI_ATLAS : process.env.MONGO_URI_LOCAL;
const adminRoutes = require('./routes/adminRoutes');



const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', adminRoutes);




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`Connected to MongoDB ${useAtlas ? 'Atlas' : 'Local'}`))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api', authRoutes);
app.use('/api', egfrRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
