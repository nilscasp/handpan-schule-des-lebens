// Erzeugt von `schule klangprofil bauen` aus handpan-schul-os/leitstand/src/klangprofil/ (browser.ts, inhalte.ts, logik.ts).
// Nicht von Hand ändern. Enthält nur öffentliche Werte (Supabase-Adresse, sb_publishable_-Schlüssel, Brevo-Formularadresse).
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  function __accessProp(key) {
    return this[key];
  }
  var __toCommonJS = (from) => {
    var entry = (__moduleCache ??= new WeakMap).get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function") {
      for (var key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(entry, key))
          __defProp(entry, key, {
            get: __accessProp.bind(from, key),
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
    }
    __moduleCache.set(from, entry);
    return entry;
  };
  var __moduleCache;
  var __returnValue = (v) => v;
  function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
  }
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: __exportSetter.bind(all, name)
      });
  };

  // src/klangprofil/browser.ts
  var exports_browser = {};
  __export(exports_browser, {
    supabaseAbgeben: () => supabaseAbgeben,
    starten: () => starten,
    quelleAusSuche: () => quelleAusSuche,
    mailFehler: () => mailFehler,
    hVariante: () => hVariante,
    codeAusHash: () => codeAusHash,
    brevoSenden: () => brevoSenden,
    brevoFelder: () => brevoFelder,
    brevoErfolg: () => brevoErfolg,
    antwortSetzen: () => antwortSetzen,
    MINDEST_SEK: () => MINDEST_SEK,
    KP_ID_ERSATZ: () => KP_ID_ERSATZ
  });

  // src/klangprofil/inhalte.ts
  var FASSUNG = 2;
  var SAEULEN = ["verorten", "ersehnen", "freilegen", "gezielt-lernen", "erklingen-lassen"];
  var AUSSAGE_ANTWORTEN = [
    { code: "ja", text: "Ja" },
    { code: "teils", text: "Teils" },
    { code: "eher-nicht", text: "Eher nicht" }
  ];
  var FRAGE_1 = {
    id: "f1",
    art: "sortier",
    text: "Wo stehst du gerade mit der Handpan?",
    antworten: [
      { code: "A", text: "Ich habe noch keine Handpan." },
      { code: "B", text: "Ich habe eine und spiele selten." },
      { code: "C", text: "Ich spiele regelmäßig, seit weniger als einem Jahr." },
      { code: "D", text: "Ich spiele regelmäßig, seit einem Jahr oder länger." }
    ]
  };
  var FRAGEN_V = [
    { id: "v2", art: "G", saeule: "verorten", text: "Wenn mich jemand fragt, wo ich mit meinem Spiel stehe, kann ich es ruhig beschreiben." },
    { id: "v3", art: "B", saeule: "verorten", text: "Wenn ich Handpan-Videos von anderen sehe, denke ich: So werde ich nie klingen." },
    { id: "v4", art: "G", saeule: "ersehnen", text: "Ich habe ein Gefühl dafür, wie meine eigene Musik klingt." },
    { id: "v5", art: "B", saeule: "ersehnen", text: "Was ich mir wirklich wünsche, fühlt sich zu groß an, um es laut zu sagen." },
    { id: "v6", art: "G", saeule: "freilegen", text: "Beim Spielen vergesse ich die Zeit." },
    { id: "v7", art: "B", saeule: "freilegen", text: "Ich bewerte einen Ton, bevor er ausgeklungen ist." },
    { id: "v8", art: "G", saeule: "gezielt-lernen", text: "Ich weiß, was ich als Nächstes an der Handpan lernen will." },
    { id: "v9", art: "B", saeule: "gezielt-lernen", text: "Ich übe nach Kursen, Tutorials oder Stücken von anderen." },
    { id: "v10", art: "B", saeule: "gezielt-lernen", text: "Wenn ich mich an die Handpan setze, spiele ich dieselben drei Muster." },
    { id: "v11", art: "G", saeule: "erklingen-lassen", text: "Ich spiele anderen etwas vor." },
    { id: "v12", art: "B", saeule: "erklingen-lassen", text: "Wenn es um mein Spiel geht, sage ich schnell: „Ich bin da noch nicht so weit.“" },
    { id: "v13", art: "rhythmus", text: "Ich halte meinen Rhythmus." },
    {
      id: "v14",
      art: "sortier",
      text: "Was wünschst du dir für die nächsten Monate? Wähle eine oder zwei Antworten.",
      mehrfach: { min: 1, max: 2 },
      antworten: [
        { code: "a", text: "Frei spielen" },
        { code: "b", text: "Eigene Musik finden" },
        { code: "c", text: "Wissen, was ich als Nächstes lerne" },
        { code: "d", text: "Vor anderen spielen" },
        { code: "e", text: "Sicherer im Rhythmus" },
        { code: "f", text: "Stücke und Tutorials nachspielen" }
      ]
    },
    {
      id: "v15",
      art: "sortier",
      text: "Was hält dich gerade am meisten auf?",
      antworten: [
        { code: "a", text: "Mir fehlt die Zeit." },
        { code: "b", text: "Ich weiß nicht, wie es weitergeht." },
        { code: "c", text: "Mir fehlt jemand, der mich begleitet." },
        { code: "d", text: "Mir ist nicht klar, was ich will." }
      ]
    },
    {
      id: "v16",
      art: "sortier",
      text: "Wie lernst du am liebsten?",
      antworten: [
        { code: "a", text: "Allein, in meinem Tempo" },
        { code: "b", text: "Allein, aber mit jemandem an meiner Seite" },
        { code: "c", text: "Mit anderen zusammen" }
      ]
    },
    { id: "v17", art: "freitext", text: "Gibt es noch etwas, das ich über dich und dein Spiel wissen sollte? (freiwillig)" }
  ];
  var FRAGEN_K = [
    { id: "k2", art: "G", saeule: "verorten", text: "Ich kann gelassen sagen: Ich stehe ganz am Anfang." },
    { id: "k3", art: "B", saeule: "verorten", text: "Wenn ich Handpan-Videos von anderen sehe, denke ich: So werde ich nie klingen." },
    { id: "k4", art: "G", saeule: "ersehnen", text: "Ich kann in einem Satz sagen, warum ich Handpan spielen möchte." },
    { id: "k5", art: "B", saeule: "ersehnen", text: "Was ich mir wirklich wünsche, fühlt sich zu groß an, um es laut zu sagen." },
    { id: "k6", art: "G", saeule: "freilegen", text: "Ich probiere Neues aus, bevor ich es kann." },
    { id: "k7", art: "B", saeule: "freilegen", text: "Bevor ich mit etwas Neuem anfange, will ich genau wissen, wie es geht." },
    { id: "k8", art: "G", saeule: "gezielt-lernen", text: "Ich weiß, was ich als Erstes lernen möchte." },
    { id: "k9", art: "B", saeule: "gezielt-lernen", text: "Ich wünsche mir, dass mir jemand sagt, womit ich anfangen soll." },
    { id: "k10", art: "G", saeule: "erklingen-lassen", text: "Andere wissen, dass mich die Handpan beschäftigt." },
    { id: "k11", art: "B", saeule: "erklingen-lassen", text: "Was ich mache, zeige ich anderen erst, wenn es fertig ist." },
    { id: "k12", art: "freitext", text: "Gibt es noch etwas, das ich über dich wissen sollte? (freiwillig)" }
  ];
  function fragenDesZweigs(zweig) {
    return [FRAGE_1, ...zweig === "V" ? FRAGEN_V : FRAGEN_K];
  }
  var KOPF = {
    titel: "Dein Klangprofil",
    text: "Das ist dein Standort, keine Note. Du siehst zwei Dinge: was dich schon trägt und wohin es dich gerade zieht. Darunter steht ein nächster Schritt."
  };
  var SAEULEN_UEBERSCHRIFT = {
    traegt: "Was dich schon trägt",
    zieht: "Wohin es dich gerade zieht"
  };
  var SONDERSATZ = {
    nichtsTraegt: "Du hast auch die unbequemen Sätze ehrlich beantwortet. Genauer kann man kaum sagen, wo man steht.",
    nichtsZieht: "Von dem, wonach ich gefragt habe, bremst dich gerade kaum etwas."
  };
  var SAEULEN_TEXTE = {
    verorten: {
      name: "Verorten",
      mitAlltagswort: "Verorten: zu sehen, wo du gerade stehst",
      traegt: "Du kannst ruhig beschreiben, wo du gerade stehst. Das ist ein fester Ausgangspunkt.",
      zieht: "Der Vergleich mit anderen beschäftigt dich gerade.",
      vertiefen: "Hier trägt dich schon etwas, und hier bewegt sich gerade am meisten. Du kannst noch klarer sehen, wo du stehst, auch neben anderen."
    },
    ersehnen: {
      name: "Ersehnen",
      mitAlltagswort: "Ersehnen: zu spüren, was du dir wünschst",
      traegt: "Du hast ein Gefühl dafür, wohin du mit der Handpan willst.",
      zieht: "Da ist ein Wunsch, der dir groß vorkommt. Er beschäftigt dich gerade am meisten.",
      vertiefen: "Hier trägt dich schon etwas, und hier bewegt sich gerade am meisten. Dein Gefühl dafür, wohin du willst, kann noch deutlicher werden."
    },
    freilegen: {
      name: "Freilegen",
      mitAlltagswort: "Freilegen: wie du mit dem umgehst, was dich bremst",
      traegt: "Es gibt Momente, in denen du spielst oder ausprobierst, ohne dich zu prüfen.",
      zieht: "Bewerten und Kontrolle sind bei dir gerade ein Thema. Der innere Kritiker meldet sich deutlich.",
      vertiefen: "Hier trägt dich schon etwas, und hier bewegt sich gerade am meisten. Die Momente, in denen du dich nicht prüfst, können mehr werden."
    },
    "gezielt-lernen": {
      name: "Gezielt lernen",
      mitAlltagswort: "Gezielt lernen: dein eigener Lernweg",
      traegt: "Du weißt, was du als Nächstes lernen willst.",
      zieht: "Die Frage, was du als Nächstes lernst und wer das bestimmt, beschäftigt dich gerade.",
      vertiefen: "Hier trägt dich schon etwas, und hier bewegt sich gerade am meisten. Deinem eigenen Lernweg kannst du noch klarer folgen."
    },
    "erklingen-lassen": {
      name: "Erklingen lassen",
      mitAlltagswort: "Erklingen lassen: dich mit dem zu zeigen, was du spielst",
      traegt: "Du lässt andere an dem teilhaben, was du tust.",
      zieht: "Dich zu zeigen, beschäftigt dich gerade. Du wartest lieber, bis es sich fertig anfühlt.",
      vertiefen: "Hier trägt dich schon etwas, und hier bewegt sich gerade am meisten. Auch das, was sich noch unfertig anfühlt, darf hörbar werden."
    }
  };
  var LINKS = {
    kaufberatung: "https://handpan.schule/kaufberatung/",
    vonAnfangAn: "https://handpan.schule/von-anfang-an-handpan-spielen/",
    rhythmusFundament: "https://handpan.schule/rhythmus-fundament/",
    tidycal15min: "https://tidycal.com/handpanschule/15-minuten-kennenlernen",
    youtube: "https://www.youtube.com/@nilscaspar36",
    datenschutz: "/datenschutz/"
  };
  var WEGE = {
    1: {
      titel: "Du stehst vor dem ersten Ton",
      absaetze: [
        "Du hast noch keine Handpan. Deine Antworten zeigen trotzdem schon, wie du an Neues herangehst.",
        "Vor dem ersten Ton steht die Frage, welches Instrument zu dir passt. Auf der Seite zur Kaufberatung siehst du, wie ich dich dabei herstellerunabhängig begleite."
      ],
      knopf: { text: "Zur Kaufberatung", link: LINKS.kaufberatung },
      mailZeile: "Welches Instrument zu dir passt, kannst du dir mit meiner Kaufberatung ansehen:"
    },
    2: {
      titel: "Du hast eine Handpan und spielst selten",
      absaetze: [
        "Dafür gibt es viele Gründe.",
        "„Von Anfang an spielen“ ist mein Kurs für den Anfang. Er läuft live in einer Gruppe mit höchstens 13 Plätzen, jeden Samstag um 10 Uhr, und alles wird aufgezeichnet. Du brauchst keine Vorkenntnisse und keine Noten. Auf der Seite kannst du dir in Ruhe ansehen, ob das zu dir passt."
      ],
      knopf: { text: "Den Kurs ansehen", link: LINKS.vonAnfangAn },
      mailZeile: "„Von Anfang an spielen“ ist mein Kurs für den Anfang. Er läuft live in einer Gruppe:"
    },
    3: {
      titel: "Du spielst, und beim Rhythmus bist du noch unsicher",
      absaetze: [
        "So hast du es bei der Frage zum Rhythmus angegeben.",
        "Das Rhythmus Fundament ist mein Kurs für den Rhythmus: etwa 15 Minuten am Tag und Live-Trainings mit mir. Ein Termin für die nächste Runde steht noch nicht fest. Auf der Seite kannst du dich eintragen, dann erfährst du ihn zuerst."
      ],
      knopf: { text: "Rhythmus Fundament ansehen", link: LINKS.rhythmusFundament },
      mailZeile: "Für den Rhythmus gibt es das Rhythmus Fundament. Für die nächste Runde kannst du dich eintragen:"
    },
    4: {
      titel: "Du spielst schon und möchtest nicht allein weitergehen",
      absaetze: [
        "Begleitung ist dir wichtig, so hast du es angegeben.",
        "Lass uns 15 Minuten sprechen, auf Zoom und unverbindlich. Wir schauen zusammen, was zu dir passt, zum Beispiel meine Mitgliedschaft, die am 7. Januar 2027 beginnt."
      ],
      knopf: { text: "Gespräch vereinbaren", link: LINKS.tidycal15min },
      mailZeile: "Lass uns 15 Minuten sprechen, unverbindlich:"
    },
    5: {
      titel: "Du lernst am liebsten allein, in deinem Tempo",
      absaetze: ["Auf meinem YouTube-Kanal findest du Videos von mir. Schau dich um, wenn du magst."],
      knopf: { text: "Zum YouTube-Kanal", link: LINKS.youtube },
      mailZeile: "Auf meinem YouTube-Kanal findest du Videos von mir:"
    }
  };
  var LANDINGPAGE = {
    ueberschriften: {
      1: "Das bin nicht ich.",
      2: "Klingen, wie du bist. Finde heraus, wo du gerade stehst.",
      3: "Wo stehst du gerade mit der Handpan?"
    },
    ueberschriftStandard: 2,
    unterzeile: "Dein Klangprofil zeigt dir, was dich schon trägt und wohin es dich gerade zieht. Dazu einen nächsten Schritt, der zu dir passt.",
    startknopf: "Zu meinem Klangprofil",
    hinweisUnterKnopf: "Höchstens 17 Fragen · etwa fünf Minuten · kostenlos",
    schaut: {
      titel: "Worauf das Klangprofil schaut",
      punkte: [
        { titel: "Freies Spiel", satz: "Wie frei du spielst und was dich dabei bremst.", ohne: "Ohne zu messen, wie weit du bist." },
        {
          titel: "Eigene Richtung",
          satz: "Ob du weißt, was du als Nächstes lernen willst, oder ob andere es vorgeben.",
          ohne: "Ohne dir einen Lehrplan vorzuschreiben."
        },
        {
          titel: "Sich zeigen",
          satz: "Wie es dir damit geht, andere hören zu lassen, was du spielst.",
          ohne: "Ohne dass du jemandem vorspielen musst."
        }
      ]
    },
    keineNote: {
      titel: "Es gibt keine Note",
      text: "Dieses Profil bewertet dich nicht. Es gibt keine Punkte und keine Prozent. Am Ende siehst du zwei Dinge: was dich schon trägt und wohin es dich gerade zieht. Ein Ja zu einem unbequemen Satz zählt nicht gegen dich. Es zeigt, wo sich bei dir gerade etwas bewegt. Danach bekommst du einen nächsten Schritt."
    },
    werIchBin: {
      titel: "Wer ich bin",
      absaetze: [
        "Ich bin Nils Caspar, Musiker und Künstler, und habe die Handpan Schule des Lebens gegründet. Ich habe Expressive Arts studiert und bin seit über 20 Jahren Percussionist und Musiker. Lange habe ich Musik gemacht und war doch nie zufrieden. Heute begleite ich Menschen dabei, ihren eigenen Klang zu finden.",
        "Meine Art zu arbeiten nenne ich Ekstatisches Lernen: Du lernst, weil dein eigener Wille dich führt. Sie hat fünf Säulen, und die Fragen schauen auf alle fünf: Verorten, also sehen, wo du stehst. Ersehnen, also spüren, was du dir wünschst. Freilegen, also erkennen, was dich bremst. Gezielt lernen, also deinem eigenen Lernweg folgen. Erklingen lassen, also dich mit deinem Spiel zeigen."
      ]
    }
  };
  var EINWILLIGUNG_FASSUNG = "2.3";
  var EINWILLIGUNG_TEXT = "Mit dem Klick bekommst du dein Klangprofil per Mail und ab und zu weitere Mails zu meinem Programm.";
  var FORMULAR = {
    ueberschrift: "Wohin soll ich dir dein Klangprofil schicken?",
    feldVorname: "Vorname",
    feldMail: "E-Mail-Adresse",
    einwilligung: EINWILLIGUNG_TEXT,
    zeileUnterFormular: "Dein Klangprofil siehst du gleich hier. Mehr dazu in der {link_datenschutz}.",
    linktextDatenschutz: "Datenschutzerklärung",
    knopf: "Klangprofil anzeigen"
  };
  var MELDUNGEN = {
    weiter: "Weiter",
    zurueck: "Zurück",
    ueberspringen: "Überspringen",
    v14ZuViele: "Wähle bitte eine oder zwei Antworten.",
    vornameLeer: "Bitte trag deinen Vornamen ein.",
    mailLeer: "Bitte trag deine Mailadresse ein.",
    mailUngueltig: "Diese Mailadresse sieht unvollständig aus. Schau bitte noch einmal drauf.",
    knopfSendet: "Einen Moment …",
    mailNichtVerschickt: "Die Mail konnte ich gerade nicht verschicken. Speichere dir diese Seite als Lesezeichen, dann findest du dein Klangprofil wieder.",
    hinweisNachAbschicken: "Dein Klangprofil kommt gleich per Mail. Nichts gefunden? Schau auch im Spam-Ordner nach."
  };
  var FREITEXT_HINWEIS = "Freiwillig. Es wird mit deinen Antworten, deinem Vornamen und deiner Mail gespeichert und nach 180 Tagen gelöscht. Bitte schreib hier nichts Gesundheitliches auf.";

  // src/klangprofil/logik.ts
  var PUNKTE = { ja: 2, teils: 1, "eher-nicht": 0 };
  function punkte(code) {
    return typeof code === "string" && code in PUNKTE ? PUNKTE[code] : 0;
  }
  function stand(antworten) {
    const f1 = antworten.f1;
    if (f1 === "A" || f1 === "B" || f1 === "C" || f1 === "D")
      return f1;
    throw new Error(`Frage 1 fehlt oder ist ungültig: ${JSON.stringify(f1)}`);
  }
  function zweig(f1) {
    if (f1 === "A" || f1 === "B")
      return "K";
    if (f1 === "C" || f1 === "D")
      return "V";
    throw new Error(`Frage 1 ungültig: ${JSON.stringify(f1)}`);
  }
  function weg(antworten) {
    const s = stand(antworten);
    if (s === "A")
      return { weg: 1, regel: "P1" };
    if (s === "B")
      return { weg: 2, regel: "P2" };
    const v14 = antworten.v14;
    const v15 = antworten.v15;
    const v16 = antworten.v16;
    if (v16 === "b" || v16 === "c" || v15 === "c")
      return { weg: 4, regel: "P3" };
    if (Array.isArray(v14) && v14.length === 1 && v14[0] === "f")
      return { weg: 5, regel: "P4" };
    if (antworten.v13 === "eher-nicht")
      return { weg: 3, regel: "P5" };
    return { weg: 5, regel: "P6" };
  }
  function anteile(antworten) {
    const fragen = zweig(stand(antworten)) === "V" ? FRAGEN_V : FRAGEN_K;
    const traegt = {};
    const zieht = {};
    for (const s of SAEULEN) {
      const g = fragen.filter((f) => f.art === "G" && f.saeule === s);
      const b = fragen.filter((f) => f.art === "B" && f.saeule === s);
      const gSumme = g.reduce((n, f) => n + punkte(antworten[f.id]), 0);
      const bSumme = b.reduce((n, f) => n + punkte(antworten[f.id]), 0);
      traegt[s] = gSumme * 4 / (2 * g.length);
      zieht[s] = bSumme * 4 / (2 * b.length);
    }
    return { traegt, zieht };
  }
  function hoechste(werte, kandidaten) {
    let beste = null;
    for (const s of kandidaten)
      if (werte[s] > 0 && (beste === null || werte[s] > werte[beste]))
        beste = s;
    return beste;
  }
  function saeulen(antworten) {
    const a = anteile(antworten);
    const traegt = hoechste(a.traegt, SAEULEN);
    if (traegt === null)
      return { traegt: null, zieht: hoechste(a.zieht, SAEULEN), vertiefen: false };
    const zieht = hoechste(a.zieht, SAEULEN.filter((s) => s !== traegt));
    if (zieht !== null)
      return { traegt, zieht, vertiefen: false };
    if (a.zieht[traegt] > 0)
      return { traegt, zieht: traegt, vertiefen: true };
    return { traegt, zieht: null, vertiefen: false };
  }
  function ergebnis(antworten) {
    return { weg: weg(antworten).weg, ...saeulen(antworten) };
  }
  var CODE_MUSTER = /^w([1-5])-t([0-5])-z([0-5]|v)$/;
  function nummer(s) {
    return s === null ? 0 : SAEULEN.indexOf(s) + 1;
  }
  function ergebnisCode(e) {
    const t = nummer(e.traegt);
    if (e.vertiefen) {
      if (e.traegt === null || e.zieht !== e.traegt)
        throw new Error("vertiefen verlangt zieht = traegt ≠ null");
      return `w${e.weg}-t${t}-zv`;
    }
    if (e.zieht !== null && e.zieht === e.traegt)
      throw new Error("zieht = traegt nur mit vertiefen");
    return `w${e.weg}-t${t}-z${nummer(e.zieht)}`;
  }
  function ausCode(code) {
    const m = CODE_MUSTER.exec(code);
    if (!m)
      return null;
    const w = Number(m[1]);
    const t = Number(m[2]);
    const traegt = t === 0 ? null : SAEULEN[t - 1];
    if (m[3] === "v") {
      if (traegt === null)
        return null;
      return { weg: w, traegt, zieht: traegt, vertiefen: true };
    }
    const z = Number(m[3]);
    if (z !== 0 && z === t)
      return null;
    return { weg: w, traegt, zieht: z === 0 ? null : SAEULEN[z - 1], vertiefen: false };
  }
  var AUSSAGE_CODES = new Set(AUSSAGE_ANTWORTEN.map((a) => a.code));
  var FREITEXT_MAX = 1000;
  function pruefe(antworten) {
    const fehler = [];
    const f1 = antworten.f1;
    if (f1 !== "A" && f1 !== "B" && f1 !== "C" && f1 !== "D")
      return { ok: false, fehler: [`f1: ungültig (${JSON.stringify(f1)})`] };
    const z = zweig(f1);
    const fragen = fragenDesZweigs(z);
    const bekannt = new Set(fragen.map((f) => f.id));
    for (const id of Object.keys(antworten))
      if (!bekannt.has(id) && antworten[id] !== undefined)
        fehler.push(`${id}: gehört nicht zu Zweig ${z}`);
    for (const f of fragen) {
      if (f.id === "f1")
        continue;
      const w = antworten[f.id];
      if (f.art === "freitext") {
        if (w === undefined || w === "")
          continue;
        if (typeof w !== "string")
          fehler.push(`${f.id}: Freitext muss Text sein`);
        else if (w.length > FREITEXT_MAX)
          fehler.push(`${f.id}: länger als ${FREITEXT_MAX} Zeichen`);
        continue;
      }
      if (w === undefined) {
        fehler.push(`${f.id}: fehlt`);
        continue;
      }
      if (f.art === "G" || f.art === "B" || f.art === "rhythmus") {
        if (typeof w !== "string" || !AUSSAGE_CODES.has(w))
          fehler.push(`${f.id}: unbekannter Code ${JSON.stringify(w)}`);
        continue;
      }
      if (f.art !== "sortier")
        continue;
      const codes = new Set(f.antworten.map((a) => a.code));
      if (f.mehrfach) {
        if (!Array.isArray(w))
          fehler.push(`${f.id}: muss eine Liste sein`);
        else if (w.length < f.mehrfach.min || w.length > f.mehrfach.max)
          fehler.push(`${f.id}: ${f.mehrfach.min} bis ${f.mehrfach.max} Antworten`);
        else if (new Set(w).size !== w.length)
          fehler.push(`${f.id}: doppelte Antwort`);
        else
          for (const c of w)
            if (typeof c !== "string" || !codes.has(c))
              fehler.push(`${f.id}: unbekannter Code ${JSON.stringify(c)}`);
      } else if (typeof w !== "string" || !codes.has(w))
        fehler.push(`${f.id}: unbekannter Code ${JSON.stringify(w)}`);
    }
    return fehler.length === 0 ? { ok: true } : { ok: false, fehler };
  }
  function quelleWert(q) {
    if (typeof q !== "string")
      return null;
    const k = q.trim().toLowerCase();
    return /^[a-z0-9_-]{1,60}$/.test(k) ? k : null;
  }
  function leerZuNull(s) {
    const t = typeof s === "string" ? s.trim() : "";
    return t === "" ? null : t;
  }
  function abgabe(antworten, extras) {
    const p = pruefe(antworten);
    if (!p.ok)
      throw new Error(`Antworten ungültig: ${p.fehler.join("; ")}`);
    const s = stand(antworten);
    const z = zweig(s);
    const codes = {};
    for (const f of fragenDesZweigs(z)) {
      if (f.art === "freitext")
        continue;
      const w2 = antworten[f.id];
      if (w2 !== undefined)
        codes[f.id] = Array.isArray(w2) ? [...w2] : w2;
    }
    const w = weg(antworten);
    const sa = saeulen(antworten);
    const mail = leerZuNull(extras.mail);
    const vorname = leerZuNull(extras.vorname);
    if (mail === null || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
      throw new Error("Mail fehlt oder ist ungültig");
    if (vorname === null)
      throw new Error("Vorname fehlt");
    const ft = antworten[z === "V" ? "v17" : "k12"];
    const freitext = typeof ft === "string" && ft.trim() !== "" ? ft.trim() : null;
    return {
      fassung: FASSUNG,
      zweig: z,
      stand: s,
      antworten: codes,
      weg: w.weg,
      regel: w.regel,
      saeule_traegt: nummer(sa.traegt),
      saeule_zieht: nummer(sa.zieht),
      vertiefen: sa.vertiefen,
      einwilligung_fassung: EINWILLIGUNG_FASSUNG,
      dauer_sek: Number.isFinite(extras.dauer_sek) ? Math.max(0, Math.round(extras.dauer_sek)) : 0,
      quelle: quelleWert(extras.quelle),
      quelle_inhalt: quelleWert(extras.quelle_inhalt),
      mail: mail.toLowerCase(),
      vorname,
      freitext,
      hp: typeof extras.hp === "string" ? extras.hp : ""
    };
  }
  var KP_ZIEHT_VERTIEFEN = 6;
  function brevoAttribute(e, kontext) {
    ergebnisCode(e);
    if (!["A", "B", "C", "D"].includes(kontext.stand))
      throw new Error(`Stand ungültig: ${kontext.stand}`);
    if (typeof kontext.id !== "string" || kontext.id.trim() === "")
      throw new Error("KP_ID fehlt");
    return {
      KP_WEG: e.weg,
      KP_STAND: kontext.stand,
      KP_TRAEGT: nummer(e.traegt),
      KP_ZIEHT: e.vertiefen ? KP_ZIEHT_VERTIEFEN : nummer(e.zieht),
      KP_ID: kontext.id
    };
  }

  // src/klangprofil/browser.ts
  var KP_ID_ERSATZ = "ohne-id";
  var MINDEST_SEK = 20;
  var ZEITLIMIT_MS = 8000;
  function hVariante(suche) {
    const h = new URLSearchParams(suche).get("h");
    return h === "1" || h === "2" || h === "3" ? Number(h) : LANDINGPAGE.ueberschriftStandard;
  }
  function codeAusHash(hash) {
    const m = /^#e=([a-z0-9-]+)$/.exec(hash);
    return m && ausCode(m[1]) ? m[1] : null;
  }
  function quelleWert2(v) {
    if (v === null)
      return null;
    const k = v.trim().toLowerCase();
    return /^[a-z0-9_-]{1,60}$/.test(k) ? k : null;
  }
  function quelleAusSuche(suche) {
    const p = new URLSearchParams(suche);
    return { quelle: quelleWert2(p.get("utm_source")), quelle_inhalt: quelleWert2(p.get("utm_content")) };
  }
  function mailFehler(mail) {
    const m = mail.trim();
    if (m === "")
      return MELDUNGEN.mailLeer;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m) ? null : MELDUNGEN.mailUngueltig;
  }
  function brevoErfolg(antwort) {
    if (!antwort || typeof antwort !== "object")
      return false;
    const a = antwort;
    return a.success === true && typeof a.message === "string" && a.message.trim() !== "";
  }
  function brevoFelder(person, attr) {
    return [
      ["EMAIL", person.mail.trim().toLowerCase()],
      ["VORNAME", person.vorname.trim()],
      ["KP_ID", attr.KP_ID],
      ["KP_WEG", String(attr.KP_WEG)],
      ["KP_STAND", attr.KP_STAND],
      ["KP_TRAEGT", String(attr.KP_TRAEGT)],
      ["KP_ZIEHT", String(attr.KP_ZIEHT)],
      ["email_address_check", person.hp],
      ["locale", "de"]
    ];
  }
  function antwortSetzen(antworten, id, wert) {
    const neu = { ...antworten, [id]: Array.isArray(wert) ? [...wert] : wert };
    if (wert === undefined)
      delete neu[id];
    if (id === "f1" && typeof wert === "string") {
      const erlaubt = new Set(fragenDesZweigs(zweig(wert)).map((f) => f.id));
      for (const k of Object.keys(neu))
        if (!erlaubt.has(k))
          delete neu[k];
    }
    return neu;
  }
  async function mitZeitlimit(f, url, init) {
    const ctrl = typeof AbortController === "function" ? new AbortController : null;
    const t = ctrl ? setTimeout(() => ctrl.abort(), ZEITLIMIT_MS) : null;
    try {
      return await f(url, ctrl ? { ...init, signal: ctrl.signal } : init);
    } finally {
      if (t)
        clearTimeout(t);
    }
  }
  function rpc(k, f, name, body, keepalive = false) {
    return mitZeitlimit(f, `${k.supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: k.supabaseKey },
      body: JSON.stringify(body),
      keepalive
    });
  }
  async function supabaseAbgeben(k, f, paket) {
    try {
      const r = await rpc(k, f, "klangprofil_abgeben", { p: paket });
      if (!r.ok)
        return null;
      const j = await r.json();
      return j && j.ok === true && typeof j.id === "string" && j.id !== "" ? j.id : null;
    } catch {
      return null;
    }
  }
  async function brevoSenden(k, f, felder) {
    try {
      const fd = new FormData;
      for (const [n, w] of felder)
        fd.append(n, w);
      const r = await mitZeitlimit(f, `${k.brevoAction}?isAjax=1`, { method: "POST", body: fd });
      return brevoErfolg(await r.json());
    } catch {
      return false;
    }
  }
  function pixel(...args) {
    const fbq = globalThis.fbq;
    if (typeof fbq !== "function")
      return;
    try {
      fbq(...args);
    } catch {}
  }
  function el(tag, attr = {}, ...kinder) {
    const e = document.createElement(tag);
    for (const [n, w] of Object.entries(attr)) {
      if (w === undefined || w === false)
        continue;
      if (n === "class")
        e.className = String(w);
      else
        e.setAttribute(n, w === true ? "" : w);
    }
    for (const k of kinder)
      if (k !== null && k !== undefined && k !== false)
        e.append(k);
    return e;
  }
  function knopf(text, klasse, wenn, attr = {}) {
    const b = el("button", { type: "button", class: klasse, ...attr }, text);
    b.addEventListener("click", wenn);
    return b;
  }
  function starten(wurzel, konfig, umgebung = {}) {
    const f = umgebung.fetch ?? ((...a) => fetch(...a));
    const jetzt = umgebung.jetzt ?? (() => Date.now());
    const suche = location.search;
    const variante = hVariante(suche);
    const quelle = quelleAusSuche(suche);
    let antworten = {};
    let startZeit = null;
    let zustand = { art: "start" };
    let formWerte = { vorname: "", mail: "" };
    const code = codeAusHash(location.hash);
    if (code)
      zustand = { art: "ergebnis", e: ausCode(code), hinweis: null };
    window.addEventListener("hashchange", () => {
      const c = codeAusHash(location.hash);
      if (!c)
        return;
      if (zustand.art === "ergebnis" && ergebnisCode(zustand.e) === c)
        return;
      wechseln({ art: "ergebnis", e: ausCode(c), hinweis: null });
    });
    function fragen() {
      return typeof antworten.f1 === "string" ? fragenDesZweigs(zweig(antworten.f1)) : [FRAGE_1];
    }
    function wechseln(z, scrollen = true) {
      zustand = z;
      zeichnen();
      if (scrollen) {
        try {
          window.scrollTo({ top: 0 });
        } catch {}
      }
    }
    function beginnen() {
      if (startZeit === null) {
        startZeit = jetzt();
        pixel("trackCustom", "KlangprofilBegonnen");
        rpc(konfig, f, "klangprofil_start", {}, true).catch(() => {
          return;
        });
      }
      wechseln({ art: "frage", i: 0 });
    }
    function weiter(i) {
      const liste = fragen();
      if (i + 1 < liste.length)
        wechseln({ art: "frage", i: i + 1 });
      else
        wechseln({ art: "formular" });
    }
    function zurueck(i) {
      if (i <= 0)
        wechseln({ art: "start" });
      else
        wechseln({ art: "frage", i: i - 1 });
    }
    function startSeite() {
      const startKnopf = () => knopf(LANDINGPAGE.startknopf, "cta kp-start", beginnen);
      const hero = el("section", { class: "page-hero kp-hero" }, el("div", { class: "hero-content container-narrow" }, el("h1", {}, LANDINGPAGE.ueberschriften[variante]), el("p", { class: "hero-subtitle" }, LANDINGPAGE.unterzeile), el("p", { class: "kp-start-zeile" }, startKnopf()), el("p", { class: "kp-hinweis" }, LANDINGPAGE.hinweisUnterKnopf)));
      const schaut = el("section", { class: "section-dark" }, el("div", { class: "container-narrow" }, el("h2", { class: "section-title" }, LANDINGPAGE.schaut.titel), el("div", { class: "kp-schaut" }, ...LANDINGPAGE.schaut.punkte.map((p) => el("div", { class: "feature-card" }, el("h3", {}, p.titel), el("p", {}, p.satz), el("p", { class: "kp-ohne" }, p.ohne))))));
      const note = el("section", { class: "section-dark" }, el("div", { class: "container-narrow kp-mitte" }, el("h2", { class: "section-title" }, LANDINGPAGE.keineNote.titel), el("p", { class: "kp-text" }, LANDINGPAGE.keineNote.text), el("p", { class: "kp-start-zeile" }, startKnopf())));
      const wer = el("section", { class: "section-dark" }, el("div", { class: "container-narrow" }, el("h2", { class: "section-title" }, LANDINGPAGE.werIchBin.titel), ...LANDINGPAGE.werIchBin.absaetze.map((a) => el("p", { class: "kp-text" }, a)), el("p", { class: "kp-start-zeile kp-mitte" }, startKnopf())));
      return [hero, schaut, note, wer];
    }
    function punktreihe(i, anzahl) {
      if (typeof antworten.f1 !== "string")
        return null;
      return el("ol", { class: "kp-punkte", "aria-hidden": "true" }, ...Array.from({ length: anzahl }, (_, n) => el("li", { class: n < i ? "kp-fertig" : n === i ? "kp-jetzt" : "" })));
    }
    function frageSeite(i, meldung) {
      const liste = fragen();
      const frage = liste[i];
      const wert = antworten[frage.id];
      const inhalt = [];
      let weiterKnopf = null;
      const waehlen = (code2) => {
        antworten = antwortSetzen(antworten, frage.id, code2);
        weiter(i);
      };
      if (frage.art === "sortier" && frage.mehrfach) {
        const gewaehlt = Array.isArray(wert) ? wert : [];
        const { min, max } = frage.mehrfach;
        inhalt.push(el("div", { class: "kp-antworten" }, ...frage.antworten.map((a) => knopf(a.text, "kp-antwort", () => {
          const ist = Array.isArray(antworten[frage.id]) ? antworten[frage.id] : [];
          if (ist.includes(a.code)) {
            antworten = antwortSetzen(antworten, frage.id, ist.filter((c) => c !== a.code));
            wechseln({ art: "frage", i }, false);
          } else if (ist.length >= max) {
            wechseln({ art: "frage", i, meldung: MELDUNGEN.v14ZuViele }, false);
          } else {
            antworten = antwortSetzen(antworten, frage.id, [...ist, a.code]);
            wechseln({ art: "frage", i }, false);
          }
        }, { "aria-pressed": gewaehlt.includes(a.code) ? "true" : "false" }))));
        weiterKnopf = knopf(MELDUNGEN.weiter, "cta kp-weiter", () => weiter(i), {
          disabled: gewaehlt.length < min || gewaehlt.length > max
        });
      } else if (frage.art === "freitext") {
        const ta = el("textarea", { class: "kp-freitext", rows: "6", "aria-label": frage.text, "aria-describedby": "kp-t4" });
        ta.maxLength = FREITEXT_MAX;
        ta.value = typeof wert === "string" ? wert : "";
        ta.addEventListener("input", () => {
          antworten = antwortSetzen(antworten, frage.id, ta.value);
        });
        inhalt.push(ta, el("p", { class: "kp-hinweis", id: "kp-t4" }, FREITEXT_HINWEIS));
        weiterKnopf = knopf(MELDUNGEN.weiter, "cta kp-weiter", () => {
          const t = ta.value.trim();
          antworten = antwortSetzen(antworten, frage.id, t === "" ? undefined : ta.value.slice(0, FREITEXT_MAX));
          weiter(i);
        });
      } else {
        const optionen = frage.art === "sortier" ? frage.antworten.map((a) => ({ code: a.code, text: a.text })) : AUSSAGE_ANTWORTEN.map((a) => ({ code: a.code, text: a.text }));
        inhalt.push(el("div", { class: `kp-antworten${frage.art === "sortier" ? "" : " kp-drei"}` }, ...optionen.map((a) => knopf(a.text, "kp-antwort", () => waehlen(a.code), { "aria-pressed": wert === a.code ? "true" : "false" }))));
        if (typeof wert === "string")
          weiterKnopf = knopf(MELDUNGEN.weiter, "cta kp-weiter", () => weiter(i));
      }
      const leiste = el("div", { class: "kp-leiste" }, knopf(MELDUNGEN.zurueck, "kp-zurueck", () => zurueck(i)), frage.art === "freitext" ? knopf(MELDUNGEN.ueberspringen, "kp-zurueck", () => {
        antworten = antwortSetzen(antworten, frage.id, undefined);
        weiter(i);
      }) : null, weiterKnopf);
      return [
        el("section", { class: "kp-buehne" }, el("div", { class: "container-narrow" }, punktreihe(i, liste.length), el("h2", { class: "kp-frage", tabindex: "-1" }, frage.text), ...inhalt, el("p", { class: "kp-meldung", role: "alert" }, meldung ?? ""), leiste))
      ];
    }
    function formularSeite() {
      const meldung = el("p", { class: "kp-meldung", role: "alert" });
      const vorname = el("input", { type: "text", name: "vorname", id: "kp-vorname", autocomplete: "given-name", maxlength: "60", required: true });
      const mail = el("input", { type: "email", name: "email", id: "kp-mail", autocomplete: "email", inputmode: "email", maxlength: "254", required: true });
      vorname.value = formWerte.vorname;
      mail.value = formWerte.mail;
      const honig = el("input", { type: "text", name: "email_address_check", value: "", tabindex: "-1", autocomplete: "off", "aria-hidden": "true", class: "kp-honig" });
      const absenden = el("button", { type: "submit", class: "cta kp-absenden" }, FORMULAR.knopf);
      const [vorLink, nachLink] = FORMULAR.zeileUnterFormular.split("{link_datenschutz}");
      const form = el("form", { class: "kp-formular", novalidate: true }, el("label", { for: "kp-vorname" }, FORMULAR.feldVorname), vorname, el("label", { for: "kp-mail" }, FORMULAR.feldMail), mail, honig, meldung, el("p", { class: "kp-einwilligung" }, FORMULAR.einwilligung), absenden);
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        formWerte = { vorname: vorname.value, mail: mail.value };
        const fehler = vorname.value.trim() === "" ? MELDUNGEN.vornameLeer : mailFehler(mail.value);
        if (fehler) {
          meldung.textContent = fehler;
          (fehler === MELDUNGEN.vornameLeer ? vorname : mail).focus();
          return;
        }
        absenden.disabled = true;
        absenden.textContent = MELDUNGEN.knopfSendet;
        abschicken(vorname.value, mail.value, honig.value);
      });
      return [
        el("section", { class: "kp-buehne" }, el("div", { class: "container-narrow" }, el("h2", { class: "kp-frage", tabindex: "-1" }, FORMULAR.ueberschrift), form, el("p", { class: "kp-unter" }, vorLink ?? "", el("a", { href: LINKS.datenschutz }, FORMULAR.linktextDatenschutz), nachLink ?? ""), el("div", { class: "kp-leiste" }, knopf(MELDUNGEN.zurueck, "kp-zurueck", () => zurueck(fragen().length)))))
      ];
    }
    async function abschicken(vorname, mail, hp) {
      const e = ergebnis(antworten);
      const stand2 = antworten.f1;
      const dauer = startZeit === null ? 0 : (jetzt() - startZeit) / 1000;
      const verwerfen = hp !== "" || dauer < MINDEST_SEK;
      let hinweis = null;
      if (!verwerfen) {
        let id = null;
        try {
          const paket = abgabe(antworten, { dauer_sek: dauer, ...quelle, mail, vorname, hp });
          id = await supabaseAbgeben(konfig, f, paket);
        } catch {
          id = null;
        }
        const attr = brevoAttribute(e, { stand: stand2, id: id ?? KP_ID_ERSATZ });
        const ok = await brevoSenden(konfig, f, brevoFelder({ mail, vorname, hp }, attr));
        hinweis = ok ? "gesendet" : "nicht-gesendet";
      }
      try {
        history.replaceState(null, "", `${location.pathname}${location.search}#e=${ergebnisCode(e)}`);
      } catch {}
      pixel("trackCustom", "KlangprofilAbgeschlossen");
      if (hinweis === "gesendet")
        pixel("track", "Lead", { content_name: "Klangprofil" });
      wechseln({ art: "ergebnis", e, hinweis });
    }
    function ergebnisSeite(e, hinweis) {
      const w = WEGE[e.weg];
      const block = (titel, name, satz) => el("div", { class: "feature-card kp-saeule" }, el("h3", {}, titel), el("p", { class: "kp-saeule-name" }, name), el("p", {}, satz));
      const traegt = e.traegt ? block(SAEULEN_UEBERSCHRIFT.traegt, SAEULEN_TEXTE[e.traegt].mitAlltagswort, SAEULEN_TEXTE[e.traegt].traegt) : el("div", { class: "feature-card kp-saeule" }, el("p", {}, SONDERSATZ.nichtsTraegt));
      const zieht = e.zieht ? block(SAEULEN_UEBERSCHRIFT.zieht, SAEULEN_TEXTE[e.zieht].mitAlltagswort, e.vertiefen ? SAEULEN_TEXTE[e.zieht].vertiefen : SAEULEN_TEXTE[e.zieht].zieht) : el("div", { class: "feature-card kp-saeule" }, el("p", {}, SONDERSATZ.nichtsZieht));
      const extern = /^https?:\/\//.test(w.knopf.link) && !w.knopf.link.startsWith("https://handpan.schule/");
      return [
        el("section", { class: "page-hero kp-hero" }, el("div", { class: "hero-content container-narrow" }, hinweis === "gesendet" ? el("p", { class: "kp-mailhinweis", role: "status" }, MELDUNGEN.hinweisNachAbschicken) : null, hinweis === "nicht-gesendet" ? el("p", { class: "kp-mailhinweis", role: "status" }, MELDUNGEN.mailNichtVerschickt) : null, el("h1", { tabindex: "-1" }, KOPF.titel), el("p", { class: "hero-subtitle" }, KOPF.text))),
        el("section", { class: "section-dark" }, el("div", { class: "container-narrow" }, el("h2", { class: "section-title" }, w.titel), ...w.absaetze.map((a) => el("p", { class: "kp-text" }, a)), el("div", { class: "kp-saeulen" }, traegt, zieht), el("p", { class: "kp-start-zeile kp-mitte" }, el("a", { class: "cta", href: w.knopf.link, target: extern ? "_blank" : undefined, rel: extern ? "noopener" : undefined }, w.knopf.text))))
      ];
    }
    function zeichnen() {
      const z = zustand;
      const teile = z.art === "start" ? startSeite() : z.art === "frage" ? frageSeite(z.i, z.meldung) : z.art === "formular" ? formularSeite() : ergebnisSeite(z.e, z.hinweis);
      wurzel.replaceChildren(...teile);
      wurzel.dataset.zustand = z.art;
    }
    zeichnen();
  }
  if (typeof document !== "undefined") {
    const los = () => {
      const w = document.getElementById("klangprofil");
      if (w)
        starten(w, { supabaseUrl: "https://nffjqbuzqcdxvnteryms.supabase.co", supabaseKey: "sb_publishable__8OliXLjIGRE8W8GVPCnSg_plwwMxyd", brevoAction: "https://f66d0849.sibforms.com/serve/MUIFAANzF1XYNU5dAK7-HaPuTCAZhMa2E-ew-DNUK1LGJQXuj-rW_SnNzyvdhx-qPSqsLtx4Vh-81Viht-OM4omplARTGq4mXb8MdAMzS4i0p4XvM5Cp8FEbibiy7n9yFqPjNLW_VjU7Uv0-dtJYY2GiWqrpd4zJqedioCefoulBHFwYCo4Q_rHlnNRPgg__bybx2zO7jkfJdoEo" });
    };
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", los);
    else
      los();
  }
})();
