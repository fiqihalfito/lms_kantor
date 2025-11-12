import { boolean, char, integer, pgTable, text, unique, uuid, varchar } from "drizzle-orm/pg-core";
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

export const skillFK = {
    idSkill: uuid("id_skill").references(() => mSkill.idSkill, { onDelete: "cascade" })
}



// ===========================================================================

export const mUser = pgTable('m_user', {
    idUser: uuid('id_user').defaultRandom().primaryKey(),
    email: text('email').unique(),
    nama: text('nama'),
    password: text('password'),
    ...subBidangFK,
    ...teamFK
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

// export const mMemberTeam = pgTable('m_member_team', {
//     idMemberTeam: uuid("id_member_team").defaultRandom().primaryKey(),
//     ...teamFK,
//     ...userFK,
// })


export const tDokumen = pgTable('t_dokumen', {
    idDokumen: uuid("id_dokumen").defaultRandom().primaryKey(),
    judul: text('judul'),
    tipe: varchar('tipe'),
    filename: text('filename'),
    ...layananFK, // untuk IK
    ...subBidangFK,
    ...userFK,
    ...teamFK, // null kalau SOP, lainnya wajib
    ...skillFK, // untuk Knowledge
    ...kuisFK,
    ...timestamps,
})

export const tStatusBaca = pgTable('t_status_baca', {
    idStatusBaca: uuid("id_status_baca").defaultRandom().primaryKey(),
    ...userFK,
    ...dokumenFK,
    isRead: boolean("is_read").default(false),
    countRead: integer("count_read").default(0),
    ...timestamps
}, (t) => [
    unique().on(t.idUser, t.idDokumen)
])

export const mSkill = pgTable('m_skill', {
    idSkill: uuid("id_skill").defaultRandom().primaryKey(),
    namaSkill: text("nama_skill").notNull(),
    ...teamFK,
    ...subBidangFK
})

export const mSubSkill = pgTable('m_subskill', {
    idSubSkill: uuid("id_subskill").defaultRandom().primaryKey(),
    namaSubSkill: text("nama_subskill").notNull(),
    ...skillFK,
})

// === Kuis =================================
export const tKuis = pgTable('t_kuis', {
    idKuis: uuid("id_kuis").defaultRandom().primaryKey(),
    // idDokumen: uuid("id_dokumen").unique().notNull().references(() => tDokumen.idDokumen, { onDelete: "cascade" }),
    ...subBidangFK,
    ...timestamps
})

export const tKuisProgress = pgTable('t_kuis_progress', {
    idKuisProgress: uuid("id_kuis_progress").defaultRandom().primaryKey(),
    ...kuisFK,
    ...userFK, // orang yang jawab soal
    ...skillFK,
    jumlahBenar: integer("jumlah_benar").default(0),
    jawabanSet: text("jawaban_set"),
    isSelesai: boolean("is_selesai").default(false),
    ...timestamps
}, (t) => [
    unique().on(t.idKuis, t.idUser),
])

export const tKuisElement = pgTable('t_kuis_element', {
    idKuisElement: uuid("id_kuis_element").defaultRandom().primaryKey(),
    ...kuisFK,
    soal: text("soal"),
    pilgan: text("pilgan"),
    jawaban: char("jawaban"),
    ...timestamps
})
