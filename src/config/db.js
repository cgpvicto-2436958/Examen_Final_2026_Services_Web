// Version du module mysql qu'on peut utiliser avec async/await
import 'dotenv/config';
import mysql from "mysql2/promise";

console.log("=== ENV CHECK ===");
console.log("HOST:", process.env.MYSQL_HOST);
console.log("USER:", process.env.MYSQL_USER);
console.log("PASS:", process.env.MYSQL_PASSWORD);
console.log("=================");


const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export default pool;