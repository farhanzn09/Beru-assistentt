function getResponse(text) {
    let userText = text.toLowerCase().trim();
    let responseText = "";
    console.log("getResponse dipanggil dengan teks:", text);

    // Cegah pengulangan respon yang sama
    if (userText === lastUserInput) {
        console.log("Input sama seperti sebelumnya, tidak merespon ulang.");
        return;
    }
    lastUserInput = userText; // Simpan input terakhir

    // Logika respon
    if (userText.includes("halo beru")) {
        responseText = "Iya ada apa, tuan?";
    } else if (userText.includes("halo")) {
        responseText = "Halo tuan, ada yang bisa beru bantu?";
    } else if (userText.includes("beru")) {
        responseText = "Ada apa, tuan?";
    } else if (userText.includes("musik")) {
        responseText = "Baik, tuan. Memutar musik untuk Anda.";
        let yt = "https://www.youtube.com/watch?v=oS1XHcbe4Ig&list=RDoS1XHcbe4Ig&start_radio=1&rv=oS1XHcbe4Ig";
        window.open(yt, "_blank"); 
    } else if (userText.includes("apa kabar")) {
        responseText = "Saya baik, terima kasih sudah bertanya!";
    } else {
        responseText = "Maaf, saya belum mengerti pertanyaan itu.";
    }

    // Nonaktifkan speech recognition sementara
    recognition.stop(); 

    // Gunakan SpeechSynthesis untuk berbicara
    const speech = new SpeechSynthesisUtterance(responseText);
    speech.lang = "id-ID";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    speech.onend = function () {
        console.log("Beru selesai berbicara, menghidupkan kembali pengenalan suara...");
        recognition.start(); // Aktifkan kembali pengenalan suara setelah berbicara selesai
    };

    window.speechSynthesis.speak(speech);
}

// Pastikan lastUserInput tetap terjaga untuk mencegah pengulangan
let lastUserInput = "";

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "id-ID";
recognition.continuous = true;
recognition.interimResults = false;

// **FILTER SUARA EKSTERNAL**
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    recognition.onresult = function(event) {
        console.log("Recognition berhasil, mendapatkan hasil...");
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log("User: " + transcript); // Debugging

        // **CEK SUARA ASLI DARI MIKROFON**
        let isExternalNoise = analyser.frequencyBinCount < 1000; // Suara eksternal rendah
        if (!isExternalNoise) {
            console.log("Mendeteksi suara eksternal, tidak merespon.");
            return;
        }

        getResponse(transcript);
    };
}).catch((error) => {
    console.error("Error mendapatkan mikrofon: ", error);
});

recognition.onerror = function(event) {
    console.error("Error dengan mikrofon: ", event.error);
};

// Mulai pengenalan suara
recognition.start();
