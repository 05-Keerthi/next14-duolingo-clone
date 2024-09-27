import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql", // Change this to "mysql" or "sqlite" if needed
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Change from connectionString to url
    },
});




// import "dotenv/config";
// import type { Config } from "drizzle-kit";

// const config: Config = {
//     schema: "./db/schema.ts",
//     out: "./drizzle",
//     driver: "pg", // Keep this as is
//     dbCredentials: {
//         connectionString: process.env.DATABASE_URL!,
//     },
// };

// export default config;
