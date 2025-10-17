import { db } from "database/connect";
import { tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function deleteKuisElement(idKuisElement: string) {

    // delete dokumen data in db
    await db.delete(tKuisElement).where(eq(tKuisElement.idKuisElement, idKuisElement))

}