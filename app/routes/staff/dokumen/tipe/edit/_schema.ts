import * as z from "zod";


export const tUpdateDokumenValidation = z.object({
    judul: z
        .string({
            error: (issue) => issue.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(3, "Judul terlalu pendek"),
    layanan: z.preprocess(val => val === "" ? null : val, z.string().nullable()).optional(),
    // skill: z.preprocess(val => val === "" ? null : val, z.string().nullable()).optional(),
    file: z
        .file()
        .mime(["application/pdf"], { error: "hanya upload pdf" })
        .max(20 * 1024 * 1024, { error: "max 20 mb" })
        .optional(), // file diambil dari hasil parse
});
