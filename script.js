function getResponse(text) {
    let userText = text.toLowerCase().trim();
    let responseText = "";
    console.log("getResponse dipanggil dengan teks:", text);


    lastUserInput = userText; // Simpan input terakhir

    // Logika respon
    if (userText.includes("halo")) {
        responseText = "Halo! Saya Beru, asisten virtual Anda.";
    } else if (userText.includes("siapa kamu")) {
        responseText = "Saya Beru, asisten yang siap membantu Anda!";
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

let debounceTimer;

recognition.onresult = function(event) {
    console.log("Recognition berhasil, mendapatkan hasil...");

    clearTimeout(debounceTimer);
    const transcript = event.results[event.results.length - 1][0].transcript.trim();

    console.log("User: " + transcript); // Debugging

    debounceTimer = setTimeout(() => {
        getResponse(transcript);
    }, 500);
};
recognition.onerror = function(event) {
    console.error("Error dengan mikrofon: ", event.error);
};

// Hanya restart jika berhenti secara tidak sengaja
recognition.onend = function() {
    console.log("SpeechRecognition dihentikan, akan direstart setelah 2 detik...");
    setTimeout(() => {
        if (!window.speechSynthesis.speaking) { // Hanya restart jika tidak sedang berbicara
            recognition.start();
        }
    }, 2000);
};

recognition.start();