import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Normalize & format PostgreSQL timestamptz-like strings to Indonesian (Asia/Jakarta).
 *
 * Supports inputs likex:
 *  - "2025-10-05 19:21:51.062135+00"
 *  - "2025-10-05T19:21:51.062135Z"
 *  - "2025-10-05 19:21:51.062135"
 *  - Date instances
 *
 * Options:
 *  - assumeUtc: when input has NO offset, treat as UTC if true; otherwise treat as local components.
 *  - withZoneLabel: append "WIB" to result when true.
 */
export function formatTimestampId(
  ts: string | Date,
  options: { assumeUtc?: boolean; withZoneLabel?: boolean } = {}
): string {
  const { assumeUtc = false, withZoneLabel = false } = options;

  if (!ts) return "-";

  let date: Date;

  if (ts instanceof Date) {
    date = ts;
  } else {
    const raw = ts.trim();

    // regex: date, time, optional fractional (1-6 digits), optional offset (+hh, +hhmm, +hh:mm, or Z)
    const re =
      /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(?:\.(\d{1,6}))?(?:([+-](?:\d{2}(?::?\d{2})?)|Z))?$/;
    const m = raw.match(re);

    if (!m) {
      // Last-resort: try native parse after swapping space->T
      const tryIso = raw.replace(" ", "T");
      const d = new Date(tryIso);
      if (!isNaN(d.getTime())) {
        date = d;
      } else {
        throw new Error("Format timestamp tidak dikenali: " + ts);
      }
    } else {
      const [, datePart, timePart, fracPart, offsetPart] = m;
      // convert microseconds (up to 6 digits) -> milliseconds (3 digits) by truncation
      const ms = fracPart ? Number(fracPart.padEnd(3, "0").slice(0, 3)) : 0;

      if (offsetPart) {
        // normalize offset:
        // offsetPart examples: "+00", "+0000", "+00:00", "Z"
        let isoOffset = offsetPart;
        if (isoOffset === "Z") {
          isoOffset = "Z";
        } else {
          // remove colon if any, then rebuild as +hh:mm
          const sign = isoOffset[0];
          const digits = isoOffset.slice(1).replace(":", "");
          if (digits.length === 2) {
            isoOffset = `${sign}${digits}:00`;
          } else if (digits.length === 4) {
            isoOffset = `${sign}${digits.slice(0, 2)}:${digits.slice(2)}`;
          } else {
            // fallback (shouldn't usually happen)
            isoOffset = offsetPart;
          }
          if (isoOffset === "+00:00" || isoOffset === "+0000" || isoOffset === "+00") {
            isoOffset = "Z";
          }
        }

        const msPart = fracPart ? "." + String(ms).padStart(3, "0") : "";
        const iso = `${datePart}T${timePart}${msPart}${isoOffset}`;
        date = new Date(iso);
        if (isNaN(date.getTime())) {
          throw new Error("Gagal parse timestamp (offset path): " + iso);
        }
      } else {
        // no offset present
        if (assumeUtc) {
          date = new Date(Date.UTC(
            Number(datePart.slice(0, 4)),
            Number(datePart.slice(5, 7)) - 1,
            Number(datePart.slice(8, 10)),
            Number(timePart.slice(0, 2)),
            Number(timePart.slice(3, 5)),
            Number(timePart.slice(6, 8)),
            ms
          ));
        } else {
          // treat as local components
          date = new Date(
            Number(datePart.slice(0, 4)),
            Number(datePart.slice(5, 7)) - 1,
            Number(datePart.slice(8, 10)),
            Number(timePart.slice(0, 2)),
            Number(timePart.slice(3, 5)),
            Number(timePart.slice(6, 8)),
            ms
          );
        }
      }
    }
  }

  // Format in Indonesian, forced to Asia/Jakarta
  const fmt = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const lookup: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== "literal") lookup[p.type] = p.value;
  }

  const out = `${lookup.weekday ?? ""}, ${lookup.day ?? ""} ${lookup.month ?? ""} ${lookup.year ?? ""} ${lookup.hour ?? ""}:${lookup.minute ?? ""}:${lookup.second ?? ""}`;

  return withZoneLabel ? `${out} WIB` : out;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function toTitleCaseUniversal(str: string) {
  if (!str) {
    return "";
  }

  // 1. Tangani CamelCase: Sisipkan spasi sebelum huruf kapital yang tidak diikuti oleh spasi
  // Contoh: "userName" menjadi "user Name"
  let spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 2. Tangani pemisah: Ganti semua garis bawah, tanda hubung, dan spasi berulang
  // dengan satu spasi tunggal, lalu ubah ke huruf kecil.
  let cleanedStr = spacedStr
    .replace(/[\s_-]+/g, ' ') // Ganti pemisah (spasi, _, -) dengan 1 spasi
    .toLowerCase()
    .trim(); // Hapus spasi di awal/akhir

  // 3. Konversi menjadi Title Case: Kapitalisasi huruf pertama dari setiap kata
  const words = cleanedStr.split(' ');

  const titleCased = words.map(word => {
    if (word.length === 0) {
      return word;
    }
    // Huruf pertama menjadi kapital, sisanya tetap kecil
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return titleCased.join(' ');
}


