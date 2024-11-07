// Inisialisasi array antrian awal
let antrian = ['ray', 'fiki', 'fadhilla', 'farah'];
console.log("Antrian awal:", antrian);

// Datang 1 pembeli (nabila) - menggunakan push
antrian.push('nabila');
console.log("Setelah nabila datang:", antrian);

// Datang 2 pembeli (maza dan elsi) - menggunakan push
antrian.push('maza', 'elsi');
console.log("Setelah maza dan elsi datang:", antrian);

// Antrian terakhir tidak jadi antri (elsi) - menggunakan pop
antrian.pop();
console.log("Setelah antrian terakhir pulang:", antrian);

// Antrian pertama sudah selesai (ray) - menggunakan shift
antrian.shift();
console.log("Setelah antrian pertama selesai:", antrian);

// Antrian kedua sudah selesai (fiki) - menggunakan shift
antrian.shift();
console.log("Setelah antrian kedua selesai:", antrian);

// Pembeli baru nyerobot (tomi) - menggunakan unshift
antrian.unshift('tomi');
console.log("Setelah tomi nyerobot:", antrian);

console.log("Hasil akhir antrian:", antrian);