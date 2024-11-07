// Tipe data Number
let timeLeft = 600; // Waktu dalam detik (10 menit)
let currentQuestionIndex = 1;
let score = 0;

// Tipe data String
const welcomeMessage = "Selamat mengerjakan Tes Logika Penalaran!";
const timerDisplay = document.querySelector('.timer');

// Tipe data Boolean
let isQuizStarted = false;
let isQuizFinished = false;

// Tipe data Array
const answers = [];
const questions = [
    {
        number: 1,
        question: "Dari pernyataan berikut, pilih yang benar: Semua kucing adalah hewan. Beberapa hewan adalah burung. Maka,",
        options: [
            "Semua kucing adalah burung",
            "Tidak ada burung yang kucing",
            "Beberapa burung adalah kucing",
            "Semua kucing adalah hewan"
        ],
        correctAnswer: 3
    },
    // Tambahkan pertanyaan lainnya di sini
    {
        number: 2,
        question: "Di antara angka 1, 2, 3, 4, dan 5, angka mana yang memiliki jumlah angka genap lebih banyak?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1
    },
    {
        number: 3,
        question: "Jika A = 5 dan B = 3, maka nilai dari A + B - 2 adalah:",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        correctAnswer: 2
    },
    {
        number: 4,
        question: "Jika semua burung bisa terbang, dan penguin adalah burung, maka:",
        options: [
            "Penguin bisa terbang.",
            "Semua burung tidak bisa terbang.",
            "Beberapa burung tidak bisa terbang.",
            "Tidak ada burung yang tidak bisa terbang."
        ],
        correctAnswer: 2
    },
    {
        number: 5,
        question: "Dari daftar berikut, mana yang merupakan pernyataan logis yang benar?",
        options: [
            "Jika hujan, maka jalan basah.",
            "Jalan basah, maka hujan.",
            "Hujan tidak mungkin membuat jalan basah.",
            "Jika jalan tidak basah, maka tidak hujan."
        ],
        correctAnswer: 0
    },
    {
        number: 6,
        question: "Dalam sebuah keluarga, jika Ayah adalah laki-laki, dan Ibu adalah perempuan, maka:",
        options: [
            "Ibu adalah laki-laki.",
            "Ayah dan Ibu adalah orang tua.",
            "Ayah dan Ibu adalah orang tua.",
            "Keluarga tersebut tidak memiliki anak."
        ],
        correctAnswer: 1
    },
    {
        number: 7,
        question: "Jika X lebih besar dari Y dan Y lebih besar dari Z, maka:",
        options: [
            "Z lebih besar dari X.",
            "X lebih kecil dari Z.",
            "X lebih besar dari Z.",
            "Y lebih kecil dari X."
        ],
        correctAnswer: 2
    },
    {
        number: 8,
        question: "Manakah dari pernyataan berikut yang benar?",
        options: [
            "Semua manusia adalah mamalia.",
            "Semua mamalia adalah manusia.",
            "Tidak ada manusia yang bukan mamalia.",
            "Semua manusia bisa terbang."
        ],
        correctAnswer: 0
    },
    {
        number: 9,
        question: "Dalam sebuah tes, jika peserta mendapatkan nilai 80, maka:",
        options: [
            "Peserta lulus jika nilai minimal 70.",
            "Peserta tidak lulus.",
            "Peserta mendapatkan nilai rata-rata.",
            "Peserta mendapatkan nilai tertinggi."
        ],
        correctAnswer: 0
    },
    {
        number: 10,
        question: "Jika semua mobil beroda empat, dan beberapa kendaraan bermotor adalah mobil, maka:",
        options: [
            "Semua kendaraan bermotor adalah mobil.",
            "Beberapa kendaraan bermotor beroda empat.",
            "Tidak ada kendaraan bermotor yang beroda empat.",
            "Semua mobil bukan kendaraan bermotor."
        ],
        correctAnswer: 1
    }
];

// Tipe data Object
const quizState = {
    currentQuestion: 0,
    answeredQuestions: new Set(),
    userAnswers: new Map(),
    startTime: null,
    endTime: null
};

