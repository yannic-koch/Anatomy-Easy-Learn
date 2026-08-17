// ==========================================
// 🛠️ MAINTENANCE MODE & ADMIN ACCESS
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const MAINTENANCE_MODE = false; // Auf 'true' setzen für Wartungsmodus

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true';

  function showMaintenancePage() {
    const container = document.getElementById("app-container") || document.body;

    container.innerHTML = `
      <div class="maintenance-container">
        <div class="gears-box">
          <div class="gear-single">⚙️</div>
        </div>
        <h2>Under Maintenance</h2>
        <p>Upgrading the database for a better training experience.</p>
        <div class="maintenance-badge">
          ⚡ System update in progress — back online soon!
        </div>
      </div>
    `;
  }

  if (MAINTENANCE_MODE && !isAdmin) {
    showMaintenancePage();
  } else {
    initAnatomyApp();
  }
});

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

  let container = document.getElementById("app-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "app-container";
    container.className = "app-container";
    document.body.appendChild(container);
  }

  function renderMenu() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let html = `
      <h1>🦴 Anatomie Trainer Ultimate Pro</h1>
      <div class="main-layout">
        <div class="box">
          <h3>1. Muskelauswahl</h3>
          <div class="button-group">
            <button class="btn btn-menu" onclick="selectAllMuscles(true)">Alle auswählen</button>
            <button class="btn btn-menu" onclick="selectAllMuscles(false)">Alle abwählen</button>
            <button class="btn btn-menu" onclick="selectRandomMuscles()">🎲 Zufall (5-13)</button>
          </div>
          ${gruppen.map(g => `
            <div class="group-title">
              <label>
                <input type="checkbox" onchange="toggleGroup('${g}', this.checked)"> 📁 ${g}
              </label>
            </div>
            <div class="group-items">
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
          
          <hr>
          <strong>Fragetypen:</strong>
          <label><input type="checkbox" id="type-write" checked> Freitext (Eintippen)</label>
          <label><input type="checkbox" id="type-single" checked> Single Choice</label>
          <label><input type="checkbox" id="type-match" checked> Zuordnung (Matching)</label>
          
          <hr>
          <label>Max. Fragen (0 = alle): 
            <input type="number" id="limit-input" value="10" min="0">
          </label>
          
          <button class="btn btn-practice" onclick="startSession('PRACTICE')">🚀 ÜBUNGSMODUS (Direktes Feedback)</button>
          <button class="btn btn-exam" onclick="startSession('EXAM')">📝 PRÜFUNGSMODUS (Auswertung am Ende)</button>
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
      <div class="header-bar">
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
        <button class="btn" id="submit-btn" onclick="checkWriteAnswer()">Antwort prüfen</button>
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
        <button class="btn" id="submit-btn" onclick="checkSingleAnswer()">Auswahl prüfen</button>
      `;
    } else if (q.type === 'match') {
      const currentCategory = q.kat;
      let availableMuscles = muskelDaten.filter(m => m.muskel !== q.muskel.muskel).sort(() => Math.random() - 0.5);
      const subSet = [q.muskel, availableMuscles[0], availableMuscles[1]].filter(Boolean);
      
      const leftSide = [...subSet].sort(() => Math.random() - 0.5);
      const rightSide = subSet.map(m => m[currentCategory]).sort(() => Math.random() - 0.5);

      q.matchingSubSet = subSet;

      html += `
        <h2>🔗 Zuordnung / Matching</h2>
        <p><em>Kategorie: ${currentCategory.toUpperCase()}</em></p>
        <p>Ordne jedem Muskel den passenden Wert zu:</p>
        
        <div class="match-list">
          ${leftSide.map((m) => `
            <div class="match-item" style="margin: 8px 0;">
              <strong>${m.muskel}</strong> ➔ 
              <select class="match-select" data-muskel="${m.muskel}">
                <option value="">-- Bitte wählen --</option>
                ${rightSide.map(val => `<option value="${val.replace(/"/g, '&quot;')}">${val}</option>`).join('')}
              </select>
            </div>
          `).join('')}
        </div>
        <button class="btn" id="submit-btn" onclick="checkMatchAnswer()">Zuordnung prüfen</button>
      `;
    }

    html += `<div id="feedback-area"></div>`;
    container.innerHTML = html;
  }

  window.checkWriteAnswer = function() {
    const q = sessionList[currentIndex];
    const inputEl = document.getElementById('write-answer');
    const userAns = inputEl ? inputEl.value.trim() : "";
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
      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) submitBtn.style.display = "none";

      const feedbackArea = document.getElementById("feedback-area");
      feedbackArea.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackArea.innerHTML = isCorrect 
        ? `✅ Richtig! Gut gemacht.` 
        : `❌ Falsch!<br><strong>Richtige Antwort:</strong><br>${correctAns}`;
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn";
      nextBtn.style.marginTop = "12px";
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
        <button class="btn btn-repeat" onclick="startRepetition()">
          🔄 Falsche Fragen wiederholen (${wrongQuestions.length})
        </button>
      `;
    }

    html += `
      <div class="results-list" style="margin-top: 15px;">
        ${sessionList.map((q, i) => {
          const ans = userAnswers[i] || { user: "Keine Antwort", correct: "-", success: false };
          return `
            <div class="box result-box ${ans.success ? 'result-correct' : 'result-wrong'}" style="margin-bottom: 10px;">
              <strong>${ans.success ? '✅' : '❌'} Frage ${i+1}: ${q.muskel ? q.muskel.muskel : 'Zuordnungsaufgabe'}</strong> [${q.type.toUpperCase()}]<br>
              <small>Kategorie: ${q.kat.toUpperCase()}</small><br>
              <span class="user-ans">Deine Antwort: ${ans.user}</span><br>
              ${!ans.success ? `<span class="correct-ans" style="color: #c0392b; font-weight: bold;">Richtige Lösung: ${ans.correct}</span>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <button class="btn" onclick="renderMenu()" style="margin-top: 15px;">Hauptmenü</button>
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
