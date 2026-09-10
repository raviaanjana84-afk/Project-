// ============================================================
//  SANATAN GYAN KOSH — Master JavaScript
// ============================================================

// ----- DARK MODE -----
document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            const isDark = document.body.classList.contains('dark-mode');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            localStorage.setItem('darkMode', isDark);
        });
    }
});

// ----- SIDEBAR -----
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarBackdrop.classList.toggle('open');
    });
}

if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarBackdrop.classList.remove('open');
    });
}

// Close sidebar on link click
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarBackdrop.classList.remove('open');
    });
});

// ----- DAILY QUOTE -----
const quotes = [
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। — भगवद् गीता",
    "सत्यमेव जयते। — मुंडकोपनिषद",
    "अहिंसा परमो धर्मः। — महाभारत",
    "वसुधैव कुटुम्बकम्। — महोपनिषद",
    "शिवोहम, शिवोहम — मैं शिव हूँ।",
    "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः।",
    "ॐ नमः शिवाय — यही सबसे बड़ा मंत्र है।",
    "माँ दुर्गा सब संकटों से रक्षा करें।",
    "हनुमान जी का स्मरण सब संकटों से बचाता है।",
    "गायत्री मंत्र सबसे शक्तिशाली मंत्र है।",
    "जो राम को ढूंढे, वो राम मिल जाता है।",
    "सबका मालिक एक है।",
    "जहाँ धर्म है, वहाँ जय है।",
    "जय जय श्री राम।",
    "श्री कृष्ण शरणं मम।"
];

const dailyQuote = document.getElementById('dailyQuote');
if (dailyQuote) {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    dailyQuote.textContent = quotes[dayOfYear % quotes.length];
}

// ----- MANTRA OF THE DAY -----
const mantrasOfDay = [
    { text: "ॐ नमः शिवाय", meaning: "भगवान शिव को नमस्कार — यह पंचाक्षर मंत्र है।" },
    { text: "ॐ नमो नारायणाय", meaning: "भगवान विष्णु को नमस्कार — मोक्ष का मंत्र।" },
    { text: "ॐ गं गणपतये नमः", meaning: "भगवान गणेश को नमस्कार — विघ्नहर्ता मंत्र।" },
    { text: "ॐ श्री हनुमते नमः", meaning: "हनुमान जी को नमस्कार — बल और भक्ति का मंत्र।" },
    { text: "ॐ भूर्भुवः स्वः", meaning: "गायत्री मंत्र — बुद्धि और ज्ञान का मंत्र।" },
    { text: "ॐ त्र्यम्बकं यजामहे", meaning: "महामृत्युंजय मंत्र — आरोग्य और मृत्युंजय।" },
    { text: "ॐ दुं दुर्गायै नमः", meaning: "माँ दुर्गा को नमस्कार — शक्ति का मंत्र।" },
    { text: "ॐ ऐं सरस्वत्यै नमः", meaning: "माँ सरस्वती को नमस्कार — विद्या का मंत्र।" },
    { text: "ॐ श्रीं महालक्ष्म्यै नमः", meaning: "माँ लक्ष्मी को नमस्कार — धन का मंत्र।" },
    { text: "ॐ सूर्याय नमः", meaning: "सूर्य देव को नमस्कार — ऊर्जा का मंत्र।" }
];

const mantraOfDay = document.getElementById('mantraOfDay');
const mantraOfDayMeaning = document.getElementById('mantraOfDayMeaning');

if (mantraOfDay && mantraOfDayMeaning) {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const todayMantra = mantrasOfDay[dayOfYear % mantrasOfDay.length];
    mantraOfDay.textContent = todayMantra.text;
    mantraOfDayMeaning.textContent = todayMantra.meaning;
}

// ----- DIGITAL MALA -----
let malaCount = parseInt(localStorage.getItem('malaCount') || '0');
let beadCount = parseInt(localStorage.getItem('beadCount') || '0');

const mantraTexts = {
    'ॐ नमः शिवाय': 'ॐ नमः शिवाय',
    'ॐ नमो नारायणाय': 'ॐ नमो नारायणाय',
    'ॐ गं गणपतये नमः': 'ॐ गं गणपतये नमः',
    'गायत्री मंत्र': 'ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यम् । भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
    'महामृत्युंजय': 'ॐ त्र्यम्बकं यजामहे । सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् । मृत्योर्मुक्षीय माऽमृतात् ॥',
    'ॐ श्री हनुमते नमः': 'ॐ श्री हनुमते नमः'
};

function updateMalaDisplay() {
    const mCount = document.getElementById('mCount');
    const bCount = document.getElementById('bCount');
    if (mCount) mCount.textContent = malaCount;
    if (bCount) bCount.textContent = beadCount;
    localStorage.setItem('malaCount', malaCount);
    localStorage.setItem('beadCount', beadCount);
}

const mantraType = document.getElementById('mantraType');
const mText = document.getElementById('mText');

if (mantraType && mText) {
    mantraType.addEventListener('change', function() {
        mText.textContent = mantraTexts[this.value] || this.value;
    });
}

const japBtn = document.getElementById('japBtn');
if (japBtn) {
    japBtn.addEventListener('click', function() {
        beadCount++;
        if (beadCount >= 108) {
            beadCount = 0;
            malaCount++;
        }
        updateMalaDisplay();

        // Vibrate
        if (navigator.vibrate) navigator.vibrate(50);

        // Animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 100);
    });
}

const resetJapBtn = document.getElementById('resetJapBtn');
if (resetJapBtn) {
    resetJapBtn.addEventListener('click', function() {
        if (confirm('काउंटर रीसेट करें?')) {
            malaCount = 0;
            beadCount = 0;
            updateMalaDisplay();
        }
    });
}

updateMalaDisplay();

// ----- PANCHANG PREVIEW -----
const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const tithis = ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'अमावस्या'];
const nakshatras = ['अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपदा', 'उत्तराभाद्रपदा', 'रेवती'];

const d = new Date();
const previewVaar = document.getElementById('previewVaar');
const previewTithi = document.getElementById('previewTithi');
const previewNakshatra = document.getElementById('previewNakshatra');

if (previewVaar) previewVaar.textContent = days[d.getDay()];
if (previewTithi) previewTithi.textContent = tithis[d.getDate() % 16];
if (previewNakshatra) previewNakshatra.textContent = nakshatras[d.getDate() % 27];

// ----- SEARCH -----
function searchSite() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!query) return;
    // Search logic (will be expanded)
}

// ----- SHARE -----
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: '🕉️ सनातन ज्ञान कोश — हर हिंदू के लिए मुफ्त ज्ञान',
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('लिंक कॉपी हो गया!');
        });
    }
}
