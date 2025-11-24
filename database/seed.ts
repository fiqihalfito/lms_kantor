// seed.ts (complete with all tables)
import { db } from "./connect";
import {
    mLayanan, mSubBidang, tDokumen, mUser, mTeam,
    tStatusBaca, tKuis, tKuisProgress, tKuisElement,
    mSkill,
    mSubSkill
} from "./schema/schema";
import { sql, eq } from "drizzle-orm";
import { seedSubskill, seedSubskillAdministrasiOS } from "./seed-subskill";
import { seedBackupAplikasi, seedContainerizationDocker, seedContainerizationKubernetes, seedGitGitlab, seedLinuxServer, seedLogAnalisis, seedLogManagement, seedMonitoring, seedRestoreAplikasi, seedSecurityOS, seedVirtualMachine, seedWebServer, seedWindowsServer } from "./seed-devops";

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
            idSkill: "b9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
            idTeam: mapTeam["DBA"],
            namaSkill: "MySQL",
            idSubBidang: "s1",
        },
        {
            idSkill: "c9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
            idTeam: mapTeam["DBA"],
            namaSkill: "SQL Server",
            idSubBidang: "s1",
        },
        {
            idSkill: "d9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
            idTeam: mapTeam["DBA"],
            namaSkill: "MongoDB",
            idSubBidang: "s1",
        },
        {
            idSkill: "e9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
            idTeam: mapTeam["DBA"],
            namaSkill: "Administrasi Linux",
            idSubBidang: "s1",
        },
        {
            idSkill: "d3fba0e6-9b26-4b76-953f-59d847dc5f24",
            idTeam: mapTeam["DBA"],
            namaSkill: "Administrasi Windows",
            idSubBidang: "s1",
        },
        // devops
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000001",
            idTeam: mapTeam["Devops"],
            namaSkill: "Virtual Machine",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000002",
            idTeam: mapTeam["Devops"],
            namaSkill: "Linux Server",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000003",
            idTeam: mapTeam["Devops"],
            namaSkill: "Windows Server",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000004",
            idTeam: mapTeam["Devops"],
            namaSkill: "Web Server",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000005",
            idTeam: mapTeam["Devops"],
            namaSkill: "Monitoring Server & APM",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000006",
            idTeam: mapTeam["Devops"],
            namaSkill: "Backup Aplikasi",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000007",
            idTeam: mapTeam["Devops"],
            namaSkill: "Restore Aplikasi",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000008",
            idTeam: mapTeam["Devops"],
            namaSkill: "Security OS",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-000000000009",
            idTeam: mapTeam["Devops"],
            namaSkill: "Containerization Docker",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-00000000000A",
            idTeam: mapTeam["Devops"],
            namaSkill: "Containerization Kubernetes",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-00000000000B",
            idTeam: mapTeam["Devops"],
            namaSkill: "Git & Gitlab",
            idSubBidang: "s1",
        },

        {
            idSkill: "11111111-aaaa-4aaa-8aaa-00000000000C",
            idTeam: mapTeam["Devops"],
            namaSkill: "Log Management",
            idSubBidang: "s1",
        },
        {
            idSkill: "11111111-aaaa-4aaa-8aaa-00000000000D",
            idTeam: mapTeam["Devops"],
            namaSkill: "Log Analisis",
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
            // email: `${slug}@${mapSlug["s1"]}.iconpln.co.id`,
            email: `${slug}@iconpln.co.id`,
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

    // insert subskill
    console.log("👨‍👩‍👧‍👦 Seeding subskill...");

    const subskillData: typeof mSubSkill.$inferInsert[] = [
        // JUNIOR = 1
        // {
        //     idSubSkill: "8b1b9d56-9f4a-4d42-9f9a-4f6e86db6b81",
        //     namaSubSkill: "Melakukan Instalasi dan Konfigurasi Dasar",
        //     idSkill: mapSkill["PostgreSQL"],
        //     level: 1,
        //     idUser: mapUser[usersS1[2].email]
        // },

        ...seedSubskill(mapSkill["PostgreSQL"], mapUser[usersS1[2].email]),
        ...seedSubskill(mapSkill["MySQL"], mapUser[usersS1[10].email]),
        ...seedSubskill(mapSkill["SQL Server"], mapUser[usersS1[8].email]),
        ...seedSubskill(mapSkill["MongoDB"], mapUser[usersS1[3].email]),
        ...seedSubskillAdministrasiOS(mapSkill["Administrasi Linux"], mapUser[usersS1[11].email]),
        ...seedSubskillAdministrasiOS(mapSkill["Administrasi Windows"], mapUser[usersS1[17].email]),
        ...seedVirtualMachine(mapSkill["Virtual Machine"], mapUser[usersS1[24].email]),
        ...seedLinuxServer(mapSkill["Linux Server"], mapUser[usersS1[24].email]),
        ...seedWindowsServer(mapSkill["Windows Server"], mapUser[usersS1[24].email]),
        ...seedWebServer(mapSkill["Web Server"], mapUser[usersS1[24].email]),
        ...seedMonitoring(mapSkill["Monitoring Server & APM"], mapUser[usersS1[20].email]),
        ...seedBackupAplikasi(mapSkill["Backup Aplikasi"], mapUser[usersS1[21].email]),
        ...seedRestoreAplikasi(mapSkill["Restore Aplikasi"], mapUser[usersS1[21].email]),
        ...seedSecurityOS(mapSkill["Security OS"], mapUser[usersS1[24].email]),
        ...seedContainerizationDocker(mapSkill["Containerization Docker"], mapUser[usersS1[24].email]),
        ...seedContainerizationKubernetes(mapSkill["Containerization Kubernetes"], mapUser[usersS1[24].email]),
        ...seedGitGitlab(mapSkill["Git & Gitlab"], mapUser[usersS1[33].email]),
        ...seedLogManagement(mapSkill["Log Management"], mapUser[usersS1[36].email]),
        ...seedLogAnalisis(mapSkill["Log Analisis"], mapUser[usersS1[36].email]),
    ]

    await db.insert(mSubSkill).values(subskillData);
    const mapSubSkill = Object.fromEntries(subskillData.map((s) => [s.namaSubSkill!, s.idSubSkill]));



    // 6️⃣ Insert dokumen dengan UUID hardcoded
    console.log("📄 Seeding dokumen...");
    const dokumenData: typeof tDokumen.$inferInsert[] = [
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000001",
            judul: "SOP Backup AMS",
            tipe: "SOP",
            filename: "test-pdf.pdf",
            idLayanan: mapLayanan["AMS"],
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email],
            idTeam: mapTeam["DBA"],
            idSubSkill: null
        },
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000002",
            judul: "Replication PG",
            tipe: "Knowledge",
            filename: "test-pdf.pdf",
            idLayanan: null,
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email],
            idTeam: mapTeam["DBA"],
            idSubSkill: mapSubSkill["Replication"]
        },
        {
            idDokumen: "fddddddd-dddd-4000-8000-000000000002",
            judul: "Backup Restore PG",
            tipe: "Knowledge",
            filename: "test-pdf.pdf",
            idLayanan: null,
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email],
            idTeam: mapTeam["DBA"],
            idSubSkill: mapSubSkill["Backup Restore"]
        },
        {
            idDokumen: "dddddddd-dddd-4000-8000-000000000025",
            judul: "WAL PG",
            tipe: "Knowledge",
            filename: "test-pdf.pdf",
            idLayanan: null,
            idSubBidang: "s1",
            idUser: mapUser[usersS1[0].email],
            idTeam: mapTeam["DBA"],
            idSubSkill: mapSubSkill["WAL"]
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
            idSubSkill: null
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
            idSubSkill: null
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

    const knowledgeDokumen = dokumenData.filter(doc => doc.tipe === "Knowledge");

    // Prepare kuis data and a temporary map to link documents to their kuis
    const kuisToDokumenMap: { [idDokumen: string]: string } = {};
    const kuisData: typeof tKuis.$inferInsert[] = knowledgeDokumen.map((doc, index) => {
        const idKuis = `ffffffff-ffff-4000-8000-${String(index + 1).padStart(12, '0')}`;
        kuisToDokumenMap[doc.idDokumen!] = idKuis; // Map document ID to its quiz ID
        return {
            idKuis: idKuis,
            idSubBidang: doc.idSubBidang!,
        };
    });

    if (kuisData.length > 0) {
        await db.insert(tKuis).values(kuisData);
    }

    // Update tDokumen with idKuis, using the map created earlier
    console.log("🔄 Updating dokumen with kuis IDs...");
    for (const doc of knowledgeDokumen) {
        if (kuisToDokumenMap[doc.idDokumen!]) {
            await db.update(tDokumen)
                .set({ idKuis: kuisToDokumenMap[doc.idDokumen!] })
                .where(eq(tDokumen.idDokumen, doc.idDokumen!));
        }
    }

    // 9️⃣ Insert kuis element
    console.log("❓ Seeding kuis element...");
    const kuisElementData: typeof tKuisElement.$inferInsert[] = [];

    knowledgeDokumen.forEach((doc, docIndex) => {
        const idKuis = kuisToDokumenMap[doc.idDokumen!];
        if (!idKuis) return;

        for (let i = 1; i <= 3; i++) {
            kuisElementData.push({
                idKuisElement: `11111111-ffff-4000-8000-${String(docIndex * 3 + i).padStart(12, '0')}`,
                idKuis: idKuis,
                soal: `Pertanyaan ${i} untuk ${doc.judul}`,
                pilgan: JSON.stringify({
                    A: "Pilihan A benar",
                    B: "Pilihan B",
                    C: "Pilihan C",
                    D: "Pilihan D"
                }),
                jawaban: "A",
            });
        }
    });

    if (kuisElementData.length > 0) {
        await db.insert(tKuisElement).values(kuisElementData);
    }

    // 🔟 Insert kuis progress
    console.log("📊 Seeding kuis progress... SKIPPED");

    console.timeEnd("🌱 Seeding completed in");
    console.log("✅ Data lengkap: subbidang, layanan, user, team, member team, dokumen, status baca, kuis, kuis element, kuis progress");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });