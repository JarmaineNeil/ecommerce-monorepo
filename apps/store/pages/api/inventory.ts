// apps/store/pages/api/inventory.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/inventory');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory' });
  }
};
