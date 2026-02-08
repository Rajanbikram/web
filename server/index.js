import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './database/db.js';

// Load environment variables FIRST
dotenv.config();

// ✅ Import User model BEFORE database connection
import { User } from './Model/usermodel.js';

// Routes
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productroute.js";
import authRoute from "./Routes/authRoute.js";

const app = express();

// ✅ FIXED CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Start database connection
connection();

// Test route
app.get('/', (req, res) => {
  res.send('RentEasy Nepal API is running...');
});

// API Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/auth', authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});