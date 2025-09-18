// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schema.ts",
    dbCredentials: {
        url: "postgresql://lmsdev:lmsdev@localhost:1414/lmsdb"
    }
});
