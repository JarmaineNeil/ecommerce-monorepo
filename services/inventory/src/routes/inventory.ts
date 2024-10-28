import express, { Request, Response } from 'express';
import { db, products } from '../db';
import { desc, eq, sql } from 'drizzle-orm';

const router = express.Router();

interface Product {
  id: string;
  name: string | null;
  inventory_count: number | null;
}

// Update inventory when a product is purchased
router.post('/inventory-update', async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId, quantity } = req.body;

    // Check if the quantity is a valid number
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).send({ error: 'Invalid quantity' });
    }

    const product: Product[] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

    if (product.length === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }

    const currentInventory = product[0].inventory_count;

    // Check if inventory_count is null
    if (currentInventory === null) {
      return res.status(400).send({ error: 'Inventory count is not available' });
    }

    const updatedInventory = currentInventory - quantity;

    if (updatedInventory < 0) {
      return res.status(400).send({ error: 'Not enough inventory' });
    }

    const result = await db.update(products).set({ inventory_count: updatedInventory, updated_at: sql`NOW()` }).where(eq(products.id, productId));
    res.status(200).send({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Fetch inventory lists for the storefront
router.get('/inventory', async (_, res: Response): Promise<any> => {
  try {
    let result = await db.select().from(products).orderBy(products.created_at);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
})

export default router;
