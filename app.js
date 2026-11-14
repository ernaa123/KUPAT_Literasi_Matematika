// FUNGSI UNTUK MENAMPILKAN HALAMAN
function tampilkanHalaman(idHalaman) {

    // Mengambil semua bagian halaman
    const semuaHalaman = document.querySelectorAll(".halaman");

    // Menyembunyikan semua halaman
    semuaHalaman.forEach(function(halaman) {
        halaman.classList.remove("aktif");
    });

    // Menampilkan halaman yang dipilih
    const halamanDipilih = document.getElementById(idHalaman);

    if (halamanDipilih) {
        halamanDipilih.classList.add("aktif");
    }
}

// MENAMPILKAN BERANDA SAAT WEBSITE DIBUKA
document.addEventListener("DOMContentLoaded", function() {

    tampilkanHalaman("beranda");

});

// FUNGSI MEMERIKSA JAWABAN LATIHAN
function cekLatihan() {

// ===================================
// PENILAIAN LITERASI MATEMATIKA
// ===================================

function nilaiLiterasi() {

    const rubrik = [
        {
            id: "jawaban1",
            indikator: "Mathematical Reasoning",
            kriteria: [
                ["12", "kebutuhan"],
                ["Rp", "harga", "18.000", "25.500", "36.000"],
                ["51.000", "51000", "empat", "dua", "paket"],
                ["hemat", "termurah", "lebih murah", "kesimpulan"],
                ["b", "paket b", "6 buku"],
                ["alasan", "karena", "perbandingan"]
            ]
        },
        {
            id: "jawaban2",
            indikator: "Formulating Situations Mathematically",
            kriteria: [
                ["18", "19"],
                ["342", "18 x 19", "18×19"],
                ["108", "96 + 12"],
                ["216", "108 x 2", "108×2"],
                ["126", "342 - 216"],
                ["cukup", "mencukupi", "sisa"]
            ]
        },
        {
            id: "jawaban3",
            indikator: "Employing Mathematical Concepts",
            kriteria: [
                ["15", "8"],
                ["120", "15 x 8", "15×8"],
                ["3/5", "tiga per lima", "0,6", "0.6"],
                ["72", "120 x 3/5"],
                ["4", "bibit"],
                ["288", "72 x 4", "72×4"]
            ]
        },
        {
            id: "jawaban4",
            indikator: "Interpreting and Evaluating Outcomes",
            kriteria: [
                ["157", "40"],
                ["157 / 40", "157:40", "157 dibagi 40"],
                ["3,925", "3.925", "3 sisa 37"],
                ["120", "3 x 40", "3×40"],
                ["37", "157 - 120"],
                ["4", "empat", "bus"]
            ]
        }
    ];

    let totalSkor = 0;
    let hasil = "";

    for (const soal of rubrik) {

        const jawaban = document
            .getElementById(soal.id)
            .value
            .toLowerCase()
            .trim();

        if (jawaban.length === 0) {
            alert("Mohon isi semua jawaban terlebih dahulu!");
            return;
        }

        let skor = 0;

        for (const kriteria of soal.kriteria) {

            const ditemukan = kriteria.some(kata =>
                jawaban.includes(kata.toLowerCase())
            );

            if (ditemukan) {
                skor++;
            }
        }

        totalSkor += skor;

        hasil += `
            <div class="soal">
                <h3>${soal.indikator}</h3>
                <p>Skor: <b>${skor} dari 6</b></p>
            </div>
        `;
    }

    hasil += `
        <h2>Hasil Literasi Matematika</h2>
        <h3>Skor Total: ${totalSkor} dari 24</h3>
        <p>Nilai: ${(totalSkor / 24 * 100).toFixed(2)}</p>
    `;

    document.getElementById("hasilLiterasi").innerHTML = hasil;
}

    const kunciJawaban = {
        q1: "B",
        q2: "C",
        q3: "C",
        q4: "A",
        q5: "D"
    };

    const pembahasan = {
        q1: "Persamaan kuadrat memiliki pangkat tertinggi dua, yaitu x².",
        q2: "Pada x² + 5x + 6 = 0, koefisien b adalah 5.",
        q3: "Bilangan 2 dan 3 memiliki hasil kali 6 dan jumlah 5, sehingga faktornya (x + 2)(x + 3).",
        q4: "x² - 5x + 6 = (x - 2)(x - 3), sehingga akarnya 2 dan 3.",
        q5: "x² - 9 = 0 berarti x² = 9, sehingga x = 3 atau x = -3."
    };

    let jumlahBenar = 0;
    let hasilPembahasan = "";

    // Memeriksa setiap jawaban
    for (let i = 1; i <= 5; i++) {

        const namaSoal = "q" + i;
        const pilihan = document.querySelector(
            'input[name="' + namaSoal + '"]:checked'
        );

        if (!pilihan) {
            alert("Silakan jawab semua soal terlebih dahulu!");
            return;
        }

        if (pilihan.value === kunciJawaban[namaSoal]) {
            jumlahBenar++;

            hasilPembahasan +=
                "<p class='benar'><b>Soal " + i +
                ": Benar!</b><br>" +
                pembahasan[namaSoal] + "</p>";

        } else {

            hasilPembahasan +=
                "<p class='salah'><b>Soal " + i +
                ": Belum tepat.</b><br>" +
                "Jawaban yang benar: " +
                kunciJawaban[namaSoal] + "<br>" +
                pembahasan[namaSoal] + "</p>";
        }
    }

    // Menghitung nilai
    const nilai = jumlahBenar * 20;

    // Menampilkan hasil
    document.getElementById("hasilLatihan").innerHTML = `
        <h3>Hasil Latihan Kamu</h3>
        <p>Jawaban benar: ${jumlahBenar} dari 5 soal</p>
        <p><b>Nilai kamu: ${nilai}</b></p>
        <hr>
        <h3>Pembahasan Jawaban</h3>
        ${hasilPembahasan}
    `;
}

