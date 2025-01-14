import express from 'express';
import inventoryRoutes from './routes/inventory';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Use the inventory routes
app.use('/api', inventoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
