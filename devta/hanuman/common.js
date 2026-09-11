/* ============================================
   HANUMAN SECTION — COMMON JS
============================================ */

/* ===== DARK MODE ===== */
const DARK_KEY = 'hanuman-dark';
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem(DARK_KEY) === 'true') {
  document.body.classList.add('dark');
  if (darkToggle) darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem(DARK_KEY, isDark);
  });
}

/* ===== PROGRESS BAR ===== */
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const s = h > 0 ? (window.scrollY / h) * 100 : 0;
        progressBar.style.width = s + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
}

/* ===== JAI RAM COUNTER ===== */
const JAI_KEY = 'jaiRamCount';
let jaiRamCount = parseInt(localStorage.getItem(JAI_KEY) || '0', 10);
const jaiEl = document.getElementById('jaiRamCount');
if (jaiEl) jaiEl.textContent = jaiRamCount + ' बार';

function chantJaiRam() {
  jaiRamCount++;
  localStorage.setItem(JAI_KEY, jaiRamCount);
  if (jaiEl) jaiEl.textContent = jaiRamCount + ' बार';
  if (navigator.vibrate) navigator.vibrate(20);
  if (jaiRamCount % 108 === 0) {
    showToast('🎉 ' + jaiRamCount + ' बार जय श्री राम 🙏');
  }
}

/* ===== TOAST ===== */
let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ===== MODAL ===== */
function openSankatModal() {
  document.getElementById('sankatModal')?.classList.add('show');
  if (navigator.vibrate) navigator.vibrate(50);
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('show');
}
document.getElementById('sankatModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'sankatModal') closeModal('sankatModal');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal('sankatModal');
});

/* ===== ACCORDION ===== */
function toggleAccordion(el) {
  el.parentElement.classList.toggle('open');
}

/* ===== COPY MANTRA ===== */
function copyMantra(text) {
  const done = () => showToast('मंत्र कॉपी हो गया 🙏');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch(e) {}
  document.body.removeChild(ta);
}

/* ===== VERSE HIGHLIGHT ===== */
function highlightVerse(el) {
  el.classList.toggle('highlight');
  if (navigator.vibrate) navigator.vibrate(15);
}

/* ===== SHARE ===== */
function sharePage() {
  const shareData = {
    title: document.title,
    text: 'हनुमान जी — संपूर्ण ज्ञान',
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    copyMantra(window.location.href);
    showToast('लिंक कॉपी हो गया 📋');
  }
}

/* ===== SCROLL TOP ===== */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== DAILY QUOTE ===== */
const QUOTES = [
  'जय हनुमान ज्ञान गुन सागर ।<br>जय कपीस तिहुँ लोक उजागर ॥',
  'राम दूत अतुलित बल धामा ।<br>अंजनि-पुत्र पवनसुत नामा ॥',
  'महाबीर बिक्रम बजरंगी ।<br>कुमति निवार सुमति के संगी ॥',
  'संकर सुवन केसरीनंदन ।<br>तेज प्रताप महा जग बंदन ॥',
  'बिद्यावान गुनी अति चातुर ।<br>राम काज करिबे को आतुर ॥',
  'सब सुख लहै तुम्हारी सरना ।<br>तुम रक्षक काहू को डर ना ॥',
  'नासै रोग हरै सब पीरा ।<br>जपत निरंतर हनुमत बीरा ॥',
  'संकट तें हनुमान छुड़ावै ।<br>मन क्रम बचन ध्यान जो लावै ॥',
  'दुर्गम काज जगत के जेते ।<br>सुगम अनुग्रह तुम्हरे तेते ॥',
  'अष्ट सिद्धि नौ निधि के दाता ।<br>अस बर दीन जानकी माता ॥'
];
const quoteEl = document.getElementById('dailyQuote');
if (quoteEl) {
  const dayIndex = new Date().getDate() % QUOTES.length;
  quoteEl.innerHTML = QUOTES[dayIndex];
}

/* ===== MALA COUNTER (used in mala.html) ===== */
const MALA_KEY = 'malaCount';
const MALA_TARGET_KEY = 'malaTarget';
let malaCount = parseInt(localStorage.getItem(MALA_KEY) || '0', 10);
let malaTarget = parseInt(localStorage.getItem(MALA_TARGET_KEY) || '108', 10);

function malaTap() {
  const el = document.getElementById('malaCount');
  const circle = document.getElementById('malaCircle');
  if (!el) return;
  malaCount++;
  if (malaCount > malaTarget) malaCount = 1;
  localStorage.setItem(MALA_KEY, malaCount);
  el.textContent = malaCount;
  const progress = (malaCount / malaTarget) * 100;
  circle.style.background = `conic-gradient(var(--maroon) ${progress}%, var(--border) 0%)`;
  if (navigator.vibrate) navigator.vibrate(25);
  if (malaCount === malaTarget) {
    showToast('🎉 ' + malaTarget + ' जप पूर्ण! 🙏');
  }
}

function malaReset() {
  malaCount = 0;
  localStorage.setItem(MALA_KEY, 0);
  document.getElementById('malaCount').textContent = 0;
  document.getElementById('malaCircle').style.background = 'var(--border)';
  showToast('माला रीसेट 🔄');
}

function malaChangeTarget() {
  const t = prompt('नया लक्ष्य:', malaTarget);
  if (t && !isNaN(t) && t > 0) {
    malaTarget = parseInt(t, 10);
    malaCount = 0;
    localStorage.setItem(MALA_TARGET_KEY, malaTarget);
    localStorage.setItem(MALA_KEY, 0);
    document.getElementById('malaTarget').textContent = '/ ' + malaTarget;
    document.getElementById('malaCount').textContent = 0;
    document.getElementById('malaCircle').style.background = 'var(--border)';
  }
}

/* ===== INIT MALA ON LOAD ===== */
window.addEventListener('DOMContentLoaded', () => {
  const c = document.getElementById('malaCount');
  const t = document.getElementById('malaTarget');
  const circle = document.getElementById('malaCircle');
  if (c) c.textContent = malaCount;
  if (t) t.textContent = '/ ' + malaTarget;
  if (circle) {
    const progress = (malaCount / malaTarget) * 100;
    circle.style.background = `conic-gradient(var(--maroon) ${progress}%, var(--border) 0%)`;
  }
});