// ==================================
// PENILAIAN LITERASI MATEMATIKA
// ==================================

function nilaiLiterasi() {

    // Mengambil jawaban siswa
    const jawaban = [
        document.getElementById("jawaban1").value.toLowerCase(),
        document.getElementById("jawaban2").value.toLowerCase(),
        document.getElementById("jawaban3").value.toLowerCase(),
        document.getElementById("jawaban4").value.toLowerCase()
    ];

    // Setiap tahap memiliki kelompok kata kunci.
    // Setiap kelompok harus memiliki minimal satu kata
    // yang ditemukan dalam jawaban siswa.

    const rubrik = [
        [
            [["84"], ["5"]],
            [["panjang"], ["lebar"]],
            [["x"], ["5"]],
            [["x²", "x^2", "x2"], ["84"], ["faktor", "kuadrat"]],
            [["7"], ["12"]],
            [["12"], ["7"], ["84"]]
        ],
        [
            [["180"], ["3"]],
            [["panjang"], ["lebar"]],
            [["misalkan", "variabel", "x"], ["lebar"]],
            [["x²", "x^2", "x2"], ["180"], ["x+3", "x + 3"]],
            [["12"], ["15"]],
            [["panjang"], ["15"], ["lebar"], ["12"]]
        ],
        [
            [["h(t)", "h (t)"], ["40"], ["20"]],
            [["waktu"], ["detik", "t"]],
            [["40"], ["-5"], ["20"]],
            [["t²", "t^2", "t2"], ["4"], ["3"]],
            [["2 + √7", "2+√7", "4,65", "4.65"]],
            [["4,65", "4.65"], ["detik"]]
        ],
        [
            [["96"], ["4"]],
            [["lebar"], ["panjang"]],
            [["negatif", "-12"], ["tidak mungkin", "tidak sesuai"]],
            [["8"], ["lebar"]],
            [["12"], ["panjang"]],
            [["8"], ["12"], ["96"]]
        ]
    ];

    let totalSkor = 0;
    let hasil = "";

    // Memeriksa setiap soal
    for (let i = 0; i < 4; i++) {

        let skorSoal = 0;
        let rincian = "";

        for (let j = 0; j < 6; j++) {

            const tahapBenar = rubrik[i][j].every(
                kelompok =>
                    kelompok.some(kata =>
                        jawaban[i].includes(kata)
                    )
            );

            if (tahapBenar) {
                skorSoal++;
                rincian += `<li>Tahap ${j + 1}: Terindikasi terpenuhi (+1)</li>`;
            } else {
                rincian += `<li>Tahap ${j + 1}: Belum terindikasi (+0)</li>`;
            }
        }

        totalSkor += skorSoal;

        hasil += `
            <div class="soal">
                <h3>Hasil Soal ${i + 1}</h3>
                <p>Skor: <b>${skorSoal} dari 6</b></p>
                <ul>${rincian}</ul>
            </div>
        `;
    }

    // Menghitung nilai akhir
    const nilaiAkhir = (totalSkor / 24) * 100;

    // Menampilkan hasil
    document.getElementById("hasilLiterasi").innerHTML = `
        <h2>Hasil Penilaian Literasi Matematika</h2>
        <h3>Skor: ${totalSkor} dari 24</h3>
        <h3>Nilai Akhir: ${nilaiAkhir.toFixed(2)}</h3>
        <hr>
        ${hasil}
        <p><b>Catatan:</b> Penilaian otomatis ini berdasarkan
        pencocokan kata kunci. Hasilnya merupakan perkiraan
                dan perlu diperiksa kembali oleh guru untuk memastikan
        ketepatan setiap tahapan penyelesaian.</p>

        <button onclick="ulangiLiterasi()">
            Ulangi Pengerjaan
        </button>
    `;
}
// Fungsi untuk mengulangi pengerjaan literasi
function ulangiLiterasi() {
    // Mengosongkan semua jawaban
    for (let i = 1; i <= 4; i++) {
        document.getElementById("jawaban" + i).value = "";
    }

    // Menghapus hasil penilaian sebelumnya
    document.getElementById("hasilLiterasi").innerHTML = "";

    // Kembali ke bagian atas halaman literasi
    document.getElementById("literasi").scrollIntoView({
        behavior: "smooth"
    });
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js")
            .then(function () {
                console.log("KUPAT berhasil diaktifkan untuk mode offline.");
            })
            .catch(function (error) {
                console.log("Service Worker gagal:", error);
            });
    });
}