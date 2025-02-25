function getResponse(text) {
    let userText = text.toLowerCase().trim();
    let responseText = "";
    console.log("getResponse dipanggil dengan teks:", text);

document.body.innerHTML += '<button id="startRecognition" style="position:fixed;bottom:10px;right:10px;padding:10px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;">Nyalakan Beru</button>';
document.getElementById("startRecognition").addEventListener("click", function () {
    recognition.start();
    console.log("SpeechRecognition dinyalakan kembali.");
});

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
        responseText = "ada apa tuan?";
    } else if (userText.includes("beru")) {
        responseText = "Ada apa, tuan?";
    } else if (userText.includes("musik")) {
        responseText = "Baik, tuan.";
        let yt = "https://www.youtube.com/watch?v=-Y2eg4S_w_I";
        window.open(yt, "_blank"); 
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

recognition.onresult = function(event) {
    console.log("Recognition berhasil, mendapatkan hasil...");
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("User: " + transcript); // Debugging

    getResponse(transcript);
};

recognition.onerror = function(event) {
    console.error("Error dengan mikrofon: ", event.error);
};

// Mulai pengenalan suara
recognition.start();
