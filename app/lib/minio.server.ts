import * as Minio from "minio";
import path from "node:path";

export const minioClient = new Minio.Client({
    endPoint: "127.0.0.1",   // ganti jika pakai domain/ip lain
    port: 9000,
    useSSL: false,           // true kalau pakai TLS
    accessKey: process.env.MINIO_ROOT_USER!,
    secretKey: process.env.MINIO_ROOT_PASSWORD!,
});

export async function uploadToMinioTemp(file: File) {
    const exists = await minioClient.bucketExists("temp").catch(() => false);
    if (!exists) await minioClient.makeBucket("temp");

    // ambil ekstensi dari nama file
    const originalName = file.name;
    const ext = path.extname(originalName);

    // generate nama file unik
    const filename = crypto.randomUUID() + ext;

    // konversi File (Blob) ke Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // upload ke MinIO temp dulu
    await minioClient.putObject("temp", filename, buffer, file.size, {
        "Content-Type": file.type,
    });

    return filename;
}

export async function removeTempFileIfValidationFail(filename: string) {
    await minioClient.removeObject("temp", filename);
}

export async function moveToRealBucket(bucket: string, filename: string) {
    await minioClient.copyObject(bucket, filename, `/temp/${filename}`);
    await minioClient.removeObject("temp", filename);
}

export async function deleteInRealBucket(bucket: string, filename: string) {
    await minioClient.removeObject(bucket, filename);
}


export async function getPresignedUrl(bucket: string, filename: string) {
    return await minioClient.presignedGetObject(bucket, filename, 60); // berlaku 60 detik
}

// export const fileStorage = new S3FileStorage(s3Client, 'bucket-name')