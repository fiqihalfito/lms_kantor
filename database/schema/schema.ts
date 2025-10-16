import { char, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";

// ====================== column helper DRY ===============================
export const subBidangFK = {
    idSubBidang: char("id_subbidang", { length: 3 })
        .notNull()
        .references(() => mSubBidang.idSubBidang, { onDelete: "cascade", onUpdate: "cascade" }),
}

export const layananFK = {
    idLayanan: uuid("id_layanan").references(() => mLayanan.idLayanan, { onDelete: "cascade" })
}

export const userFK = {
    idUser: uuid("id_user").references(() => mUser.idUser, { onDelete: "cascade" })
}

export const teamFK = {
    idTeam: uuid("id_team").references(() => mTeam.idTeam, { onDelete: "cascade" })
}

export const dokumenFK = {
    idDokumen: uuid("id_dokumen").references(() => tDokumen.idDokumen, { onDelete: "cascade" })
}

export const kuisFK = {
    idKuis: uuid("id_kuis").references(() => tKuis.idKuis, { onDelete: "cascade" })
}


// ===========================================================================

export const mUser = pgTable('m_user', {
    idUser: uuid('id_user').defaultRandom().primaryKey(),
    email: text('email').unique(),
    nama: text('nama'),
    password: text('password'),
    ...subBidangFK
})

export const mSubBidang = pgTable('m_subbidang', {
    idSubBidang: char("id_subbidang", { length: 3 }).primaryKey(),
    slug: char("slug", { length: 6 }).unique(),
    nama: text('nama')
})

export const mLayanan = pgTable('m_layanan', {
    idLayanan: uuid("id_layanan").defaultRandom().primaryKey(),
    nama: text('nama'),
    ...subBidangFK,
})

export const mTeam = pgTable('m_team', {
    idTeam: uuid("id_team").defaultRandom().primaryKey(),
    nama: text('nama'),
    ...subBidangFK,
})

export const mMemberTeam = pgTable('m_member_team', {
    idMemberTeam: uuid("id_member_team").defaultRandom().primaryKey(),
    ...teamFK,
    ...userFK,
})


export const tDokumen = pgTable('t_dokumen', {
    idDokumen: uuid("id_dokumen").defaultRandom().primaryKey(),
    judul: text('judul'),
    tipe: varchar('tipe'),
    filename: text('filename'),
    ...layananFK,
    ...subBidangFK,
    ...userFK,
    ...timestamps
})

// === Kuis =================================
export const tKuis = pgTable('t_kuis', {
    idKuis: uuid("id_kuis").defaultRandom().primaryKey(),
    idDokumen: uuid("id_dokumen").unique().notNull().references(() => tDokumen.idDokumen, { onDelete: "cascade" }),
})

export const tKuisProgress = pgTable('t_kuis_progress', {
    idKuisProgress: uuid("id_kuis_progress").defaultRandom().primaryKey(),
    ...kuisFK,
    ...userFK, // orang yang jawab soal
    jumlahBenar: integer("jumlah_benar").default(0),
    ...timestamps

})

export const tKuisElement = pgTable('t_kuis_element', {
    idKuisElement: uuid("id_kuis_element").defaultRandom().primaryKey(),
    ...kuisFK,
    soal: text("soal"),
    pilgan: text("pilgan"),
    jawaban: char("jawaban")
})
