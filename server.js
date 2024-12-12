import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import menuRoutes from './routes/MenuRoutes.js';
import MenuItemRoutes from './routes/MenuItemRoutes.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/menuApp', {

}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Use Routes
app.use('/api', menuRoutes);
app.use('/api', MenuItemRoutes);

// Start Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
