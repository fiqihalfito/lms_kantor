import { v4 as uuidv4 } from 'uuid';

export function seedVirtualMachine(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Mengenal hypervisor (VirtualBox, Proxmox, VMware Player)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Membuat VM (Linux/Windows)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Snapshot, cloning dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Setting CPU, RAM, Storage",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memahami ISO image & template dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Networking VM (NAT, Bridge, VLAN)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Storage provisioning (LVM, thin provisioning)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Manajemen template & cloning otomatis",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup & restore VM",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Migrasi VM manual",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Hypervisor enterprise (VMware ESXi, Hyper-V, Proxmox cluster)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "High availability (HA) & live migration",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Cluster virtualization",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Performance tuning & monitoring VM",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Security hardening hypervisor",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]
}

export function seedLinuxServer(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Instalasi Linux (Ubuntu/CentOS/Rocky)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Command line dasar linux",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "User & Permission",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Package manager (apt, yum/dnf)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Systemctl & services dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "SSH basic & key authentication",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "LVM, NFS, mount",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Firewall (iptables/nftables/firewalld)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Cron automation & bash scripting dasar",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log management (journalctl, rsyslog)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Performance tools (htop, iostat, netstat, ss)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "SELinux/AppArmor",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Linux hardening (CIS Benchmark)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Advanced networking (bonding, VLAN)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Monitoring & observability",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "HA cluster (Pacemaker/Corosync)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Troubleshooting level enterprise",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]
}

export function seedWindowsServer(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Instalasi Windows Server",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Basic AD join",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "User/Group Management",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "DNS/DHCP basic",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "PowerShell basic",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "File sharing permissions",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "ADDS Administration",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "GPO Management",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Hyper-V administration",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "IIS web hosting",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "WSUS update management",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "PowerShell automation",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Window Scheduller",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "AD enterprise design",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Domain trust, federation, advanced GPO",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "High availability Windows services",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "RDS deployment & management",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Enterprise backup strategy",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Security hardening Windows Server",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}

export function seedWebServer(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Instalasi web server",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Virtual host / site",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Deploy static site",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Analisa log basic",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Reverse proxy",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "SSL/TLS (Let’s Encrypt/OpenSSL)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Load balancing",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "URL rewriting",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Performance tuning",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Hardening web server",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Large-scale reverse proxy",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "High-availability web architecture",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Advanced caching (NGINX cache, Varnish)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "WAF (Mod Security)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}

export function seedMonitoring(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Instal dan konfigurasi agen monitoring",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pengumpulan metrik dasar (CPU, memori, disk)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Melihat dashboard dan grafik dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pengaturan notifikasi alert sederhana",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Memeriksa log dan status sistem",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Integrasi APM (Elasticsearch / Datadog) - basic agent",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pengumpulan metrik kustom",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Mengatur threshold alert dan eskalasi",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Integrasi beberapa sumber data (Prometheus, Grafana)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Membangun dashboard kustom",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Respon insiden dasar menggunakan data monitoring",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Integrasi APM untuk tracing & metrics",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Desain arsitektur monitoring (terpusat/HA)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Alerting lanjutan (multi-condition, SLA)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Perencanaan kapasitas dan analisis tren",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Otomatisasi remediasi insiden",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Distributed tracing menggunakan APM",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Optimasi performa aplikasi & infrastruktur berdasarkan APM",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },

        // ===================== ADVANCED (4) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Integrasi monitoring dengan pipeline CI/CD",
            idSkill: idSkill,
            level: 4,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Strategi monitoring tingkat enterprise",
            idSkill: idSkill,
            level: 4,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Monitoring multi-cluster / lintas region",
            idSkill: idSkill,
            level: 4,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Monitoring untuk keamanan & kepatuhan",
            idSkill: idSkill,
            level: 4,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Analisis prediktif & deteksi anomali",
            idSkill: idSkill,
            level: 4,
            idUser: pic
        }
    ]
}

export function seedBackupAplikasi(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pemahaman konsep backup aplikasi",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pemahaman metode backup aplikasi",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Terminal dan scripting untuk backup",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup aplikasi level OS",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup aplikasi level container (docker)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup aplikasi level container (k8s, rke2)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup konfigurasi cluster (k8s, rke2)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        }
    ]
}

