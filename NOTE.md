- tambah skill : done
- tambah subskill : done
- edit skill : done
- hapus skill : done
- edit subskill : done
- hapus subskill : done(unique) sebagai rujukan. hasil analisa (force close karena revalidate dari remix, jadi halaman terasa baru dengan dialog bakal reset atau defaultnya ketutup dari awal.

alur auth

- cek input form
- return iduser
- id user sebagai session, ingat hanya iduser saja
- di middleware, cek ke db dari iduser
- data return dipakai sebagai context
