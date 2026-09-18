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

 // ==========================================
  // DATENBANK 2: CLINICAL REASONING FÄLLE
  // ==========================================
  const crDaten = [
    {
      id: 1,
      muster: "Lumbale Radikulopathie (L5)",
      fall_text: "Ein 45-jähriger Bodenleger klagt über einschießende, elektrisierende Schmerzen vom unteren Rücken bis in die rechte Großzehe. Die Schmerzen begannen gestern nach dem Heben einer schweren Kiste. Husten und Niesen verstärken den Schmerz extrem. Er hat große Angst, dass er seinen Job aufgeben muss.",
      loesung_strukturen: "Nervenwurzel L5 rechts, Bandscheibe L4/L5.",
      loesung_schmerztyp: "Neuropathisch",
      loesung_schmerztyp_begruendung: "Primär Neuropathischer Schmerz (einschießend, elektrisierend, durch Husten auslösbar).",
      loesung_yellow_flags: "Kognitive Einflüsse: Ausgeprägte Existenz- und Zukunftsangst bzgl. der Arbeit.",
      loesung_tests: "Lasègue-Test / Slump-Test zur Provokation der Nervenwurzel.",
      loesung_neuro: "Sensibilität (Dermatom L5 - Großzehe), Kraft (M. ext. hallucis longus), Reflexe (TPR).",
      loesung_ausmass: "MIN",
      loesung_ausmass_begruendung: "S/I/N: Hohe Irritierbarkeit. Neurologische Untersuchung hat Vorrang zum Ausschluss von Red Flags (Kavernensyndrom etc.)."
    }
  ];

  let sessionList = [];
  let currentIndex = 0;
  let userAnswers = {};
  let currentMode = "";
  
  // Wir speichern, in welchem "Raum" (Hub) sich der Nutzer befindet
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
  // 1. DER STARTBILDSCHIRM (FULLSCREEN OHNE BALKEN)
  // ==========================================
  window.renderHomeScreen = function() {
    const backgroundImage = "url('home.png')"; 

    // AGGRESSIVES CSS: Zwingt die Seite, alle Balken und Ränder zu entfernen
    let styleEl = document.getElementById("fullscreen-bg-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "fullscreen-bg-style";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        min-height: 100vh !important;
        background: ${backgroundImage} center/cover fixed no-repeat, #0f172a !important;
      }
      #app-container {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        min-height: 100vh !important;
        background: transparent !important;
        box-sizing: border-box !important;
      }
      /* Custom CSS für Clinical Reasoning */
      .cr-input {
        width: 100%; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.1);
        color: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 10px;
        font-family: inherit; font-size: 0.95rem; box-sizing: border-box; transition: all 0.3s ease;
      }
      textarea.cr-input { min-height: 70px; resize: vertical; }
      select.cr-input { appearance: auto; cursor: pointer; }
      .cr-input:focus { outline: none; border-color: #38bdf8; background: rgba(15, 23, 42, 0.9); }
      
      .cr-input.correct { border-color: #10b981 !important; background: rgba(16, 185, 129, 0.15) !important; color: #10b981; font-weight: bold; }
      .cr-input.wrong { border-color: #ef4444 !important; background: rgba(239, 68, 68, 0.15) !important; color: #ef4444; font-weight: bold; }
      
      .cr-solution {
        background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981;
        padding: 15px; margin-top: -5px; margin-bottom: 25px; border-radius: 0 0 8px 8px;
        color: #e2e8f0; font-size: 0.95rem; display: none;
      }
    `;

    let html = `
      <!-- Der Container ist jetzt komplett transparent, das Bild kommt vom Body -->
      <div class="fade-in" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; box-sizing: border-box; position: relative;">
        
        <!-- Das zentrale Frosted Glass-Panel -->
        <div style="background: rgba(15, 23, 42, 0.75) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-radius: 24px !important; padding: 45px 30px !important; width: 100% !important; max-width: 440px !important; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05) !important; backdrop-filter: blur(24px) !important; -webkit-backdrop-filter: blur(24px) !important; text-align: center !important; position: relative; z-index: 1;">
          
          <h1 style="font-size: 2rem !important; color: #3b82f6 !important; margin-bottom: 5px !important; font-weight: 700 !important; font-family: sans-serif !important; text-shadow: 0 0 20px rgba(59, 130, 246, 0.6) !important; letter-spacing: 0.5px;">
            Anatomie-Trainer
          </h1>
          <p style="color: #94a3b8 !important; font-size: 0.95rem !important; margin-bottom: 35px !important; font-family: sans-serif !important; font-weight: 400;">
            Bitte Trainings-Raum wählen, um fortzufahren.
          </p>

          <div style="display: flex !important; flex-direction: column !important; gap: 16px !important;">
            
            <!-- Option 1: Ursprung & Ansatz -->
            <div onclick="window.openHub('UA')"
                 style="background: rgba(10, 15, 30, 0.8) !important; border: 1px solid rgba(255,255,255,0.05) !important; border-radius: 16px !important; padding: 18px 24px !important; cursor: pointer !important; transition: all 0.3s ease !important; display: flex !important; align-items: center !important; gap: 18px !important; box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;"
                 onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.6)'; this.style.background='rgba(30, 41, 59, 0.9)'; this.style.transform='translateY(-3px)';"
                 onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.background='rgba(10, 15, 30, 0.8)'; this.style.transform='translateY(0)';">
              <div style="color: #e2e8f0; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </div>
              <div style="text-align: left !important;">
                <h2 style="font-size: 1.15rem !important; color: #f8fafc !important; margin: 0 0 4px 0 !important; font-weight: 600 !important; font-family: sans-serif !important; letter-spacing: 0.3px;">Ursprung & Ansatz</h2>
                <p style="color: #64748b !important; font-size: 0.85rem !important; margin: 0 !important; font-family: sans-serif !important;">Mechanische Fixierung</p>
              </div>
            </div>

            <!-- Option 2: Innervation -->
            <div onclick="window.openHub('INN')"
                 style="background: rgba(10, 15, 30, 0.8) !important; border: 1px solid rgba(255,255,255,0.05) !important; border-radius: 16px !important; padding: 18px 24px !important; cursor: pointer !important; transition: all 0.3s ease !important; display: flex !important; align-items: center !important; gap: 18px !important; box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;"
                 onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.6)'; this.style.background='rgba(30, 41, 59, 0.9)'; this.style.transform='translateY(-3px)';"
                 onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.background='rgba(10, 15, 30, 0.8)'; this.style.transform='translateY(0)';">
              <div style="color: #fbbf24; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div style="text-align: left !important;">
                <h2 style="font-size: 1.15rem !important; color: #f8fafc !important; margin: 0 0 4px 0 !important; font-weight: 600 !important; font-family: sans-serif !important; letter-spacing: 0.3px;">Innervation</h2>
                <p style="color: #64748b !important; font-size: 0.85rem !important; margin: 0 !important; font-family: sans-serif !important;">Nervale Versorgung</p>
              </div>
            </div>

            <!-- Option 3: Funktion -->
            <div onclick="window.openHub('FUN')"
                 style="background: rgba(10, 15, 30, 0.8) !important; border: 1px solid rgba(255,255,255,0.05) !important; border-radius: 16px !important; padding: 18px 24px !important; cursor: pointer !important; transition: all 0.3s ease !important; display: flex !important; align-items: center !important; gap: 18px !important; box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;"
                 onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.6)'; this.style.background='rgba(30, 41, 59, 0.9)'; this.style.transform='translateY(-3px)';"
                 onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.background='rgba(10, 15, 30, 0.8)'; this.style.transform='translateY(0)';">
              <div style="color: #e2e8f0; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <div style="text-align: left !important;">
                <h2 style="font-size: 1.15rem !important; color: #f8fafc !important; margin: 0 0 4px 0 !important; font-weight: 600 !important; font-family: sans-serif !important; letter-spacing: 0.3px;">Funktion</h2>
                <p style="color: #64748b !important; font-size: 0.85rem !important; margin: 0 !important; font-family: sans-serif !important;">Biokinetik & Bewegung</p>
              </div>
            </div>

            <!-- Option 4: Clinical Reasoning -->
            <div onclick="window.openClinicalReasoning()"
                 style="background: rgba(10, 15, 30, 0.8) !important; border: 1px solid rgba(56, 189, 248, 0.3) !important; border-radius: 16px !important; padding: 18px 24px !important; cursor: pointer !important; transition: all 0.3s ease !important; display: flex !important; align-items: center !important; gap: 18px !important; box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;"
                 onmouseover="this.style.borderColor='rgba(16, 185, 129, 0.6)'; this.style.background='rgba(30, 41, 59, 0.9)'; this.style.transform='translateY(-3px)';"
                 onmouseout="this.style.borderColor='rgba(56, 189, 248, 0.3)'; this.style.background='rgba(10, 15, 30, 0.8)'; this.style.transform='translateY(0)';">
              <div style="color: #10b981; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <div style="text-align: left !important;">
                <h2 style="font-size: 1.15rem !important; color: #38bdf8 !important; margin: 0 0 4px 0 !important; font-weight: 600 !important; font-family: sans-serif !important; letter-spacing: 0.3px;">Clinical Reasoning</h2>
                <p style="color: #64748b !important; font-size: 0.85rem !important; margin: 0 !important; font-family: sans-serif !important;">ZHAW Befund & Hypothesen</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    
    container.className = ""; 
    container.innerHTML = html;
  };

  // ==========================================
  // NEU: CLINICAL REASONING MODUL MIT DIREKT-VERGLEICH
  // ==========================================
  window.openClinicalReasoning = function(caseIndex = -1) {
    if (caseIndex === -1) {
       caseIndex = Math.floor(Math.random() * crDaten.length);
    }
    const currentCase = crDaten[caseIndex];
    window.currentCRCase = currentCase; // Speichern für die Auswertung

    let html = `
      <div class="fade-in" style="padding: 20px; max-width: 900px; margin: 0 auto; color: #f8fafc; text-align: left;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <button class="btn btn-menu" onclick="window.renderHomeScreen()">◀ Zurück zum Hauptmenü</button>
            <span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">Modul: ZHAW Reasoning</span>
        </div>

        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); backdrop-filter: blur(12px);">
          
          <h1 style="color: #38bdf8; font-size: 1.8rem; margin-top: 0; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
             📝 ${currentCase.muster}
          </h1>

          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 12px; margin-bottom: 35px; border-left: 4px solid #38bdf8;">
            <strong style="color: #94a3b8; display: block; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;">Patientenfall / Kasuistik:</strong>
            <p style="font-size: 1.1rem; line-height: 1.7; margin: 0;">${currentCase.fall_text}</p>
          </div>

          <h3 style="color: #e2e8f0; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">I. Hypothesenbildung</h3>
          
          <!-- Strukturen -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Beteiligte Strukturen (Gelenke, Weichteile, Muskeln, Nerven)</label>
          <textarea id="cr-strukturen" class="cr-input eval-lock" placeholder="Welche Gewebe könnten die Symptome verursachen?"></textarea>
          <div id="sol-strukturen" class="cr-solution">
             <strong style="color:#10b981;">Expertenlösung:</strong> ${currentCase.loesung_strukturen}
          </div>

          <!-- Schmerzmechanismus (DROPDOWN) -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Schmerzmechanismus (Primär)</label>
          <select id="cr-schmerztyp" class="cr-input eval-lock">
             <option value="">-- Typ wählen --</option>
             <option value="Nozizeptiv">Nozizeptiv</option>
             <option value="Neuropathisch">Neuropathisch</option>
             <option value="Noziplastisch">Noziplastisch</option>
             <option value="Mixed">Mixed Pain</option>
          </select>
          <div id="sol-schmerztyp" class="cr-solution">
             <strong style="color:#10b981;">Begründung:</strong> ${currentCase.loesung_schmerztyp_begruendung}
          </div>

          <!-- Yellow Flags -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Yellow Flags & Kontextfaktoren</label>
          <textarea id="cr-flags" class="cr-input eval-lock" placeholder="Psychosoziale Faktoren, Kognitive Einflüsse..."></textarea>
          <div id="sol-flags" class="cr-solution">
             <strong style="color:#10b981;">Expertenlösung:</strong> ${currentCase.loesung_yellow_flags}
          </div>

          <h3 style="color: #e2e8f0; margin-top: 35px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">II. Planung der Untersuchung (P/E)</h3>

          <!-- Funktionstests -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Spezifische Funktionstests & Palpation</label>
          <textarea id="cr-tests" class="cr-input eval-lock" placeholder="Welche Tests bestätigen oder widerlegen die Hypothesen?"></textarea>
          <div id="sol-tests" class="cr-solution">
             <strong style="color:#10b981;">Expertenlösung:</strong> ${currentCase.loesung_tests}
          </div>

          <!-- Neurologie -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Neurologische Untersuchung</label>
          <textarea id="cr-neuro" class="cr-input eval-lock" placeholder="Sensibilität, Kraft, Reflexe?"></textarea>
          <div id="sol-neuro" class="cr-solution">
             <strong style="color:#10b981;">Expertenlösung:</strong> ${currentCase.loesung_neuro}
          </div>

          <!-- Ausmass (DROPDOWN) -->
          <label style="display:block; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">Ausmass der Untersuchung (Reizlage)</label>
          <select id="cr-ausmass" class="cr-input eval-lock">
             <option value="">-- Ausmass wählen --</option>
             <option value="MAX">MAX (Ausführlich)</option>
             <option value="MIN">MIN (Minimal)</option>
             <option value="KUR">KUR (Kursorisch)</option>
          </select>
          <div id="sol-ausmass" class="cr-solution">
             <strong style="color:#10b981;">Begründung:</strong> ${currentCase.loesung_ausmass_begruendung}
          </div>

          <!-- Buttons -->
          <button id="cr-eval-btn" onclick="window.evaluateCR()" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 18px; font-size: 1.15rem; background: linear-gradient(135deg, #0ea5e9, #2563eb); border: none; font-weight: bold; cursor: pointer; color: white; border-radius: 8px;">Ergebnisse überprüfen</button>
          
          <button id="cr-next-btn" onclick="window.openClinicalReasoning()" class="btn btn-menu" style="display: none; width: 100%; margin-top: 15px; padding: 15px; border: 1px solid #10b981; color: #10b981; background: transparent; cursor: pointer; border-radius: 8px;">Nächster zufälliger Fall ➡</button>

        </div>
      </div>
    `;
    container.className = "";
    container.innerHTML = html;
  };

