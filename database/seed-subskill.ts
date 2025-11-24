import type { mSubSkill } from "./schema/schema"
import { v4 as uuidv4 } from 'uuid';

export function seedSubskill(idSkill: string, pic: string) {
    return [
        // JUNIOR = 1
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Instalasi dan Konfigurasi Dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami Fundamental Database",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami Query SQL Dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Basic Administration",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Backup Restore Dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Basic Performance Monitoring",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Indexing Dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Basic Maintenance",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami Query SQL Lanjutan",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // MIDDLE = 2
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Query Tuning",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Indexing Lanjutan",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Backup & Restore Lanjutan",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Konfigurasi Lanjutan",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Replication Dasar",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Monitoring Lanjutan",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // SENIOR = 3
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Menerapkan High Availability",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Disaster Recovery",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Performance Tuning",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Menerapkan Security",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Skalabilitas Arsitektur",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]
}

export function seedSubskillAdministrasiOS(idSkill: string, pic: string) {
    return [
        // JUNIOR (1)
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan Instalasi",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami sistem dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami Proses dan Resource",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Package dan Service",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Keamanan Dasar (permission, firewall, ssh)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // MIDDLE (2)
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Sistem dan Kernel Tuning",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Storage dan Filesystem management",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Logging dan Monitoring",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Security dan Network (hardening)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Script Automation",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // SENIOR (3)
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melakukan High Availability",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Troubleshooting",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Perencanaan Kapasitas Infrastruktur",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Disaster Recovery",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Configuration Management",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}