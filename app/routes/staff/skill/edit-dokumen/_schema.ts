import z from "zod";


export const tUpdateNewDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(2, "Judul jangan terlalu pendek!"),
    file: z
        .instanceof(File, { message: "File wajib diupload" })
        .refine((file) => file.size === 0 || file.type === "application/pdf", {
            message: "hanya upload pdf!"
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "max 5 mb!"
        })
        .transform((file) => (file.size > 0 ? file : null))
        .nullable()
});
