// ==========================================
// 🛠️ LOGIK / JAVASCRIPT
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true';

  if (isAdmin) {
    if (!window.appInitialized) initAnatomyApp();
    return;
  }

  function showMaintenancePage() {
    const container = document.getElementById("app-container");
    if(!container) return;
    container.innerHTML = `
      <div class="maintenance-container fade-in">
        <div class="gears-box">
          <div class="gear-single">⚙️</div>
        </div>
        <h2>Wartungsarbeiten</h2>
        <p style="color: #64748b; margin-top: 10px;">Wir aktualisieren die Datenbank für dein Training.</p>
        <div class="maintenance-badge">
          ⚡ System-Update läuft — gleich wieder da!
        </div>
      </div>
    `;
  }

  function checkMaintenanceStatus() {
    fetch('status.json?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.maintenance) showMaintenancePage();
        else if (!window.appInitialized) initAnatomyApp();
      })
      .catch(err => {
        console.log("Status-Check fehlgeschlagen:", err);
        if (!window.appInitialized) initAnatomyApp();
      });
  }

  checkMaintenanceStatus();
  setInterval(checkMaintenanceStatus, 10000);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") checkMaintenanceStatus();
  });
});

function initAnatomyApp() {
  window.appInitialized = true;

  const muskelDaten = [
    // --- RÜCKEN: AUTOCHTHONE RÜCKENMUSKULATUR (LATERALER TRAKT) ---
    { muskel: "M. iliocostalis", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, oberflächliches Blatt der Fascia thoracolumbalis, 3.-12. Rippe.", ansatz: "1.-12. Rippe, tiefes Blatt der Fascia thoracolumbalis, Querfortsätze der LWS und HWS (C4-C6).", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C8-L1).", funktion: "Dorsalextension (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. longissimus", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, Dornfortsätze der LWS, Querfortsätze der unteren BWS und der oberen HWS/BWS.", ansatz: "2.-12. Rippe, Rippenfortsätze der LWS, Querfortsätze der BWS und HWS, Proc. mastoideus.", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C1-L5).", funktion: "Dorsalextension (beidseitig), Lateralflexion und Drehung des Kopfes zur ipsilateralen Seite (einseitig)." },
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
    { muskel: "M. trapezius", gruppe: "Schultergürtel", ursprung: "Os occipitale, Lig. nuchae, Procc. spinosi aller Hals- und Brustwirbel.", ansatz: "laterales Drittel der Clavicula, Acromion, Spina scapulae.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C2-4).", funktion: "Zieht Scapula schräg aufwärts und dreht sie nach außen, verlagert das Schulterblatt nach medial, zieht Scapula nach kaudal-medial. Gesamter Muskel fixiert das Schulterblatt am Thorax." },
    { muskel: "M. sternocleidomastoideus", gruppe: "Schultergürtel", ursprung: "Manubrium sterni, mediales Drittel der Clavicula.", ansatz: "Proc. mastoideus und Linea nuchalis superior.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C1-2).", funktion: "Lateralflexion ipsilateral und Rotation kontralateral (einseitig); Dorsalextension des Kopfes und Atemhilfsmuskel (beidseitig)." },
    { muskel: "M. omohyoideus", gruppe: "Schultergürtel", ursprung: "Margo superior des Schulterblatts.", ansatz: "Körper des Zungenbeins.", innervation: "Ansa cervicalis des Plexus cervicalis (C1-4).", funktion: "Absenkung des Zungenbeins, spannt die Halsfaszie, hält V. jugularis interna offen." },
    { muskel: "M. serratus anterior", gruppe: "Schultergürtel", ursprung: "1.–9. Rippe.", ansatz: "Scapula (Angulus superior, Margo medialis, Angulus inferior).", innervation: "N. thoracicus longus (C5-7).", funktion: "Verschiebung der Scapula nach lateral-ventral, Atemhilfsmuskel, ermöglicht Elevation des Armes über 90°." },
    { muskel: "M. subclavius", gruppe: "Schultergürtel", ursprung: "1. Rippe (Knorpel-Knochen-Grenze).", ansatz: "Unterseite der Clavicula.", innervation: "N. subclavius (C5, 6).", funktion: "Fixierung der Clavicula im Sternoklavikulargelenk." },
    { muskel: "M. pectoralis minor", gruppe: "Schultergürtel", ursprung: "3.–5. Rippe.", ansatz: "Proc. coracoideus der Scapula.", innervation: "Nn. pectorales medialis und lateralis (C6-Th1).", funktion: "Herabziehen der Scapula, Atemhilfsmuskel." },
    { muskel: "M. levator scapulae", gruppe: "Schultergürtel", ursprung: "Procc. transversi der 1.–4. Halswirbel.", ansatz: "Angulus superior der Scapula.", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Zieht Scapula nach kranial-medial, neigt den Hals ipsilateral." },
    { muskel: "Mm. rhomboidei (major und minor)", gruppe: "Schultergürtel", ursprung: "Procc. spinosi der 6.-7. Halswirbel (minor) bzw. der 1.–4. Brustwirbel (major).", ansatz: "Margo medialis der Scapula.", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Fixierung der Scapula, zieht sie nach kranial-medial." },

    // --- ARM: SCHULTERGELENKMUSKULATUR ---
    { muskel: "M. subscapularis", gruppe: "Schultergelenk", ursprung: "Fossa subscapularis der Scapula.", ansatz: "Tuberculum minus des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation." },
    { muskel: "M. supraspinatus", gruppe: "Schultergelenk", ursprung: "Fossa supraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Abduktion." },
    { muskel: "M. infraspinatus", gruppe: "Schultergelenk", ursprung: "Fossa infraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Außenrotation." },
    { muskel: "M. teres minor", gruppe: "Schultergelenk", ursprung: "Margo lateralis der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Außenrotation, schwache Adduktion." },
    { muskel: "M. deltoideus", gruppe: "Schultergelenk", ursprung: "laterales Drittel der Clavicula, Acromion, Spina scapulae.", ansatz: "Tuberositas deltoidea am Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Abduktion; Anteversion, Innenrotation; Retroversion, Außenrotation." },
    { muskel: "M. latissimus dorsi", gruppe: "Schultergelenk", ursprung: "Procc. spinosi Th7-Th12, Fascia thoracolumbalis, Crista iliaca, 9.–12. Rippe.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. thoracodorsalis (C6-8).", funktion: "Innenrotation, Adduktion, Retroversion, Atemhilfsmuskel (\"Hustenmuskel\")." },
    { muskel: "M. teres major", gruppe: "Schultergelenk", ursprung: "Angulus inferior der Scapula.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation, Adduktion, Retroversion." },
    { muskel: "M. pectoralis major", gruppe: "Schultergelenk", ursprung: "mediale Clavicula, Sternum, 2.–6. Rippenknorpel, Rektusscheide.", ansatz: "Crista tuberculi majoris des Humerus.", innervation: "Nn. pectorales medialis und lateralis (C5-Th1).", funktion: "Adduktion, Innenrotation, Anteversion, Atemhilfsmuskel." },
    { muskel: "M. coracobrachialis", gruppe: "Schultergelenk", ursprung: "Proc. coracoideus der Scapula.", ansatz: "Humerus (Verlängerung der Crista tuberculi minoris).", innervation: "N. musculocutaneus (C5, 6).", funktion: "Anteversion, Adduktion, Innenrotation." },

    // --- ARM: OBERARMMUSKULATUR ---
    { muskel: "M. biceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum supraglenoidale (Caput longum), Proc. coracoideus (Caput breve).", ansatz: "Tuberositas radii, Lacertus fibrosus.", innervation: "N. musculocutaneus (C5-7).", funktion: "Ellenbogengelenk: Flexion, Supination; Schulter: Abduktion, Innenrotation, Anteversion." },
    { muskel: "M. brachialis", gruppe: "Oberarm", ursprung: "distale Hälfte der Vorderfläche des Humerus.", ansatz: "Tuberositas ulnae.", innervation: "N. musculocutaneus (C5-7), N. radialis (C5-6).", funktion: "Flexion im Ellenbogengelenk." },
    { muskel: "M. triceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum infraglenoidale (Caput longum), Hinterfläche des Humerus.", ansatz: "Olecranon der Ulna.", innervation: "N. radialis (C6-8).", funktion: "Extension im Ellenbogen; Retroversion und Adduktion in der Schulter (Caput longum)." },
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
    { muskel: "M. brachioradialis", gruppe: "Unterarm (Extensoren)", ursprung: "laterale Seite des distalen Humerus.", ansatz: "Proc. styloideus radii.", innervation: "N. radialis (C5-7).", funktion: "Flexion im Ellenbogen, Semipronationsstellung im Unterarm." },
    { muskel: "Mm. extensores carpi radialis (longus und brevis)", gruppe: "Unterarm (Extensoren)", ursprung: "lateraler Humerus (longus), Epicondylus lateralis (brevis).", ansatz: "dorsale Basis des Os metacarpi II (longus) und III (brevis).", innervation: "N. radialis (C5-7).", funktion: "Handgelenke: Dorsalextension, Radialabduktion." },
    { muskel: "M. extensor digitorum", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 2.–5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension; Finger: Extension, Spreizen." },
    { muskel: "M. extensor digiti minimi", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension, Ulnarabduktion; 5. Finger: Extension, Abspreizen." },
    { muskel: "M. extensor carpi ulnaris", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis, Dorsalseite der Ulna.", ansatz: "Basis des Os metacarpi V.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension, Ulnarabduktion der Handgelenke." },
    { muskel: "M. supinator", gruppe: "Unterarm (Extensoren)", ursprung: "Olecranon, Epicondylus lateralis, Ligg. collaterale radiale und anulare radii.", ansatz: "Radius.", innervation: "N. radialis (C5, 6).", funktion: "Supination." },
    { muskel: "M. abductor pollicis longus", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalflächen von Radius und Ulna, Membrana interossea.", ansatz: "Basis des Os metacarpi I.", innervation: "N. radialis (C6-8).", funktion: "Radialabduktion (Handgelenk), Abduktion (Daumensattelgelenk)." },
    { muskel: "M. extensor pollicis (longus und brevis)", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalfläche Ulna/Membrana interossea (longus); Dorsalfläche Radius/Membrana interossea (brevis).", ansatz: "Basis der Endphalanx (longus) bzw. Grundphalanx (brevis) des Daumens.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension, Radialabduktion; Daumenextension, Daumenadduktion." },
    { muskel: "M. extensor indicis", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalfläche der Ulna, Membrana interossea.", ansatz: "Dorsalaponeurose des 2. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension (Handgelenk und 2. Finger)." },

    // --- ARM: KURZE HANDMUSKELN ---
    { muskel: "Mm. abductor/adductor/flexor pollicis, opponens", gruppe: "Hand (Thenar)", ursprung: "Retinaculum flexorum, angrenzende Handwurzelknochen.", ansatz: "Basis der Daumengrundphalanx bzw. Os metacarpi I.", innervation: "Überwiegend N. medianus (C6, 7), teils N. ulnaris (C8-Th1).", funktion: "Komplexe Daumenbewegungen (Abduktion, Adduktion, Flexion, Opposition)." },
    { muskel: "Mm. abductor/flexor/opponens digiti minimi", gruppe: "Hand (Hypothenar)", ursprung: "Os pisiforme, Hamulus ossis hamati, Retinaculum mm. flexorum.", ansatz: "Basis der Grundphalanx 5. Finger, Dorsalaponeurose bzw. Os metacarpi V.", innervation: "N. ulnaris (C8-Th1).", funktion: "Flexion, Abduktion und Opposition des 5. Fingers." },
    { muskel: "Mm. lumbricales I-IV", gruppe: "Hand (Mittelhand)", ursprung: "Sehnen des M. flexor digitorum profundus.", ansatz: "Dorsalaponeurosen des 2.–5. Fingers.", innervation: "N. medianus (I+II), N. ulnaris (III+IV).", funktion: "Flexion in den Grundgelenken, Extension in den Mittel-/Endgelenken." },
    { muskel: "Mm. interossei (dorsales I-IV und palmares I-III)", gruppe: "Hand (Mittelhand)", ursprung: "Ossa metacarpi (dorsales: zweiköpfig; palmares: einseitig).", ansatz: "Dorsalaponeurose und Basis der proximalen Phalangen.", innervation: "N. ulnaris (C8-Th1).", funktion: "Flexion (Grundgelenk), Extension (Mittel-/Endgelenk); Spreizen (dorsales) und Schließen (palmares) der Finger." },

    // --- BEIN: INNERE HÜFTMUSKELN ---
    { muskel: "M. iliopsoas", gruppe: "Bein (Hüfte)", ursprung: "12. Brust- und 1.–5. Lendenwirbelkörper/Disci; Fossa iliaca.", ansatz: "Gemeinsam am Trochanter minor des Femurs.", innervation: "N. femoralis (L1-4) sowie direkte Äste aus dem Plexus lumbalis.", funktion: "Hüftgelenk: Flexion und Außenrotation. Lendenwirbelsäule: Lateralflexion zur ipsilateralen Seite, Aufrichten des Rumpfes." },

    // --- BEIN: ÄUSSERE HÜFTMUSKELN ---
    { muskel: "M. gluteus maximus", gruppe: "Bein (Hüfte)", ursprung: "Facies dorsalis des Os sacrum, Facies glutea des Os ilium, Fascia thoracolumbalis und Lig. sacrotuberale.", ansatz: "Tractus iliotibialis (kraniale Fasern) und Tuberositas glutea (kaudale Fasern).", innervation: "N. gluteus inferior (L5-S2).", funktion: "Extension und Außenrotation im Hüftgelenk, Stabilisierung des Beckens. Abduktion/Adduktion je nach Faseranteil." },
    { muskel: "M. gluteus medius", gruppe: "Bein (Hüfte)", ursprung: "Facies glutea des Os ilium.", ansatz: "Seitliche Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung in der Frontalebene. Flexion/Innenrotation oder Extension/Außenrotation." },
    { muskel: "M. gluteus minimus", gruppe: "Bein (Hüfte)", ursprung: "Facies glutea des Os ilium (unter dem M. gluteus medius).", ansatz: "Mediale Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung. Flexion/Innenrotation oder Extension/Außenrotation." },
    { muskel: "M. tensor fasciae latae", gruppe: "Bein (Hüfte)", ursprung: "Spina iliaca anterior superior.", ansatz: "Tractus iliotibialis.", innervation: "N. gluteus superior (L4-S1).", funktion: "Spannt die Fascia lata; Hüftgelenk: Abduktion, Flexion und Innenrotation." },
    { muskel: "M. piriformis", gruppe: "Bein (Hüfte)", ursprung: "Facies pelvica des Os sacrum.", ansatz: "Spitze des Trochanter major am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Abduktion und Extension im Hüftgelenk; Stabilisierung." },
    { muskel: "M. obturatorius internus", gruppe: "Bein (Hüfte)", ursprung: "Innenfläche der Membrana obturatoria und an ihrem knöchernen Rahmen.", ansatz: "Fossa trochanterica am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "Mm. gemelli (superior und inferior)", gruppe: "Bein (Hüfte)", ursprung: "Spina ischiadica des Os ischii (superior); Tuber ischiadicum des Os ischii (inferior).", ansatz: "Zusammen mit der Ansatzsehne des M. obturatorius internus in der Fossa trochanterica.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "M. quadratus femoris", gruppe: "Bein (Hüfte)", ursprung: "Lateraler Rand des Tuber ischiadicum des Os ischii.", ansatz: "Crista intertrochanterica des Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2) und/oder N. gluteus inferior.", funktion: "Außenrotation und Adduktion im Hüftgelenk." },

    // --- BEIN: ADDUKTORENGRUPPE ---
    { muskel: "M. obturatorius externus", gruppe: "Bein (Adduktoren)", ursprung: "Außenseite der Membrana obturatoria und angrenzender Knochen.", ansatz: "Fossa trochanterica des Femur.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Außenrotation im Hüftgelenk, Stabilisierung des Beckens." },
    { muskel: "M. pectineus", gruppe: "Bein (Adduktoren)", ursprung: "Pecten ossis pubis.", ansatz: "Linea pectinea und an der proximalen Linea aspera des Femur.", innervation: "N. femoralis (L1-4), N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor longus", gruppe: "Bein (Adduktoren)", ursprung: "R. superior des Os pubis und Vorderseite der Symphyse.", ansatz: "Linea aspera (Labium mediale im mittleren Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor brevis", gruppe: "Bein (Adduktoren)", ursprung: "R. inferior des Os pubis.", ansatz: "Linea aspera (Labium mediale im oberen Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. adductor magnus", gruppe: "Bein (Adduktoren)", ursprung: "R. inferior des Os pubis, R. ossis ischii und Tuber ischiadicum.", ansatz: "Labium mediale der Linea aspera und Epicondylus medialis des Femur.", innervation: "N. obturatorius, L2-4; N. tibialis, L4-5.", funktion: "Adduktion, Außenrotation und Extension im Hüftgelenk." },
    { muskel: "M. adductor minimus", gruppe: "Bein (Adduktoren)", ursprung: "R. inferior des Os pubis.", ansatz: "Labium mediale der Linea aspera.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk." },
    { muskel: "M. gracilis", gruppe: "Bein (Adduktoren)", ursprung: "R. inferior des Os pubis unterhalb der Symphyse.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. obturatorius (L2-4).", funktion: "Hüftgelenk: Adduktion und Flexion; Kniegelenk: Flexion und Innenrotation." },

    // --- BEIN: OBERSCHENKEL (EXTENSOREN) ---
    { muskel: "M. sartorius", gruppe: "Bein (Oberschenkel)", ursprung: "Spina iliaca anterior superior.", ansatz: "Medial der Tuberositas tibiae am Pes anserinus superficialis.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion, Abduktion und Außenrotation; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. quadriceps femoris", gruppe: "Bein (Oberschenkel)", ursprung: "Spina iliaca anterior inferior (M. rectus femoris); Linea aspera, Vorderseite des Femurschaftes (Mm. vasti).", ansatz: "Tuberositas tibiae via Lig. patellae sowie Condylen und Recessus suprapatellaris.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion (M. rectus femoris); Kniegelenk: Extension (alle Anteile)." },

    // --- BEIN: OBERSCHENKEL (FLEXOREN) ---
    { muskel: "M. biceps femoris", gruppe: "Bein (Oberschenkel)", ursprung: "Tuber ischiadicum und Lig. sacrotuberale (Caput longum); Labium laterale der Linea aspera (Caput breve).", ansatz: "Caput fibulae.", innervation: "N. tibialis (Caput longum); N. fibularis communis (Caput breve).", funktion: "Hüftgelenk: Adduktion, Extension, Beckenstabilisierung; Kniegelenk: Flexion und Außenrotation." },
    { muskel: "M. semimembranosus", gruppe: "Bein (Oberschenkel)", ursprung: "Tuber ischiadicum.", ansatz: "Pes anserinus profundus (Condylus medialis tibiae).", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Adduktion, Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. semitendinosus", gruppe: "Bein (Oberschenkel)", ursprung: "Tuber ischiadicum und Lig. sacrotuberale.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Adduktion, Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. popliteus", gruppe: "Bein (Oberschenkel)", ursprung: "Condylus lateralis femoris, Hinterhorn des Außenmeniskus.", ansatz: "Facies posterior tibiae.", innervation: "N. tibialis (L5-S2).", funktion: "Flexion und Innenrotation im Kniegelenk." },

    // --- BEIN: UNTERSCHENKEL (EXTENSOREN & FIBULARISGRUPPE) ---
    { muskel: "M. tibialis anterior", gruppe: "Bein (Unterschenkel)", ursprung: "Obere zwei Drittel der Facies lateralis tibiae, Membrana interossea cruris.", ansatz: "Os cuneiforme mediale, mediale Basis des Os metatarsi I.", innervation: "N. fibularis profundus (L4, 5).", funktion: "Dorsalextension (oberes Sprunggelenk), Inversion/Supination (unteres Sprunggelenk)." },
    { muskel: "M. extensor digitorum longus", gruppe: "Bein (Unterschenkel)", ursprung: "Condylus lateralis tibiae, Caput fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurosen der 2.–5. Zehe, Basen der Phalanges distales der 2.–5. Zehe.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension (oberes Sprunggelenk), Eversion (unteres Sprunggelenk), Extension der Zehen." },
    { muskel: "M. extensor hallucis longus", gruppe: "Bein (Unterschenkel)", ursprung: "Mittleres Drittel der Facies medialis fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurose der Großzehe, Basis ihrer Endphalanx.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension (oberes Sprunggelenk), Extension der Großzehe." },
    { muskel: "M. fibularis longus", gruppe: "Bein (Unterschenkel)", ursprung: "Caput fibulae, proximale zwei Drittel der Facies lateralis fibulae.", ansatz: "Plantarseite des Os cuneiforme mediale, Basis des Os metatarsi I.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion, Verspannung des Quergewölbes." },
    { muskel: "M. fibularis brevis", gruppe: "Bein (Unterschenkel)", ursprung: "Distale Hälfte der Facies lateralis fibulae.", ansatz: "Tuberositas ossis metatarsi V.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion." },
    { muskel: "M. fibularis tertius", gruppe: "Bein (Unterschenkel)", ursprung: "Margo anterior der distalen Fibula.", ansatz: "Basis des Os metatarsi V.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension, Eversion." },

    // --- BEIN: UNTERSCHENKEL (FLEXOREN) ---
    { muskel: "M. triceps surae", gruppe: "Bein (Unterschenkel)", ursprung: "Dorsalseite Caput/Collum fibulae (M. soleus); Epicondylus medialis und lateralis femoris (M. gastrocnemius).", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Plantarflexion (oberes Sprunggelenk), Inversion (unteres Sprunggelenk), Knieflexion (nur M. gastrocnemius)." },
    { muskel: "M. plantaris", gruppe: "Bein (Unterschenkel)", ursprung: "Proximal des Caput laterale des M. gastrocnemius.", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Verhindert bei Knieflexion Kompression der Vasa tibialia posteriora." },
    { muskel: "M. tibialis posterior", gruppe: "Bein (Unterschenkel)", ursprung: "Membrana interossea cruris, Ränder von Tibia und Fibula.", ansatz: "Tuberositas ossis navicularis, Ossa cuneiformia, Basen der Ossa metatarsi II-IV.", innervation: "N. tibialis (L4-S1).", funktion: "Plantarflexion, Inversion, Verspannung des Längs- und Quergewölbes." },
    { muskel: "M. flexor digitorum longus", gruppe: "Bein (Unterschenkel)", ursprung: "Mittleres Drittel der Facies posterior der Tibia.", ansatz: "Basen der Endphalangen II-V.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Zehenflexion." },
    { muskel: "M. flexor hallucis longus", gruppe: "Bein (Unterschenkel)", ursprung: "Distale zwei Drittel der Facies posterior fibulae, Membrana interossea cruris.", ansatz: "Basis der Endphalanx der Großzehe.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Großzehenflexion, Verspannung des medialen Längsgewölbes." },

    // --- BEIN: KURZE FUSSMUSKELN ---
    { muskel: "M. extensor digitorum / hallucis brevis", gruppe: "Bein (Fuß)", ursprung: "Dorsalfläche des Calcaneus.", ansatz: "Dorsalaponeurose der Zehen bzw. Großzehe.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension der Zehen." },
    { muskel: "Mm. abductor/flexor/adductor hallucis", gruppe: "Bein (Fuß)", ursprung: "Tuber calcanei, Os cuneiforme, Ossa metatarsi.", ansatz: "Basis der Großzehengrundphalanx (oft via Sesambeine).", innervation: "N. plantaris medialis / lateralis.", funktion: "Plantarflexion, Ab-/Adduktion der Großzehe, Gewölbe-Verspannung." },
    { muskel: "Mm. abductor/flexor/opponens digiti minimi", gruppe: "Bein (Fuß)", ursprung: "Tuber calcanei, Basis Os metatarsi V.", ansatz: "Basis der Kleinzehengrundphalanx / Os metatarsi V.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion, Abduktion und Opposition der Kleinzehe." },
    { muskel: "M. flexor digitorum brevis / quadratus plantae", gruppe: "Bein (Fuß)", ursprung: "Tuber calcanei, Plantaraponeurose.", ansatz: "Mittelphalangen 2.-5. Zehe / Sehne des M. flexor digitorum longus.", innervation: "N. plantaris medialis / lateralis.", funktion: "Plantarflexion, Umlenkung der langen Beugersehnen." },
    { muskel: "Mm. lumbricales I-IV / interossei", gruppe: "Bein (Fuß)", ursprung: "Sehnen des M. flexor digitorum longus / Ossa metatarsi.", ansatz: "Dorsalaponeurosen / Basen der Phalangen.", innervation: "N. plantaris medialis / lateralis.", funktion: "Plantarflexion (Grundgelenke), Dorsalextension (Endgelenke), Spreizen/Schließen der Zehen." }
  ];

  let sessionList = [];
  let currentIndex = 0;
  let userAnswers = {};
  let currentMode = "";

  let container = document.getElementById("app-container");

  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))];

    let html = `
      <div class="fade-in">
        <h1>🦴 Anatomie Trainer Ultimate Pro</h1>
        
        <div class="main-layout">
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="box scrollable">
            <div class="box-header">1. Muskelauswahl</div>
            
            <div class="button-group">
              <button class="btn btn-menu" onclick="window.selectAllMuscles(true)">Alle an</button>
              <button class="btn btn-menu" onclick="window.selectAllMuscles(false)">Alle aus</button>
              <button class="btn btn-menu" onclick="window.selectRandomMuscles()">🎲 Zufall</button>
            </div>
            
            ${gruppen.map(g => `
              <div class="group-title">
                <label style="color:var(--primary-hover); font-weight:600; font-size:1rem; width:100%;">
                  <input type="checkbox" onchange="window.toggleGroup('${g}', this.checked)" checked class="m-check-group" style="border-color:var(--primary);">
                  📁 ${g}
                </label>
              </div>
              <div class="group-items">
                ${muskelDaten.filter(m => m.gruppe === g).map(m => `
                  <label><input type="checkbox" class="m-check" data-gruppe="${g}" value="${m.muskel}" checked> ${m.muskel}</label>
                `).join('')}
              </div>
            `).join('')}
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="box">
            <div class="box-header">2. Einstellungen & Inhalte</div>
            
            <!-- KATEGORIEN TOGGLES -->
            <div class="settings-card">
              <strong>Kategorien</strong>
              <div class="toggle-wrapper">
                <span class="toggle-label">Ursprung</span>
                <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider"></span></label>
              </div>
              <div class="toggle-wrapper">
                <span class="toggle-label">Ansatz</span>
                <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider"></span></label>
              </div>
              <div class="toggle-wrapper">
                <span class="toggle-label">Innervation</span>
                <label class="switch"><input type="checkbox" id="kat-innervation" checked><span class="slider"></span></label>
              </div>
              <div class="toggle-wrapper">
                <span class="toggle-label">Funktion</span>
                <label class="switch"><input type="checkbox" id="kat-funktion" checked><span class="slider"></span></label>
              </div>
            </div>
            
            <!-- FRAGETYPEN TOGGLES -->
            <div class="settings-card">
              <strong>Fragetypen</strong>
              <div class="toggle-wrapper">
                <span class="toggle-label">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider"></span></label>
              </div>
              <div class="toggle-wrapper">
                <span class="toggle-label">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider"></span></label>
              </div>
              <div class="toggle-wrapper">
                <span class="toggle-label">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider"></span></label>
              </div>
            </div>
            
            <!-- LIMIT INPUT -->
            <div class="settings-card">
              <div class="limit-input-wrapper">
                <span class="toggle-label" style="font-weight:600;">Max. Fragen <span style="font-weight:400; color:var(--text-muted);">(0 = alle)</span>:</span>
                <input type="number" id="limit-input" value="10" min="0">
              </div>
            </div>
            
            <!-- START BUTTONS -->
            <div class="action-area">
              <button class="btn btn-practice" onclick="window.startSession('PRACTICE')">🚀 ÜBUNGSMODUS (Direktes Feedback)</button>
              <button class="btn btn-exam" onclick="window.startSession('EXAM')">📝 PRÜFUNGSMODUS (Zusammenfassung)</button>
            </div>

          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
  };

  window.selectAllMuscles = function(status) {
    document.querySelectorAll('.m-check, .m-check-group').forEach(cb => cb.checked = status);
  };

  window.toggleGroup = function(gruppeName, status) {
    document.querySelectorAll(`.m-check[data-gruppe="${gruppeName}"]`).forEach(cb => cb.checked = status);
  };

  window.selectRandomMuscles = function() {
    window.selectAllMuscles(false);
    const randomCount = Math.floor(Math.random() * (13 - 5 + 1)) + 5;
    const checkboxes = Array.from(document.querySelectorAll('.m-check'));
    checkboxes.sort(() => Math.random() - 0.5);
    checkboxes.slice(0, randomCount).forEach(cb => {
        cb.checked = true;
        const groupCb = document.querySelector(`.m-check-group[onchange*="${cb.dataset.gruppe}"]`);
        if(groupCb) groupCb.checked = true;
    });
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
        alert("⚠️ Bitte wähle mindestens einen Muskel, eine Kategorie und einen Fragetyp aus!");
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
      <div class="fade-in">
        <div class="header-bar">
          <button class="btn btn-menu" onclick="window.renderMenu()">◀ Zurück ins Menü</button>
          <span>Frage ${currentIndex + 1} von ${sessionList.length} <strong style="color:var(--primary);">[${currentMode}]</strong></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPct}%;"></div>
        </div>
    `;

    if (q.type === 'write') {
      html += `
        <h2 style="font-size:1.8rem; color:var(--primary); margin-bottom:5px;">${q.muskel.muskel}</h2>
        <p style="color:var(--text-muted); font-size:0.95rem;">Kategorie: <strong style="color:var(--text-main); text-transform:uppercase;">${q.kat}</strong> &nbsp;|&nbsp; Gruppe: ${q.muskel.gruppe}</p>
        <br><br>
        <label style="color:var(--text-main); font-weight:600; margin-bottom:10px; font-size:1.1rem;">Deine Antwort:</label>
        <input type="text" id="write-answer" autofocus autocomplete="off" placeholder="Tippe deine Antwort hier ein...">
        <button class="btn btn-primary" id="submit-btn" onclick="window.checkWriteAnswer()">Antwort prüfen</button>
      `;
    } else if (q.type === 'single') {
      const correct = q.muskel[q.kat];
      const wrongPool = [...new Set(muskelDaten.map(m => m[q.kat]).filter(v => v !== correct))];
      const options = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
      options.push(correct);
      options.sort(() => Math.random() - 0.5);

      html += `
        <h2 style="font-size:1.8rem; color:var(--primary); margin-bottom:5px;">${q.muskel.muskel}</h2>
        <p style="color:var(--text-muted); font-size:0.95rem;">Kategorie: <strong style="color:var(--text-main); text-transform:uppercase;">${q.kat}</strong> &nbsp;|&nbsp; Gruppe: ${q.muskel.gruppe}</p>
        <br>
        <p style="font-weight:600; margin-bottom:15px; font-size:1.1rem; color:var(--text-main);">Wähle die richtige Antwort aus:</p>
        <div class="option-list">
        ${options.map((opt) => `
          <label class="option-item">
            <input type="radio" class="q-radio" name="single-opt" value="${opt.replace(/"/g, '&quot;')}"> 
            <span>${opt}</span>
          </label>
        `).join('')}
        </div>
        <button class="btn btn-primary" id="submit-btn" onclick="window.checkSingleAnswer()">Auswahl bestätigen</button>
      `;
    } else if (q.type === 'match') {
      const currentCategory = q.kat;
      let availableMuscles = muskelDaten.filter(m => m.muskel !== q.muskel.muskel).sort(() => Math.random() - 0.5);
      const subSet = [q.muskel, availableMuscles[0], availableMuscles[1]].filter(Boolean);
      
      const leftSide = [...subSet].sort(() => Math.random() - 0.5);
      const rightSide = subSet.map(m => m[currentCategory]).sort(() => Math.random() - 0.5);

      q.matchingSubSet = subSet;

      html += `
        <h2 style="font-size:1.8rem; color:var(--primary); margin-bottom:5px;">🔗 Zuordnung (Matching)</h2>
        <p style="color:var(--text-muted); font-size:0.95rem;">Kategorie: <strong style="color:var(--text-main); text-transform:uppercase;">${currentCategory}</strong></p>
        <br>
        <p style="font-weight:600; margin-bottom:15px; font-size:1.1rem; color:var(--text-main);">Ordne jedem Muskel den passenden Wert zu:</p>
        
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
        <button class="btn btn-primary" id="submit-btn" onclick="window.checkMatchAnswer()">Zuordnung prüfen</button>
      `;
    }

    html += `<div id="feedback-area"></div></div>`;
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
        alert("⚠️ Bitte wähle eine Option aus!");
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
        ? `✅ <strong>Exzellent!</strong> Die Antwort ist richtig.` 
        : `❌ <strong>Leider falsch.</strong><br><br><span style="color:#991b1b; font-size:0.9rem; text-transform:uppercase;">Richtige Lösung:</span><br><span style="font-size:1.05rem;">${correctAns}</span>`;
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn";
      nextBtn.style.background = "#0f172a";
      nextBtn.style.marginTop = "20px";
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
    const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let html = `
      <div class="fade-in">
        <div style="text-align:center; padding: 20px 0; border-bottom: 2px solid var(--bg-color); margin-bottom: 25px;">
          <h1 style="background: none; -webkit-text-fill-color: var(--text-main); margin-bottom:15px; font-size:2.2rem;">🏁 Session beendet</h1>
          <div style="font-size:4rem; font-weight:700; color: var(--primary); margin-bottom: 10px; line-height:1;">${scorePct}%</div>
          <p style="color:var(--text-muted); font-size:1.1rem;">Du hast <strong>${correctCount}</strong> von <strong>${total}</strong> Fragen richtig beantwortet.</p>
        </div>
    `;

    if (wrongQuestions.length > 0) {
      html += `
        <button class="btn btn-repeat" onclick="window.startRepetition()" style="font-size:1.1rem; padding:16px;">
          🔄 Falsche Fragen wiederholen (${wrongQuestions.length})
        </button>
      `;
    }

    html += `
        <div class="results-list">
          ${sessionList.map((q, i) => {
            const ans = userAnswers[i] || { user: "Keine Antwort", correct: "-", success: false };
            return `
              <div class="result-box ${ans.success ? 'result-correct' : 'result-wrong'}">
                <div style="font-size:1.1rem; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                  <strong>${ans.success ? '✅' : '❌'} Frage ${i+1}: ${q.muskel ? q.muskel.muskel : 'Zuordnung'}</strong> 
                  <span style="color:#64748b; font-size:0.85rem; background:#f1f5f9; padding:4px 8px; border-radius:6px; font-weight:600;">${q.type.toUpperCase()}</span>
                </div>
                <small style="color:#64748b; display:block; margin-bottom:12px; font-weight:600; letter-spacing:0.5px;">KATEGORIE: ${q.kat.toUpperCase()}</small>
                <div class="user-ans" style="margin-bottom:8px; line-height:1.5;">Deine Antwort:<br><strong style="color:var(--text-main); font-style:normal;">${ans.user}</strong></div>
                ${!ans.success ? `<div class="correct-ans" style="padding-top:8px; border-top:1px dashed #fecaca; line-height:1.5; margin-top:10px;">Richtige Lösung:<br><span style="color:#b91c1c;">${ans.correct}</span></div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn" onclick="window.renderMenu()" style="background:#0f172a; margin-top:25px; padding:18px; font-size:1.1rem; box-shadow:0 10px 15px -3px rgba(15, 23, 42, 0.3);">🏠 Zurück zum Hauptmenü</button>
      </div>
    `;

    window.lastWrongQuestions = wrongQuestions;
    container.innerHTML = html;
  }

  window.startRepetition = function() {
    if (!window.lastWrongQuestions || window.lastWrongQuestions.length === 0) return;
    window.startSession('PRACTICE', window.lastWrongQuestions);
  };

  window.renderMenu();
}
</script>
</body>
</html>