window.evaluateCR = function() {
    const c = window.currentCRCase;
    
    // 1. Dropdowns sperren und klassisch auswerten
    document.querySelectorAll('select.eval-lock').forEach(el => el.disabled = true);
    
    const typDrop = document.getElementById('cr-schmerztyp');
    if(typDrop.value === c.loesung_schmerztyp) { typDrop.classList.add('correct'); } else { typDrop.classList.add('wrong'); }
    
    const ausDrop = document.getElementById('cr-ausmass');
    if(ausDrop.value === c.loesung_ausmass) { ausDrop.classList.add('correct'); } else { ausDrop.classList.add('wrong'); }

    // 2. Freitext-Felder: Identische Wörter grün markieren
    const ignoreWords = ["und", "im", "am", "der", "die", "das", "an", "von", "zu", "ist", "sind", "oder", "bei", "mit", "ein", "eine", "einer", "einem", "den", "dem", "des", "sich", "als", "für", "auf", "aus", "zur"];
    
    const getCleanWords = (text) => {
      if (!text) return [];
      // UPDATE: Nutzt \w für alle alphanumerischen Zeichen, plus Umlaute und ß
      const matched = text.toLowerCase().match(/[\wäöüß]+/g);
      return matched ? matched.filter(w => !ignoreWords.includes(w)) : [];
    };

    const checkTextAndHighlight = (inputId, correctText) => {
       const inputEl = document.getElementById(inputId);
       const userText = inputEl.value;
       const correctWords = getCleanWords(correctText);
       
       // UPDATE: Exakt gleicher RegEx für das Ersetzen
       const highlightedHTML = userText.replace(/[\wäöüÄÖÜß]+/g, (match) => {
          const lowerMatch = match.toLowerCase();
          if (!ignoreWords.includes(lowerMatch) && correctWords.includes(lowerMatch)) {
              return `<span style="color: #10b981; font-weight: bold; background: rgba(16, 185, 129, 0.2); border-radius: 3px; padding: 0 4px;">${match}</span>`;
          }
          return match;
       });

       // Das Original-Textfeld verstecken
       inputEl.style.display = 'none';

       // Eine Box im exakt gleichen Design erstellen, um den markierten Text anzuzeigen
       const displayDiv = document.createElement('div');
       displayDiv.className = 'cr-input'; // Nutzt dein bestehendes Design
       displayDiv.style.minHeight = '70px';
       displayDiv.style.whiteSpace = 'pre-wrap'; // Damit Zeilenumbrüche erhalten bleiben
       
       if (userText.trim() === "") {
           displayDiv.innerHTML = `<span style="color: #ef4444; font-style: italic;">Keine Antwort eingegeben.</span>`;
           displayDiv.style.borderColor = '#ef4444';
       } else {
           displayDiv.innerHTML = highlightedHTML;
           // Den Rahmen der Box grün oder rot färben, je nachdem ob es überhaupt Treffer gab
           const userWordsClean = getCleanWords(userText);
           const hasMatches = userWordsClean.some(w => correctWords.includes(w));
           if (hasMatches) {
               displayDiv.style.borderColor = '#10b981'; // Leichter grüner Rand
           } else {
               displayDiv.style.borderColor = '#ef4444'; // Roter Rand bei 0 Treffern
           }
       }

       // Die neue Box direkt unter dem versteckten Textfeld einfügen
       inputEl.parentNode.insertBefore(displayDiv, inputEl.nextSibling);
    };

    // Alle Textfelder durch die neue Highlight-Funktion jagen
    checkTextAndHighlight('cr-strukturen', c.loesung_strukturen);
    checkTextAndHighlight('cr-flags', c.loesung_yellow_flags);
    checkTextAndHighlight('cr-tests', c.loesung_tests);
    checkTextAndHighlight('cr-neuro', c.loesung_neuro);

    // 3. Experten-Lösungsboxen einblenden
    document.querySelectorAll('.cr-solution').forEach(sol => {
        sol.style.display = 'block';
    });

    // 4. Buttons austauschen
    document.getElementById('cr-eval-btn').style.display = 'none';
    document.getElementById('cr-next-btn').style.display = 'block';
  };

  // ==========================================
  // 2. HUB ÖFFNEN (Setzt den Raum und lädt das Menü)
  // ==========================================
  window.openHub = function(hubName) {
    currentHub = hubName; 
    window.renderMenu();
  };

