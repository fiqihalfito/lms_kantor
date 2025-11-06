// seed.ts (complete with all tables)
import { db } from "./connect";
import {
    mLayanan, mSubBidang, tDokumen, mUser, mTeam,
    tStatusBaca, tKuis, tKuisProgress, tKuisElement,
    mSkill
} from "./schema/schema";
import { sql } from "drizzle-orm";

async function main() {
    console.time("🌱 Seeding completed in");

    // 0️⃣ Bersihkan semua tabel (urutan penting karena foreign key)
    console.log("🧹 Truncating all tables...");
    await db.execute(sql`
        TRUNCATE TABLE 
            ${tKuisElement}, 
            ${tKuisProgress}, 
            ${tKuis}, 
            ${tStatusBaca}, 
            ${tDokumen}, 
            ${mTeam}, 
            ${mSkill}, 
            ${mUser}, 
            ${mLayanan}, 
            ${mSubBidang} 
        CASCADE;
    `);

    // 1️⃣ Insert sub bidang
    console.log("📁 Seeding sub bidang...");
    const subBidang = [
        { idSubBidang: "s1", slug: "apkpp1", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 1" },
        { idSubBidang: "s2", slug: "apkpp2", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 2" },
        { idSubBidang: "s3", slug: "apkpp3", nama: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 3" },
    ];
    await db.insert(mSubBidang).values(subBidang);
    const mapSlug = Object.fromEntries(subBidang.map((s) => [s.idSubBidang, s.slug]));



    // 2️⃣ Insert layanan dengan UUID hardcoded
    console.log("🔧 Seeding layanan...");
    const layananS1 = [
        "AMS", "ETRANSPORT & EMEETING", "PLN KITA", "ICOFR", "PLN DAILY", "PLN FIT", "WEB KORPORAT", "MAXICO EPI",
        "MOTION TCO", "MOTION PMO", "CSMS", "Cash management CRM BAG", "Cash Management Odoo", "ITEMS", "ESPPD",
        "Maxico PLN", "SMARTER", "PLN Cerdas", "PMO PLN", "SILM PLN", "Alih Daya", "DMovement", "Dashboard CR JR",
        "LISDES", "SPIN", "IET", "GASPRO", "SIDITA", "RPA EPI", "ERBAS", "NEWVC", "E-PROC BAG", "CRM FM BAG", "CRM FM BBN", "BDTC"
    ];

    const layananData = [
        ...layananS1.map((nama, idx) => ({
            idLayanan: `10000000-1000-4000-8000-${String(idx).padStart(12, '0')}`,
            idSubBidang: "s1",
            nama
        })),
        { idLayanan: "20000000-2000-4000-8000-000000000001", idSubBidang: "s2", nama: "Layanan apkpp2 - A" },
        { idLayanan: "20000000-2000-4000-8000-000000000002", idSubBidang: "s2", nama: "Layanan apkpp2 - B" },
        { idLayanan: "30000000-3000-4000-8000-000000000001", idSubBidang: "s3", nama: "Layanan apkpp3 - A" },
        { idLayanan: "30000000-3000-4000-8000-000000000002", idSubBidang: "s3", nama: "Layanan apkpp3 - B" },
    ];
    await db.insert(mLayanan).values(layananData);

    // Mapping layanan
    const mapLayanan = Object.fromEntries(layananData.map((l) => [l.nama!, l.idLayanan]));

    // 4️⃣ Insert Team dengan UUID hardcoded
    console.log("👨‍👩‍👧‍👦 Seeding teams...");
    const teamData = [
        { idTeam: "aaaaaaaa-aaaa-4000-8000-000000000001", nama: "DBA", idSubBidang: "s1" },
        { idTeam: "aaaaaaaa-aaaa-4000-8000-000000000002", nama: "Devops", idSubBidang: "s1" },
    ];
    await db.insert(mTeam).values(teamData);

    const mapTeam = Object.fromEntries(teamData.map((t) => [t.nama!, t.idTeam]));

    // 1️⃣ Insert skill
    console.log("👨‍👩‍👧‍👦 Seeding skill...");
    const skillData = [
        {
            idSkill: "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
            idTeam: mapTeam["DBA"],
            namaSkill: "PostgreSQL",
            idSubBidang: "s1",
        },
        {
            idSkill: "bc42e7d8-90e0-4f7f-97b0-0f7c5cbaf1e7",
            idTeam: mapTeam["DBA"],
            namaSkill: "SQL Server",
            idSubBidang: "s1",
        },
        {
            idSkill: "d3fba0e6-9b26-4b76-953f-59d847dc5f24",
            idTeam: mapTeam["Devops"],
            namaSkill: "Kubernetes",
            idSubBidang: "s1",
        },
        {
            idSkill: "e60c18f0-2e52-4e11-a9bb-b8438c2f9f90",
            idTeam: mapTeam["Devops"],
            namaSkill: "Git",
            idSubBidang: "s1",
        },
    ];
    await db.insert(mSkill).values(skillData);
    const mapSkill = Object.fromEntries(skillData.map((s) => [s.namaSkill!, s.idSkill]));

    // 3️⃣ Insert users dengan UUID hardcoded
    console.log("👤 Seeding users...");
    const userS1Names = [
        // DBA Team - 18 orang
        "Achmad Ridwan", "Andi Abd Jalil", "Ando Pratama Wibawa", "Asdin Wahyu Pamungkas", "Bayu Tri Sulistyo",
        "Citra Hafitasari", "Doand Panjaitan", "Dwiky Melinia Eriani", "Fahri Bagus Firmansyah", "Felisia Mascarehas",
        "Hananta Prasetia", "Ikrar Harvy", "Kamila Aprilia", "Latif Unggul Irfanto", "Mahrunisa Indah",
        "Muhammad Ridha HAKIM", "Nabila Fidasari", "Rizky Ramdani",
        // Devops Team - 19 orang
        "Afrizal Aulia Zulfikar", "Agnesia Indryany Mangopo", "Agung Ramadhan Febrianto", "Agung Surya Nugraha",
        "Alia Ahadi Argasah", "Alivia Paradhita", "Andika Putra", "Annisya Amanda Safira", "Ayu Pebriani",
        "Eduward S.", "Fajri Noor Syarif", "Gloria Jelita Putri Meisya Nugroho", "Lutfiah Sania Sumardi",
        "Muamar", "Muhammad Ikhwan Perwira", "Oktori Thio Nugroho", "Rizkia Kamila Romainur",
        "Sekar Melati Arum Sari", "Tedi Mahendra",
    ];

    const usersS1 = userS1Names.map((nama, idx) => {
        const slug = nama.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z.]/g, "");
        return {
            idUser: `11111111-1111-4000-8000-${String(idx).padStart(12, '0')}`,
            email: `${slug}@${mapSlug["s1"]}.example.com`,
            nama,
            idSubBidang: "s1",
            password: "123",
            idTeam: idx <= 17 ? mapTeam["DBA"] : mapTeam["Devops"]
        };
    });

    const usersOther = [
        { idUser: "22222222-2222-4000-8000-000000000001", email: `alex.${mapSlug["s2"]}@example.com`, nama: "Alex Prakoso", idSubBidang: "s2", password: "123" },
        { idUser: "22222222-2222-4000-8000-000000000002", email: `bima.${mapSlug["s2"]}@example.com`, nama: "Bima Nugraha", idSubBidang: "s2", password: "123" },
        { idUser: "33333333-3333-4000-8000-000000000001", email: `chandra.${mapSlug["s3"]}@example.com`, nama: "Chandra Permadi", idSubBidang: "s3", password: "123" },
        { idUser: "33333333-3333-4000-8000-000000000002", email: `dina.${mapSlug["s3"]}@example.com`, nama: "Dina Kurniawati", idSubBidang: "s3", password: "123" },
    ];

    await db.insert(mUser).values([...usersS1, ...usersOther]);

    // Mapping user
    const mapUser = Object.fromEntries([...usersS1, ...usersOther].map((u) => [u.email!, u.idUser]));



    // 5️⃣ Insert Member Team dengan UUID hardcoded
    // console.log("🤝 Seeding team members...");
    // const dbaUsers = usersS1.slice(0, 18);
    // const devopsUsers = usersS1.slice(18);

    // const dbaMembers = dbaUsers.map((user, idx) => ({
    //     idMemberTeam: `bbbbbbbb-bbbb-4000-8000-${String(idx).padStart(12, '0')}`,
    //     idTeam: mapTeam["DBA"],
    //     idUser: mapUser[user.email],
    // }));

    // const devopsMembers = devopsUsers.map((user, idx) => ({
    //     idMemberTeam: `cccccccc-cccc-4000-8000-${String(idx).padStart(12, '0')}`,
    //     idTeam: mapTeam["Devops"],
    //     idUser: mapUser[user.email],
    // }));

    // await db.insert(mMemberTeam).values([...dbaMembers, ...devopsMembers]);

    // 6️⃣ Insert dokumen dengan UUID hardcoded
    console.log("📄 Seeding dokumen...");
    const dokumenData = [
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000001",
            judul: "SOP Backup AMS",
            tipe: "SOP",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["AMS"],
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email],
            idTeam: mapTeam["DBA"],
            idSkill: mapSkill["PostgreSQL"]
        },
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000002",
            judul: "Instruksi Kerja ESPPD",
            tipe: "IK",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["ESPPD"],
            idSubBidang: "s1",
            idUser: mapUser[usersS1[1].email],
            idTeam: mapTeam["DBA"],
            idSkill: mapSkill["SQL Server"]
        },
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000003",
            judul: "Panduan apkpp2 - A",
            tipe: "Knowledge",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["Layanan apkpp2 - A"],
            idSubBidang: "s2",
            idUser: mapUser[`alex.${mapSlug["s2"]}@example.com`],
            idTeam: null,
            idSkill: mapSkill["PostgreSQL"]
        },
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000004",
            judul: "Checklist apkpp3 - A",
            tipe: "SOP",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["Layanan apkpp3 - A"],
            idSubBidang: "s3",
            idUser: mapUser[`chandra.${mapSlug["s3"]}@example.com`],
            idTeam: null,
            idSkill: mapSkill["PostgreSQL"]
        },
    ];

    await db.insert(tDokumen).values(dokumenData);

    // 7️⃣ Insert status baca
    console.log("📖 Seeding status baca...");
    const statusBacaData = [
        {
            idStatusBaca: "eeeeeeee-eeee-4000-8000-000000000001",
            idUser: mapUser[usersS1[2].email],
            idDokumen: dokumenData[0].idDokumen,
            isRead: true,
            countRead: 3,
        },
        {
            idStatusBaca: "eeeeeeee-eeee-4000-8000-000000000002",
            idUser: mapUser[usersS1[3].email],
            idDokumen: dokumenData[0].idDokumen,
            isRead: false,
            countRead: 1,
        },
    ];
    await db.insert(tStatusBaca).values(statusBacaData);

    // 8️⃣ Insert kuis
    console.log("📝 Seeding kuis...");
    const kuisData = [
        {
            idKuis: "ffffffff-ffff-4000-8000-000000000001",
            idDokumen: dokumenData[0].idDokumen,
            idSubBidang: "s1",
        },
    ];
    await db.insert(tKuis).values(kuisData);

    // 9️⃣ Insert kuis element
    console.log("❓ Seeding kuis element...");
    const kuisElementData = [
        {
            idKuisElement: "11111111-ffff-4000-8000-000000000001",
            idKuis: kuisData[0].idKuis,
            soal: "Apa kepanjangan dari AMS?",
            pilgan: JSON.stringify({
                A: "Asset Management System",
                B: "Application Management System",
                C: "Automated Management System",
                D: "Advanced Monitoring System"
            }),
            jawaban: "A",
        },
        {
            idKuisElement: "11111111-ffff-4000-8000-000000000002",
            idKuis: kuisData[0].idKuis,
            soal: "Berapa kali backup harus dilakukan dalam sehari?",
            pilgan: JSON.stringify({
                A: "1 kali",
                B: "2 kali",
                C: "3 kali",
                D: "4 kali"
            }),
            jawaban: "B",
        },
    ];
    await db.insert(tKuisElement).values(kuisElementData);

    // 🔟 Insert kuis progress
    console.log("📊 Seeding kuis progress...");
    const kuisProgressData = [
        {
            idKuisProgress: "22222222-ffff-4000-8000-000000000001",
            idKuis: kuisData[0].idKuis,
            idUser: mapUser[usersS1[4].email],
            jumlahBenar: 2,
            jawabanSet: JSON.stringify({ "1": "A", "2": "B" }),
            isSelesai: true,
        },
        {
            idKuisProgress: "22222222-ffff-4000-8000-000000000002",
            idKuis: kuisData[0].idKuis,
            idUser: mapUser[usersS1[5].email],
            jumlahBenar: 1,
            jawabanSet: JSON.stringify({ "1": "A", "2": "C" }),
            isSelesai: true,
        },
    ];
    await db.insert(tKuisProgress).values(kuisProgressData);

    console.timeEnd("🌱 Seeding completed in");
    console.log("✅ Data lengkap: subbidang, layanan, user, team, member team, dokumen, status baca, kuis, kuis element, kuis progress");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });