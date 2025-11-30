import { db } from "database/connect";
import { mTeam, mUser } from "database/schema/schema";
import { and, asc, eq, isNull, ne } from "drizzle-orm";


export async function getAllMemberTeamByIdTeam(idSubBidang: string, idTeam: string) {
    // const res = await db.query.mMemberTeam.findMany({
    //     where: eq(mMemberTeam.idTeam, idTeam),
    //     with: {
    //         user: true
    //     },
    // })
    const res = await db
        .select()
        .from(mUser)
        // .innerJoin(mUser, eq(mMemberTeam.idUser, mUser.idUser))
        .where(and(
            idTeam === "noteam" ? isNull(mUser.idTeam) : eq(mUser.idTeam, idTeam),
            eq(mUser.idSubBidang, idSubBidang)
        ))
        .orderBy(asc(mUser.nama));

    return res

}

export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}

export async function getTeamName(idTeam: string) {
    const res = await db.select({ namaTeam: mTeam.nama }).from(mTeam).where(eq(mTeam.idTeam, idTeam))
    return res
}

export async function getOtherTeamDataExceptThisTeam(idTeam: string) {
    const res = await db.select().from(mTeam).where(ne(mTeam.idTeam, idTeam))
    return res
}