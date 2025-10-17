import { db } from "database/connect";
import { tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function getKuisElementById(idKuisElement: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuisElement, idKuisElement))
    return res
}