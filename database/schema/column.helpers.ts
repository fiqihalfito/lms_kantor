import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
    updatedAt: timestamp({ mode: "string", precision: 6, withTimezone: true }),
    createdAt: timestamp({ mode: "string", precision: 6, withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp({ mode: "string", precision: 6, withTimezone: true }),
}


