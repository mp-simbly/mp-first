import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get the correct database URL based on environment
const getConnectionString = () => {
    // In production, use the Supabase URL
    if (process.env.VERCEL_ENV === 'production') {
        return process.env.DATABASE_URL_NON_POOLING;
    }
    // In development, use the local URL
    return process.env.DATABASE_URL;
};

//const connectionString = getConnectionString();
const connectionString = process.env.POSTGRES_URL_NON_POOLING;

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
    // During build time, return mock db
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return mockDb as any;
    }

    if (db) return db;
    
    try {
        console.log('Connecting to database with URL:', connectionString);
        client = postgres(connectionString, {
            ssl: 'require',
            max: 1,
        });
        db = drizzle(client, { schema });
        return db;
    } catch (error) {
        console.error('Failed to connect to database:', error);
        return mockDb as any;
    }
};
