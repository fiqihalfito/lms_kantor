import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";


export const dokumen = pgTable('dokumen', {
    id: uuid().defaultRandom(),
    nama: text('nama'),
    jenis: varchar('jenis')
})