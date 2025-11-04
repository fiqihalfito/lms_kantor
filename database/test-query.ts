import { and, eq } from "drizzle-orm";
import { db } from "./connect";
import { mMemberTeam, mSubBidang, mTeam, mUser, tDokumen, tKuis, tKuisProgress } from "./schema/schema";


async function main() {
    const idSubBidang = "s1"
    const res = await db.select()
        .from(mUser)
        .fullJoin(tDokumen, eq(mUser.idUser, tDokumen.idDokumen))
        .leftJoin(tKuisProgress, eq(tKuisProgress.idUser, mUser.idUser))
        .leftJoin(mSubBidang, eq(mUser.idSubBidang, mSubBidang.idSubBidang))
        .leftJoin(mTeam, eq(mTeam.idSubBidang, mSubBidang.idSubBidang))
        .leftJoin(mMemberTeam, eq(mMemberTeam.idUser, mUser.idUser))
        // .leftJoin(tKuis, eq(tKuis.idDokumen, tDokumen.idDokumen))
        .leftJoin(tKuis, eq(tKuis.idKuis, tKuisProgress.idKuis))
        .where(and(
            eq(mUser.idSubBidang, idSubBidang)
        ))

    const filter = res.filter(item => item.t_kuis_progress !== null)

    console.log(filter);
    // return res

}

main().then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });