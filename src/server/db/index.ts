import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

let client: ReturnType<typeof postgres> | null = null;
let db: ReturnType<typeof drizzle> | null = null;

// Mock database for build time
const mockDb = {
    query: {
        posts: {
            findMany: async () => [],
        },
    },
};

export const getDb = () => {
    if (db) return db;
    
    try {
        client = postgres(connectionString);
        db = drizzle(client, { schema });
        return db;
    } catch (error) {
        console.error('Failed to connect to database:', error);
        // Return mock db for build time
        return mockDb as any;
    }
};
