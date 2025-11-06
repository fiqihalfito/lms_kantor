// relations.ts
import { relations } from "drizzle-orm";
import {
    mSubBidang,
    mLayanan,
    tDokumen,
    mUser,
    mTeam,
    tKuis,
    tKuisElement,
    tKuisProgress,
    tStatusBaca,
    mSkill,
    // tDokumenTeam,
} from "./schema";

// ===================== SubBidang Relations =====================
export const mSubBidangRelations = relations(mSubBidang, ({ many }) => ({
    users: many(mUser),
    layanan: many(mLayanan),
    dokumen: many(tDokumen),
    teams: many(mTeam),
}));

// ===================== User Relations =====================
export const mUserRelations = relations(mUser, ({ one, many }) => ({
    subBidang: one(mSubBidang, {
        fields: [mUser.idSubBidang],
        references: [mSubBidang.idSubBidang],
    }),
    dokumen: many(tDokumen),
    // memberTeams: many(mMemberTeam),
    // memberTeams: one(mMemberTeam, {
    //     fields: [mUser.idUser],
    //     references: [mMemberTeam.idUser]
    // }),
    team: one(mTeam, {
        fields: [mUser.idTeam],
        references: [mTeam.idTeam]
    }),
    kuisProgress: many(tKuisProgress)

}));

// ===================== Layanan Relations =====================
export const mLayananRelations = relations(mLayanan, ({ one, many }) => ({
    subBidang: one(mSubBidang, {
        fields: [mLayanan.idSubBidang],
        references: [mSubBidang.idSubBidang],
    }),
    dokumen: many(tDokumen),
}));

// ===================== Team Relations =====================
export const mTeamRelations = relations(mTeam, ({ one, many }) => ({
    subBidang: one(mSubBidang, {
        fields: [mTeam.idSubBidang],
        references: [mSubBidang.idSubBidang],
    }),
    // members: many(mMemberTeam),
    // dokumenTeam: one(tDokumenTeam, {
    //     fields: [mTeam.idTeam],
    //     references: [tDokumenTeam.idTeam]
    // })
    user: many(mUser),
    dokumen: many(tDokumen),
    skill: many(mSkill)
}));

// ===================== MemberTeam Relations =====================
// export const mMemberTeamRelations = relations(mMemberTeam, ({ one }) => ({
//     team: one(mTeam, {
//         fields: [mMemberTeam.idTeam],
//         references: [mTeam.idTeam],
//     }),
//     user: one(mUser, {
//         fields: [mMemberTeam.idUser],
//         references: [mUser.idUser],
//     }),
// }));

// ===================== Dokumen Relations =====================
export const tDokumenRelations = relations(tDokumen, ({ one, many }) => ({
    layanan: one(mLayanan, {
        fields: [tDokumen.idLayanan],
        references: [mLayanan.idLayanan],
    }),
    subBidang: one(mSubBidang, {
        fields: [tDokumen.idSubBidang],
        references: [mSubBidang.idSubBidang],
    }),
    user: one(mUser, {
        fields: [tDokumen.idUser],
        references: [mUser.idUser],
    }),
    kuis: one(tKuis, {
        fields: [tDokumen.idDokumen],
        references: [tKuis.idDokumen]
    }),
    statusBaca: many(tStatusBaca),
    // dokumenTeam: one(tDokumenTeam, {
    //     fields: [tDokumen.idDokumen],
    //     references: [tDokumenTeam.idDokumen]
    // })
    team: one(mTeam, {
        fields: [tDokumen.idTeam],
        references: [mTeam.idTeam]
    }),
    skill: one(mSkill, {
        fields: [tDokumen.idSkill],
        references: [mSkill.idSkill]
    })
}));

// export const tDokumenTeamRelations = relations(tDokumenTeam, ({ one, many }) => ({
//     // team: many(mTeam),
//     team: one(mTeam, {
//         fields: [tDokumenTeam.idTeam],
//         references: [mTeam.idTeam]
//     }),
//     dokumen: one(tDokumen, {
//         fields: [tDokumenTeam.idDokumen],
//         references: [tDokumen.idDokumen]
//     })
// }))

export const tStatusBacaRelations = relations(tStatusBaca, ({ one }) => ({
    dokumen: one(tDokumen, {
        fields: [tStatusBaca.idDokumen],
        references: [tDokumen.idDokumen]
    }),
    userBaca: one(mUser, {
        fields: [tStatusBaca.idUser],
        references: [mUser.idUser]
    })
}))

export const mSkillRelations = relations(mSkill, ({ many, one }) => ({
    dokumen: many(tDokumen),
    team: one(mTeam, {
        fields: [mSkill.idTeam],
        references: [mTeam.idTeam]
    })
}))

// ================ Kuis Relations ==========================
export const tKuisRelations = relations(tKuis, ({ one, many }) => ({
    dokumen: one(tDokumen, {
        fields: [tKuis.idDokumen],
        references: [tDokumen.idDokumen]
    }),
    kuisElement: many(tKuisElement),
    // kuisProgressOne: one(tKuisProgress, {
    //     fields: [tKuis.idKuis],
    //     references: [tKuisProgress.idKuis]
    // }),
    kuisProgress: many(tKuisProgress)
}))

export const tKuisElementRelations = relations(tKuisElement, ({ one }) => ({
    kuis: one(tKuis, {
        fields: [tKuisElement.idKuis],
        references: [tKuis.idKuis],
    }),
}));

export const tKuisProgressRelations = relations(tKuisProgress, ({ one, many }) => ({
    kuis: one(tKuis, {
        fields: [tKuisProgress.idKuis],
        references: [tKuis.idKuis],
    }),
    user: one(mUser, {
        fields: [tKuisProgress.idUser],
        references: [mUser.idUser]
    })
}));
