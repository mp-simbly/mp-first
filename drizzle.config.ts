import { type Config } from "drizzle-kit";

import { env } from "~/env";

if (!process.env.POSTGRES_URL_NON_POOLING) {
  throw new Error("POSTGRES_URL_NON_POOLING is not set");
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING,
  },
  tablesFilter: ["mp-first_*"],
} satisfies Config;
