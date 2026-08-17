// ==========================================
// 🛠️ MAINTENANCE MODE & ADMIN ACCESS
// ==========================================
(function () {
  const MAINTENANCE_MODE = true;

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get("admin") === "true";

  if (isAdmin || !MAINTENANCE_MODE) {
    console.log("Normaler Zugriff / Admin aktiv.");
    initAnatomyApp();
    return;
  }

 function showMaintenancePage() {
    if (!document.body) return;
    if (document.getElementById("maintenance-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "maintenance-overlay";

    overlay.style.cssText =
      "position: fixed;" +
      "top: 0;" +
      "left: 0;" +
      "width: 100vw;" +
      "height: 100vh;" +
      "background-color: #f7fafc;" +
      "z-index: 999999;" +
      "display: flex;" +
      "align-items: center;" +
      "justify-content: center;" +
      "font-family: system-ui, -apple-system, sans-serif;";

    // CSS Keyframes direkt für die saubere Eigenachsen-Rotation
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes spin-cw {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes spin-ccw {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .gear-1 {
        animation: spin-cw 8s linear infinite;
        transform-origin: 50px 50px;
      }
      .gear-2 {
        animation: spin-ccw 5.5s linear infinite;
        transform-origin: 50px 50px;
      }
      .gear-3 {
        animation: spin-cw 4s linear infinite;
        transform-origin: 50px 50px;
      }
    `;
    document.head.appendChild(styleEl);

    overlay.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="position: relative; width: 220px; height: 150px; margin: 0 auto -5px auto;">
          <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; overflow: visible;">
            <defs>
              <linearGradient id="gearGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4A5568" />
                <stop offset="100%" stop-color="#2D3748" />
              </linearGradient>
              <linearGradient id="gearGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#718096" />
                <stop offset="100%" stop-color="#4A5568" />
              </linearGradient>

              <!-- Pfad zentriert auf Box 0..100 mit Mittelpunkt (50,50) -->
              <g id="gear-base">
                <path d="M50 34c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm43.6 12.1l-6.4-1.1c-.5-2.2-1.3-4.3-2.3-6.2l3.9-5.1c1.2-1.6.9-3.8-.6-5.1l-6.3-6.3c-1.3-1.4-3.5-1.7-5.1-.6l-5.1 3.9c-2-.1-4-.9-6.2-2.3l-1.1-6.4C64.2 5.2 62.4 3.9 60.3 3.9h-8.9c-2.1 0-3.9 1.3-4.3 3.3l-1.1 6.4c-2.2.5-4.3 1.3-6.2 2.3l-5.1-3.9c-1.6-1.2-3.8-.9-5.1.6l-6.3 6.3c-1.4 1.3-1.7 3.5-.6 5.1l3.9 5.1c-1 2-1.8 4.1-2.3 6.2l-6.4 1.1c-2 .4-3.3 2.2-3.3 4.3v8.9c0 2.1 1.3 3.9 3.3 4.3l6.4 1.1c.5 2.2 1.3 4.3 2.3 6.2l-3.9 5.1c-1.2 1.6-.9 3.8.6 5.1l6.3 6.3c1.3 1.4 3.5 1.7 5.1.6l5.1-3.9c2 1 4.1 1.8 6.2 2.3l1.1 6.4c.4 2 2.2 3.3 4.3 3.3h8.9c2.1 0 3.9-1.3 4.3-3.3l1.1-6.4c2.2-.5 4.3-1.3 6.2-2.3l5.1 3.9c1.6 1.2 3.8.9 5.1-.6l6.3-6.3c1.4-1.3 1.7-3.5.6-5.1l-3.9-5.1c1-2 1.8-4.1 2.3-6.2l6.4-1.1c2-.4 3.3-2.2 3.3-4.3v-8.9c0-2.1-1.3-3.9-3.3-4.3z" 
                      stroke="#cbd5e0" stroke-width="1.5"/>
              </g>
            </defs>

            <!-- Großes Zahnrad (Links) -->
            <g transform="translate(10, 10) scale(1.1)">
              <use href="#gear-base" class="gear-1" fill="url(#gearGrad1)" />
            </g>

            <!-- Mittleres Zahnrad (Mitte unten, greift in Großes) -->
            <g transform="translate(72, 55) scale(0.85)">
              <use href="#gear-base" class="gear-2" fill="url(#gearGrad2)" />
            </g>

            <!-- Kleines Zahnrad (Rechts oben, greift in Mittleres) -->
            <g transform="translate(118, 12) scale(0.65)">
              <use href="#gear-base" class="gear-3" fill="url(#gearGrad1)" />
            </g>
          </svg>
        </div>

        <h2 style="color: #2d3748; margin-bottom: 8px; font-weight: 700; font-size: 1.8em; position: relative; z-index: 2;">Under Maintenance</h2>
        <p style="color: #718096; font-size: 1.05em; max-width: 420px; margin: 0 auto 24px auto; line-height: 1.5;">
          Upgrading the database for a better training experience.
        </p>
        <div style="display: inline-block; background-color: #edf2f7; color: #4a5568; padding: 10px 20px; border-radius: 20px; font-size: 0.85em; font-weight: 600;">
          ⚡ System update in progress — back online soon!
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  }
  
  if (document.readyState === "interactive" || document.readyState === "complete") {
    showMaintenancePage();
  } else {
    document.addEventListener("DOMContentLoaded", showMaintenancePage);
  }
})();

// ==========================================
// 🦴 ANATOMIE TRAINER ULTIMATE PRO
// ==========================================
function initAnatomyApp() {
  const muskelDaten = [
    { muskel: "M. supraspinatus", gruppe: "Schultergelenk (Dorsal)", ursprung: "Fossa supraspinata der Scapula", ansatz: "Tuberculum majus des Humerus", innervation: "N. suprascapularis (C4–C6)", funktion: "Abduktion des Oberarms" },
    { muskel: "M. infraspinatus", gruppe: "Schultergelenk (Dorsal)", ursprung: "Fossa infraspinata der Scapula", ansatz: "Tuberculum majus des Humerus", innervation: "N. suprascapularis (C4–C6)", funktion: "Außenrotation des Oberarms" },
    { muskel: "M. teres minor", gruppe: "Schultergelenk (Dorsal)", ursprung: "Margo lateralis der Scapula", ansatz: "Tuberculum majus des Humerus", innervation: "N. axillaris (C5, C6)", funktion: "Außenrotation; schwache Adduktion" },
    { muskel: "M. subscapularis", gruppe: "Schultergelenk (Dorsal)", ursprung: "Fossa subscapularis der Scapula", ansatz: "Tuberculum minus des Humerus", innervation: "N. subscapularis (C5–C8)", funktion: "Innenrotation des Oberarms" },
    { muskel: "M. deltoideus", gruppe: "Schultergelenk (Dorsal)", ursprung: "Clavicula, Acromion, Spina scapulae", ansatz: "Tuberositas deltoidea am Humerus", innervation: "N. axillaris (C5, C6)", funktion: "Abduktion, Anteversion, Innenrotation, Retroversion, Außenrotation" },
    { muskel: "M. latissimus dorsi", gruppe: "Schultergelenk (Dorsal)", ursprung: "Procc. spinosi Th7–L5, Fascia thoracolumbalis, Crista iliaca", ansatz: "Crista tuberculi minoris des Humerus", innervation: "N. thoracodorsalis (C6–C8)", funktion: "Innenrotation, Adduktion, Retroversion" },
    { muskel: "M. teres major", gruppe: "Schultergelenk (Dorsal)", ursprung: "Angulus inferior der Scapula", ansatz: "Crista tuberculi minoris des Humerus", innervation: "N. subscapularis (C5–C8)", funktion: "Innenrotation, Adduktion, Retroversion" },
    { muskel: "M. pectoralis major", gruppe: "Schultergelenk (Ventral)", ursprung: "Clavicula, Sternum, Rektusscheide", ansatz: "Crista tuberculi majoris", innervation: "Nn. pectorales (C5–Th1)", funktion: "Adduktion, Innenrotation, Anteversion" },
    { muskel: "M. coracobrachialis", gruppe: "Schultergelenk (Ventral)", ursprung: "Proc. coracoideus der Scapula", ansatz: "Humerus", innervation: "N. musculocutaneus (C6, C7)", funktion: "Anteversion, Adduktion, Innenrotation" },
    { muskel: "M. triceps brachii", gruppe: "Oberarm (Dorsal)", ursprung: "Caput longum: Tuberculum infraglenoidale", ansatz: "Olecranon der Ulna", innervation: "N. radialis (C6–C8)", funktion: "Extension im Ellenbogen" },
    { muskel: "M. brachialis", gruppe: "Oberarm (Ventral)", ursprung: "Distale Vorderfläche Humerus", ansatz: "Tuberositas ulnae", innervation: "N. musculocutaneus (C5–C7)", funktion: "Flexion im Ellenbogengelenk" },
    { muskel: "M. biceps brachii", gruppe: "Oberarm (Ventral)", ursprung: "Tuberculum supraglenoidale & Proc. coracoideus", ansatz: "Tuberositas radii", innervation: "N. musculocutaneus (C5–C7)", funktion: "Flexion, Supination Ellenbogen" }
  ];

  let sessionList = [];
  let currentIndex = 0;
  let userAnswers = {};
  let currentMode = "";
  let selectedMatchingPairs = {};

  const container = document.getElementById("app-container");

  function renderMenu() {
    if (!container) return;
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let html = `
      <h1>🦴 Anatomie Trainer Ultimate Pro</h1>
      <div class="main-layout">
        <div class="box">
          <h3>1. Muskelauswahl</h3>
          <div style="margin-bottom: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-menu" onclick="selectAllMuscles(true)">Alle auswählen</button>
            <button class="btn btn-menu" onclick="selectAllMuscles(false)">Alle abwählen</button>
            <button class="btn btn-menu" onclick="selectRandomMuscles()">🎲 Zufall (5-13)</button>
          </div>
          ${gruppen.map(g => `
            <div class="group-title">
              <label style="font-weight: bold; color: #2980b9;">
                <input type="checkbox" onchange="toggleGroup('${g}', this.checked)"> 📁 ${g}
              </label>
            </div>
            <div style="padding-left: 15px;">
              ${muskelDaten.filter(m => m.gruppe === g).map(m => `
                <label><input type="checkbox" class="m-check" data-gruppe="${g}" value="${m.muskel}" checked> ${m.muskel}</label>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <div class="box">
          <h3>2. Einstellungen & Inhalte</h3>
          <strong>Kategorien:</strong>
          <label><input type="checkbox" id="kat-ursprung" checked> Ursprung</label>
          <label><input type="checkbox" id="kat-ansatz" checked> Ansatz</label>
          <label><input type="checkbox" id="kat-innervation" checked> Innervation</label>
          <label><input type="checkbox" id="kat-funktion" checked> Funktion</label>
          
          <hr style="margin: 10px 0;">
          <strong>Fragetypen:</strong>
          <label><input type="checkbox" id="type-write" checked> Freitext (Eintippen)</label>
          <label><input type="checkbox" id="type-single" checked> Single Choice</label>
          <label><input type="checkbox" id="type-match" checked> Zuordnung (Matching)</label>
          
          <hr style="margin: 10px 0;">
          <label>Max. Fragen (0 = alle): 
            <input type="number" id="limit-input" value="10" min="0">
          </label>
          
          <button class="btn" style="margin-top:15px; background: #2ecc71;" onclick="startSession('PRACTICE')">🚀 ÜBUNGSMODUS (Direktes Feedback)</button>
          <button class="btn" style="margin-top:10px; background: #8e44ad;" onclick="startSession('EXAM')">📝 PRÜFUNGSMODUS (Auswertung am Ende)</button>
        </div>
      </div>
    `;
    container.innerHTML = html;
  }

  window.selectAllMuscles = function(status) {
    document.querySelectorAll('.m-check').forEach(cb => cb.checked = status);
  };

  window.toggleGroup = function(gruppeName, status) {
    document.querySelectorAll(`.m-check[data-gruppe="${gruppeName}"]`).forEach(cb => cb.checked = status);
  };

  window.selectRandomMuscles = function() {
    selectAllMuscles(false);
    const randomCount = Math.floor(Math.random() * (13 - 5 + 1)) + 5;
    const checkboxes = Array.from(document.querySelectorAll('.m-check'));
    checkboxes.sort(() => Math.random() - 0.5);
    checkboxes.slice(0, randomCount).forEach(cb => cb.checked = true);
  };

  window.startSession = function(mode, customPool = null) {
    currentMode = mode;

    if (customPool) {
      sessionList = customPool;
    } else {
      const selectedMuscles = Array.from(document.querySelectorAll('.m-check:checked')).map(c => c.value);
      const selectedKats = [];
      if (document.getElementById('kat-ursprung').checked) selectedKats.push('ursprung');
      if (document.getElementById('kat-ansatz').checked) selectedKats.push('ansatz');
      if (document.getElementById('kat-innervation').checked) selectedKats.push('innervation');
      if (document.getElementById('kat-funktion').checked) selectedKats.push('funktion');

      const selectedTypes = [];
      if (document.getElementById('type-write').checked) selectedTypes.push('write');
      if (document.getElementById('type-single').checked) selectedTypes.push('single');
      if (document.getElementById('type-match').checked) selectedTypes.push('match');

      if (!selectedMuscles.length || !selectedKats.length || !selectedTypes.length) {
        alert("Bitte wähle mindestens einen Muskel, eine Kategorie und einen Fragetyp aus!");
        return;
      }

      const limit = parseInt(document.getElementById('limit-input').value) || 0;
      let pool = [];

      selectedMuscles.forEach(mName => {
        const mObj = muskelDaten.find(m => m.muskel === mName);
        selectedKats.forEach(kat => {
          const randomType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
          pool.push({ muskel: mObj, kat: kat, type: randomType });
        });
      });

      pool.sort(() => Math.random() - 0.5);
      if (limit > 0) pool = pool.slice(0, limit);
      sessionList = pool;
    }

    currentIndex = 0;
    userAnswers = {};
    showQuestion();
  };

  function showQuestion() {
    if (currentIndex >= sessionList.length) {
      finishSession();
      return;
    }

    const q = sessionList[currentIndex];
    const progressPct = ((currentIndex) / sessionList.length) * 100;

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn btn-menu" onclick="renderMenu()">◀ Menü</button>
        <span>Frage ${currentIndex + 1} von ${sessionList.length} [${currentMode}]</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width: ${progressPct}%;"></div></div>
    `;

    if (q.type === 'write') {
      html += `
        <h2>Muskel: ${q.muskel.muskel}</h2>
        <p><em>Kategorie: ${q.kat.toUpperCase()} (${q.muskel.gruppe})</em></p>
        <br>
        <label>Antwort eingeben:</label>
        <input type="text" id="write-answer" autofocus autocomplete="off">
        <button class="btn" onclick="checkWriteAnswer()">Antwort prüfen</button>
      `;
    } else if (q.type === 'single') {
      const correct = q.muskel[q.kat];
      const wrongPool = [...new Set(muskelDaten.map(m => m[q.kat]).filter(v => v !== correct))];
      const options = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
      options.push(correct);
      options.sort(() => Math.random() - 0.5);

      html += `
        <h2>Muskel: ${q.muskel.muskel}</h2>
        <p><em>Kategorie: ${q.kat.toUpperCase()} (${q.muskel.gruppe})</em></p>
        <br>
        <p>Wähle die richtige Antwort:</p>
        ${options.map((opt) => `
          <label class="option-item">
            <input type="radio" name="single-opt" value="${opt.replace(/"/g, '&quot;')}"> ${opt}
          </label>
        `).join('')}
        <button class="btn" onclick="checkSingleAnswer()">Auswahl prüfen</button>
      `;
    } else if (q.type === 'match') {
      const currentCategory = q.kat;
      let availableMuscles = muskelDaten.filter(m => m.muskel !== q.muskel.muskel).sort(() => Math.random() - 0.5);
      const subSet = [q.muskel, availableMuscles[0], availableMuscles[1]].filter(Boolean);
      
      const leftSide = [...subSet].sort(() => Math.random() - 0.5);
      const rightSide = subSet.map(m => m[currentCategory]).sort(() => Math.random() - 0.5);

      selectedMatchingPairs = {};
      q.matchingSubSet = subSet;

      html += `
        <h2>🔗 Zuordnung / Matching</h2>
        <p><em>Kategorie: ${currentCategory.toUpperCase()}</em></p>
        <p>Ordne jedem Muskel den passenden Wert zu:</p>
        
        <div style="display:flex; flex-direction:column; gap:12px; margin: 15px 0;">
          ${leftSide.map((m) => `
            <div style="background:#edf2f7; padding:10px; border-radius:6px;">
              <strong>${m.muskel}</strong> ➔ 
              <select class="match-select" data-muskel="${m.muskel}" style="width:100%; padding:6px; margin-top:5px;">
                <option value="">-- Bitte wählen --</option>
                ${rightSide.map(val => `<option value="${val.replace(/"/g, '&quot;')}">${val}</option>`).join('')}
              </select>
            </div>
          `).join('')}
        </div>
        <button class="btn" onclick="checkMatchAnswer()">Zuordnung prüfen</button>
      `;
    }

    html += `<div id="feedback-area"></div>`;
    container.innerHTML = html;
  }

  window.checkWriteAnswer = function() {
    const q = sessionList[currentIndex];
    const userAns = document.getElementById('write-answer').value.trim();
    const correct = q.muskel[q.kat];

    const ignoreWords = ["und", "im", "am", "der", "die", "das", "an", "von", "m", "musculus", "p", "pars"];
    const clean = text => {
      if (!text) return [];
      const matched = text.toLowerCase().match(/\w+/g);
      return matched ? matched.filter(w => !ignoreWords.includes(w)) : [];
    };
    
    const userWords = clean(userAns);
    const correctWords = clean(correct);
    
    const matches = userWords.filter(w => correctWords.includes(w));
    const isCorrect = correctWords.length > 0 && (matches.length / correctWords.length) >= 0.6;

    saveAndRoute(userAns, correct, isCorrect);
  };

  window.checkSingleAnswer = function() {
    const q = sessionList[currentIndex];
    const selected = document.querySelector('input[name="single-opt"]:checked');
    const userAns = selected ? selected.value : "Keine Auswahl getroffen";
    const correct = q.muskel[q.kat];
    const isCorrect = userAns === correct;

    saveAndRoute(userAns, correct, isCorrect);
  };

  window.checkMatchAnswer = function() {
    const q = sessionList[currentIndex];
    const selects = document.querySelectorAll('.match-select');
    let totalPairs = selects.length;
    let correctPairs = 0;
    let userSummary = [];
    let correctSummary = [];

    selects.forEach(sel => {
      const muskelName = sel.getAttribute('data-muskel');
      const selectedVal = sel.value;
      const mObj = muskelDaten.find(m => m.muskel === muskelName);
      const correctVal = mObj[q.kat];

      userSummary.push(`${muskelName}: ${selectedVal || 'Keine Wahl'}`);
      correctSummary.push(`${muskelName}: ${correctVal}`);

      if (selectedVal === correctVal) {
        correctPairs++;
      }
    });

    const isCorrect = correctPairs === totalPairs;
    saveAndRoute(userSummary.join(' | '), correctSummary.join(' | '), isCorrect);
  };

  function saveAndRoute(userAns, correctAns, isCorrect) {
    userAnswers[currentIndex] = { user: userAns, correct: correctAns, success: isCorrect };

    if (currentMode === "PRACTICE") {
      const feedbackArea = document.getElementById("feedback-area");
      feedbackArea.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackArea.innerHTML = isCorrect 
        ? `✓ Richtig! Gut gemacht.` 
        : `✗ Falsch!<br><strong>Richtige Antwort:</strong><br>${correctAns}`;
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn";
      nextBtn.style.marginTop = "10px";
      nextBtn.innerText = "Nächste Frage ➡";
      nextBtn.onclick = () => { currentIndex++; showQuestion(); };
      feedbackArea.appendChild(nextBtn);
    } else {
      currentIndex++;
      showQuestion();
    }
  }

  function finishSession() {
    const total = sessionList.length;
    const correctCount = Object.values(userAnswers).filter(a => a.success).length;

    const wrongQuestions = sessionList.filter((_, i) => !userAnswers[i] || !userAnswers[i].success);

    let html = `
      <h1>🏁 Ergebnis der Session</h1>
      <h2>Ergebnis: ${correctCount} von ${total} richtig.</h2>
      <br>
    `;

    if (wrongQuestions.length > 0) {
      html += `
        <button class="btn" style="background:#e67e22; margin-bottom: 20px;" onclick="startRepetition()">
          🔄 Falsche Fragen wiederholen (${wrongQuestions.length})
        </button>
      `;
    }

    html += `
      <div style="max-height: 450px; overflow-y: auto;">
        ${sessionList.map((q, i) => {
          const ans = userAnswers[i] || { user: "Keine Antwort", correct: "-", success: false };
          return `
            <div class="box" style="margin-bottom: 10px; border-left: 5px solid ${ans.success ? '#2ecc71' : '#e74c3c'};">
              <strong>Frage ${i+1}: ${q.muskel ? q.muskel.muskel : 'Zuordnungsaufgabe'}</strong> [${q.type.toUpperCase()}]<br>
              <small>Kategorie: ${q.kat.toUpperCase()}</small><br>
              <span style="color: ${ans.success ? 'green' : 'red'};">Deine Antwort: ${ans.user}</span><br>
              ${!ans.success ? `<span style="color: darkgreen;">Richtige Lösung: ${ans.correct}</span>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <button class="btn" style="margin-top:15px;" onclick="renderMenu()">Hauptmenü</button>
    `;

    window.lastWrongQuestions = wrongQuestions;
    container.innerHTML = html;
  }

  window.startRepetition = function() {
    if (!window.lastWrongQuestions || window.lastWrongQuestions.length === 0) return;
    startSession('PRACTICE', window.lastWrongQuestions);
  };

  window.renderMenu = renderMenu;

  renderMenu();
}
