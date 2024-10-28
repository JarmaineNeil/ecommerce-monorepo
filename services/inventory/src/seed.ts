import { v4 as uuidv4 } from 'uuid';
import { db, products } from "./db";

interface Product {
    id: any,
    name: string,
    inventory_count: number,
}

function seedStaticData(): Promise<Product[]> {
    return new Promise((resolve) => {
        const seedData: Product[] = [];
        let i = 50;

        while (i--) {
            const product: Product = {
                id: uuidv4(),
                name: `Product ${50 - i}`,
                inventory_count: Math.round(Math.random() * 100),
            };
            seedData.push(product);
        }

        resolve(seedData);
    });
}

async function seedDatabase() {
    try {
        let seedData = await seedStaticData();
        for (const product of seedData) {
            await db.insert(products).values(product).onConflictDoNothing();
        }
        console.log("Database seeded successfully");
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}


// Execute the seeding function
seedDatabase();