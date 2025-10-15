import { db } from "database/connect";
import { mMemberTeam } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function transferMemberToAnotherTeam({
    originTeam,
    destinationTeam,
    idUser
}: {
    originTeam: string,
    destinationTeam: string,
    idUser: string
}) {
    await db.update(mMemberTeam).set({
        idTeam: destinationTeam,
    }).where(and(eq(mMemberTeam.idTeam, originTeam), eq(mMemberTeam.idUser, idUser)))
}