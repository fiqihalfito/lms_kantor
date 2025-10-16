// relations.ts
import { relations } from "drizzle-orm";
import {
    mSubBidang,
    mLayanan,
    tDokumen,
    mUser,
    mTeam,
    mMemberTeam,
    tKuis,
    tKuisElement,
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
    memberTeams: many(mMemberTeam),
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
    members: many(mMemberTeam),
}));

// ===================== MemberTeam Relations =====================
export const mMemberTeamRelations = relations(mMemberTeam, ({ one }) => ({
    team: one(mTeam, {
        fields: [mMemberTeam.idTeam],
        references: [mTeam.idTeam],
    }),
    user: one(mUser, {
        fields: [mMemberTeam.idUser],
        references: [mUser.idUser],
    }),
}));

// ===================== Dokumen Relations =====================
export const tDokumenRelations = relations(tDokumen, ({ one }) => ({
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
    })
}));

// ================ Kuis Relations ==========================
export const tKuisRelations = relations(tKuis, ({ one, many }) => ({
    dokumen: one(tDokumen, {
        fields: [tKuis.idDokumen],
        references: [tDokumen.idDokumen]
    }),
    kuisElement: many(tKuisElement)
}))

export const tKuisElementRelations = relations(tKuisElement, ({ one }) => ({
    kuis: one(tKuis, {
        fields: [tKuisElement.idKuis],
        references: [tKuis.idKuis],
    }),
}));