// ==========================================
  // 3. DAS NEUE DYNAMISCHE MENÜ (CLEAN LAYOUT)
  // ==========================================

  window.selectAllMuscles = function(status) {
    document.querySelectorAll('.muscle-cb').forEach(cb => cb.checked = status);
    window.updateSelectionCount();
  };

  window.selectRandomMuscles = function() {
    window.selectAllMuscles(false);
    const randomCount = Math.floor(Math.random() * (13 - 5 + 1)) + 5;
    const checkboxes = Array.from(document.querySelectorAll('.muscle-cb'));
    checkboxes.sort(() => Math.random() - 0.5);
    checkboxes.slice(0, randomCount).forEach(cb => {
        cb.checked = true;
    });
    window.updateSelectionCount();
  };

  window.toggleGroupCheckbox = function(event, checkbox, gruppe) {
    event.stopPropagation(); 
    document.querySelectorAll(`.muscle-cb[data-gruppe="${gruppe}"]`).forEach(cb => {
      cb.checked = checkbox.checked;
    });
    window.updateSelectionCount();
  };

  window.updateSelectionCount = function() {
    const muscleCheckboxes = document.querySelectorAll('.muscle-cb');
    const total = muscleCheckboxes.length;
    let selected = 0;
    
    muscleCheckboxes.forEach(cb => {
      if (cb.checked) selected++;
    });
    
    const globalCounter = document.getElementById('global-counter-text');
    if (globalCounter) {
      globalCounter.innerHTML = `<span style="color:#3b82f6;">${selected}</span> / ${total} ausgewählt`;
    }

    document.querySelectorAll('.accordion-group').forEach(groupDiv => {
      const groupCheckboxes = groupDiv.querySelectorAll('.muscle-cb');
      const totalInGroup = groupCheckboxes.length;
      let selectedInGroup = 0;
      
      groupCheckboxes.forEach(cb => {
        if (cb.checked) selectedInGroup++;
      });
      
      const countBadge = groupDiv.querySelector('.group-count');
      const groupCb = groupDiv.querySelector('.group-cb');
      
      if (groupCb) {
        groupCb.checked = (selectedInGroup === totalInGroup);
        groupCb.indeterminate = (selectedInGroup > 0 && selectedInGroup < totalInGroup);
      }

      if (countBadge) {
        countBadge.innerText = `${selectedInGroup}/${totalInGroup}`;
        if(selectedInGroup === 0) {
          countBadge.style.background = '#f1f5f9';
          countBadge.style.color = '#94a3b8';
        } else {
          countBadge.style.background = '#eff6ff';
          countBadge.style.color = '#3b82f6';
        }
      }
    });
  };

  window.toggleAccordion = function(element) {
    const content = element.nextElementSibling;
    const chevron = element.querySelector('.chevron');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      chevron.style.transform = 'rotate(180deg)';
    } else {
      content.style.display = 'none';
      chevron.style.transform = 'rotate(0deg)';
    }
  };

  window.filterMuscles = function() {
    const term = document.getElementById('muscle-search').value.toLowerCase();
    
    document.querySelectorAll('.accordion-group').forEach(groupDiv => {
      let hasVisibleItem = false;
      
      groupDiv.querySelectorAll('.muscle-item').forEach(itemDiv => {
        const text = itemDiv.innerText.toLowerCase();
        if (text.includes(term)) {
          itemDiv.style.display = 'flex';
          hasVisibleItem = true;
        } else {
          itemDiv.style.display = 'none';
        }
      });
      
      groupDiv.style.display = hasVisibleItem ? 'block' : 'none';
      
      const content = groupDiv.querySelector('.accordion-content');
      const chevron = groupDiv.querySelector('.chevron');
      if (term.length > 0 && hasVisibleItem) {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
      }
    });
  };

  // --- RENDER MENU ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; box-sizing: border-box; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Action Buttons */
      .action-btn-group { display: flex; gap: 10px; margin-bottom: 25px; }
      .action-btn { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; color: #334155; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: 0.2s; }
      .action-btn:hover { background: #e2e8f0; }

      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Native Checkboxen (Groß) */
      .group-cb, .muscle-cb { transform: scale(1.4); margin-right: 15px; cursor: pointer; accent-color: #3b82f6; }
      
      /* Toggle Switch */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Start Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
        </div>
        
        <div class="main-grid">
          
          <div class="panel-box">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <h2 style="margin: 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
                1. Muskelauswahl
              </h2>
              <div id="global-counter-text" style="font-size: 0.95rem; font-weight: 600; color: #64748b; background: #f8fafc; padding: 6px 12px; border-radius: 20px; border: 1px solid #e2e8f0;">
                Lade...
              </div>
            </div>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <div class="search-bar" style="margin-bottom: 15px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>

            <div class="action-btn-group">
              <button class="action-btn" onclick="window.selectAllMuscles(true)">☑️ Alle an</button>
              <button class="action-btn" onclick="window.selectAllMuscles(false)">☐ Alle aus</button>
              <button class="action-btn" onclick="window.selectRandomMuscles()">🎲 Zufall</button>
            </div>
            
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center;">
                      <input type="checkbox" class="group-cb" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked>
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <input type="checkbox" class="muscle-cb" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              Prüfungsmodus starten
            </button>
          </div>

        </div>
      </div>
    `;
    
    container.innerHTML = html;
    window.updateSelectionCount();
  };
  window.toggleAccordion = function(element) {
    const content = element.nextElementSibling;
    const chevron = element.querySelector('.chevron');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      chevron.style.transform = 'rotate(180deg)';
    } else {
      content.style.display = 'none';
      chevron.style.transform = 'rotate(0deg)';
    }
  };

  window.filterMuscles = function() {
    const term = document.getElementById('muscle-search').value.toLowerCase();
    
    document.querySelectorAll('.accordion-group').forEach(groupDiv => {
      let hasVisibleItem = false;
      
      groupDiv.querySelectorAll('.muscle-item').forEach(itemDiv => {
        const text = itemDiv.innerText.toLowerCase();
        if (text.includes(term)) {
          itemDiv.style.display = 'flex';
          hasVisibleItem = true;
        } else {
          itemDiv.style.display = 'none';
        }
      });
      
      groupDiv.style.display = hasVisibleItem ? 'block' : 'none';
      
      const content = groupDiv.querySelector('.accordion-content');
      const chevron = groupDiv.querySelector('.chevron');
      if (term.length > 0 && hasVisibleItem) {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
      }
    });
  };

  // --- RENDER MENU ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; box-sizing: border-box; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Action Buttons */
      .action-btn-group { display: flex; gap: 10px; margin-bottom: 25px; }
      .action-btn { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; color: #334155; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: 0.2s; }
      .action-btn:hover { background: #e2e8f0; }

      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Native Checkboxen (Groß) */
      .group-cb, .muscle-cb { transform: scale(1.4); margin-right: 15px; cursor: pointer; accent-color: #3b82f6; }
      
      /* Toggle Switch */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Start Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <!-- TOP HEADER -->
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
        </div>
        
        <div class="main-grid">
          
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="panel-box">
            
            <!-- Überschrift & Gesamt-Zähler -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <h2 style="margin: 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
                1. Muskelauswahl
              </h2>
              <div id="global-counter-text" style="font-size: 0.95rem; font-weight: 600; color: #64748b; background: #f8fafc; padding: 6px 12px; border-radius: 20px; border: 1px solid #e2e8f0;">
                Lade...
              </div>
            </div>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <!-- Suchleiste -->
            <div class="search-bar" style="margin-bottom: 15px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>

            <!-- NEU: GLOBALE BUTTONS (Immer sichtbar) -->
            <div class="action-btn-group">
              <button class="action-btn" onclick="window.selectAllMuscles(true)">☑️ Alle an</button>
              <button class="action-btn" onclick="window.selectAllMuscles(false)">☐ Alle aus</button>
              <button class="action-btn" onclick="window.selectRandomMuscles()">🎲 Zufall</button>
            </div>
            
            <!-- Listen-Ansicht (Akkordeon) -->
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center;">
                      <!-- Gruppen-Checkbox (Nativ & Groß) -->
                      <input type="checkbox" class="group-cb" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked>
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <!-- Muskel-Checkbox (Nativ & Groß) -->
                        <input type="checkbox" class="muscle-cb" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <!-- Fragetypen -->
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <!-- Fragenlimit -->
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <!-- Buttons ohne das Dollar-SVG -->
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              Prüfungsmodus starten
            </button>
          </div>

        </div>
      </div>
    `;
    
    container.innerHTML = html;
    window.updateSelectionCount();
  };

  // --- RENDER MENU (Neues Layout) ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden sollen.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; box-sizing: border-box; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Custom Checkbox (exakt gleiches Design für Gruppe und Muskel) */
      .m-check {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 2px solid #3b82f6;
        background-color: white;
        cursor: pointer;
        position: relative;
        margin-right: 12px;
        flex-shrink: 0;
      }
      .m-check:checked {
        background-color: #3b82f6;
      }
      .m-check:checked::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      .m-check:indeterminate {
        background-color: #3b82f6;
      }
      .m-check:indeterminate::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 7px;
        width: 8px;
        height: 2px;
        background-color: white;
      }
      
      /* Toggle Switch */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <!-- TOP HEADER -->
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
          <div style="display:flex; flex-direction:column; align-items:flex-end; width: 250px;">
            <div id="global-counter" style="font-size: 0.85rem; color: #3b82f6; font-weight: 600; margin-bottom: 5px;"></div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 4px; overflow:hidden;">
              <div id="global-progress" style="height: 100%; background: #3b82f6; width: 100%; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>
        
        <div class="main-grid">
          
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="panel-box">
            <h2 style="margin: 0 0 5px 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
              1. Muskelauswahl
            </h2>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <!-- Suchleiste -->
            <div class="search-bar" style="margin-bottom: 12px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>

            <!-- NEU: GLOBALE BUTTONS (Alle an, Alle aus, Zufall) -->
            <div style="display: flex; gap: 8px; margin-bottom: 20px;">
              <button onclick="window.selectAllMuscles(true)" style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; padding:10px; border-radius:8px; cursor:pointer; font-weight:600; color:#334155;">Alle an</button>
              <button onclick="window.selectAllMuscles(false)" style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; padding:10px; border-radius:8px; cursor:pointer; font-weight:600; color:#334155;">Alle aus</button>
              <button onclick="window.selectRandomMuscles()" style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; padding:10px; border-radius:8px; cursor:pointer; font-weight:600; color:#334155;">🎲 Zufall</button>
            </div>
            
            <!-- Listen-Ansicht (Akkordeon) -->
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center;">
                      <!-- EINHEITLICHE CHECKBOX FÜR DIE GRUPPE -->
                      <input type="checkbox" class="m-check group-check" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked>
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <!-- EINHEITLICHE CHECKBOX FÜR DIE MUSKELN -->
                        <input type="checkbox" class="m-check muscle-check" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <!-- Fragetypen -->
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <!-- Fragenlimit -->
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <!-- Buttons -->
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              Prüfungsmodus starten
            </button>
          </div>

        </div>
      </div>
    `;
    
    container.innerHTML = html;
    window.updateSelectionCount();
  };
  // --- RENDER MENU (Neues Layout) ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden sollen.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; box-sizing: border-box; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Global Action Segmented Control */
      .segment-control { display: flex; background: #f1f5f9; border-radius: 10px; padding: 6px; margin-bottom: 25px; gap: 6px; }
      .segment-btn { flex: 1; padding: 10px; border: none; background: transparent; border-radius: 8px; font-weight: 600; color: #64748b; font-size: 0.95rem; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
      .segment-btn:hover { background: #e2e8f0; color: #1e293b; }
      .segment-btn.active-action { background: white; color: #0f172a; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      
      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Einheitliche Checkbox für ALLES (Gruppen + Muskeln) */
      .custom-cb { width: 18px; height: 18px; accent-color: #3b82f6; cursor: pointer; margin: 0; }
      .muscle-cb { margin-right: 12px; } /* Nur Muskeln brauchen Abstand nach rechts */
      
      /* Toggle Switch (Rechte Seite) */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <!-- TOP HEADER -->
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
          <div style="display:flex; flex-direction:column; align-items:flex-end; width: 250px;">
            <div id="global-counter" style="font-size: 0.85rem; color: #3b82f6; font-weight: 600; margin-bottom: 5px;"></div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 4px; overflow:hidden;">
              <div id="global-progress" style="height: 100%; background: #3b82f6; width: 100%; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>
        
        <div class="main-grid">
          
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="panel-box">
            <h2 style="margin: 0 0 5px 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
              1. Muskelauswahl
            </h2>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <!-- Suchleiste -->
            <div class="search-bar" style="margin-bottom: 12px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>

            <!-- Segmented Control: Globale Buttons -->
            <div class="segment-control">
              <button class="segment-btn active-action" onclick="window.selectAllMuscles(true)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg> Alle an
              </button>
              <button class="segment-btn" onclick="window.selectAllMuscles(false)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg> Alle aus
              </button>
              <button class="segment-btn" onclick="window.selectRandomMuscles()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> Zufall
              </button>
            </div>
            
            <!-- Listen-Ansicht (Akkordeon) -->
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center; gap:12px;">
                      <!-- IDENTISCHE CHECKBOX-KLASSE (.custom-cb) WIE BEI DEN MUSKELN -->
                      <input type="checkbox" class="custom-cb group-cb" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked>
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <input type="checkbox" class="custom-cb muscle-cb" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <!-- Fragetypen -->
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <!-- Fragenlimit -->
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <!-- Buttons: Dollar Symbol restlos gelöscht! -->
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 5px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
              Prüfungsmodus starten
            </button>
          </div>

        </div>
      </div>
    `;
    
    container.innerHTML = html;
    window.updateSelectionCount();
  };

  // --- RENDER MENU (Neues Layout) ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden sollen.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; box-sizing: border-box; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Custom Checkbox */
      .m-check, .group-check { width: 18px; height: 18px; accent-color: #3b82f6; cursor: pointer; }
      .m-check { margin-right: 12px; }
      
      /* Toggle Switch */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
      
      /* Global Action Buttons */
      .global-action-btn { flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0; background: white; color: #475569; font-size: 0.85rem; cursor: pointer; transition: 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
      .global-action-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <!-- TOP HEADER -->
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
          <div style="display:flex; flex-direction:column; align-items:flex-end; width: 250px;">
            <div id="global-counter" style="font-size: 0.85rem; color: #3b82f6; font-weight: 600; margin-bottom: 5px;"></div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 4px; overflow:hidden;">
              <div id="global-progress" style="height: 100%; background: #3b82f6; width: 100%; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>
        
        <div class="main-grid">
          
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="panel-box">
            <h2 style="margin: 0 0 5px 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
              1. Muskelauswahl
            </h2>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <!-- Suchleiste -->
            <div class="search-bar" style="margin-bottom: 12px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>

            <!-- Globale Buttons (Alle an/aus/Zufall) -->
            <div style="display: flex; gap: 10px; margin-bottom: 25px;">
              <button class="global-action-btn" onclick="window.selectAllMuscles(true)">☑️ Alle an</button>
              <button class="global-action-btn" onclick="window.selectAllMuscles(false)">☐ Alle aus</button>
              <button class="global-action-btn" onclick="window.selectRandomMuscles()">🎲 Zufall</button>
            </div>
            
            <!-- Listen-Ansicht (Akkordeon) -->
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center; gap:12px;">
                      <!-- Checkbox für das gesamte Kapitel -->
                      <input type="checkbox" class="group-check" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked>
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <input type="checkbox" class="m-check" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <!-- Fragetypen -->
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <!-- Fragenlimit -->
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <!-- Buttons ohne das Dollar-SVG -->
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 5px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
              Prüfungsmodus starten
            </button>
          </div>

        </div>
      </div>
    `;
    
    container.innerHTML = html;
    window.updateSelectionCount();
  };
  // --- RENDER MENU (Neues Layout) ---
  window.renderMenu = function() {
    const gruppen = [...new Set(muskelDaten.map(m => m.gruppe))].sort();

    let settingsTitle = "";
    let categorySettingsHtml = "";

    if (currentHub === 'UA') {
      settingsTitle = "Fokus: Ursprung & Ansatz";
      categorySettingsHtml = `
        <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Lege fest, welche Informationen in den Fragen berücksichtigt werden sollen.</p>
        <div style="margin-bottom: 25px;">
          <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Bereich abfragen</strong>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 0.95rem; color: #334155;">Ursprung</span>
            <label class="switch"><input type="checkbox" id="kat-ursprung" checked><span class="slider round"></span></label>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: #334155;">Ansatz</span>
            <label class="switch"><input type="checkbox" id="kat-ansatz" checked><span class="slider round"></span></label>
          </div>
        </div>
      `;
    } else if (currentHub === 'INN') {
      settingsTitle = "Fokus: Innervation";
      categorySettingsHtml = `<div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #3b82f6;">Innervation ausgewählt</strong></div>`;
    } else if (currentHub === 'FUN') {
      settingsTitle = "Fokus: Funktion";
      categorySettingsHtml = `<div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><strong style="color: #10b981;">Funktion ausgewählt</strong></div>`;
    }

    // Zusätzliches CSS für die Custom-Switches, Akkordeons und Buttons (injected)
    let styleEl = document.getElementById("clean-layout-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "clean-layout-styles";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      body, html { background: #f8fafc !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: transparent; }
      .main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; padding: 0 40px 40px 40px; max-width: 1400px; margin: 0 auto; align-items: start; }
      .panel-box { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
      
      /* Search Bar */
      .search-bar input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat 15px center; background-size: 16px; }
      .search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      
      /* Accordion */
      .accordion-group { margin-bottom: 10px; border: 1px solid #f1f5f9; border-radius: 10px; overflow: hidden; background: white; }
      .accordion-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; cursor: pointer; user-select: none; transition: background 0.2s; }
      .accordion-header:hover { background: #f1f5f9; }
      .accordion-content { padding: 10px 20px 20px 20px; display: none; background: white; }
      .muscle-item { padding: 8px 0; border-bottom: 1px solid #f8fafc; display: flex; align-items: center; }
      .muscle-item:last-child { border-bottom: none; }
      
      /* Custom Checkbox */
      .m-check { width: 18px; height: 18px; margin-right: 12px; accent-color: #3b82f6; cursor: pointer; }
      
      /* Toggle Switch */
      .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
      input:checked + .slider { background-color: #3b82f6; }
      input:checked + .slider:before { transform: translateX(20px); }
      
      /* Buttons */
      .btn-blue { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-bottom: 10px; }
      .btn-blue:hover { background: #2563eb; }
      .btn-outline-red { background: white; color: #ef4444; border: 1px solid #fca5a5; padding: 14px; border-radius: 10px; width: 100%; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
      .btn-outline-red:hover { background: #fef2f2; }
    `;

    let html = `
      <div class="fade-in" style="min-height: 100vh;">
        
        <!-- TOP HEADER -->
        <div class="header-top">
          <button onclick="window.renderHomeScreen()" style="background:transparent; border:none; color:#64748b; font-size:1rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Zurück zum Trainings-Raum
          </button>
          <div style="display:flex; flex-direction:column; align-items:flex-end; width: 250px;">
            <div id="global-counter" style="font-size: 0.85rem; color: #3b82f6; font-weight: 600; margin-bottom: 5px;"></div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 4px; overflow:hidden;">
              <div id="global-progress" style="height: 100%; background: #3b82f6; width: 100%; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>
        
        <div class="main-grid">
          
          <!-- LINKE BOX: MUSKELAUSWAHL -->
          <div class="panel-box">
            <h2 style="margin: 0 0 5px 0; font-size: 1.4rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
              1. Muskelauswahl
            </h2>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 25px;">Wähle die gewünschten Muskeln aus, um den Trainingsinhalt zu personalisieren.</p>
            
            <!-- Suchleiste -->
            <div class="search-bar" style="margin-bottom: 25px;">
              <input type="text" id="muscle-search" onkeyup="window.filterMuscles()" placeholder="Suche nach Muskel ...">
            </div>
            
            <!-- Listen-Ansicht (Akkordeon) -->
            <div style="max-height: 550px; overflow-y: auto; padding-right: 5px;">
              ${gruppen.map(g => {
                const muskeln = muskelDaten.filter(m => m.gruppe === g);
                const isFirst = g === gruppen[0];
                return `
                <div class="accordion-group" data-group="${g}">
                  <div class="accordion-header" onclick="window.toggleAccordion(this)">
                    <div style="font-weight: 600; color: #1e293b; display:flex; align-items:center; gap:12px;">
                      <input type="checkbox" class="group-check" onchange="window.toggleGroupCheckbox(event, this, '${g}')" checked style="width: 18px; height: 18px; accent-color: #3b82f6; cursor: pointer;">
                      ${g}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="group-count" style="font-size: 0.8rem; font-weight: 600; padding: 3px 10px; border-radius: 20px;">0/0</span>
                      <svg class="chevron" style="transition: transform 0.3s; transform: rotate(${isFirst ? '180deg' : '0deg'});" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div class="accordion-content" style="display: ${isFirst ? 'block' : 'none'};">
                    ${muskeln.map(m => `
                      <label class="muscle-item">
                        <input type="checkbox" class="m-check" data-gruppe="${g}" value="${m.muskel}" onchange="window.updateSelectionCount()" checked> 
                        <div style="display:flex; flex-direction:column;">
                          <span style="font-size: 0.95rem; color: #334155;">${m.muskel}</span>
                          <span style="font-size: 0.75rem; color: #94a3b8;">${m.muskel.replace('M. ', '')}</span>
                        </div>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- RECHTE BOX: EINSTELLUNGEN -->
          <div class="panel-box" style="position: sticky; top: 20px;">
            <h2 style="margin: 0 0 25px 0; font-size: 1.2rem; color: #0f172a; display:flex; align-items:center; gap:10px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              ${settingsTitle}
            </h2>
            
            ${categorySettingsHtml}
            
            <!-- Fragetypen -->
            <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <strong style="display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 15px;">Fragetypen</strong>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Freitext (Eintippen)</span>
                <label class="switch"><input type="checkbox" id="type-write" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 0.95rem; color: #334155;">Single Choice</span>
                <label class="switch"><input type="checkbox" id="type-single" checked><span class="slider round"></span></label>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.95rem; color: #334155;">Zuordnung (Matching)</span>
                <label class="switch"><input type="checkbox" id="type-match" checked><span class="slider round"></span></label>
              </div>
            </div>
            
            <!-- Fragenlimit -->
            <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px;">
              <span style="font-size: 0.95rem; color: #334155;">Max. Fragen <span style="color:#94a3b8; font-size:0.8rem;">(0 = alle)</span></span>
              <input type="number" id="limit-input" value="10" min="0" style="width: 60px; text-align: center; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; font-size: 0.95rem;">
            </div>
            
            <!-- Buttons -->
            <button class="btn-blue" onclick="window.startSession('PRACTICE')">
              Übung starten
            </button>
            <button class="btn-outline-red" onclick="window.startSession('EXAM')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 5px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
              Prüfungsmodus starten
            </button>
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
                    Frage ${i+1}:${q.muskel ? q.muskel.muskel : 'Zuordnung'}
                  </strong> 
                  <span style="color:#64748b; font-size:0.85rem; background:#f1f5f9; padding:4px 8px; border-radius:6px; font-weight:600; margin-left:10px;">${q.type.toUpperCase()}</span>
                </div>
                <small style="color:#64748b; display:block; margin-bottom:12px; font-weight:600; letter-spacing:0.5px;">KATEGORIE: ${q.kat.toUpperCase()}</small>
                <div class="user-ans" style="margin-bottom:8px; line-height:1.5;">Deine Antwort:<br><strong style="color:var(--text-main); font-style:normal;">${ans.user}</strong></div>${!ans.success ? `<div class="correct-ans" style="padding-top:8px; border-top:1px dashed #fecaca; line-height:1.5; margin-top:10px;">Richtige Lösung:<br><span style="color:#b91c1c;">${ans.correct}</span></div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn" onclick="window.renderHomeScreen()" style="background:#0f172a; margin-top:25px; padding:18px; font-size:1.1rem; box-shadow:0 10px 15px -3px rgba(15, 23, 42, 0.3);">🏠 Zurück zum Trainings-Raum</button>
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
