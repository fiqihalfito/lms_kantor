// drizzle.config.ts
import "dotenv/config"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle/dev",
    dialect: "postgresql",
    schema: "./database/schema",
    dbCredentials: {
        url: "postgresql://lmsdev:lmsdev@127.0.0.1:1414/lmsdb"
    }
});
