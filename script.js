// ==========================================
// 🛠️ LOGIK / JAVASCRIPT
// ==========================================

// SVG Icons für Haken und Kreuz
const iconCheck = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const iconCross = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

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
      <div class="maintenance-container fade-in" style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 80px; margin-bottom: 20px; animation: spinCW 4s linear infinite;">⚙️</div>
        <h2>Wartungsarbeiten</h2>
        <p style="color: #64748b; margin-top: 10px;">Die Datenbank wird gerade aktualisiert.</p>
      </div>
    `;
  }

  function checkMaintenanceStatus() {
    fetch('status.json?t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.maintenance) showMaintenancePage();
        else if (!window.appInitialized) initAnatomyApp();
      })
      .catch(() => { if (!window.appInitialized) initAnatomyApp(); });
  }

  checkMaintenanceStatus();
  setInterval(checkMaintenanceStatus, 10000);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") checkMaintenanceStatus();
  });
});

function initAnatomyApp() {
  window.appInitialized = true;

  // KOMplette Einzelmuskel-Datenbank (Rücken, Arm, Hand, Bein, Fuß)
  const muskelDaten = [
    // --- 1. RÜCKEN: LATERALER TRAKT ---
    { muskel: "M. iliocostalis", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, oberflächliches Blatt der Fascia thoracolumbalis, 3.-12. Rippe.", ansatz: "1.-12. Rippe, tiefes Blatt der Fascia thoracolumbalis, Querfortsätze der LWS und HWS (C4-C6).", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C8-L1).", funktion: "Dorsalextension (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. longissimus", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Os sacrum, Crista iliaca, Dornfortsätze der LWS, Querfortsätze der unteren BWS und der oberen HWS/BWS.", ansatz: "2.-12. Rippe, Rippenfortsätze der LWS, Querfortsätze der BWS und HWS, Proc. mastoideus des Os temporale.", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C1-L5).", funktion: "Dorsalextension (beidseitig), Lateralflexion und Drehung des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. splenius", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Dornfortsätze des 4. Hals- bis 6. Brustwirbels.", ansatz: "Querfortsätze des 1. und 2. Halswirbels, laterale Linea nuchalis superior, Proc. mastoideus.", innervation: "laterale Äste der Rr. dorsales der Spinalnerven (C1-6).", funktion: "Dorsalextension der HWS und des Kopfes (beidseitig), ipsilaterale Lateralflexion und Rotation (einseitig)." },
    { muskel: "Mm. intertransversarii", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Verlaufen zwischen benachbarten Quer-, Zitzen- oder Rippenfortsätzen der LWS und HWS.", ansatz: "Verlaufen zwischen benachbarten Quer-, Zitzen- oder Rippenfortsätzen der LWS und HWS.", innervation: "Rr. dorsales und z.T. Rr. ventrales der Spinalnerven.", funktion: "Stabilisierung und Dorsalextension der HWS und LWS (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "Mm. levatores costarum", gruppe: "Rücken (Lateraler Trakt)", ursprung: "Querfortsätze des 7. Hals- und 1.-11. Brustwirbels.", ansatz: "Angulus costae der nächsttieferen oder übernächsten Rippe.", innervation: "Rr. dorsales und Rr. ventrales der Spinalnerven.", funktion: "Dorsalextension der BWS (beidseitig), ipsilaterale Lateralflexion und kontralaterale Rotation (einseitig)." },

    // --- 2. RÜCKEN: MEDIALER TRAKT ---
    { muskel: "Mm. interspinales", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verlaufen zwischen den Dornfortsätzen der HWS und LWS.", ansatz: "Verlaufen zwischen den Dornfortsätzen der HWS und LWS.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der HWS und LWS." },
    { muskel: "M. spinalis", gruppe: "Rücken (Medialer Trakt)", ursprung: "Dornfortsätze (T10-L3 sowie C5-T2).", ansatz: "Dornfortsätze (T2-T8 sowie C2-C4).", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der HWS und BWS (beidseitig), Lateralflexion zur ipsilateralen Seite (einseitig)." },
    { muskel: "Mm. rotatores breves u. longi", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verlaufen zwischen Querfortsatz und nächsthöherem bzw. übernächstem Dornfortsatz der BWS.", ansatz: "Verlaufen zwischen Querfortsatz und nächsthöherem bzw. übernächstem Dornfortsatz der BWS.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der BWS (beidseitig), Rotation zur kontralateralen Seite (einseitig)." },
    { muskel: "M. multifidus", gruppe: "Rücken (Medialer Trakt)", ursprung: "Verläuft zwischen Querfortsatz und Dornfortsatz (überspringt 2-4 Wirbel) innerhalb der gesamten Wirbelsäule.", ansatz: "Verläuft zwischen Querfortsatz und Dornfortsatz (überspringt 2-4 Wirbel) innerhalb der gesamten Wirbelsäule.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension (beidseitig), Lateralflexion zur ipsilateralen Seite und Rotation zur kontralateralen Seite (einseitig)." },
    { muskel: "M. semispinalis", gruppe: "Rücken (Medialer Trakt)", ursprung: "Querfortsätze des 3. Hals- bis 12. Brustwirbels.", ansatz: "Dornfortsätze (C2-T4) sowie Os occipitale.", innervation: "Rr. dorsales der Spinalnerven.", funktion: "Dorsalextension der BWS, HWS und des Kopfes (beidseitig), Lateralflexion zur ipsilateralen und Rotation zur kontralateralen Seite (einseitig)." },

    // --- 3. KURZE NACKENMUSKELN ---
    { muskel: "M. rectus capitis posterior major", gruppe: "Kurze Nackenmuskeln", ursprung: "Dornfortsatz des Axis.", ansatz: "mittleres Drittel der Linea nuchalis inferior.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Drehen des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. rectus capitis posterior minor", gruppe: "Kurze Nackenmuskeln", ursprung: "Tuberculum posterius des Atlas.", ansatz: "inneres Drittel der Linea nuchalis inferior.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Lateralflexion des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. obliquus capitis superior", gruppe: "Kurze Nackenmuskeln", ursprung: "Querfortsatz des Atlas.", ansatz: "oberhalb der Ansatzzone des M. rectus capitis posterior major.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Lateralflexion des Kopfes zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. obliquus capitis inferior", gruppe: "Kurze Nackenmuskeln", ursprung: "Dornfortsatz des Axis.", ansatz: "Querfortsatz des Atlas.", innervation: "R. dorsalis von C1 (N. suboccipitalis).", funktion: "Dorsalextension (beidseitig), Drehen des Kopfes zur ipsilateralen Seite (einseitig)." },

    // --- 4. PRÄVERTEBRALE HALSMUSKELN ---
    { muskel: "M. longus capitis", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Tubercula anteriora der Querfortsätze (C3-C6).", ansatz: "Pars basilaris des Os occipitale.", innervation: "Plexus cervicalis (C1-4).", funktion: "Ventralflexion des Kopfes (beidseitig), Lateralflexion und Rotation zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. longus colli (cervicis)", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Verbindet die Wirbelkörper und Querfortsätze der HWS und oberen BWS.", ansatz: "Verbindet die Wirbelkörper und Querfortsätze der HWS und oberen BWS.", innervation: "Plexus cervicalis (C2-C6).", funktion: "Ventralflexion der HWS (beidseitig), Lateralflexion und Rotation zur ipsilateralen Seite (einseitig)." },
    { muskel: "M. rectus capitis anterior", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Massa lateralis des Atlas.", ansatz: "Pars basilaris des Os occipitale.", innervation: "R. ventralis des 1. Zervikalnervs.", funktion: "Ventralflexion im Atlantookzipitalgelenk (beidseitig), Lateralflexion (einseitig)." },
    { muskel: "M. rectus capitis lateralis", gruppe: "Prävertebrale Halsmuskeln", ursprung: "Proc. transversus des Atlas.", ansatz: "Pars lateralis des Os occipitale.", innervation: "R. ventralis des 1. Zervikalnervs.", funktion: "Lateralflexion im Atlantookzipitalgelenk (einseitig)." },

    // --- 5. BAUCHWANDMUSKULATUR ---
    { muskel: "M. obliquus externus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Außenfläche der 5.-12. Rippe.", ansatz: "Labium externum der Crista iliaca, vorderes Blatt der Rektusscheide, Linea alba.", innervation: "Nn. intercostales (Th 5-12).", funktion: "Ventralflexion, Bauchpresse (beidseitig), Lateralflexion ipsilateral, Rotation kontralateral (einseitig)." },
    { muskel: "M. obliquus internus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Fascia thoracolumbalis, Crista iliaca, Spina iliaca anterior superior, Lig. inguinale.", ansatz: "untere Ränder 10.-12. Rippe, Rektusscheide, Linea alba.", innervation: "Nn. intercostales, N. iliohypogastricus, N. ilioinguinalis.", funktion: "Ventralflexion, Bauchpresse (beidseitig), Lateralflexion und Rotation ipsilateral (einseitig)." },
    { muskel: "M. transversus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Innenflächen 7.-12. Rippenknorpel/-rippe, Fascia thoracolumbalis, Crista iliaca, Lig. inguinale.", ansatz: "Rektusscheide, Linea alba.", innervation: "Nn. intercostales, Nn. iliohypogastricus und ilioinguinalis.", funktion: "Bauchpresse, Ausatmung (beidseitig), Rotation ipsilateral (einseitig)." },
    { muskel: "M. rectus abdominis", gruppe: "Bauchwandmuskulatur", ursprung: "Knorpel der 5.-7. Rippe, Proc. xiphoideus.", ansatz: "Schambein.", innervation: "Nn. intercostales (Th5-12).", funktion: "Ventralflexion, Aufrichtung des Beckens, Bauchpresse." },
    { muskel: "M. quadratus lumborum", gruppe: "Bauchwandmuskulatur", ursprung: "Crista iliaca.", ansatz: "12. Rippe, Rippenfortsätze des 1.-4. Lendenwirbels.", innervation: "N. subcostalis.", funktion: "Bauchpresse (beidseitig), Lateralflexion ipsilateral (einseitig)." },

    // --- 6. BRUSTKORBMUSKULATUR ---
    { muskel: "M. scalenus anterior", gruppe: "Brustkorbmuskulatur", ursprung: "Tubercula anteriora der Querfortsätze des 3.-6. Halswirbels.", ansatz: "Tuberculum musculi scaleni anterioris der 1. Rippe.", innervation: "Direkte Äste aus dem Plexus cervicalis und Plexus brachialis (C3-6).", funktion: "Inspiration (Heben der 1. Rippe), Lateralflexion der HWS." },
    { muskel: "M. scalenus medius", gruppe: "Brustkorbmuskulatur", ursprung: "Tubercula posteriora der Querfortsätze des 3.-7. Halswirbels.", ansatz: "1. Rippe (dorsal des Sulcus a. subclaviae).", innervation: "Direkte Äste aus dem Plexus cervicalis und Plexus brachialis (C3-6).", funktion: "Inspiration, Lateralflexion der HWS." },
    { muskel: "M. scalenus posterior", gruppe: "Brustkorbmuskulatur", ursprung: "Tubercula posteriora der Querfortsätze des 5.-7. Halswirbels.", ansatz: "Außenfläche der 2. Rippe.", innervation: "Direkte Äste aus dem Plexus cervicalis und Plexus brachialis (C3-6).", funktion: "Inspiration, Lateralflexion der HWS." },
    { muskel: "Mm. intercostales externi", gruppe: "Brustkorbmuskulatur", ursprung: "Unterrand einer Rippe (Tuberculum costae bis Knorpel-Knochen-Grenze).", ansatz: "Oberrand der nächsttieferen Rippe.", innervation: "Nn. intercostales I-XI.", funktion: "Rippenheber (Inspiration), Stabilisation der Thoraxwand." },
    { muskel: "Mm. intercostales interni", gruppe: "Brustkorbmuskulatur", ursprung: "Oberrand einer Rippe (Angulus costae bis Sternum).", ansatz: "Unterrand der nächsthöheren Rippe.", innervation: "Nn. intercostales I-XI.", funktion: "Rippensenker (Exspiration), Stabilisation der Thoraxwand." },
    { muskel: "Mm. intercostales intimi", gruppe: "Brustkorbmuskulatur", ursprung: "Abspaltung der Mm. intercostales interni.", ansatz: "Gleicher Verlauf wie intercostales interni.", innervation: "Nn. intercostales I-XI.", funktion: "Rippensenker (Exspiration)." },
    { muskel: "Zwerchfell (Diaphragma)", gruppe: "Brustkorbmuskulatur", ursprung: "Pars costalis (7.-12. Rippe), Pars lumbalis (LWK 1-3), Pars sternalis (Proc. xiphoideus).", ansatz: "Centrum tendineum.", innervation: "N. phrenicus (C3-5).", funktion: "Wichtigster Inspirationsmuskel, Mitwirkung Bauchpresse." },
    { muskel: "M. serratus posterior superior", gruppe: "Brustkorbmuskulatur", ursprung: "Dornfortsätze des 6. und 7. Halswirbels sowie des 1. und 2. Brustwirbels.", ansatz: "2.-5. Rippe in Höhe des Angulus costae.", innervation: "Nn. intercostales Th1-4.", funktion: "Hebt die Rippen und unterstützt somit die Inspiration." },
    { muskel: "M. serratus posterior inferior", gruppe: "Brustkorbmuskulatur", ursprung: "Dornfortsätze des 11. und 12. Brustwirbels, des 1. und 2. Lendenwirbels sowie Fascia thoracolumbalis.", ansatz: "Unterrand der 9.-12. Rippe.", innervation: "Nn. intercostales Th9-12.", funktion: "Unterstützt Inspiration, stabilisiert das Zwerchfell." },

    // --- 7. SCHULTERGÜRTELMUSKULATUR ---
    { muskel: "M. trapezius", gruppe: "Schultergürtelmuskulatur", ursprung: "Os occipitale, Lig. nuchae, Procc. spinosi aller Hals- und Brustwirbel.", ansatz: "laterales Drittel der Clavicula, Acromion, Spina scapulae.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C2-4).", funktion: "Zieht Scapula schräg aufwärts und dreht sie nach außen, verlagert das Schulterblatt nach medial, zieht Scapula nach kaudal-medial. Gesamter Muskel fixiert das Schulterblatt am Thorax." },
    { muskel: "M. sternocleidomastoideus", gruppe: "Schultergürtelmuskulatur", ursprung: "Manubrium sterni (Caput sternale), mediales Drittel der Clavicula (Caput claviculare).", ansatz: "Proc. mastoideus und Linea nuchalis superior.", innervation: "N. accessorius (XI. Hirnnerv) und Plexus cervicalis (C1-2).", funktion: "Lateralflexion ipsilateral und Rotation kontralateral (einseitig); Dorsalextension des Kopfes und Atemhilfsmuskel (beidseitig)." },
    { muskel: "M. omohyoideus", gruppe: "Schultergürtelmuskulatur", ursprung: "Margo superior des Schulterblatts.", ansatz: "Körper des Zungenbeins.", innervation: "Ansa cervicalis des Plexus cervicalis (C1-4).", funktion: "Absenkung des Zungenbeins, spannt die Halsfaszie, hält V. jugularis interna offen." },
    { muskel: "M. serratus anterior", gruppe: "Schultergürtelmuskulatur", ursprung: "1.–9. Rippe.", ansatz: "Scapula (Angulus superior, Margo medialis, Angulus inferior).", innervation: "N. thoracicus longus (C5-7).", funktion: "Verschiebung der Scapula nach lateral-ventral, Atemhilfsmuskel, ermöglicht Elevation des Armes über 90°." },
    { muskel: "M. subclavius", gruppe: "Schultergürtelmuskulatur", ursprung: "1. Rippe (Knorpel-Knochen-Grenze).", ansatz: "Unterseite der Clavicula.", innervation: "N. subclavius (C5, 6).", funktion: "Fixierung der Clavicula im Sternoklavikulargelenk." },
    { muskel: "M. pectoralis minor", gruppe: "Schultergürtelmuskulatur", ursprung: "3.–5. Rippe.", ansatz: "Proc. coracoideus der Scapula.", innervation: "Nn. pectorales medialis und lateralis (C6-Th1).", funktion: "Herabziehen der Scapula, Atemhilfsmuskel." },
    { muskel: "M. levator scapulae", gruppe: "Schultergürtelmuskulatur", ursprung: "Procc. transversi der 1.–4. Halswirbel.", ansatz: "Angulus superior der Scapula.", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Zieht Scapula nach kranial-medial, neigt den Hals ipsilateral." },
    { muskel: "M. rhomboideus minor", gruppe: "Schultergürtelmuskulatur", ursprung: "Procc. spinosi der 6. und 7. Halswirbel.", ansatz: "Margo medialis der Scapula (oberhalb der Spina scapulae).", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Fixierung der Scapula, zieht sie nach kranial-medial." },
    { muskel: "M. rhomboideus major", gruppe: "Schultergürtelmuskulatur", ursprung: "Procc. spinosi der 1.–4. Brustwirbel.", ansatz: "Margo medialis der Scapula (unterhalb der Spina scapulae).", innervation: "N. dorsalis scapulae (C4-5).", funktion: "Fixierung der Scapula, zieht sie nach kranial-medial." },

    // --- 8. SCHULTERGELENKMUSKULATUR ---
    { muskel: "M. subscapularis", gruppe: "Schultergelenk (Rotatorenmanschette)", ursprung: "Fossa subscapularis der Scapula.", ansatz: "Tuberculum minus des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation." },
    { muskel: "M. supraspinatus", gruppe: "Schultergelenk (Rotatorenmanschette)", ursprung: "Fossa supraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Abduktion." },
    { muskel: "M. infraspinatus", gruppe: "Schultergelenk (Rotatorenmanschette)", ursprung: "Fossa infraspinata der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. suprascapularis (C4-6).", funktion: "Außenrotation." },
    { muskel: "M. teres minor", gruppe: "Schultergelenk (Rotatorenmanschette)", ursprung: "Margo lateralis der Scapula.", ansatz: "Tuberculum majus des Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Außenrotation, schwache Adduktion." },
    { muskel: "M. deltoideus", gruppe: "Schultergelenk", ursprung: "Laterales Drittel der Clavicula, Acromion, Spina scapulae.", ansatz: "Tuberositas deltoidea am Humerus.", innervation: "N. axillaris (C5, 6).", funktion: "Abduktion (Pars acromialis); Anteversion, Innenrotation (Pars clavicularis); Retroversion, Außenrotation (Pars spinalis)." },
    { muskel: "M. latissimus dorsi", gruppe: "Schultergelenk", ursprung: "Procc. spinosi Th7-Th12, Fascia thoracolumbalis, Crista iliaca, 9.–12. Rippe, Angulus inferior der Scapula.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. thoracodorsalis (C6-8).", funktion: "Innenrotation, Adduktion, Retroversion, Atemhilfsmuskel (\"Hustenmuskel\")." },
    { muskel: "M. teres major", gruppe: "Schultergelenk", ursprung: "Angulus inferior der Scapula.", ansatz: "Crista tuberculi minoris des Humerus.", innervation: "N. subscapularis (C5-8).", funktion: "Innenrotation, Adduktion, Retroversion." },
    { muskel: "M. pectoralis major", gruppe: "Schultergelenk", ursprung: "Mediale Clavicula, Sternum, 2.–6. Rippenknorpel, Rektusscheide.", ansatz: "Crista tuberculi majoris des Humerus.", innervation: "Nn. pectorales medialis und lateralis (C5-Th1).", funktion: "Adduktion, Innenrotation, Anteversion, Atemhilfsmuskel." },
    { muskel: "M. coracobrachialis", gruppe: "Schultergelenk", ursprung: "Proc. coracoideus der Scapula.", ansatz: "Humerus (Verlängerung der Crista tuberculi minoris).", innervation: "N. musculocutaneus (C5, 6).", funktion: "Anteversion, Adduktion, Innenrotation." },

    // --- 9. OBERARMMUSKULATUR ---
    { muskel: "M. biceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum supraglenoidale (Caput longum), Proc. coracoideus (Caput breve).", ansatz: "Tuberositas radii, Lacertus fibrosus.", innervation: "N. musculocutaneus (C5-7).", funktion: "Ellenbogengelenk: Flexion, Supination; Schulter: Abduktion, Innenrotation, Anteversion." },
    { muskel: "M. brachialis", gruppe: "Oberarm", ursprung: "Distale Hälfte der Vorderfläche des Humerus, Septa intermuscularia brachii.", ansatz: "Tuberositas ulnae.", innervation: "N. musculocutaneus (C5-7), N. radialis (C5-6).", funktion: "Flexion im Ellenbogengelenk." },
    { muskel: "M. triceps brachii", gruppe: "Oberarm", ursprung: "Tuberculum infraglenoidale (Caput longum), Hinterfläche des Humerus (Caput mediale & laterale).", ansatz: "Olecranon der Ulna.", innervation: "N. radialis (C6-8).", funktion: "Extension im Ellenbogen; Retroversion und Adduktion in der Schulter (Caput longum)." },
    { muskel: "M. anconeus", gruppe: "Oberarm", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Olecranon der Ulna (radiale Fläche).", innervation: "N. radialis (C6-8).", funktion: "Extension, Kapselspanner." },

    // --- 10. UNTERARMMUSKULATUR (FLEXOREN) ---
    { muskel: "M. pronator teres", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus, Proc. coronoideus der Ulna.", ansatz: "Facies lateralis radii.", innervation: "N. medianus (C6).", funktion: "Flexion (Ellenbogen), Pronation (Unterarm)." },
    { muskel: "M. flexor digitorum superficialis", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis, Proc. coronoideus der Ulna, Radius.", ansatz: "Seiten der Mittelphalangen der Finger II-V.", innervation: "N. medianus (C7-Th1).", funktion: "Flexion in Hand- und Fingergelenken (II-V)." },
    { muskel: "M. flexor carpi radialis", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus.", ansatz: "Basis des Os metacarpi II.", innervation: "N. medianus (C6-8).", funktion: "Handgelenke: Flexion, Radialabduktion; schwache Pronation." },
    { muskel: "M. flexor carpi ulnaris", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus, Olecranon der Ulna.", ansatz: "Hamulus ossis hamati, Basis des Os metacarpi V, Os pisiforme.", innervation: "N. ulnaris (C8-Th1).", funktion: "Handgelenke: Flexion, Ulnarabduktion." },
    { muskel: "M. palmaris longus", gruppe: "Unterarm (Flexoren)", ursprung: "Epicondylus medialis des Humerus.", ansatz: "Palmaraponeurose.", innervation: "N. medianus (C8-Th1).", funktion: "Palmarflexion im Handgelenk, Spannen der Palmaraponeurose." },
    { muskel: "M. flexor digitorum profundus", gruppe: "Unterarm (Flexoren)", ursprung: "Beugeseite der Ulna, Membrana interossea.", ansatz: "Palmarseite der Endphalangen der Finger II-V.", innervation: "N. medianus (radial), N. ulnaris (ulnar) (C8-Th1).", funktion: "Flexion in Hand-, Grund-, Mittel- und Endgelenken der Finger II-V." },
    { muskel: "M. flexor pollicis longus", gruppe: "Unterarm (Flexoren)", ursprung: "Vorderfläche des Radius, Membrana interossea.", ansatz: "Palmarseite der Endphalanx des Daumens.", innervation: "N. medianus (C6-8).", funktion: "Handgelenke: Flexion, Radialabduktion; Daumen: Opposition, Flexion." },
    { muskel: "M. pronator quadratus", gruppe: "Unterarm (Flexoren)", ursprung: "Distales Viertel der Vorderfläche der Ulna.", ansatz: "Distales Viertel der Vorderfläche des Radius.", innervation: "N. medianus (C8-Th1).", funktion: "Pronation, sichert distales Radioulnargelenk." },

    // --- 11. UNTERARMMUSKULATUR (EXTENSOREN & RADIALIS) ---
    { muskel: "M. brachioradialis", gruppe: "Unterarm (Extensoren)", ursprung: "Laterale Seite des distalen Humerus.", ansatz: "Proc. styloideus radii.", innervation: "N. radialis (C5-7).", funktion: "Flexion im Ellenbogen, Semipronationsstellung im Unterarm." },
    { muskel: "M. extensor carpi radialis longus", gruppe: "Unterarm (Extensoren)", ursprung: "Crista supracondylaris lateralis des Humerus.", ansatz: "Dorsale Basis des Os metacarpi II.", innervation: "N. radialis (C5-7).", funktion: "Handgelenke: Dorsalextension, Radialabduktion." },
    { muskel: "M. extensor carpi radialis brevis", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsale Basis des Os metacarpi III.", innervation: "N. radialis (C5-7).", funktion: "Handgelenke: Dorsalextension, Radialabduktion." },
    { muskel: "M. extensor digitorum", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 2.–5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension; Finger: Extension, Spreizen." },
    { muskel: "M. extensor digiti minimi", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis des Humerus.", ansatz: "Dorsalaponeurose des 5. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Handgelenke: Dorsalextension, Ulnarabduktion; 5. Finger strecken." },
    { muskel: "M. extensor carpi ulnaris", gruppe: "Unterarm (Extensoren)", ursprung: "Epicondylus lateralis, Dorsalseite der Ulna.", ansatz: "Basis des Os metacarpi V.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension, Ulnarabduktion der Handgelenke." },
    { muskel: "M. supinator", gruppe: "Unterarm (Extensoren)", ursprung: "Olecranon, Epicondylus lateralis, Ligg. collaterale radiale und anulare radii.", ansatz: "Radius.", innervation: "N. radialis (C5, 6).", funktion: "Supination." },
    { muskel: "M. abductor pollicis longus", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalflächen von Radius und Ulna, Membrana interossea.", ansatz: "Basis des Os metacarpi I.", innervation: "N. radialis (C6-8).", funktion: "Radialabduktion Handgelenk, Daumensattelgelenk Abduktion." },
    { muskel: "M. extensor pollicis brevis", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalfläche des Radius, Membrana interossea.", ansatz: "Basis der Daumengrundphalanx.", innervation: "N. radialis (C6-8).", funktion: "Daumensattel- und Grundgelenk Extension." },
    { muskel: "M. extensor pollicis longus", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalfläche der Ulna, Membrana interossea.", ansatz: "Basis der Endphalanx des Daumens.", innervation: "N. radialis (C6-8).", funktion: "Daumenextension, Dorsalextension Handgelenk." },
    { muskel: "M. extensor indicis", gruppe: "Unterarm (Extensoren)", ursprung: "Dorsalfläche der Ulna, Membrana interossea.", ansatz: "Dorsalaponeurose des 2. Fingers.", innervation: "N. radialis (C6-8).", funktion: "Dorsalextension Handgelenk und 2. Finger." },

    // --- 12. KURZE HANDMUSKELN (EINZELN) ---
    { muskel: "M. abductor pollicis brevis", gruppe: "Handmuskeln", ursprung: "Os scaphoideum, Retinaculum musculorum flexorum.", ansatz: "Basis der Daumengrundphalanx (radiales Sesambein).", innervation: "N. medianus (C6, 7).", funktion: "Daumensattelgelenk Abduktion, Grundgelenk Flexion." },
    { muskel: "M. adductor pollicis", gruppe: "Handmuskeln", ursprung: "Caput transversum (3. Mittelhandknochen) & Caput obliquum (Os capitatum, Basis Metacarpi II-III).", ansatz: "Basis der Daumengrundphalanx (ulnares Sesambein).", innervation: "N. ulnaris (C8-Th1).", funktion: "Daumensattelgelenk Adduktion, Opposition." },
    { muskel: "M. flexor pollicis brevis", gruppe: "Handmuskeln", ursprung: "Retinaculum mm. flexorum, Os capitatum, Os trapezium.", ansatz: "Basis der Daumengrundphalanx (radiales Sesambein).", innervation: "N. medianus (Caput superficiale) & N. ulnaris (Caput profundum).", funktion: "Daumen Flexion und Opposition." },
    { muskel: "M. opponens pollicis", gruppe: "Handmuskeln", ursprung: "Os trapezium.", ansatz: "Radialer Rand des 1. Mittelhandknochens.", innervation: "N. medianus (C6, 7).", funktion: "Daumensattelgelenk Opposition." },
    { muskel: "M. abductor digiti minimi (Hand)", gruppe: "Handmuskeln", ursprung: "Os pisiforme.", ansatz: "Ulnare Basis der Grundphalanx und Dorsalaponeurose des 5. Fingers.", innervation: "N. ulnaris (C8-Th1).", funktion: "Kleinfingergrundgelenk Flexion, Abspreizen." },
    { muskel: "M. flexor digiti minimi brevis (Hand)", gruppe: "Handmuskeln", ursprung: "Hamulus ossis hamati, Retinaculum mm. flexorum.", ansatz: "Basis der Grundphalanx des 5. Fingers.", innervation: "N. ulnaris (C8-Th1).", funktion: "Kleinfingergrundgelenk Flexion." },
    { muskel: "M. opponens digiti minimi (Hand)", gruppe: "Handmuskeln", ursprung: "Hamulus ossis hamati.", ansatz: "Ulnarer Rand des 5. Mittelhandknochens.", innervation: "N. ulnaris (C8-Th1).", funktion: "Zieht das Os metacarpi nach palmar (Opposition)." },
    { muskel: "Mm. lumbricales I-IV (Hand)", gruppe: "Handmuskeln", ursprung: "Radiale Seiten der Sehnen des M. flexor digitorum profundus.", ansatz: "Dorsalaponeurosen des 2.–5. Fingers.", innervation: "N. medianus (I+II), N. ulnaris (III+IV) (C8-Th1).", funktion: "Fingergrundgelenke Flexion, Mittel-/Endgelenke Extension." },
    { muskel: "Mm. interossei dorsales I-IV (Hand)", gruppe: "Handmuskeln", ursprung: "Einander zugekehrte Seiten der Ossa metatarsi I-V (zweiköpfig).", ansatz: "Dorsalaponeurose 2.-4. Finger, Basis proximale Phalanx.", innervation: "N. ulnaris (C8-Th1).", funktion: "Grundgelenk Flexion, Endgelenk Extension, Spreizen der Finger." },
    { muskel: "Mm. interossei palmares I-III (Hand)", gruppe: "Handmuskulatur", ursprung: "Ulnare Seite 2., radiale Seite 4. und 5. Mittelhandknochen.", ansatz: "Dorsalaponeurose und Basis der proximalen Phalanx.", innervation: "N. ulnaris (C8-Th1).", funktion: "Schließen der gespreizten Finger (Adduktion zum Mittelfinger)." },

    // --- 13. BEIN: INNERE & ÄUSSERE HÜFTMUSKELN ---
    { muskel: "M. psoas major", gruppe: "Bein: Hüfte", ursprung: "Seitenflächen 12. Brust- bis 4. Lendenwirbelkörper/Disci.", ansatz: "Trochanter minor des Femurs.", innervation: "Direkte Äste aus Plexus lumbalis und N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion und Außenrotation." },
    { muskel: "M. iliacus", gruppe: "Bein: Hüfte", ursprung: "Fossa iliaca.", ansatz: "Trochanter minor des Femurs (gemeinsam als M. iliopsoas).", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion und Außenrotation." },
    { muskel: "M. gluteus maximus", gruppe: "Bein: Hüfte", ursprung: "Facies dorsalis des Os sacrum, Facies glutea des Os ilium, Fascia thoracolumbalis, Lig. sacrotuberale.", ansatz: "Tractus iliotibialis und Tuberositas glutea.", innervation: "N. gluteus inferior (L5-S2).", funktion: "Extension und Außenrotation im Hüftgelenk, Beckenstabilisierung." },
    { muskel: "M. gluteus medius", gruppe: "Bein: Hüfte", ursprung: "Facies glutea des Os ilium.", ansatz: "Seitliche Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung in der Frontalebene." },
    { muskel: "M. gluteus minimus", gruppe: "Bein: Hüfte", ursprung: "Facies glutea des Os ilium (unter M. gluteus medius).", ansatz: "Mediale Fläche des Trochanter major am Femur.", innervation: "N. gluteus superior (L4-S1).", funktion: "Abduktion und Beckenstabilisierung." },
    { muskel: "M. tensor fasciae latae", gruppe: "Bein: Hüfte", ursprung: "Spina iliaca anterior superior.", ansatz: "Tractus iliotibialis.", innervation: "N. gluteus superior (L4-S1).", funktion: "Spannt die Fascia lata; Hüftgelenk: Abduktion, Flexion und Innenrotation." },
    { muskel: "M. piriformis", gruppe: "Bein: Hüfte", ursprung: "Facies pelvica des Os sacrum.", ansatz: "Spitze des Trochanter major am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Abduktion und Extension im Hüftgelenk." },
    { muskel: "M. obturatorius internus", gruppe: "Bein: Hüfte", ursprung: "Innenfläche der Membrana obturatoria und knöcherner Rahmen.", ansatz: "Fossa trochanterica am Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "Mm. gemelli (superior und inferior)", gruppe: "Bein: Hüfte", ursprung: "Spina ischiadica (sup.) / Tuber ischiadicum (inf.) des Os ischii.", ansatz: "Zusammen mit M. obturatorius internus in der Fossa trochanterica.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2).", funktion: "Außenrotation, Adduktion und Extension im Hüftgelenk." },
    { muskel: "M. quadratus femoris", gruppe: "Bein: Hüfte", ursprung: "Lateraler Rand des Tuber ischiadicum des Os ischii.", ansatz: "Crista intertrochanterica des Femur.", innervation: "Direkte Äste aus dem Plexus sacralis (L5-S2) und/oder N. gluteus inferior.", funktion: "Außenrotation und Adduktion im Hüftgelenk." },

    // --- 14. BEIN: ADDUKTORENGRUPPE ---
    { muskel: "M. obturatorius externus", gruppe: "Bein: Adduktoren", ursprung: "Außenseite der Membrana obturatoria und angrenzender Knochen.", ansatz: "Fossa trochanterica des Femur.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Außenrotation im Hüftgelenk, Stabilisierung des Beckens." },
    { muskel: "M. pectineus", gruppe: "Bein: Adduktoren", ursprung: "Pecten ossis pubis.", ansatz: "Linea pectinea und proximale Linea aspera des Femur.", innervation: "N. femoralis (L1-4), N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk." },
    { muskel: "M. adductor longus", gruppe: "Bein: Adduktoren", ursprung: "R. superior des Os pubis und Vorderseite der Symphyse.", ansatz: "Linea aspera (Labium mediale im mittleren Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk." },
    { muskel: "M. adductor brevis", gruppe: "Bein: Adduktoren", ursprung: "R. inferior des Os pubis.", ansatz: "Linea aspera (Labium mediale im oberen Femurdrittel).", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion und Flexion (bis 70°) im Hüftgelenk." },
    { muskel: "M. adductor magnus", gruppe: "Bein: Adduktoren", ursprung: "R. inferior des Os pubis, R. ossis ischii und Tuber ischiadicum.", ansatz: "Labium mediale der Linea aspera und Epicondylus medialis des Femur.", innervation: "N. obturatorius, L2-4 (tiefer Teil); N. tibialis, L4-5 (oberflächlicher Teil).", funktion: "Adduktion, Außenrotation und Extension im Hüftgelenk." },
    { muskel: "M. adductor minimus", gruppe: "Bein: Adduktoren", ursprung: "R. inferior des Os pubis.", ansatz: "Labium mediale der Linea aspera.", innervation: "N. obturatorius (L2-4).", funktion: "Adduktion, Außenrotation und leichte Flexion im Hüftgelenk." },
    { muskel: "M. gracilis", gruppe: "Bein: Adduktoren", ursprung: "R. inferior des Os pubis unterhalb der Symphyse.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. obturatorius (L2-4).", funktion: "Hüftgelenk: Adduktion und Flexion; Kniegelenk: Flexion und Innenrotation." },

    // --- 15. BEIN: OBERSCHENKEL ---
    { muskel: "M. sartorius", gruppe: "Bein: Oberschenkel", ursprung: "Spina iliaca anterior superior.", ansatz: "Medial der Tuberositas tibiae am Pes anserinus superficialis.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion, Abduktion, Außenrotation; Kniegelenk: Flexion, Innenrotation." },
    { muskel: "M. rectus femoris", gruppe: "Bein: Oberschenkel", ursprung: "Spina iliaca anterior inferior (Caput rectum), Pfannendach (Caput reflexum).", ansatz: "Tuberositas tibiae via Lig. patellae.", innervation: "N. femoralis (L1-4).", funktion: "Hüftgelenk: Flexion; Kniegelenk: Extension." },
    { muskel: "M. vastus lateralis", gruppe: "Bein: Oberschenkel", ursprung: "Labium laterale der Linea aspera, Trochanter major.", ansatz: "Tuberositas tibiae via Lig. patellae.", innervation: "N. femoralis (L1-4).", funktion: "Kniegelenk: Extension." },
    { muskel: "M. vastus medialis", gruppe: "Bein: Oberschenkel", ursprung: "Labium mediale der Linea aspera, Linea intertrochanterica.", ansatz: "Tuberositas tibiae via Lig. patellae.", innervation: "N. femoralis (L1-4).", funktion: "Kniegelenk: Extension." },
    { muskel: "M. vastus intermedius", gruppe: "Bein: Oberschenkel", ursprung: "Vorderseite des Femurschaftes.", ansatz: "Tuberositas tibiae via Lig. patellae.", innervation: "N. femoralis (L1-4).", funktion: "Kniegelenk: Extension." },
    { muskel: "M. biceps femoris", gruppe: "Bein: Oberschenkel", ursprung: "Tuber ischiadicum (Caput longum); Labium laterale der Linea aspera (Caput breve).", ansatz: "Caput fibulae.", innervation: "N. tibialis (Caput longum); N. fibularis communis (Caput breve).", funktion: "Hüftgelenk: Extension; Kniegelenk: Flexion und Außenrotation." },
    { muskel: "M. semimembranosus", gruppe: "Bein: Oberschenkel", ursprung: "Tuber ischiadicum.", ansatz: "Pes anserinus profundus (Condylus medialis tibiae).", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. semitendinosus", gruppe: "Bein: Oberschenkel", ursprung: "Tuber ischiadicum und Lig. sacrotuberale.", ansatz: "Medial der Tuberositas tibiae im Pes anserinus superficialis.", innervation: "N. tibialis (L5-S2).", funktion: "Hüftgelenk: Extension; Kniegelenk: Flexion und Innenrotation." },
    { muskel: "M. popliteus", gruppe: "Bein: Oberschenkel", ursprung: "Condylus lateralis femoris, Hinterhorn des Außenmeniskus.", ansatz: "Facies posterior tibiae.", innervation: "N. tibialis (L5-S2).", funktion: "Flexion und Innenrotation im Kniegelenk." },

    // --- 16. BEIN: UNTERSCHENKEL ---
    { muskel: "M. tibialis anterior", gruppe: "Bein: Unterschenkel", ursprung: "Obere zwei Drittel der Facies lateralis tibiae, Membrana interossea cruris.", ansatz: "Os cuneiforme mediale, mediale Basis des Os metatarsi I.", innervation: "N. fibularis profundus (L4, 5).", funktion: "Dorsalextension (oberes Sprunggelenk), Inversion/Supination (unteres Sprunggelenk)." },
    { muskel: "M. extensor digitorum longus", gruppe: "Bein: Unterschenkel", ursprung: "Condylus lateralis tibiae, Caput fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurosen der 2.–5. Zehe, Basen der Phalanges distales.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension, Eversion, Zehenextension." },
    { muskel: "M. extensor hallucis longus", gruppe: "Bein: Unterschenkel", ursprung: "Mittleres Drittel der Facies medialis fibulae, Membrana interossea cruris.", ansatz: "Dorsalaponeurose der Großzehe, Basis ihrer Endphalanx.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension, Großzehenextension." },
    { muskel: "M. fibularis longus", gruppe: "Bein: Unterschenkel", ursprung: "Caput fibulae, proximale zwei Drittel der Facies lateralis fibulae.", ansatz: "Plantarseite des Os cuneiforme mediale, Basis des Os metatarsi I.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion, Quergewölbe-Verspannung." },
    { muskel: "M. fibularis brevis", gruppe: "Bein: Unterschenkel", ursprung: "Distale Hälfte der Facies lateralis fibulae.", ansatz: "Tuberositas ossis metatarsi V.", innervation: "N. fibularis superficialis (L5-S1).", funktion: "Plantarflexion, Eversion." },
    { muskel: "M. fibularis tertius", gruppe: "Bein: Unterschenkel", ursprung: "Margo anterior der distalen Fibula.", ansatz: "Basis des Os metatarsi V.", innervation: "N. fibularis profundus (L4-S1).", funktion: "Dorsalextension, Eversion." },
    { muskel: "M. gastrocnemius", gruppe: "Bein: Unterschenkel", ursprung: "Epicondylus medialis und lateralis femoris.", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Plantarflexion, Inversion, Knieflexion." },
    { muskel: "M. soleus", gruppe: "Bein: Unterschenkel", ursprung: "Caput/Collum fibulae und Linea musculi solei der Tibia.", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Plantarflexion, Inversion." },
    { muskel: "M. plantaris", gruppe: "Bein: Unterschenkel", ursprung: "Proximal des Caput laterale des M. gastrocnemius.", ansatz: "Tuber calcanei über die Achillessehne.", innervation: "N. tibialis (S1, 2).", funktion: "Verhindert bei Knieflexion Kompression der Vasa tibialia posteriora." },
    { muskel: "M. tibialis posterior", gruppe: "Bein: Unterschenkel", ursprung: "Membrana interossea cruris, Ränder von Tibia und Fibula.", ansatz: "Tuberositas ossis navicularis, Ossa cuneiformia, Basen Ossa metatarsi II-IV.", innervation: "N. tibialis (L4-S1).", funktion: "Plantarflexion, Inversion, Längs- und Quergewölbe-Verspannung." },
    { muskel: "M. flexor digitorum longus", gruppe: "Bein: Unterschenkel", ursprung: "Mittleres Drittel der Facies posterior der Tibia.", ansatz: "Basen der Endphalangen II-V.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Zehenflexion." },
    { muskel: "M. flexor hallucis longus", gruppe: "Bein: Unterschenkel", ursprung: "Distale zwei Drittel der Facies posterior fibulae, Membrana interossea.", ansatz: "Basis der Endphalanx der Großzehe.", innervation: "N. tibialis (L5-S2).", funktion: "Plantarflexion, Inversion, Großzehenflexion." },

    // --- 17. BEIN: KURZE FUSSMUSKELN (EINZELN) ---
    { muskel: "M. extensor digitorum brevis", gruppe: "Bein: Fuß", ursprung: "Dorsalfläche des Calcaneus.", ansatz: "Dorsalaponeurose der 2.–4. Zehe, Basen der Mittelphalangen II-IV.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension der 2.–4. Zehe." },
    { muskel: "M. extensor hallucis brevis", gruppe: "Bein: Fuß", ursprung: "Dorsalfläche des Calcaneus.", ansatz: "Dorsalaponeurose der Großzehe, Basis der Grundphalanx.", innervation: "N. fibularis profundus (L5-S1).", funktion: "Dorsalextension im Grundgelenk der Großzehe." },
    { muskel: "M. abductor hallucis", gruppe: "Bein: Fuß", ursprung: "Proc. medialis des Tuber calcanei, Plantaraponeurose.", ansatz: "Mediales Sesambein an der Basis der Großzehengrundphalanx.", innervation: "N. plantaris medialis (L5-S1).", funktion: "Plantarflexion, Abduktion der 1. Zehe nach medial." },
    { muskel: "M. flexor hallucis brevis", gruppe: "Bein: Fuß", ursprung: "Os cuneiforme mediale, intermedium, Lig. calcaneocuboideum plantare.", ansatz: "Basis der Grundphalanx I über die Sesambeine.", innervation: "N. plantaris medialis (Caput mediale), N. plantaris lateralis (Caput laterale).", funktion: "Plantarflexion im Großzehengrundgelenk." },
    { muskel: "M. adductor hallucis", gruppe: "Bein: Fuß", ursprung: "Basen Ossa metatarsi II-IV, Os cuboideum, Os cuneiforme laterale.", ansatz: "Laterales Sesambein an der Basis der Grundphalanx I.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion, Adduktion der Großzehe, Quergewölbe-Verspannung." },
    { muskel: "M. abductor digiti minimi (Fuß)", gruppe: "Bein: Fuß", ursprung: "Tuber calcanei, Plantaraponeurose.", ansatz: "Basis der Kleinzehengrundphalanx, Tuberositas ossis metatarsi V.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion, Abduktion im Kleinzehengrundgelenk." },
    { muskel: "M. flexor digiti minimi brevis (Fuß)", gruppe: "Bein: Fuß", ursprung: "Basis des Os metatarsi V, Lig. plantare longum.", ansatz: "Basis der Kleinzehengrundphalanx.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Plantarflexion im Kleinzehengrundgelenk." },
    { muskel: "M. opponens digiti minimi (Fuß)", gruppe: "Bein: Fuß", ursprung: "Lig. plantare longum, Sehnenscheide des M. fibularis longus.", ansatz: "Os metatarsi V.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Zieht Os metatarsi V nach plantar und medial." },
    { muskel: "M. flexor digitorum brevis", gruppe: "Bein: Fuß", ursprung: "Medialer Höcker des Tuber calcanei, Plantaraponeurose.", ansatz: "Seiten der Mittelphalangen der 2.–5. Zehe.", innervation: "N. plantaris medialis (L5-S1).", funktion: "Plantarflexion in Grund- und Mittelgelenken der 2.–5. Zehe." },
    { muskel: "M. quadratus plantae", gruppe: "Bein: Fuß", ursprung: "Medialer und plantarer Rand des Tuber calcanei.", ansatz: "Lateral am Rand der Sehne des M. flexor digitorum longus.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Umlenkung und Verstärkung der Zugrichtung des M. flexor digitorum longus." },
    { muskel: "Mm. lumbricales I-IV (Fuß)", gruppe: "Bein: Fuß", ursprung: "Mediale Ränder der Sehnen des M. flexor digitorum longus.", ansatz: "Dorsalaponeurosen der 2.–5. Zehe.", innervation: "N. plantaris medialis (I+II), N. plantaris lateralis (III+IV).", funktion: "Plantarflexion Grundgelenke, Dorsalextension Mittel-/Endgelenke." },
    { muskel: "Mm. interossei plantares I-III (Fuß)", gruppe: "Bein: Fuß", ursprung: "Medialer Rand der Ossa metatarsi III-V.", ansatz: "Mediale Basis der Grundphalangen III-V, Dorsalaponeurosen.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Adduktion der Zehen 3–5 zur 2. Zehe." },
    { muskel: "Mm. interossei dorsales I-IV (Fuß)", gruppe: "Bein: Fuß", ursprung: "Zweiköpfig von einander zugekehrten Seiten der Ossa metatarsi I-V.", ansatz: "Basis der Grundphalangen, Dorsalaponeurosen der 2.–4. Zehe.", innervation: "N. plantaris lateralis (S1, 2).", funktion: "Spreizen (Abduktion) der Zehen." }
  ];

let sessionList = [];
  let currentIndex = 0;
  let userAnswers = {};
  let currentMode = "";
  
  // NEU: Wir speichern, in welchem "Raum" (Hub) sich der Nutzer befindet
  let currentHub = ""; 

  let container = document.getElementById("app-container");

  window.updateSelectionCount = function() {
    const total = document.querySelectorAll('.m-check').length;
    const selected = document.querySelectorAll('.m-check:checked').length;
    const counterEl = document.getElementById('selection-counter');
    if (counterEl) {
      counterEl.innerText = `${selected} / ${total} ausgewählt`;
    }
  };

  // ==========================================
  // 1. DER STARTBILDSCHIRM (HOME SCREEN)
  // ==========================================
  window.renderHomeScreen = function() {
    let html = `
      <div class="fade-in" style="text-align:center; padding: 40px 20px;">
        <h1 style="font-size: 2.8rem; color: var(--primary, #3b82f6); margin-bottom: 10px;">
          🦴 Anatomie Trainer Ultimate Pro
        </h1>
        <p style="color: var(--text-muted, #94a3b8); font-size: 1.2rem; margin-bottom: 50px;">Wähle deinen Trainings-Raum</p>

        <div style="display: flex; gap: 25px; justify-content: center; flex-wrap: wrap; margin-bottom: 50px;">
          
          <!-- Kachel: Ursprung & Ansatz -->
          <div onclick="window.openHub('UA')"
               style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 35px 25px; width: 280px; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(10px);">
            <div style="font-size: 3.5rem; margin-bottom: 15px;">🔗</div>
            <h2 style="font-size: 1.4rem; color: #fff; margin-bottom: 10px;">Ursprung & Ansatz</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">Trainiere die mechanische Fixierung am Skelett.</p>
          </div>

          <!-- Kachel: Innervation -->
          <div onclick="window.openHub('INN')"
               style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 35px 25px; width: 280px; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(10px);">
            <div style="font-size: 3.5rem; margin-bottom: 15px;">⚡</div>
            <h2 style="font-size: 1.4rem; color: #fff; margin-bottom: 10px;">Innervation</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">Fokus auf die nervale Versorgung der Muskeln.</p>
          </div>

          <!-- Kachel: Funktion -->
          <div onclick="window.openHub('FUN')"
               style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 35px 25px; width: 280px; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(10px);">
            <div style="font-size: 3.5rem; margin-bottom: 15px;">⚙️</div>
            <h2 style="font-size: 1.4rem; color: #fff; margin-bottom: 10px;">Funktion</h2>
            <p style="color: #94a3b8; font-size: 0.95rem;">Lerne die Biokinetik und Bewegungsausführung.</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
  };

  // ==========================================
  // 2. HUB ÖFFNEN (Setzt den Raum und lädt das Menü)
  // ==========================================
  window.openHub = function(hubName) {
    currentHub = hubName; 
    window.renderMenu();
  };

  // ==========================================
  // 3. DAS DYNAMISCHE MENÜ
  // ==========================================
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    // Wir bestimmen den Titel für die rechte Box basierend auf dem gewählten Raum
    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "🔗 Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <div class="settings-card">
          <strong>Welchen Bereich abfragen?</strong>
          <div class="toggle-wrapper">
            <span class="toggle-label">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider"></span></label>
          </div>
          <div class="toggle-wrapper">
            <span class="toggle-label">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "⚡ Fokus: Innervation";
      // Keine Kategorie-Toggles, da es eh nur um Innervation geht!
      categorySettingsHtml = `
        <div class="settings-card" style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--primary);">
          <strong style="color: var(--primary);">Gewähltes Thema: Innervation</strong>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">Alle Fragen beziehen sich ausschließlich auf die nervale Versorgung.</p>
        </div>
      `;
    } else if (currentHub === 'FUN') {
      settingsTitle = "⚙️ Fokus: Funktion";
      // Keine Kategorie-Toggles, da es eh nur um Funktion geht!
      categorySettingsHtml = `
        <div class="settings-card" style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981;">
          <strong style="color: #10b981;">Gewähltes Thema: Funktion</strong>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">Alle Fragen beziehen sich ausschließlich auf die Funktion/Biomechanik.</p>
        </div>
      `;
    }

    let html = `
      <div class="fade-in">
        <button class="btn btn-menu" onclick="window.renderHomeScreen()" style="margin-bottom: 20px; font-size:0.9rem;">🏠 Zurück zum Hauptmenü</button>
        
        <div class="main-layout">
          <!-- LINKE BOX: MUSKELAUSWAHL (Bleibt immer gleich) -->
          <div class="box scrollable">
            <div class="box-header" style="justify-content: space-between;">
              <span>1. Muskelauswahl</span>
              <span id="selection-counter" style="font-size: 0.85rem; background: var(--primary-light); color: var(--primary); padding: 4px 10px; border-radius: 20px;"></span>
            </div>
            
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
                  <label><input type="checkbox" class="m-check" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> ${m.muskel}</label>
                `).join('')}
              </div>
            `).join('')}
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN (Passt sich dem Raum an) -->
          <div class="box">
            <div class="box-header">${settingsTitle}</div>
            
            <!-- HIER WERDEN DIE SPEZIFISCHEN KATEGORIE-EINSTELLUNGEN GELADEN -->
            ${categorySettingsHtml}
            
            <!-- FRAGETYPEN TOGGLES (Immer verfügbar) -->
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
            
            <!-- LIMIT INPUT (Immer verfügbar) -->
            <div class="settings-card">
              <div class="limit-input-wrapper">
                <span class="toggle-label" style="font-weight:600;">Max. Fragen <span style="font-weight:400; color:var(--text-muted);">(0 = alle)</span>:</span>
                <input type="number" id="limit-input" value="10" min="0">
              </div>
            </div>
            
            <!-- START BUTTONS -->
            <div class="action-area">
              <button class="btn btn-practice" onclick="window.startSession('PRACTICE')">🚀 ÜBUNGSMODUS starten</button>
              <button class="btn btn-exam" onclick="window.startSession('EXAM')">📝 PRÜFUNGSMODUS starten</button>
            </div>

          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
    window.updateSelectionCount();
  };

  window.selectAllMuscles = function(status) {
    document.querySelectorAll('.m-check, .m-check-group').forEach(cb => cb.checked = status);
    window.updateSelectionCount();
  };

  window.toggleGroup = function(gruppeName, status) {
    document.querySelectorAll(`.m-check[data-gruppe="${gruppeName}"]`).forEach(cb => cb.checked = status);
    window.updateSelectionCount();
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
    window.updateSelectionCount();
  };

  // ==========================================
  // SESSION STARTEN (Passt sich nun dem Raum an)
  // ==========================================
  window.startSession = function(mode, customPool = null) {
    currentMode = mode;

    if (customPool) {
      sessionList = customPool;
    } else {
      const selectedMuscles = Array.from(document.querySelectorAll('.m-check:checked')).map(c => c.value);
      
      // KATEGORIEN AUSLESEN BASIEREND AUF DEM RAUM!
      const selectedKats = [];
      if (currentHub === 'UA') {
        if (document.getElementById('kat-ursprung') && document.getElementById('kat-ursprung').checked) selectedKats.push('ursprung');
        if (document.getElementById('kat-ansatz') && document.getElementById('kat-ansatz').checked) selectedKats.push('ansatz');
      } else if (currentHub === 'INN') {
        selectedKats.push('innervation');
      } else if (currentHub === 'FUN') {
        selectedKats.push('funktion');
      }

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
          <button class="btn btn-menu" onclick="window.renderMenu()">◀ Zurück zur Einstellung</button>
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

    if (currentMode === "PRACTICE" && inputEl) {
      inputEl.disabled = true;
      inputEl.classList.add(isCorrect ? 'correct' : 'wrong');
    }

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

    if (currentMode === "PRACTICE") {
      document.querySelectorAll('.option-item').forEach(lbl => {
        const radio = lbl.querySelector('input');
        radio.disabled = true;
        if (radio.value === correct) {
          lbl.classList.add('correct');
        } else if (radio.checked && radio.value !== correct) {
          lbl.classList.add('wrong');
        }
      });
    }

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

      if (currentMode === "PRACTICE") {
        sel.disabled = true;
        sel.classList.add(selectedVal === correctVal ? 'correct' : 'wrong');
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
        ? `<div style="display:flex; align-items:center;">${iconCheck} <span><strong>Exzellent!</strong> Die Antwort ist richtig.</span></div>` 
        : `<div style="display:flex; align-items:center; margin-bottom:10px;">${iconCross} <span><strong>Leider falsch.</strong></span></div><span style="color:#991b1b; font-size:0.9rem; text-transform:uppercase; display:block; margin-top:10px;">Richtige Lösung:</span><span style="font-size:1.05rem; display:block; margin-top:4px;">${correctAns}</span>`;
      
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
                <div style="font-size:1.1rem; margin-bottom:12px; display:flex; justify-content:space-between; align-items:flex-start;">
                  <strong style="display:flex; align-items:center;">
                    ${ans.success ? iconCheck : iconCross} 
                    Frage ${i+1}: ${q.muskel ? q.muskel.muskel : 'Zuordnung'}
                  </strong> 
                  <span style="color:#64748b; font-size:0.85rem; background:#f1f5f9; padding:4px 8px; border-radius:6px; font-weight:600; margin-left:10px;">${q.type.toUpperCase()}</span>
                </div>
                <small style="color:#64748b; display:block; margin-bottom:12px; font-weight:600; letter-spacing:0.5px;">KATEGORIE: ${q.kat.toUpperCase()}</small>
                <div class="user-ans" style="margin-bottom:8px; line-height:1.5;">Deine Antwort:<br><strong style="color:var(--text-main); font-style:normal;">${ans.user}</strong></div>
                ${!ans.success ? `<div class="correct-ans" style="padding-top:8px; border-top:1px dashed #fecaca; line-height:1.5; margin-top:10px;">Richtige Lösung:<br><span style="color:#b91c1c;">${ans.correct}</span></div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn" onclick="window.renderHomeScreen()" style="background:#0f172a; margin-top:25px; padding:18px; font-size:1.1rem; box-shadow:0 10px 15px -3px rgba(15, 23, 42, 0.3);">🏠 Zurück zum Startbildschirm</button>
      </div>
    `;

    window.lastWrongQuestions = wrongQuestions;
    container.innerHTML = html;
  }

  window.startRepetition = function() {
    if (!window.lastWrongQuestions || window.lastWrongQuestions.length === 0) return;
    window.startSession('PRACTICE', window.lastWrongQuestions);
  };

  // APP START: Lade den Startbildschirm
  window.renderHomeScreen();
}
