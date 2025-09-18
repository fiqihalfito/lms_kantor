import { seed } from "drizzle-seed";
import { db } from "./connect";
import { dokumen } from './schema';

async function main() {
    await db.insert(dokumen).values([
        { nama: "Dokumen 1", jenis: "SOP" },
        { nama: "Dokumen 2", jenis: "IK" },
        { nama: "Dokumen 3", jenis: "Knowledge" },
        { nama: "Dokumen 4", jenis: "SOP" },
        { nama: "Dokumen 5", jenis: "IK" },
        { nama: "Dokumen 6", jenis: "Knowledge" },
        { nama: "Dokumen 7", jenis: "SOP" },
        { nama: "Dokumen 8", jenis: "IK" },
        { nama: "Dokumen 9", jenis: "Knowledge" },
        { nama: "Dokumen 10", jenis: "SOP" },
    ]);

    console.log("✅ Seed selesai tanpa drizzle-seed!");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });