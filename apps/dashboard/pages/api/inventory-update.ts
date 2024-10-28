// apps/dashboard/pages/api/update-inventory.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { productId, quantity } = req.body;
    const response = await axios.post(`http://localhost:3000/api/inventory-update`, {
      productId, quantity,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory' });
  }
};
