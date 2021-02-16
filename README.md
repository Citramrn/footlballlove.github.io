# footlballlove.github.io
Submission 3 dicoding

SYARAT SUBMISSION :

* Menampilkan minimal 2 halaman yang mengonsumsi data dari website football-data.org.
* Tetap bisa dipakai meskipun status sedang offline (menerapkan cache).
* Memiliki fitur penyimpanan data dengan indexeddb (bisa menambahkan, menampilkan, 
  dan menghapus tim favorit, jadwal nonton, dsb.) dengan satu halaman 
   khusus untuk menampilkan data yang disimpan.
* Dapat menampilkan pesan push dari server (untuk simulasi pesan 
  push dikirim menggunakan Firebase Cloud Messaging). 
* Dapat ditambahkan ke homescreen.
* Memiliki splash screen.
* Kode pada Service Worker harus berbasis Workbox.
* Diunggah ke Firebase Hosting atau Github Pages (sertakan link menuju 
  Firebase Hosting dan Github Pages di file hosting.txt).
  
Dengan Daftar Endpoint Football Data ORG
Ganti {id_liga} dengan salah satu nomor liga berikut:

Champions League = 2001
Liga Jerman = 2002
Liga Belanda = 2003
Liga Inggris = 2021
Liga Spanyol = 2014
Liga Perancis = 2015

Ganti {id_tim} dengan id tim (bisa dilihat dari standing). 

Klasemen Liga: https://api.football-data.org/v2/competitions/{id_liga}/standings
Informasi Tim: https://api.football-data.org/v2/teams/{id_tim}
Jadwal Tanding Tim: https://api.football-data.org/v2/teams/{id_tim}/matches?status=SCHEDULED
Endpoint lainnya: https://www.football-data.org/documentation/quickstart
  
Link Demo : https://citramrn.github.io/footlballlove.github.io/
