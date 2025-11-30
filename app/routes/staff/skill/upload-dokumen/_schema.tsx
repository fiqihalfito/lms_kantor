import z from "zod";


export const tInsertNewDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(2, "Judul tidak boleh pendek!"),
    file: z
        .file({ error: "File wajib diupload" })
        .mime(["application/pdf"], { error: "hanya upload pdf!" })
        .max(5 * 1024 * 1024, { error: "max 5 mb!" }), // file diambil dari hasil parse
});
