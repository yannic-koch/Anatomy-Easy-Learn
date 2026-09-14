// ==========================================
// 🛠️ AUTOMATISCHER WARTUNGSMODUS & ADMIN-MODUS
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true';

  if (isAdmin) {
    if (!window.appInitialized) initAnatomyApp();
    return;
  }

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

  function checkMaintenanceStatus() {
    fetch('status.json?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.maintenance) {
          showMaintenancePage();
        } else {
          if (!window.appInitialized) {
            initAnatomyApp();
          }
        }
      })
      .catch(err => {
        console.log("Status-Check fehlgeschlagen (Fallback: App wird gestartet):", err);
        if (!window.appInitialized) initAnatomyApp();
      });
  }

  checkMaintenanceStatus();
  setInterval(checkMaintenanceStatus, 10000);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      checkMaintenanceStatus();
    }
  });
});

// ==========================================
// 🦴 ANATOMIE TRAINER ULTIMATE PRO
// ==========================================
function initAnatomyApp() {
  window.appInitialized = true;

  const muskelDaten = [
    // --- RÜCKEN: AUTOCHTHONE RÜCKENMUSKULATUR (LATERALER TRAKT) ---
    { muskel: "M. iliocostalis", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, oberflächliches Blatt der Fascia thoracolumbalis, 3.-12. Rippe.", ansatz: "1.-12. Rippe, tiefes Blatt der Fascia thoracolumbalis, Querfortsätze der LWS und HWS (C4-C6).", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C8-L1).", funktion: "Dorsalextension (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. longissimus", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, Dornfortsätze der LWS, Querfortsätze der unteren BWS und der oberen HWS/BWS.", ansatz: "2.-12. Rippe, Rippenfortsätze der LWS, Querfortsätze der BWS und HWS, Proc. mastoideus des Os temporale.", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C1-L5).", funktion: "Dorsalextension (beidseitig), Lateralflexion und (beim M. longissimus capitis) Drehung des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. splenius", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Dornfortsätze des 4. Hals- bis 6. Brustwirbels.", ansatz: "Querfortsätze des 1. und 2. Halswirbels, laterale Linea nuchalis superior, Proc. mastoideus.", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C1-6).", funktion: "Dorsalextension der HWS und des Kopfes (beidseitig), ipsilaterale Lateralflexion und Rotation (einseitig)." },
    { muskel: "Mm. intertransversarii", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Verlaufen zwischen benachbarten Quer-, Zitzen- oder Rippenfortsätzen der LWS und HWS.", ansatz: "Verlaufen zwischen benachbarten Quer-, Zitzen- oder Rippenfortsätzen der LWS und HWS.", innervation: "Rr. dorsales und z.T. Rr. ventrales der Spinalnerven.", funktion: "Stabilisierung und Dorsalextension der HWS und LWS (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "Mm. levatores costarum", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Querfortsätze des 7. Hals- und 1.-11. Brustwirbels.", ansatz: "Angulus costae der nächsttieferen oder übernächsten Rippe.", innervation: "Rr. dorsales und Rr. ventrales der Spinalnerven.", funktion: "Dorsalextension der BWS (beidseitig), ipsilaterale Lateralflexion und kontralaterale Rotation (einseitig)." },

    // --- RÜCKEN: AUTOCHTHONE RÜCKENMUSKULATUR (MEDIALER TRAKT) ---
    { muskel: "Mm. interspinales", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verlaufen zwischen den Dornfortsätzen der HWS und LWS.", ansatz: "Verlaufen zwischen den Dornfortsätzen der HWS und LWS.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der HWS und LWS." },
    { muskel: "M. spinalis", gruppe: "Rücken (Medialer Trakt)", ursprung: "Dornfortsätze (T10-L3 sowie C5-T2).", ansatz: "Dornfortsätze (T2-T8 sowie C2-C4).", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der HWS und BWS (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "Mm. rotatores breves u. longi", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verlaufen zwischen Querfortsatz und nächsthöherem bzw. übernächstem Dornfortsatz der BWS.", ansatz: "Verlaufen zwischen Querfortsatz und nächsthöherem bzw. übernächstem Dornfortsatz der BWS.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der BWS (beidseitig), Rotation zur kontralateralen Seite (einseitig)." },
    { muskel: "M. multifidus", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verläuft zwischen Querfortsatz und Dornfortsatz (überspringt 2-4 Wirbel) innerhalb der gesamten Wirbelsäule.", ansatz: "Verläuft zwischen Querfortsatz und Dornfortsatz (überspringt 2-4 Wirbel) innerhalb der gesamten Wirbelsäule.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension (beidseitig), Lateralflexion zur ipsilateralen Seite und Rotation zur kontralateralen Seite (einseitig)." },
    { muskel: "M. semispinalis", gruppe: "Rücken (Medialer Trakt)", ursprung: "Querfortsätze des 3. Hals- bis 12. Brustwirbels.", ansatz: "Dornfortsätze (C2-T4) sowie Os occipitale.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der BWS, HWS und des Kopfes (beidseitig), Lateralflexion zur ipsilateralen und Rotation zur kontralateralen Seite (einseitig)." },

    // --- RÜCKEN: KURZE NACKENMUSKELN ---
    { muskel: "M. rectus capitis posterior major", gruppe: "Kurze Nackenmuskeln", ursprung: "Dornfortsatz des Axis.", ansatz: "mittleres Drittel der Linea nuchalis inferior.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Drehen des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. rectus capitis posterior minor", gruppe: "Kurze Nackenmuskeln", ursprung: "Tuberculum posterius des Atlas.", ansatz: "inneres Drittel der Linea nuchalis inferior.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Lateralflexion des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. obliquus capitis superior", gruppe: "Kurze Nackenmuskeln", ursprung: "Querfortsatz des Atlas.", ansatz: "oberhalb der Ansatzzone des M. rectus capitis posterior major.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Lateralflexion des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. obliquus capitis inferior", gruppe: "Kurze Nackenmuskeln", ursprung: "Dornfortsatz des Axis.", ansatz: "Querfortsatz des Atlas.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Drehen des Kopfes zur ipsilateralen Seite (einseitig)." },

    // --- RÜCKEN: PRÄVERTEBRALE HALSMUSKELN ---
    { muskel: "M. longus capitis", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Tubercula anteriora der Querfortsätze (C3-C6).", ansatz: "Pars basilaris des Os occipitale.", innervation: "Plexus cervicalis (C1-4).", funktion: "Ventralflexion des Kopfes (beidseitig), Lateralflexion und Rotation zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. longus colli (cervicis)", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Verbindet die Wirbelkörper und Querfortsätze der HWS und oberen BWS.", ansatz: "Verbindet die Wirbelkörper und Querfortsätze der HWS und oberen BWS.", innervation: "Plexus cervicalis (C2-C6).", funktion: "Ventralflexion der HWS (beidseitig), Lateralflexion und Rotation zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. rectus capitis anterior & M. rectus capitis lateralis", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Atlas (Massa lateralis bzw. Proc. transversus).", ansatz: "Os occipitale.", innervation: "R. ventralis des 1. Zervikalnervs.", funktion: "Ventralflexion im Atlantookzipitalgelenk (beidseitig), Lateralflexion (einseitig)." },

    // --- BAUCHWANDMUSKULATUR ---
    { muskel: "M. obliquus externus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Außenfläche der 5.-12. Rippe.", ansatz: "Labium externum der Crista iliaca, vorderes Blatt der Rektusscheide, Linea alba.", innervation: "Nn. intercostales (Th 5-12).", funktion: "Ventralflexion, Bauchpresse (beidseitig), Lateralflexion ipsilateral, Rotation kontralateral (einseitig)." },
    { muskel: "M. obliquus internus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Fascia thoracolumbalis, Crista iliaca, Spina iliaca anterior superior, Lig. inguinale.", ansatz: "untere Ränder 10.-12. Rippe, Rektusscheide, Linea alba.", innervation: "Nn. intercostales, N. iliohypogastricus, N. ilioinguinalis.", funktion: "Ventralflexion, Bauchpresse (beidseitig), Lateralflexion und Rotation ipsilateral (einseitig)." },
    { muskel: "M. transversus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Innenflächen 7.-12. Rippenknorpel/-rippe, Fascia thoracolumbalis, Crista iliaca, Lig. inguinale.", ansatz: "Rektusscheide, Linea alba.", innervation: "Nn. intercostales, Nn. iliohypogastricus und ilioinguinalis.", funktion: "Bauchpresse, Ausatmung (beidseitig), Rotation ipsilateral (einseitig)." },
    { muskel: "M. rectus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Knorpel der 5.-7. Rippe, Proc. xiphoideus.", ansatz: "Schambein.", innervation: "Nn. intercostales (Th5-12).", funktion: "Ventralflexion, Aufrichtung des Beckens, Bauchpresse." },
    { muskel: "M. quadratus lumborum", gruppe: "Bauchwandmuskulatur", ursprung: "Crista iliaca.", ansatz: "12. Rippe, Rippenfortsätze des 1.-4. Lendenwirbels.", innervation: "N. subcostalis.", funktion: "Bauchpresse (beidseitig), Lateralflexion ipsilateral (einseitig)." },

    // --- BRUSTKORBMUSKULATUR ---
    { muskel: "Mm. scaleni (anterior, medius, posterior)", gruppe: "Brustkorbmuskulatur", ursprung: "Querfortsätze der Halswirbel (C3-C7).", ansatz: "1. und 2. Rippe.", innervation: "direkte Äste aus Plexus cervicalis und brachialis (C3-6).", funktion: "Inspiration (Rippenheber), Lateralflexion/Ventralflexion der HWS." },
    { muskel: "Mm. intercostales (externi, interni, intimi)", gruppe: "Brustkorbmuskulatur", ursprung: "Verlaufen zwischen den Rippenräumen.", ansatz: "Verlaufen zwischen den Rippenräumen.", innervation: "Nn. intercostales I-XI.", funktion: "Inspiration (externi), Exspiration (interni/intimi)." },
    { muskel: "Zwerchfell (Diaphragma)", gruppe: "Brustkorbmuskulatur", ursprung: "Pars costalis (7.-12. Rippe), Pars lumbalis (LWK 1-3), Pars sternalis (Proc. xiphoideus).", ansatz: "Centrum tendineum.", innervation: "N. phrenicus (C3-5).", funktion: "Wichtigster Inspirationsmuskel, Mitwirkung Bauchpresse." },

    // --- SEKUNDÄR EINGEWANDERTE RÜCKENMUSKULATUR ---
    { muskel: "M. serratus posterior superior", gruppe: "Rücken (Spinokostal)", ursprung: "Dornfortsätze (C6-T2).", ansatz: "2.-5. Rippe.", innervation: "Nn. intercostales Th1-4.", funktion: "Hebt die Rippen (Inspiration)." },
    { muskel: "M. serratus posterior inferior", gruppe: "Rücken (Spinokostal)", ursprung: "Dornfortsätze (T11-L2), Fascia thoracolumbalis.", ansatz: "9.-12. Rippe.", innervation: "Nn. intercostales Th9-12.", funktion: "Unterstützt Inspiration (verankert das Zwerchfell)." },

    // --- ARM: SCHULTERGÜRTELMUSKULATUR ---
    { muskel: "M. trapezius", gruppe: "Schultergürtelmuskulatur", ursprung: "Os occipitale, Lig. nuchae, Procc. spinosi aller Halswirbel; Procc. spinosi der 1.–12. Brustwirbel.", ansatz: "laterales Drittel der Clavicula, Acromion, Spina scapulae.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C2-4).", funktion: "Zieht Scapula schräg aufwärts und dreht sie nach außen, verlagert das Schulterblatt nach medial, zieht Scapula nach kaudal-medial. Gesamter Muskel fixiert das Schulterblatt am Thorax." },
    { muskel: "M. sternocleidomastoideus", gruppe: "Schultergürtelmuskulatur", ursprung: "Manubrium sterni, mediales Drittel der Clavicula.", ansatz: "Proc. mastoideus und Linea nuchalis superior.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C1-2).", funktion: "Lateralflexion ipsilateral und Rotation kontralateral (einseitig); Dorsalextension des Kopfes und Atemhilfsmuskel (beidseitig)." },
    { muskel: "M. omohyoideus", gruppe: "Schultergürtelmuskulatur", ursprung: "Margo superior des Schulterblatts.", ansatz: "Körper des Zungenbeins.", innervation: "Ansa cervicalis des Plexus cervicalis (C1-4).", funktion: "Absenkung des Zungenbeins, spannt die Halsfaszie, hält V. jugularis interna offen." },
    { muskel: "M. serratus anterior", gruppe: "Schultergürtelmuskulatur", ursprung: "1.–9. Rippe.", ansatz: "Scapula (Angulus superior, Margo medialis, Angulus inferior).", innervation: "N. thoracicus longus (C5-7).", funktion: "Verschiebung der Scapula nach lateral-ventral, Atemhilfsmuskel, ermöglicht Elevation des Armes über 90°." },
    { muskel: "M. subclavius", gruppe: "Schultergürtelmuskulatur", ursprung: "1. Rippe (Knorpel-Knochen-Grenze).", ansatz: "Unterseite der Clavicula.", innervation: "N. subclavius (C5, 6).", funktion: "Fixierung der Clavicula im Sternoklavikulargelenk." },
    { muskel: "M. pectoralis minor", gruppe: "Schultergürtelmuskulatur", ursprung: "3.–5. Rippe.", ansatz: "Proc. coracoideus der Scapula.", innervation: "Nn. pectorales medialis und lateralis (C6-Th1).", funktion: "Herabziehen der Scapula, Atemhilfsmuskel." },
    { muskel: "M. levator scapulae", gruppe: "Schultergürtelmuskulatur", ursprung: "Procc. transversi der 1.–4. Halswirbel.", ansatz: "Angulus superior der Scapula.", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Zieht Scapula nach kranial-medial, neigt den Hals ipsilateral." },
    { muskel: "Mm. rhomboidei (major und minor)", gruppe: "Schultergürtelmuskulatur", ursprung: "Procc. spinosi der 6.-7. Halswirbel (minor) bzw. der 1.–4. Brustwirbel (major).", ansatz: "Margo medialis der Scapula.", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Fixierung der Scapula, zieht sie nach kranial-medial." },

    // --- ARM: SCHULTERGELENKMUSKULATUR ---
    { muskel: "M. subscapularis", gruppe: "Schultergelenk", ursprung: "Fossa subscapularis der Scapula.", ansatz: "Tuberculum minus des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation." },
    { muskel: "M. supraspinatus", gruppe: "Schultergelenk", ursprung: "Fossa supraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Abduktion." },
    { muskel: "M. infraspinatus", gruppe: "Schultergelenk", ursprung: "Fossa infraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Außenrotation." },
    { muskel: "M. teres minor", gruppe: "Schultergelenk", ursprung: "Margo lateralis der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Außenrotation, schwache Adduktion." },
    { muskel: "M. deltoideus", gruppe: "Schultergelenk", ursprung: "laterales Drittel der Clavicula, Acromion, Spina scapulae.", ansatz: "Tuberositas deltoidea am Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Abduktion; Anteversion, Innenrotation; Retroversion, Außenrotation." },
    { muskel: "M. latissimus dorsi", gruppe: "Schultergelenk", ursprung: "Procc. spinosi Th7-Th12, Os sacrum/LWS (via Fascia thoracolumbalis), Crista iliaca, 9.–12. Rippe, Angulus inferior der Scapula.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. thoracodorsalis (C6-8).", funktion: "Innenrotation, Adduktion, Retroversion, Atemhilfsmuskel (\"Hustenmuskel\")." },
    { muskel: "M. teres major", gruppe: "Schultergelenk", ursprung: "Angulus inferior der Scapula.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation, Adduktion, Retroversion." },
    { muskel: "M. pectoralis major", gruppe: "Schultergelenk", ursprung: "mediale Clavicula, Sternum, 2.–6. Rippenknorpel, Rektusscheide.", ansatz: "Crista tuberculi majoris des Humerus.", innervation: "Nn. pectorales medialis und lateralis (C5-Th1).", funktion: "Adduktion, Innenrotation, Anteversion, Atemhilfsmuskel." },
    { muskel: "M. coracobrachialis", gruppe: "Schultergelenk", ursprung: "Proc. coracoideus der Scapula.", ansatz: "Humerus (Verlängerung der Crista tuberculi minoris).", innervation: "N. musculocutaneus (C5, 6).", funktion: "Anteversion, Adduktion, Innenrotation." },

    // --- ARM: OBERARMMUSKULATUR ---
    { muskel: "M. biceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum supraglenoidale (Caput longum), Proc. coracoideus (Caput breve).", ansatz: "Tuberositas radii, Lacertus fibrosus.", innervation: "N. musculocutaneus (C5-7).", funktion: "Ellenbogengelenk: Flexion, Supination; Schulter: Abduktion, Innenrotation, Anteversion." },
    { muskel: "M. brachialis", gruppe: "Oberarm", ursprung: "distale Hälfte der Vorderfläche des Humerus.", ansatz: "Tuberositas ulnae.", innervation: "N. musculocutaneus (C5-7), N. radialis (C5-6).", funktion: "Flexion im Ellenbogengelenk." },
    { muskel: "M. triceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum infraglenoidale (Caput longum), Hinterfläche des Humerus distal/proximal vom Sulcus n. radialis (Caput mediale/laterale).", ansatz: "Olecranon der Ulna.", innervation: "N. radialis (C6-8).", funktion: "Extension im Ellenbogen; Retroversion und Adduktion in der Schulter (Caput longum)." },
    { muskel: "M. anconeus", gruppe: "Oberarm", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Olecranon der Ulna.", innervation: "N. radialis (C6-8).", funktion: "Extension, Kapselspanner." },

    // --- ARM: UNTERARMMUSKULATUR (FLEXOREN) ---
    { muskel: "M. pronator teres", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus, Proc. coronoideus der Ulna.", ansatz: "Facies lateralis radii.", innervation: "N. medianus (C6).", funktion: "Flexion (Ellenbogen), Pronation (Unterarm)." },
    { muskel: "M. flexor digitorum superficialis", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis, Proc. coronoideus der Ulna, Radius.", ansatz: "Seiten der Mittelphalangen der Finger II-V.", innervation: "N. medianus (C7-Th1).", funktion: "Schwacher Beuger im Ellenbogen; Flexion in Hand- und Fingergelenken (II-V)." },
    { muskel: "M. flexor carpi radialis", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus.", ansatz: "Basis des Os metacarpi II.", innervation: "N. medianus (C6-8).", funktion: "Handgelenke: Flexion, Radialabduktion; schwache Pronation." },
    { muskel: "M. flexor carpi ulnaris", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus, Olecranon der Ulna.", ansatz: "Hamulus ossis hamati, Basis des Os metacarpi V, Os pisiforme.", innervation: "N. ulnaris (C8-Th1).", funktion: "Handgelenke: Flexion, Ulnarabduktion." },
    { muskel: "M. palmaris longus", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus.", ansatz: "Palmaraponeurose.", innervation: "N. medianus (C8-Th1).", funktion: "Palmarflexion im Handgelenk, Spannen der Palmaraponeurose." },
    { muskel: "M. flexor digitorum profundus", gruppe: "Unterarm (Flexoren)", ursprung: "Beugeseite der Ulna, Membrana interossea.", ansatz: "Palmarseite der Endphalangen der Finger II-V.", innervation: "N. medianus (radial), N. ulnaris (ulnar).", funktion: "Flexion in Hand-, Grund-, Mittel- und Endgelenken der Finger II-V." },
    { muskel: "M. flexor pollicis longus", gruppe: "Unterarm (Flexoren)", ursprung: "Vorderfläche des Radius, Membrana interossea.", ansatz: "Palmarseite der Endphalanx des Daumens.", innervation: "N. medianus (C6-8).", funktion: "Handgelenke: Flexion, Radialabduktion; Daumen: Opposition, Flexion." },
    { muskel: "M. pronator quadratus", gruppe: "Unterarm (Flexoren)", ursprung: "Verbindet die distalen Viertel der Ulna und des Radius.", ansatz: "Verbindet die distalen Viertel der Ulna und des Radius.", innervation: "N. medianus (C8-Th1).", funktion: "Pronation, sichert distales Radioulnargelenk." },

    // --- ARM: UNTERARMMUSKULATUR (EXTENSOREN & RADIALISMUSKULATUR) ---
    { muskel: "M. brachioradialis", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "laterale Seite des distalen Humerus.", ansatz: "Proc. styloideus radii.", innervation: "N. radialis (C5-7).", funktion: "Flexion im Ellenbogen, Semipronationsstellung im Unterarm." },
    { muskel: "Mm. extensores carpi radialis (longus und brevis)", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "lateraler Humerus (longus), Epicondylus lateralis (brevis).", ansatz: "dorsale Basis des Os metacarpi II (longus) und III (brevis).", innervation: "N. radialis (C5-7).", funktion: "Handgelenke: Dorsalextension, Radialabduktion." },
    { muskel: "M. extensor digitorum", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 2.–5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension; Finger: Extension, Spreizen." },
    { muskel: "M. extensor digiti minimi", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension, Ulnarabduktion; 5. Finger: Extension, Abspreizen." },
    { muskel: "M. extensor carpi ulnaris", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Epicondylus lateralis, Dorsalseite der Ulna.", ansatz: "Basis des Os metacarpi V.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension, Ulnarabduktion der Handgelenke." },
    { muskel: "M. supinator", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Olecranon, Epicondylus lateralis, Ligg. collaterale radiale und anulare radii.", ansatz: "Radius.", innervation: "N. radialis (C5, 6).", funktion: "Supination." },
    { muskel: "M. abductor pollicis longus", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Dorsalflächen von Radius und Ulna, Membrana interossea.", ansatz: "Basis des Os metacarpi I.", innervation: "N. radialis (C6-8).", funktion: "Radialabduktion (Handgelenk), Abduktion (Daumensattelgelenk)." },
    { muskel: "M. extensor pollicis (longus und brevis)", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Dorsalfläche Ulna/Membrana interossea (longus); Dorsalfläche Radius/Membrana interossea (brevis).", ansatz: "Basis der Endphalanx (longus) bzw. Grundphalanx (brevis) des Daumens.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension, Radialabduktion; Daumenextension, Daumenadduktion." },
    { muskel: "M. extensor indicis", gruppe: "Unterarm (Extensoren & Radialis)", ursprung: "Dorsalfläche der Ulna, Membrana interossea.", ansatz: "Dorsalaponeurose des 2. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension (Handgelenk und 2. Finger)." },

    // --- ARM: KURZE HANDMUSKELN ---
    { muskel: "Mm. abductor pollicis brevis, adductor pollicis, flexor pollicis brevis, opponens pollicis", gruppe: "Hand (Thenar)", ursprung: "Retinaculum flexorum, angrenzende Handwurzelknochen.", ansatz: "Basis der Daumengrundphalanx bzw. Os metacarpi I.", innervation: "Überwiegend N. medianus (C6, 7), teils N. ulnaris (C8-Th1).", funktion: "Komplexe Daumenbewegungen (Abduktion, Adduktion, Flexion, Opposition)." },
    { muskel: "Mm. abductor digiti minimi, flexor digiti minimi brevis, opponens digiti minimi", gruppe: "Hand (Hypothenar)", ursprung: "Os pisiforme, Hamulus ossis hamati, Retinaculum mm. flexorum.", ansatz: "Basis der Grundphalanx 5. Finger, Dorsalaponeurose bzw. Os metacarpi V.", innervation: "N. ulnaris (C8-Th1).", funktion: "Flexion, Abduktion und Opposition des 5. Fingers." },
    { muskel: "Mm. lumbricales I-IV", gruppe: "Hand (Mittelhand)", ursprung: "Sehnen des M. flexor digitorum profundus.", ansatz: "Dorsalaponeurosen des 2.–5. Fingers.", innervation: "N. medianus (I+II), N. ulnaris (III+IV).", funktion: "Flexion in den Grundgelenken, Extension in den Mittel-/Endgelenken." },
    { muskel: "Mm. interossei (dorsales I-IV und palmares I-III)", gruppe: "Hand (Mittelhand)", ursprung: "Ossa metacarpi (dorsales: zweiköpfig; palmares: einseitig).", ansatz: "Dorsalaponeurose und Basis der proximalen Phalangen der jeweiligen Finger.", innervation: "N. ulnaris (C8-Th1).", funktion: "Flexion (Grundgelenk), Extension (Mittel-/Endgelenk); Spreizen (dorsales) und Schließen (palmares) der Finger." },

    // --- BEIN: INNERE HÜFTMUSKELN ---
    { muskel: "M. iliopsoas (M. psoas major und M. iliacus)", gruppe: "Innere Hüftmuskeln", ursprung: "M. psoas major: 12. Brust- und 1.–5. Lendenwirbelkörper/Disci/Procc. costales; M. iliacus: Fossa iliaca.", ansatz: "Gemeinsam am Trochanter minor des Femurs.", innervation: "N. femoralis (L1-4) sowie direkte Äste aus dem Plexus lumbalis.", funktion: "Hüftgelenk: Flexion und Außenrotation. Lendenwirbelsäule: Lateralflexion zur ipsilateralen Seite, Aufrichten des Rumpfes." },

    // --- BEIN: ÄUSSERE HÜFTMUSKELN ---
    { muskel: "M. gluteus maximus", gruppe: "Äußere Hüftmuskeln", ursprung: "Facies dorsalis des Os sacrum, Facies glutea des Os ilium, Fascia thoracolumbalis und Lig. sacrotuberale.", ansatz: "Tractus iliotibialis (kraniale Fasern) und Tuberositas glutea (kaudale Fasern).", innervation: "N. gluteus inferior (L5-S2).", funktion: "Extension und Außenrotation im Hüftgelenk, Stabilisierung des Beckens. Abduktion/Adduktion je nach Faseranteil." },
    { muskel: "M. gluteus medius", gruppe: "Äußere Hüftmuskeln", ursprung: "Facies glutea des Os ilium.", ansatz: "Seitliche Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung in der Frontalebene. Flexion/Innenrotation oder Extension/Außenrotation je nach Teil." },
    { muskel: "M. gluteus minimus", gruppe: "Äußere Hüftmuskeln", ursprung: "Facies glutea des Os ilium (unter dem M. gluteus medius).", ansatz: "Mediale Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung. Flexion/Innenrotation oder Extension/Außenrotation je nach Teil." },
    { muskel: "M. tensor fasciae latae", gruppe: "Äußere Hüftmuskeln", ursprung: "Spina iliaca anterior superior.", ansatz: "Tractus iliotibialis.", innervation: "N. gluteus superior (L4-S1).", funktion: "Spannt die Fascia lata; Hüftgelenk: Abduktion, Flexion und Innenrotation." },
    { muskel: "M. piriformis", gruppe: "Äußere Hüftmuskeln", ursprung: "Facies pelvica des Os sacrum.", ansatz: "Spitze des Trochanter major am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Abduktion und Extension im Hüftgelenk; Stabilisierung." },
    { muskel: "M. obturatorius internus", gruppe: "Äußere Hüftmuskeln", ursprung: "Innenfläche der Membrana obturatoria und an ihrem knöchernen Rahmen.", ansatz: "Fossa trochanterica am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "Mm. gemelli (superior und inferior)", gruppe: "Äußere Hüftmuskeln", ursprung: "Spina ischiadica des Os ischii (superior); Tuber ischiadicum des Os ischii (inferior).", ansatz: "Zusammen mit der Ansatzsehne des M. obturatorius internus in der Fossa trochanterica.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "M. quadratus femoris", gruppe: "Äußere Hüftmuskeln", ursprung: "Lateraler Rand des Tuber ischiadicum des Os ischii.", ansatz: "Crista intertrochanterica des Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2) und/oder N. gluteus inferior.", funktion: "Außenrotation und Adduktion im Hüftgelenk." },

    // --- BEIN: ADDUKTORENGRUPPE ---
    { muskel: "M. obturatorius externus", gruppe: "Adduktorengruppe", ursprung: "Außenseite der Membrana obturatoria und angrenzender Knochen.", ansatz: "Fossa trochanterica des Femur.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Außenrotation im Hüftgelenk, Stabilisierung des Beckens." },
    { muskel: "M. pectineus", gruppe: "Adduktorengruppe", ursprung: "Pecten ossis pubis.", ansatz: "Linea pectinea und an der proximalen Linea aspera des Femur.", innervation: "N. femoralis (L1-4), N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor longus", gruppe: "Adduktorengruppe", ursprung: "R. superior des Os pubis und Vorderseite der Symphyse.", ansatz: "Linea aspera (Labium mediale im mittleren Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor brevis", gruppe: "Adduktorengruppe", ursprung: "R. inferior des Os pubis.", ansatz: "Linea aspera (Labium mediale im oberen Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor magnus", gruppe: "Adduktorengruppe", ursprung: "R. inferior des Os pubis, R. ossis ischii und Tuber ischiadicum.", ansatz: "Labium mediale der Linea aspera und Epicondylus medialis des Femur.", innervation: "N. obturatorius, L2-4 (tiefer Teil); N. tibialis, L4-5 (oberflächlicher Teil).", funktion: "Adduktion, Außenrotation und Extension im Hüftgelenk." },
    { muskel: "M. adductor minimus", gruppe: "Adduktorengruppe", ursprung: "R. inferior des Os pubis.", ansatz: "Labium mediale der Linea aspera.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk." },
    { muskel: "M. gracilis", gruppe: "Adduktorengruppe", ursprung: "R. inferior des Os pubis unterhalb der Symphyse.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. obturatorius (L2-4).", funktion: "Hüftgelenk: Adduktion und Flexion; Kniegelenk: Flexion und Innenrotation." },

    // --- BEIN: OBERSCHENKEL (EXTENSOREN) ---
    { muskel: "M. sartorius", gruppe: "Oberschenkel (Extensoren)", ursprung: "Spina iliaca anterior superior.", ansatz: "Medial der Tuberositas tibiae am Pes anserinus superficialis.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion, Abduktion und Außenrotation; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. quadriceps femoris", gruppe: "Oberschenkel (Extensoren)", ursprung: "Spina iliaca anterior inferior / Pfannendach (M. rectus femoris); Linea aspera, Vorderseite des Femurschaftes (Mm. vasti).", ansatz: "Tuberositas tibiae via Lig. patellae sowie Condylen und Recessus suprapatellaris.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion (M. rectus femoris); Kniegelenk: Extension (alle Anteile)." },

    // --- BEIN: OBERSCHENKEL (FLEXOREN) ---
    { muskel: "M. biceps femoris", gruppe: "Oberschenkel (Flexoren)", ursprung: "Tuber ischiadicum und Lig. sacrotuberale (Caput longum); Labium laterale der Linea aspera (Caput breve).", ansatz: "Caput fibulae.", innervation: "N. tibialis (Caput longum); N. fibularis communis (Caput breve).", funktion: "Hüftgelenk: Adduktion, Extension, Beckenstabilisierung (Caput longum); Kniegelenk: Flexion und Außenrotation." },
    { muskel: "M. semimembranosus", gruppe: "Oberschenkel (Flexoren)", ursprung: "Tuber ischiadicum.", ansatz: "Pes anserinus profundus (Condylus medialis tibiae, Lig. popliteum obliquum, Faszie des M. popliteus).", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Adduktion, Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. semitendinosus", gruppe: "Oberschenkel (Flexoren)", ursprung: "Tuber ischiadicum und Lig. sacrotuberale.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Adduktion, Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. popliteus", gruppe: "Oberschenkel (Flexoren)", ursprung: "Condylus lateralis femoris, Hinterhorn des Außenmeniskus.", ansatz: "Facies posterior tibiae.", innervation: "N. tibialis (L5-S2).", funktion: "Flexion und Innenrotation im Kniegelenk." },

    // --- BEIN: UNTERSCHENKEL (EXTENSOREN & FIBULARISGRUPPE) ---
    { muskel: "M. tibialis anterior", gruppe: "Unterschenkel (Extensoren)", ursprung: "Obere zwei Drittel der Facies lateralis tibiae, Membrana interossea cruris, Fascia cruris superficialis.", ansatz: "Os cuneiforme mediale, mediale Basis des Os metatarsi I.", innervation: "N. fibularis profundus (L4, 5).", funktion: "Dorsalextension (oberes Sprunggelenk), Inversion/Supination (unteres Sprunggelenk)." },
    { muskel: "M. extensor digitorum longus", gruppe: "Unterschenkel (Extensoren)", ursprung: "Condylus lateralis tibiae, Caput fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurosen der 2.–5. Zehe, Basen der Phalanges distales der 2.–5. Zehe.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension (oberes Sprunggelenk), Eversion (unteres Sprunggelenk), Extension der Zehen." },
    { muskel: "M. extensor hallucis longus", gruppe: "Unterschenkel (Extensoren)", ursprung: "Mittleres Drittel der Facies medialis fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurose der Großzehe, Basis ihrer Endphalanx.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension (oberes Sprunggelenk), Extension der Großzehe, unterstützt Eversion und Inversion je nach Ausgangsstellung." },
    { muskel: "M. fibularis longus", gruppe: "Unterschenkel (Fibularisgruppe)", ursprung: "Caput fibulae, proximale zwei Drittel der Facies lateralis fibulae.", ansatz: "Plantarseite des Os cuneiforme mediale, Basis des Os metatarsi I.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion, Verspannung des Quergewölbes." },
    { muskel: "M. fibularis brevis", gruppe: "Unterschenkel (Fibularisgruppe)", ursprung: "Distale Hälfte der Facies lateralis fibulae.", ansatz: "Tuberositas ossis metatarsi V.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion." },
    { muskel: "M. fibularis tertius", gruppe: "Unterschenkel (Fibularisgruppe)", ursprung: "Margo anterior der distalen Fibula.", ansatz: "Basis des Os metatarsi V.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension, Eversion." },

    // --- BEIN: UNTERSCHENKEL (FLEXOREN) ---
    { muskel: "M. triceps surae", gruppe: "Unterschenkel (Flexoren)", ursprung: "Dorsalseite Caput/Collum fibulae und Arcus tendineus (M. soleus); Epicondylus medialis und lateralis femoris (M. gastrocnemius).", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Plantarflexion (oberes Sprunggelenk), Inversion (unteres Sprunggelenk), Knieflexion (nur M. gastrocnemius)." },
    { muskel: "M. plantaris", gruppe: "Unterschenkel (Flexoren)", ursprung: "Proximal des Caput laterale des M. gastrocnemius.", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Verhindert bei Knieflexion Kompression der Vasa tibialia posteriora (insgesamt vernachlässigbare Flexion)." },
    { muskel: "M. tibialis posterior", gruppe: "Unterschenkel (Tiefe Flexoren)", ursprung: "Membrana interossea cruris, Ränder von Tibia und Fibula.", ansatz: "Tuberositas ossis navicularis, Ossa cuneiformia, Basen der Ossa metatarsi II-IV.", innervation: "N. tibialis (L4-S1).", funktion: "Plantarflexion, Inversion, Verspannung des Längs- und Quergewölbes." },
    { muskel: "M. flexor digitorum longus", gruppe: "Unterschenkel (Tiefe Flexoren)", ursprung: "Mittleres Drittel der Facies posterior der Tibia.", ansatz: "Basen der Endphalangen II-V.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Zehenflexion." },
    { muskel: "M. flexor hallucis longus", gruppe: "Unterschenkel (Tiefe Flexoren)", ursprung: "Distale zwei Drittel der Facies posterior fibulae, Membrana interossea cruris.", ansatz: "Basis der Endphalanx der Großzehe.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Großzehenflexion, Verspannung des medialen Längsgewölbes." },

    // --- BEIN: KURZE FUSSMUSKELN ---
    { muskel: "M. extensor digitorum brevis", gruppe: "Fuß (Rücken)", ursprung: "Dorsalfläche des Calcaneus.", ansatz: "Dorsalaponeurose der 2.–4. Zehe, Basen der Mittelphalangen II-IV.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension der 2.–4. Zehe." },
    { muskel: "M. extensor hallucis brevis", gruppe: "Fuß (Rücken)", ursprung: "Dorsalfläche des Calcaneus.", ansatz: "Dorsalaponeurose der Großzehe, Basis der Großzehengrundphalanx.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension im Grundgelenk der Großzehe." },
    { muskel: "M. abductor hallucis", gruppe: "Fuß (Großzehenloge)", ursprung: "Proc. medialis des Tuber calcanei, Plantaraponeurose.", ansatz: "Über das mediale Sesambein an der Basis der Großzehengrundphalanx.", innervation: "N. plantaris medialis (L5-S1).", funktion: "Plantarflexion, Abduktion der 1. Zehe nach medial, Längsgewölbe-Verspannung." },
    { muskel: "M. flexor hallucis brevis", gruppe: "Fuß (Großzehenloge)", ursprung: "Os cuneiforme mediale, Os cuneiforme intermedium, Lig. calcaneocuboideum plantare.", ansatz: "Basis der Grundphalanx I über die Sesambeine.", innervation: "N. plantaris medialis (Caput mediale), N. plantaris lateralis (Caput laterale).", funktion: "Plantarflexion im Großzehengrundgelenk, Längsgewölbe-Verspannung." },
    { muskel: "M. adductor hallucis", gruppe: "Fuß (Mittelloge)", ursprung: "Basen Ossa metatarsi II-IV, Os cuboideum, Os cuneiforme laterale; Zehengrundgelenke III-V.", ansatz: "Über das laterale Sesambein an der Basis der Grundphalanx I.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion, Adduktion der Großzehe, Verspannung des Quer- und Längsgewölbes." },
    { muskel: "M. abductor digiti minimi", gruppe: "Fuß (Kleinzehenloge)", ursprung: "Tuber calcanei, Plantaraponeurose.", ansatz: "Basis der Kleinzehengrundphalanx, Tuberositas ossis metatarsi V.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion, Abduktion im Kleinzehengrundgelenk, Längsgewölbe-Verspannung." },
    { muskel: "M. flexor digiti minimi brevis", gruppe: "Fuß (Kleinzehenloge)", ursprung: "Basis des Os metatarsi V, Lig. plantare longum.", ansatz: "Basis der Kleinzehengrundphalanx.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion im Kleinzehengrundgelenk." },
    { muskel: "M. opponens digiti minimi", gruppe: "Fuß (Kleinzehenloge)", ursprung: "Lig. plantare longum, plantare Sehnenscheide des M. fibularis longus.", ansatz: "Os metatarsi V.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Zieht Os metatarsi V leicht nach plantar und medial." },
    { muskel: "M. flexor digitorum brevis", gruppe: "Fuß (Mittelloge)", ursprung: "Medialer Höcker des Tuber calcanei, Plantaraponeurose.", ansatz: "Seiten der Mittelphalangen der 2.–5. Zehe.", innervation: "N. plantaris medialis (L5-S1).", funktion: "Plantarflexion in Grund- und Mittelgelenken der 2.–5. Zehe, Längsgewölbe-Verspannung." },
    { muskel: "M. quadratus plantae", gruppe: "Fuß (Mittelloge)", ursprung: "Medialer und plantarer Rand des Tuber calcanei.", ansatz: "Lateral am Rand der Sehne des M. flexor digitorum longus.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Umlenkung und Verstärkung der Zugrichtung des M. flexor digitorum longus." },
    { muskel: "Mm. lumbricales I-IV", gruppe: "Fuß (Mittelloge)", ursprung: "Mediale Ränder der Sehnen des M. flexor digitorum longus.", ansatz: "Dorsalaponeurosen der 2.–5. Zehe.", innervation: "N. plantaris medialis (I+II), N. plantaris lateralis (III+IV).", funktion: "Plantarflexion (Grundgelenke), Dorsalextension (Mittel-/Endgelenke), Adduktion der Zehen." },
    { muskel: "Mm. interossei plantares I-III", gruppe: "Fuß (Mittelloge)", ursprung: "Medialer Rand der Ossa metatarsi III-V.", ansatz: "Mediale Basis der Grundphalangen III-V, Dorsalaponeurosen der 3.–5. Zehe.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion (Grundgelenke), Dorsalextension (Mittel-/Endgelenke), Adduktion der Zehen 3–5 zur 2. Zehe." },
    { muskel: "Mm. interossei dorsales I-IV", gruppe: "Fuß (Mittelloge)", ursprung: "Zweiköpfig von einander zugekehrten Seiten der Ossa metatarsi I-V.", ansatz: "Basis der Grundphalangen, Dorsalaponeurosen der 2.–4. Zehe.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion (Grundgelenke), Dorsalextension (Mittel-/Endgelenke), Spreizen (Abduktion) der Zehen." }
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
            <button class="btn btn-menu" onclick="window.selectAllMuscles(true)">Alle auswählen</button>
            <button class="btn btn-menu" onclick="window.selectAllMuscles(false)">Alle abwählen</button>
            <button class="btn btn-menu" onclick="window.selectRandomMuscles()">🎲 Zufall (5-13)</button>
          </div>
          ${gruppen.map(g => `
            <div class="group-title">
              <label>
                <input type="checkbox" onchange="window.toggleGroup('${g}', this.checked)" checked> 📁 ${g}
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
          <strong>Kategorien:</strong><br>
          <label><input type="checkbox" id="kat-ursprung" checked> Ursprung</label>
          <label><input type="checkbox" id="kat-ansatz" checked> Ansatz</label>
          <label><input type="checkbox" id="kat-innervation" checked> Innervation</label>
          <label><input type="checkbox" id="kat-funktion" checked> Funktion</label>
          <hr>
          <strong>Fragetypen:</strong><br>
          <label><input type="checkbox" id="type-write" checked> Freitext (Eintippen)</label>
          <label><input type="checkbox" id="type-single" checked> Single Choice</label>
          <label><input type="checkbox" id="type-match" checked> Zuordnung (Matching)</label>
          <hr>
          <label>Max. Fragen (0 = alle): 
            <input type="number" id="limit-input" value="10" min="0">
          </label>
          <br><br>
          <button class="btn btn-practice" onclick="window.startSession('PRACTICE')">🚀 ÜBUNGSMODUS (Direktes Feedback)</button>
          <button class="btn btn-exam" onclick="window.startSession('EXAM')">📝 PRÜFUNGSMODUS (Auswertung am Ende)</button>
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
    window.selectAllMuscles(false);
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
        <button class="btn btn-menu" onclick="window.renderMenu()">◀ Menü</button>
        <strong>Frage ${currentIndex + 1} von ${sessionList.length} [${currentMode}]</strong>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPct}%;"></div>
      </div>
    `;

    if (q.type === 'write') {
      html += `
        <h2>Muskel: ${q.muskel.muskel}</h2>
        <p><em>Kategorie: ${q.kat.toUpperCase()} (${q.muskel.gruppe})</em></p>
        <br>
        <label>Antwort eingeben:</label>
        <input type="text" id="write-answer" autofocus autocomplete="off">
        <button class="btn" id="submit-btn" onclick="window.checkWriteAnswer()">Antwort prüfen</button>
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
        <div class="option-list">
        ${options.map((opt) => `
          <label class="option-item">
            <input type="radio" name="single-opt" value="${opt.replace(/"/g, '&quot;')}"> ${opt}
          </label>
        `).join('')}
        </div>
        <button class="btn" id="submit-btn" onclick="window.checkSingleAnswer()">Auswahl prüfen</button>
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
            <div class="match-item">
              <strong>${m.muskel}</strong>
              <select class="match-select" data-muskel="${m.muskel}">
                <option value="">-- Bitte wählen --</option>
                ${rightSide.map(val => `<option value="${val.replace(/"/g, '&quot;')}">${val}</option>`).join('')}
              </select>
            </div>
          `).join('')}
        </div>
        <button class="btn" id="submit-btn" onclick="window.checkMatchAnswer()">Zuordnung prüfen</button>
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
    if(!selected && currentMode === "PRACTICE") {
        alert("Bitte wähle eine Option aus!");
        return;
    }
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
      feedbackArea.style.display = "block";
      feedbackArea.className = isCorrect ? "feedback correct" : "feedback wrong";

      feedbackArea.innerHTML = isCorrect 
        ? `✅ Richtig! Gut gemacht.` 
        : `❌ Falsch!<br><br><strong>Richtige Antwort:</strong><br>${correctAns}`;
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn";
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
        <button class="btn btn-repeat" onclick="window.startRepetition()">
          🔄 Falsche Fragen wiederholen (${wrongQuestions.length})
        </button>
      `;
    }

    html += `
      <div class="results-list">
        ${sessionList.map((q, i) => {
          const ans = userAnswers[i] || { user: "Keine Antwort", correct: "-", success: false };
          return `
            <div class="box result-box ${ans.success ? 'result-correct' : 'result-wrong'}">
              <strong>${ans.success ? '✅' : '❌'} Frage ${i+1}: ${q.muskel ? q.muskel.muskel : 'Zuordnungsaufgabe'}</strong> [${q.type.toUpperCase()}]<br>
              <small>Kategorie: ${q.kat.toUpperCase()}</small><br><br>
              <span class="user-ans">Deine Antwort: <br><i>${ans.user}</i></span><br><br>
              ${!ans.success ? `<span class="correct-ans">Richtige Lösung: <br>${ans.correct}</span>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <button class="btn" onclick="window.renderMenu()">Hauptmenü</button>
    `;

    window.lastWrongQuestions = wrongQuestions;
    container.innerHTML = html;
  }

  window.startRepetition = function() {
    if (!window.lastWrongQuestions || window.lastWrongQuestions.length === 0) return;
    window.startSession('PRACTICE', window.lastWrongQuestions);
  };

  window.renderMenu = renderMenu;

  renderMenu();
}
