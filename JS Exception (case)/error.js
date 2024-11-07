function bagi(pembilang, penyebut) {
  try {
      const numPembilang = Number(pembilang);
      const numPenyebut = Number(penyebut);

      if (isNaN(numPembilang) || isNaN(numPenyebut)) {
          if (isNaN(numPembilang) && isNaN(numPenyebut)) {
              throw new Error('Kedua input harus berupa angka');
          }
          throw new Error('Input harus berupa angka');
      }

      if (numPenyebut === 0) {
          throw new Error('Tidak dapat membagi dengan nol');
      }

      const hasil = numPembilang / numPenyebut;

      if (!isFinite(hasil)) {
          throw new Error('Hasil pembagian tidak valid');
      }

      return hasil;
  } catch (error) {
      console.error('Error:', error.message);
      document.getElementById("result").textContent = error.message;
      return null;
  }
}

function hitungPembagian() {
  const pembilang = document.getElementById("pembilang").value;
  const penyebut = document.getElementById("penyebut").value;
  const hasil = bagi(pembilang, penyebut);

  if (hasil !== null) {
      document.getElementById("result").textContent = "Hasil: " + hasil;
  }
}
