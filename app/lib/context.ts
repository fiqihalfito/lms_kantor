import { createContext } from "react-router";
import type { SessionUser } from "./session.server";

export const userContext = createContext<SessionUser | null>(null);
