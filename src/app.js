import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';  // Import your authentication routes
import adminRoutes from './routes/adminRoutes.js';  // Import your admin routes

dotenv.config();  // Load environment variables from .env

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Test Route to check if the server is running
app.get('/test', (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment-management';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Start the server after MongoDB connection
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);  // Define the authentication routes
app.use('/api/admin', adminRoutes);  // Define the admin routes