export function seedRestoreAplikasi(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pemahaman konsep restore aplikasi",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pemahaman metode backup aplikasi",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Terminal dan scripting untuk restore",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Restore aplikasi level OS dan Container",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Restore aplikasi level container (docker)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Restore aplikasi level container (k8s, rke2)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Restore konfigurasi cluster (k8s, rke2)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        }
    ]
}

export function seedSecurityOS(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR (1) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Patch update & OS maintenance",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Password policy",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Firewall basic (UFW / Windows Firewall)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Basic SSH hardening",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE (2) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Audit tools (Lynis, CIS Benchmark)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Vulnerability scan (Nessus/OpenVAS)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log auditing",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Malware defense (ClamAV/Defender)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR (3) =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Intrusion detection system (OSSEC/Wazuh)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "SIEM integration",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "OS hardening architecture",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Incident response & forensics",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]
}

export function seedContainerizationDocker(idSkill: string, pic: string) {
    return [
        // JUNIOR = 1
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker CLI dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker Images",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker Volumes",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker Networks dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Container Registry",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Dockerfile dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker Compose dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Logging & monitoring container",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // MIDDLE = 2
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Healthcheck Container",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Multi stage Dockerfile",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Environment variables",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Image optimization",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // SENIOR = 3
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Docker Swarm",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Multi-host networking",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Secret management container",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Volume driver",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Advanced Compose & Stack",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Container lifecycle automation",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}

export function seedContainerizationKubernetes(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR = 1 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Kubectl commands dasar",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pod Management",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Environment Variables",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Type Services",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "PV & PVC",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Secrets Management",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Ingress & Ingress Controller",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "ConfigMap & Environment Variables",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE = 2 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "HPA & VPA",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Helm Chart basic",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "RBAC & Security",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Namespace & Resource Quota Dasar",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Labels, Selectors, & Annotations",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "ReplicaSets & StatefulSets dasar",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "CronJobs & Batch Jobs",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR = 3 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Deployment Strategy (Canary, Blue/Green)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Cluster Architecture & Management",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Advanced Networking & Service Mesh Integration",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Service Mesh Integration (Linkerd/Istio)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "API Gateway (Istio Gateway, Traefik)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Deployment Helm Chart (ArgoCD)",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Helm & Multi-Environment Deployment",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "IP Pool & IPAM",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "BGP / Routing Antar Node",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}

export function seedGitGitlab(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR = 1 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Git Basic CLI",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Navigasi GitLab (GitLab UI)",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Basic Pipeline",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Self-Hosted Runner",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Dasar-dasar troubleshooting pipeline",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Job artifacts",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Mekanisme cache",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Penggunaan environment variables",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pipeline deployment sederhana",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Branch strategy",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Shared Runner",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "GitLab Container Registry",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Manajemen secret GitLab",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Backup & restore GitLab instance",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE = 2 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pipeline tingkat menengah",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pipeline multi stage",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Dependency antar job",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Auto DevOps",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Cross-project pipelines",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Optimasi pipeline",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Trigger / Child pipeline",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Provisioning GitLab Runner Custom",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR = 3 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Security & Compliance pipeline",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "GitOps workflow",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Advanced permissions & group strategy",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Pipeline Tingkat Lanjut & Monorepo",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Autoscaling Runner",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]
}

export function seedLogManagement(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR = 1 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Storage & Retention",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Querying & Search for Dashboard",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Monitoring & Alerting",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Visualization & Dashboard",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE = 2 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Collection & Aggregation",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Parsing & Normalization",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Routing & Processing",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        }
    ]

}


export function seedLogAnalisis(idSkill: string, pic: string) {
    return [
        // ===================== JUNIOR = 1 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Understanding",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Querying",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Error Detection",
            idSkill: idSkill,
            level: 1,
            idUser: pic
        },

        // ===================== MIDDLE = 2 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Root Cause Analysis (RCA)",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Log Correlation",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Visualization Insight",
            idSkill: idSkill,
            level: 2,
            idUser: pic
        },

        // ===================== SENIOR = 3 =====================
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Traffic & Pattern Analysis",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        },
        {
            idSubSkill: uuidv4(),
            namaSubSkill: "Incident Investigation",
            idSkill: idSkill,
            level: 3,
            idUser: pic
        }
    ]

}