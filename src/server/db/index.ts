import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const getConnectionString = () => {
    // Always use non-pooled URL in production
    if (process.env.VERCEL_ENV === 'production') {
        return process.env.POSTGRES_URL_NON_POOLING;
    }
    return process.env.DATABASE_URL;
};

const connectionString = getConnectionString();

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
        console.log('Build phase detected, using mock database');
        return mockDb as any;
    }

    if (db) return db;
    
    try {
        // Add debug logging
        console.log('Environment:', process.env.VERCEL_ENV);
        console.log('Connection type:', process.env.VERCEL_ENV === 'production' ? 'non-pooled' : 'pooled');
        // Only log the host part for security
        const hostPart = connectionString.split('@')[1]?.split('/')[0];
        console.log('Connecting to host:', hostPart);
        
        client = postgres(connectionString, {
            ssl: 'require',
            max: 1,
            connect_timeout: 10,
            idle_timeout: 20
        });
        db = drizzle(client, { schema });
        console.log('Database connection established');
        return db;
    } catch (error) {
        console.error('Failed to connect to database:', error);
        return mockDb as any;
    }
};