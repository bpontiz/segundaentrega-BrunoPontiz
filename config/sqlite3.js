import * as dotenv from 'dotenv';

dotenv.config();
const optionsSqlite3 = {
    client: "sqlite3",
    connection: {
        filename: "./database/ecommerce.sqlite"
    },
    useNullAsDefault: true
};

export default optionsSqlite3;