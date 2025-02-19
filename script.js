// Pastikan SpeechRecognition berjalan di browser
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "id-ID";
recognition.continuous = true;
recognition.interimResults = false;

// Status agar tidak merespon berulang-ulang
let lastUserInput = "";
let isRecognitionActive = true; // Menyimpan status SpeechRecognition aktif/tidak

function getResponse(text) {
    let userText = text.toLowerCase().trim();
    let responseText = "";

    console.log("User mengucapkan:", userText);

    // Cegah respon berulang
    if (userText === lastUserInput) {
        console.log("Input sama seperti sebelumnya, tidak merespon ulang.");
        return;
    }
    lastUserInput = userText; // Simpan input terakhir

    // Logika Respon
    if (userText.includes("halo beru")) {
        responseText = "Iya ada apa, tuan?";
    } else if (userText.includes("halo")) {
        responseText = "Halo tuan, ada yang bisa Beru bantu?";
    } else if (userText.includes("beru")) {
        responseText = "Ada apa, tuan?";
    } else if (userText.includes("musik")) {
        responseText = "Baik tuan.";
        
        // Matikan SpeechRecognition sebelum membuka YouTube
        recognition.stop();
        isRecognitionActive = false; // Tandai bahwa recognition mati
        
        // Buka YouTube
        let ytURL = "https://www.youtube.com/watch?v=oS1XHcbe4Ig&list=RDoS1XHcbe4Ig&start_radio=1&rv=oS1XHcbe4Ig";
        window.open(ytURL, "_blank");
        
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

// Event ketika mendapatkan suara dari user
recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("User: " + transcript);
    getResponse(transcript);
};

// Event jika terjadi error pada microphone
recognition.onerror = function(event) {
    console.error("Error dengan mikrofon: ", event.error);
};

// Perbaikan: Jangan otomatis restart SpeechRecognition jika mati karena YouTube
recognition.onend = function() {
    if (isRecognitionActive) {
        console.log("SpeechRecognition dihentikan, akan direstart dalam 2 detik...");
        setTimeout(() => recognition.start(), 2000);
    } else {
        console.log("SpeechRecognition dimatikan sementara karena YouTube berjalan.");
    }
};

// **Tombol untuk Menyalakan Ulang SpeechRecognition**
document.getElementById("startRecognition").addEventListener("click", function () {
    if (!isRecognitionActive) {
        isRecognitionActive = true;
        recognition.start();
        console.log("SpeechRecognition dinyalakan kembali.");
    }
});

// **Jalankan SpeechRecognition saat halaman dimuat**
recognition.start();
