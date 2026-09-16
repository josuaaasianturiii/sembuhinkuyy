import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connection options prioritizes DATABASE_URL if provided, else individual credentials
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'sembuhinkuy_db',
    };

const pool = new Pool(poolConfig);

// Monitor connection events
pool.on('connect', () => {
  console.log('PostgreSQL database pool connected successfully.');
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

/**
 * Execute a SQL query using pool connection
 * @param {string} text - SQL query text
 * @param {Array} params - SQL parameters
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`[SQL Query] Executed query in ${duration}ms (rows: ${res.rowCount})`);
    return res;
  } catch (error) {
    console.error(`[SQL Error] Query failed: ${text}`, error);
    throw error;
  }
};

/**
 * Test connection to PostgreSQL server
 */
export const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`[DB Check] Database connection active. Current DB time: ${res.rows[0].now}`);
    return true;
  } catch (error) {
    console.warn('[DB Check] Database connection failed or not configured. Using fallback memory store:', error.message);
    return false;
  }
};

export default pool;
