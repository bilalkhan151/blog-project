import mysql from 'mysql2/promise';

// Create connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Bilalkk10?',        
    database: 'blog_app',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function query({ query, values = [] }) {
    try {
        const [results] = await pool.execute(query, values);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

export default pool;