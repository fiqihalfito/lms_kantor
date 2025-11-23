- tambah skill : done
- tambah subskill : done
- edit skill : done
- hapus skill : done
- edit subskill : done
- hapus subskill : done(unique) sebagai rujukan. hasil analisa (force close karena revalidate dari remix, jadi halaman terasa baru dengan dialog bakal reset atau defaultnya ketutup dari awal.
- dialog hapus itu karena kenapa keliatan paksa unmount, karena list yang didelete -> komponen delete ikut terhapus, jadi seolah olah unmount padahal memang data dari list itu ga ada lagi

kalau subskill dihapus, dokumen dan kuis harus dihapus: done
note:
delete skill dan delete subskill akan menghapus Dokumen dan Kuis: done

alur auth

- cek input form
- return iduser
- id user sebagai session, ingat hanya iduser saja
- di middleware, cek ke db dari iduser
- data return dipakai sebagai context
