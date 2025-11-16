import { createContext } from "react-router";
// import type { SessionUser } from "./session.server";
import type { mUser } from "database/schema/schema";

export type UserContextType = Omit<typeof mUser.$inferSelect, "password"> & { namaSubbidang: string | null }
export const userContext = createContext<UserContextType>();