// Function untuk menangani timer
function updateTimer() {
    if (timeLeft > 0 && !isQuizFinished) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:00`;
        timeLeft--;
        setTimeout(updateTimer, 1000);
    } else if (timeLeft === 0) {
        finishQuiz();
    }
}

// Function untuk menangani pemilihan jawaban
function handleAnswerSelection(questionNumber, answerIndex) {
    quizState.userAnswers.set(questionNumber, answerIndex);
    quizState.answeredQuestions.add(questionNumber);
    
    // Update tampilan nomor soal yang sudah dijawab
    const numberBtn = document.querySelector(`.number-btn:nth-child(${questionNumber})`);
    if (numberBtn) {
        numberBtn.style.backgroundColor = '#60FFD9';
    }
}

// Event listener untuk tombol nomor
document.querySelectorAll('.number-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const questionNumber = parseInt(btn.textContent);
        // Logika untuk menampilkan soal sesuai nomor
        showQuestion(questionNumber);
    });
});

// Function untuk menampilkan soal
function showQuestion(number) {
    const question = questions.find(q => q.number === number);
    if (question) {
        // Update nomor soal dan teks soal
        document.querySelector('.c_soal-text05').textContent = question.number; // Nomor soal
        document.querySelector('.c_soal-text07').textContent = question.question; // Soal

        // Hapus pilihan jawaban lama
        const answerGrid = document.querySelector('.answer-grid');
        answerGrid.innerHTML = ''; // Menghapus pilihan jawaban sebelumnya

        // Tambahkan pilihan jawaban baru
        question.options.forEach((option, index) => {
            const labelElement = document.createElement('label');
            labelElement.classList.add('answer-option');

            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = `answer-${number}`; // Nama harus unik berdasarkan nomor soal
            inputElement.value = String.fromCharCode(65 + index); // Menghasilkan A, B, C, D
            
            const spanCustom = document.createElement('span');
            //spanCustom.classList.add('radio-custom');

            const spanLetter = document.createElement('span');
            spanLetter.classList.add('answer-letter');
            spanLetter.textContent = String.fromCharCode(65 + index) + '.'; // Menampilkan huruf A, B, C, D

            const spanText = document.createElement('span');
            spanText.classList.add('answer-text');
            spanText.textContent = option; // Menampilkan teks jawaban

            // Menyusun elemen
            labelElement.appendChild(inputElement);
            labelElement.appendChild(spanCustom);
            labelElement.appendChild(spanLetter);
            labelElement.appendChild(spanText);
            answerGrid.appendChild(labelElement);

            // Tambahkan event listener untuk radio button
            inputElement.addEventListener('change', () => {
                if (inputElement.checked) {
                    handleAnswerSelection(number, index); // Menyimpan jawaban yang dipilih
                }
            });
        });

        // Update status radio button (memeriksa jawaban sebelumnya)
        const radioInputs = document.querySelectorAll(`input[name="answer-${number}"]`);
        radioInputs.forEach((input, index) => {
            input.checked = quizState.userAnswers.get(number) === index; // Menandai jawaban yang sudah dipilih
        });
    }
}

// Event listener untuk radio buttons jawaban
document.querySelectorAll('.answer-option input[type="radio"]').forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            handleAnswerSelection(currentQuestionIndex, index);
        }
    });
});

// Event listener untuk tombol selesai
document.querySelector('.c_finish-button').addEventListener('click', finishQuiz);

function finishQuiz() {
    isQuizFinished = true;
    quizState.endTime = new Date();
    
    // Hitung score
    let correctAnswers = 0;
    quizState.userAnswers.forEach((answer, questionNumber) => {
        const question = questions.find(q => q.number === questionNumber);
        if (question && answer === question.correctAnswer) {
            correctAnswers++;
        }
    });
    
    score = (correctAnswers / questions.length) * 100;
    
    // Tampilkan hasil
    alert(`Quiz selesai!\nNilai Anda: ${score.toFixed(2)}`);
}

// Memulai quiz
function startQuiz() {
    isQuizStarted = true;
    quizState.startTime = new Date();
    showQuestion(1);
    updateTimer();
}

// Jalankan quiz saat halaman dimuat
window.addEventListener('load', startQuiz);