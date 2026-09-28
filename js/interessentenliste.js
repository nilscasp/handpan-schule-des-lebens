// Interessentenliste (Brevo sibforms): Vorname + E-Mail, Kontakt sobald der nächste Termin feststeht.
// Box: .ia-box mit data-endpoint (serve-URL) und data-name (für das Meta-Lead-Event).
// Sendet mit ?isAjax=1 — nur so liefert Brevo echte Fehler statt Fake-Success.
(function () {
    document.querySelectorAll('.ia-box[data-endpoint]').forEach(function (box) {
        var form = box.querySelector('form');
        var err = box.querySelector('.ia-error');
        var success = box.querySelector('.ia-success');
        var hint = box.querySelector('.ia-hint');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            err.style.display = 'none';
            if (!form.checkValidity()) {
                err.textContent = 'Bitte gib deinen Vornamen und eine gültige E-Mail-Adresse ein.';
                err.style.display = 'block';
                return;
            }
            var btn = form.querySelector('button');
            var label = btn.textContent;
            btn.textContent = '…';
            btn.disabled = true;

            fetch(box.dataset.endpoint + '?isAjax=1', { method: 'POST', body: new FormData(form) })
                .then(function (r) { return r.json().catch(function () { return {}; }); })
                .then(function (data) {
                    if (data && data.success) {
                        form.style.display = 'none';
                        if (hint) hint.style.display = 'none';
                        success.style.display = 'block';
                        if (window.fbq) fbq('track', 'Lead', { content_name: 'Interessentenliste ' + (box.dataset.name || '') });
                        return;
                    }
                    var msgs = data && data.errors ? Object.keys(data.errors).map(function (k) { return data.errors[k]; }) : [];
                    throw new Error(msgs.join(' ') || 'Die Anmeldung hat nicht geklappt.');
                })
                .catch(function (ex) {
                    var msg = ex && ex.message && ex.message !== 'Failed to fetch' ? ex.message : 'Die Anmeldung hat nicht geklappt.';
                    err.textContent = msg + ' Bitte versuch es noch einmal oder schreib mir an kontakt@handpan.schule.';
                    err.style.display = 'block';
                    btn.textContent = label;
                    btn.disabled = false;
                });
        });
    });
})();
