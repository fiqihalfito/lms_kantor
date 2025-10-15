CREATE TABLE "t_dokumen" (
	"id_dokumen" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judul" text,
	"tipe" varchar
);
