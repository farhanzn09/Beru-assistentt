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
        window.open(yt, "_blank"); // Perbaikan membuka YouTube
    } else if (userText.includes("apa kabar")) {
        responseText = "Saya baik, terima kasih sudah bertanya!";
    } else {
        responseText = "Maaf, saya belum mengerti pertanyaan itu.";
    }

    // Gunakan SpeechSynthesis untuk berbicara
    const speech = new SpeechSynthesisUtterance(responseText);
    speech.lang = "id-ID";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Pastikan lastUserInput tetap terjaga untuk mencegah pengulangan
let lastUserInput = "";

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "id-ID";
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = function(event) {
    console.log("Recognition berhasil, mendapatkan hasil...");

    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("User: " + transcript); // Debugging

    getResponse(transcript);
};

recognition.onerror = function(event) {
    console.error("Error dengan mikrofon: ", event.error);
};

// Perbaikan agar SpeechRecognition selalu restart dengan benar
recognition.onend = function() {
    console.log("SpeechRecognition dihentikan, akan direstart setelah 2 detik...");
    setTimeout(() => recognition.start(), 2000);
};

// Mulai pengenalan suara
recognition.start();
