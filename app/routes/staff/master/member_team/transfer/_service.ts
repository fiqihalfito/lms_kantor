import { db } from "database/connect";
import { mTeam, mUser } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function transferMemberToAnotherTeam({
    destinationTeam,
    idUser
}: {
    destinationTeam: string,
    idUser: string
}) {
    await db.update(mUser).set({
        idTeam: destinationTeam,
        // }).where(and(eq(mUser.idTeam, originTeam), eq(mMemberTeam.idUser, idUser)))
    }).where(eq(mUser.idUser, idUser))
}

export async function getNamaTeamById(idTeam: string) {
    const res = await db.select({ namaTeam: mTeam.nama }).from(mTeam).where(eq(mTeam.idTeam, idTeam))
    return res[0].namaTeam
}