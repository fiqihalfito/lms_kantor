import * as schema from './schema';
// import * as relations from './relations'
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    // connectionString: "postgresql://lmsdev:lmsdev@localhost:1414/lmsdb",
});

export const db = drizzle({
    client: pool,
    schema: {
        ...schema,
        //  ...relations
    },
    // logger: true
});
