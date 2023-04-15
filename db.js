import pg from "pg";
const pool= new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  });
module.export =pool;