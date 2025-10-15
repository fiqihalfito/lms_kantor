// seed.ts (optimized and updated with teams)
import { db } from "./connect";
import { mLayanan, mSubBidang, tDokumen, mUser, mTeam, mMemberTeam } from "./schema/schema";
import { sql } from "drizzle-orm";

async function main() {
    console.time("🌱 Seeding completed in");

    // 0️⃣ Bersihkan semua tabel
    console.log("🧹 Truncating all tables...");
    await db.execute(sql`TRUNCATE TABLE ${tDokumen}, ${mUser}, ${mLayanan}, ${mSubBidang}, ${mTeam}, ${mMemberTeam} CASCADE;`);

    // 1️⃣ Insert sub bidang
    const subBidang = [
        { idSubBidang: "s1", slug: "apkpp1", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 1" },
        { idSubBidang: "s2", slug: "apkpp2", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 2" },
        { idSubBidang: "s3", slug: "apkpp3", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 3" },
    ];
    await db.insert(mSubBidang).values(subBidang);
    const mapSlug = Object.fromEntries(subBidang.map((s) => [s.idSubBidang, s.slug]));

    // 2️⃣ Insert layanan
    const layananS1 = [
        "AMS", "ETRANSPORT & EMEETING", "PLN KITA", "ICOFR", "PLN DAILY", "PLN FIT", "WEB KORPORAT", "MAXICO EPI",
        "MOTION TCO", "MOTION PMO", "CSMS", "Cash management CRM BAG", "Cash Management Odoo", "ITEMS", "ESPPD",
        "Maxico PLN", "SMARTER", "PLN Cerdas", "PMO PLN", "SILM PLN", "Alih Daya", "DMovement", "Dashboard CR JR",
        "LISDES", "SPIN", "IET", "GASPRO", "SIDITA", "RPA EPI", "ERBAS", "NEWVC", "E-PROC BAG", "CRM FM BAG", "CRM FM BBN", "BDTC"
    ];
    const layananData = [
        ...layananS1.map((nama) => ({ idSubBidang: "s1", nama })),
        { idSubBidang: "s2", nama: "Layanan apkpp2 - A" },
        { idSubBidang: "s2", nama: "Layanan apkpp2 - B" },
        { idSubBidang: "s3", nama: "Layanan apkpp3 - A" },
        { idSubBidang: "s3", nama: "Layanan apkpp3 - B" },
    ];
    await db.insert(mLayanan).values(layananData);

    // Ambil ID layanan
    const layananRows = await db.select().from(mLayanan);
    const mapLayanan = Object.fromEntries(layananRows.map((l) => [l.nama!, l.idLayanan]));

    // 3️⃣ Insert users
    const userS1Names = [
        // 🔹 Batch pertama (DBA Team) - 18 orang
        "Achmad Ridwan", "Andi Abd. Jalil", "Ando Pratama Wibawa", "Asdin Wahyu Pamungkas", "Bayu Tri Sulistyo",
        "Citra Hafitasari", "Doand Panjaitan", "Dwiky Melinia Eriani", "Fahri Bagus Firmansyah", "Felisia Mascarehas",
        "Hananta Prasetia", "Ikrar Harvy", "Kamila Aprilia", "Latif Unggul Irfanto", "Mahrunisa Indah",
        "Muhammad Ridha HAKIM", "Nabila Fidasari", "Rizky Ramdani",
        // 🔹 Tambahan batch kedua (Devops Team) - 12 orang
        "Afrizal Aulia Zulfikar", "Agnesia Indryany Mangopo", "Agung Ramadhan Febrianto", "Agung Surya Nugraha",
        "Alia Ahadi Argasah", "Alivia Paradhita", "Andika Putra", "Annisya Amanda Safira", "Ayu Pebriani",
        "Eduward S.", "Fajri Noor Syarif", "Gloria Jelita Putri Meisya Nugroho", "Lutfiah Sania Sumardi",
        "Muamar", "Muhammad Ikhwan Perwira", "Oktori Thio Nugroho", "Rizkia Kamila Romainur",
        "Sekar Melati Arum Sari", "Tedi Mahendra",
    ];

    const usersS1 = userS1Names.map((nama) => {
        const slug = nama.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z.]/g, "");
        return { email: `${slug}@${mapSlug["s1"]}.example.com`, nama, idSubBidang: "s1", password: "123" };
    });

    const usersOther = [
        { email: `alex.${mapSlug["s2"]}@example.com`, nama: "Alex Prakoso", idSubBidang: "s2", password: "123" },
        { email: `bima.${mapSlug["s2"]}@example.com`, nama: "Bima Nugraha", idSubBidang: "s2", password: "123" },
        { email: `chandra.${mapSlug["s3"]}@example.com`, nama: "Chandra Permadi", idSubBidang: "s3", password: "123" },
        { email: `dina.${mapSlug["s3"]}@example.com`, nama: "Dina Kurniawati", idSubBidang: "s3", password: "123" },
    ];

    await db.insert(mUser).values([...usersS1, ...usersOther]);

    // Ambil ID user
    const userRows = await db.select().from(mUser);
    const mapUser = Object.fromEntries(userRows.map((u) => [u.email!, u.idUser]));

    // 4️⃣ Insert Team
    console.log("👨‍👩‍👧‍👦 Seeding teams...");
    const teamData = [
        { nama: "DBA", idSubBidang: "s1" },
        { nama: "Devops", idSubBidang: "s1" },
    ];
    await db.insert(mTeam).values(teamData);

    // Ambil ID Team
    const teamRows = await db.select().from(mTeam);
    const mapTeam = Object.fromEntries(teamRows.map((t) => [t.nama!, t.idTeam]));

    // 5️⃣ Insert Member Team
    console.log("🤝 Seeding team members...");
    const dbaUsers = usersS1.slice(0, 18);
    const devopsUsers = usersS1.slice(18);

    const dbaMembers = dbaUsers.map(user => ({
        idTeam: mapTeam["DBA"],
        idUser: mapUser[user.email],
    }));

    const devopsMembers = devopsUsers.map(user => ({
        idTeam: mapTeam["Devops"],
        idUser: mapUser[user.email],
    }));

    await db.insert(mMemberTeam).values([...dbaMembers, ...devopsMembers]);


    // 6️⃣ Insert dokumen batch
    const dokumenData = [
        {
            judul: "SOP Backup AMS",
            tipe: "SOP",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["AMS"],
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email], // User pertama dari batch 1
        },
        {
            judul: "Instruksi Kerja ESPPD",
            tipe: "IK",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["ESPPD"],
            idSubBidang: "s1",
            idUser: mapUser[usersS1[1].email], // User kedua dari batch 1
        },
        {
            judul: "Panduan apkpp2 - A",
            tipe: "Knowledge",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["Layanan apkpp2 - A"],
            idSubBidang: "s2",
            idUser: mapUser[`alex.${mapSlug["s2"]}@example.com`],
        },
        {
            judul: "Checklist apkpp3 - A",
            tipe: "SOP",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["Layanan apkpp3 - A"],
            idSubBidang: "s3",
            idUser: mapUser[`chandra.${mapSlug["s3"]}@example.com`],
        },
    ];

    await db.insert(tDokumen).values(dokumenData);

    console.timeEnd("🌱 Seeding completed in");
    console.log("✅ Data lengkap: subbidang, layanan, user, team, member team, dokumen");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });