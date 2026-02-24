import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Import models and associations BEFORE routes
import './Model/User/index.js';
import './Model/Admin/UserModel.js';
import './Model/Admin/SkillModel.js';
import './Model/Admin/ReportModel.js';

// Import database connection
import { connection } from './database/db.js';

// Routes
import authRoutes from './Routes/authRoute.js';
import userRoutes from './Routes/User/userRoutes.js';
import skillRoutes from './Routes/User/skillRoutes.js';
import skillRequestRoutes from './Routes/User/skillRequestRoutes.js';
import messageRoutes from './Routes/User/messageRoutes.js';
import reviewRoutes from './Routes/User/reviewRoutes.js';
import adminRoutes from './Routes/Admin/adminRoutes.js';

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Start database connection
connection();

// Test route
app.get('/', (req, res) => {
  res.send('SkillSwap API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/requests', skillRequestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});