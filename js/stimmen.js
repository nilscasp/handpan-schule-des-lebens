// Stimmen aus der Community (Startseite und /stimmen/).
// Videos laden erst beim Klick und spielen mit Ton; es läuft immer nur eines.
// Auf /stimmen/ filtern die Knöpfe nach Themen, „Mehr zeigen“ blendet weitere ein.
(function () {
  var videos = [];

  document.querySelectorAll('.stimme-video').forEach(function (box) {
    var video = box.querySelector('video');
    var knopf = box.querySelector('.stimme-video__play');
    if (!video || !knopf) return;
    videos.push(video);
    knopf.addEventListener('click', function () {
      videos.forEach(function (v) { if (v !== video) v.pause(); });
      if (!video.getAttribute('src')) video.setAttribute('src', video.dataset.src);
      video.controls = true;
      box.classList.add('spielt');
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* Browser blockt: Bedienelemente sind sichtbar */ });
    });
    video.addEventListener('play', function () {
      videos.forEach(function (v) { if (v !== video) v.pause(); });
    });
  });

  var wand = document.querySelector('[data-stimmen-alle]');
  if (!wand) return;
  var items = Array.prototype.slice.call(wand.querySelectorAll('.stimme'));
  var knoepfe = Array.prototype.slice.call(document.querySelectorAll('.stimmen-filter button'));
  var mehr = document.querySelector('.stimmen-mehr button');
  var zahl = document.querySelector('.stimmen-zahl');
  var SCHRITT = 15;
  var filter = 'alle';
  var sichtbar = SCHRITT;

  function passt(el) {
    if (filter === 'alle') return true;
    if (filter === 'video') return el.classList.contains('stimme--video');
    return (' ' + el.dataset.themen + ' ').indexOf(' ' + filter + ' ') !== -1;
  }

  function zeigen() {
    var treffer = items.filter(passt);
    items.forEach(function (el) { el.hidden = true; });
    treffer.slice(0, sichtbar).forEach(function (el) { el.hidden = false; });
    if (mehr) mehr.parentNode.hidden = treffer.length <= sichtbar;
    if (zahl) zahl.textContent = treffer.length + (treffer.length === 1 ? ' Stimme' : ' Stimmen');
    videos.forEach(function (v) { v.pause(); });
  }

  knoepfe.forEach(function (k) {
    k.addEventListener('click', function () {
      filter = k.dataset.filter;
      sichtbar = SCHRITT;
      knoepfe.forEach(function (b) { b.setAttribute('aria-pressed', b === k ? 'true' : 'false'); });
      zeigen();
    });
  });
  if (mehr) mehr.addEventListener('click', function () { sichtbar += SCHRITT; zeigen(); });
  zeigen();
})();
