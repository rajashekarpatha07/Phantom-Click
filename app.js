const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Add this
const connectDB = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');
const taskRoutes = require('./src//routes/taskRoutes.js');
const errorHandler = require('./src/utils/errorHandler.js');
const rateLimiter = require('./src/middlewares/rateLimiter.js');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Add this to parse cookies
app.use(rateLimiter);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));