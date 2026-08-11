// ==========================================
// 1. BOUTON ENSTALASYON APLIKASYON AN (PWA)
// ==========================================
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Navigatè a detekte sit la se yon PWA epi li prè pou l enstale
window.addEventListener('beforeinstallprompt', (e) => {
  // Anpeche navigatè a afiche ti bwat otomatik pa l la
  e.preventDefault();
  deferredPrompt = e;

  // Montre bouton enstalasyon pèsonalize nou an
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

// Lè itilizatè a klike sou bouton "Enstale Aplikasyon an"
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Afiche bwat enstalasyon an
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Chwa itilizatè a: ${outcome}`);
      deferredPrompt = null;
      installBtn.style.display = 'none'; // Kache bouton an apre enstalasyon
    }
  });
}

// ==========================================
// 2. DETEKTE SOU ENTÈNÈT AK OFFLINE
// ==========================================
const statusBanner = document.getElementById('status-banner');

function updateOnlineStatus() {
  if (!statusBanner) return;

  if (navigator.onLine) {
    statusBanner.textContent = "Siyal retounen! Ou sou entènèt.";
    statusBanner.className = "online";
    // Kache bannè a apre 3 segonn lè entènèt la retounen
    setTimeout(() => {
      statusBanner.style.display = 'none';
    }, 3000);
  } else {
    statusBanner.textContent = "Pa gen entènèt! W ap itilize aplikasyon an offline.";
    statusBanner.className = "offline";
    statusBanner.style.display = 'block';
  }
}

// Koute lè koneksyon an chanje
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ==========================================
// 3. AKSYON SOU BOUTON NAN PAJ LA
// ==========================================
const actionBtn = document.getElementById('action-btn');
if (actionBtn) {
  actionBtn.addEventListener('click', () => {
    alert('Aplikasyon an ap fonksyone byen!');
  });
}
