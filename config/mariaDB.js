import * as dotenv from 'dotenv';

dotenv.config();
export const optionsMysql = {
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        insecureAuth: true
    },
    pool: { min: 0, max: 10 }
}