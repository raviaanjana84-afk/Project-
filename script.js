// ============================================================
//  SANATAN GYAN KOSH — Complete JavaScript
// ============================================================

// ---------- DARK MODE ----------
document.getElementById('darkToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// ---------- SEARCH ----------
function searchSite() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!query) return;
    // Redirect to search results (will implement later)
}

// ---------- DAILY QUOTE ----------
const quotes = [
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। — गीता",
    "सत्यमेव जयते। — मुंडकोपनिषद",
    "अहिंसा परमो धर्मः। — महाभारत",
    "वसुधैव कुटुम्बकम्। — महोपनिषद",
    "शिवोहम, शिवोहम — मैं शिव हूँ।",
    "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः।",
    "ॐ नमः शिवाय — यही सबसे बड़ा मंत्र है।",
    "माँ दुर्गा सब संकटों से रक्षा करें।",
    "हनुमान जी का स्मरण सब संकटों से बचाता है।",
    "गायत्री मंत्र सबसे शक्तिशाली मंत्र है।"
];
document.getElementById('dailyQuote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// ---------- DIGITAL MALA ----------
let malaCount = parseInt(localStorage.getItem('malaCount') || '0');
let beadCount = parseInt(localStorage.getItem('beadCount') || '0');
const mantras = {
    'ॐ नमः शिवाय': 'ॐ नमः शिवाय',
    'ॐ नमो नारायणाय': 'ॐ नमो नारायणाय',
    'ॐ गं गणपतये नमः': 'ॐ गं गणपतये नमः',
    'गायत्री मंत्र': 'ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यम् । भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
    'महामृत्युंजय': 'ॐ त्र्यम्बकं यजामहे । सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् । मृत्योर्मुक्षीय माऽमृतात् ॥'
};

function updateMalaDisplay() {
    document.getElementById('mCount').textContent = malaCount;
    document.getElementById('bCount').textContent = beadCount;
    localStorage.setItem('malaCount', malaCount);
    localStorage.setItem('beadCount', beadCount);
}

document.getElementById('mantraType').addEventListener('change', function() {
    document.getElementById('mText').textContent = mantras[this.value] || this.value;
});

document.getElementById('japBtn').addEventListener('click', function() {
    beadCount++;
    if (beadCount >= 108) {
        beadCount = 0;
        malaCount++;
    }
    updateMalaDisplay();
    // Shankh sound
    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.play();
    // Vibrate
    if (navigator.vibrate) navigator.vibrate(50);
});

document.getElementById('resetJapBtn').addEventListener('click', function() {
    if (confirm('काउंटर रीसेट करें?')) {
        malaCount = 0;
        beadCount = 0;
        updateMalaDisplay();
    }
});

// ---------- INIT ----------
updateMalaDisplay();
document.getElementById('mText').textContent = mantras['ॐ नमः शिवाय'];

// ---------- SERVICE CARDS WITH DATA-ROUTE ----------
document.querySelectorAll('.service-card[data-route]').forEach(card => {
    card.addEventListener('click', function() {
        const route = this.dataset.route;
        window.location.href = route + '.html';
    });
});
