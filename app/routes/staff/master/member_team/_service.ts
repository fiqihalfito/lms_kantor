import { db } from "database/connect";
import { mMemberTeam, mTeam, mUser } from "database/schema/schema";
import { asc, eq, ne } from "drizzle-orm";


export async function getAllMemberTeamByIdTeam(idTeam: string) {
    // const res = await db.query.mMemberTeam.findMany({
    //     where: eq(mMemberTeam.idTeam, idTeam),
    //     with: {
    //         user: true
    //     },
    // })
    const res = await db
        .select()
        .from(mMemberTeam)
        .innerJoin(mUser, eq(mMemberTeam.idUser, mUser.idUser))
        .where(eq(mMemberTeam.idTeam, idTeam))
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