        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('active');
        }

        // FAQ Toggle
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            faqItem.classList.toggle('open');
            // Update aria-expanded
            const isOpen = faqItem.classList.contains('open');
            element.setAttribute('aria-expanded', isOpen);
        }

        // Scroll to section within page
        function scrollToSection(sectionId, e) {
            if (e) e.preventDefault();
            const section = document.getElementById(sectionId);
            if (section) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const sectionTop = section.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }
        }

        // ============================================
        // CALENDAR SIDEBAR
        // ============================================
        const MONTH_NAMES_DE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        const TYPE_LABELS_DE = { workshop: 'Workshop', kurs: 'Kurs', retreat: 'Retreat', mentoring: 'Mentoring' };

        function toggleCalendarSidebar() {
            const sidebar = document.getElementById('calendar-sidebar');
            const backdrop = document.getElementById('calendar-backdrop');
            const isOpen = sidebar.classList.contains('active');

            if (!isOpen) {
                sidebar.classList.add('active');
                backdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
                loadEvents();
            } else {
                sidebar.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('calendar-sidebar');
                if (sidebar.classList.contains('active')) {
                    toggleCalendarSidebar();
                }
            }
        });

        function loadEvents() {
            const container = document.getElementById('calendar-events');
            fetch('/events.json')
                .then(function(r) { return r.json(); })
                .then(function(events) {
                    var now = new Date();
                    now.setHours(0, 0, 0, 0);
                    var upcoming = events.filter(function(ev) {
                        return new Date(ev.date) >= now;
                    }).sort(function(a, b) {
                        return new Date(a.date) - new Date(b.date);
                    });

                    if (upcoming.length === 0) {
                        container.innerHTML = '<div class="calendar-empty">Aktuell keine Termine geplant.<br>Schau bald wieder vorbei!</div>';
                        return;
                    }

                    container.innerHTML = upcoming.map(function(ev) {
                        var d = new Date(ev.date);
                        var day = d.getDate();
                        var month = MONTH_NAMES_DE[d.getMonth()];
                        var typeLabel = TYPE_LABELS_DE[ev.type] || ev.type;
                        return '<a href="' + ev.link + '" class="calendar-event" onclick="toggleCalendarSidebar()">' +
                            '<div class="calendar-date-badge">' +
                                '<span class="calendar-date-day">' + day + '</span>' +
                                '<span class="calendar-date-month">' + month + '</span>' +
                            '</div>' +
                            '<div class="calendar-event-info">' +
                                '<p class="calendar-event-title">' + ev.title + '</p>' +
                                '<div class="calendar-event-meta">' +
                                    (ev.time ? '<span>' + ev.time + ' Uhr</span>' : '') +
                                    '<span class="calendar-event-type" data-type="' + ev.type + '">' + typeLabel + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</a>';
                    }).join('');
                })
                .catch(function() {
                    container.innerHTML = '<div class="calendar-empty">Termine konnten nicht geladen werden.</div>';
                });
        }

        // ============================================
        // SCROLL REVEAL (IntersectionObserver)
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            // Add scroll-reveal class to elements that should animate
            const selectors = '.card, .feature, .feature-card, .quote-block, .highlight-box, .timeline-item, .price-box, .contact-info, .comparison-column, .section-title, .section-intro, .section-divider, .faq-item, .phase, .detail-meta-bar';
            document.querySelectorAll(selectors).forEach(el => {
                el.classList.add('scroll-reveal');
            });

            // Respect prefers-reduced-motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -60px 0px'
            });

            document.querySelectorAll('.scroll-reveal').forEach(el => {
                observer.observe(el);
            });
        });

        // ============================================
        // EMAIL SPAM PROTECTION
        // ============================================
        // E-Mail-Adresse wird erst per JS zusammengesetzt,
        // damit Bots sie nicht aus dem HTML auslesen können.
        document.addEventListener('DOMContentLoaded', function() {
            // --- E-Mail-Schutz ---
            document.querySelectorAll('.protected-email').forEach(function(el) {
                var n = el.getAttribute('data-n');
                var d = el.getAttribute('data-d');
                if (n && d) {
                    var addr = n + '@' + d;
                    el.href = 'mai' + 'lto:' + addr;
                    if (el.textContent.indexOf('geladen') !== -1) {
                        el.textContent = addr;
                    }
                }
            });

            // --- Telefon-Schutz ---
            document.querySelectorAll('.protected-phone').forEach(function(el) {
                var p1 = el.getAttribute('data-p1');
                var p2 = el.getAttribute('data-p2');
                var p3 = el.getAttribute('data-p3');
                var type = el.getAttribute('data-type');
                if (p1 && p2 && p3) {
                    var full = p1 + p2 + p3;
                    var display = '+' + p1.substring(0,2) + ' ' + p1.substring(2) + ' ' + p2 + p3;
                    if (type === 'wa') {
                        el.href = 'https://wa' + '.me/' + full;
                    } else {
                        el.href = 'te' + 'l:+' + full;
                    }
                    if (el.textContent.indexOf('geladen') !== -1) {
                        el.textContent = display;
                    }
                }
            });

            // --- Adress-Schutz (Block) ---
            document.querySelectorAll('.protected-address').forEach(function(el) {
                var parts = [];
                for (var i = 1; i <= 5; i++) {
                    var val = el.getAttribute('data-a' + i);
                    if (val) parts.push(val);
                }
                if (parts.length > 0) {
                    el.innerHTML = parts.join('<br>');
                }
            });

            // --- Adress-Schutz (Inline) ---
            document.querySelectorAll('.protected-address-inline').forEach(function(el) {
                var parts = [];
                for (var i = 1; i <= 5; i++) {
                    var val = el.getAttribute('data-a' + i);
                    if (val) parts.push(val);
                }
                var sep = el.getAttribute('data-sep') || '<br>';
                if (parts.length > 0) {
                    el.innerHTML = parts.join(sep);
                }
            });
        });

        // ============================================
        // WEGFINDER QUIZ
        // ============================================
        let quizAnswers = {};
        let currentStep = 1;
        const totalSteps = 4;

        function startQuiz() {
            document.getElementById('quiz-teaser').style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            if (window.gtag) gtag('event', 'quiz_started');
        }

        function selectOption(element) {
            // Remove selected class from siblings
            const options = element.parentElement.querySelectorAll('.quiz-option');
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            element.classList.add('selected');
            
            // Store answer
            const step = element.closest('.quiz-step').dataset.step;
            const value = element.dataset.value;
            quizAnswers[step] = value;
            
            // Wait a moment, then advance
            setTimeout(() => {
                if (currentStep < totalSteps) {
                    nextStep();
                } else {
                    showResult();
                }
            }, 300);
        }

        function nextStep() {
            // Hide current step
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
            
            // Update progress
            document.querySelector(`.quiz-progress-dot[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.quiz-progress-dot[data-step="${currentStep}"]`).classList.add('completed');
            
            // Move to next step
            currentStep++;
            
            // Show next step
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
            document.querySelector(`.quiz-progress-dot[data-step="${currentStep}"]`).classList.add('active');
        }

        function showResult() {
            // Hide current step
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.quiz-progress-dot[data-step="${currentStep}"]`).classList.add('completed');

            // Calculate recommendation
            const result = calculateRecommendation();

            // Show result
            const resultContainer = document.getElementById('quiz-result');
            resultContainer.innerHTML = result.html;
            document.querySelector('.quiz-step[data-step="result"]').classList.add('active');

            // Save result to localStorage
            try {
                localStorage.setItem('quiz-result', JSON.stringify({
                    answers: quizAnswers,
                    primary: result.primary,
                    secondary: result.secondary,
                    tertiary: result.tertiary,
                    date: new Date().toISOString()
                }));
            } catch(e) {}

            // GA4 Event: Quiz abgeschlossen mit allen Antworten + Empfehlungen
            if (window.gtag) {
                gtag('event', 'quiz_completed', {
                    quiz_level: quizAnswers['1'],
                    quiz_challenge: quizAnswers['2'],
                    quiz_style: quizAnswers['3'],
                    quiz_goal: quizAnswers['4'],
                    quiz_primary: result.primary,
                    quiz_secondary: result.secondary,
                    quiz_tertiary: result.tertiary
                });
            }
        }

        function calculateRecommendation() {
            const level = quizAnswers['1']; // novice, beginner, competent, proficient
            const challenge = quizAnswers['2']; // basics, expression, depth, blockade
            const style = quizAnswers['3']; // self, group, individual, immersion
            const goal = quizAnswers['4']; // foundation, own-voice, presence, community
            
            let primary = null;
            let secondary = null;
            let levelName = '';
            
            // Determine level name
            const levelNames = {
                'novice': 'Neuling',
                'beginner': 'Anfänger',
                'competent': 'Kompetent',
                'proficient': 'Gewandt'
            };
            levelName = levelNames[level] || 'Spieler';
            
            // Logic for primary recommendation
            if (level === 'novice' || level === 'beginner' || challenge === 'basics' || goal === 'foundation') {
                primary = 'rhythmus';
            } else if (style === 'individual' || challenge === 'blockade') {
                primary = 'mentoring';
            } else if (style === 'immersion' || (level === 'proficient' && goal === 'presence')) {
                primary = 'retreat';
            } else if ((level === 'competent' || level === 'proficient') && (goal === 'own-voice' || goal === 'presence' || challenge === 'expression' || challenge === 'depth')) {
                primary = 'path';
            } else if (goal === 'community' || style === 'self') {
                primary = 'community';
            } else {
                primary = 'path';
            }
            
            // Logic for secondary recommendation
            if (primary !== 'community' && (goal === 'community' || style === 'self')) {
                secondary = 'community';
            } else if (primary !== 'mentoring' && challenge === 'blockade') {
                secondary = 'mentoring';
            } else if (primary === 'rhythmus' && (goal === 'own-voice' || goal === 'presence')) {
                secondary = 'path';
            } else if (primary === 'path' && style === 'immersion') {
                secondary = 'retreat';
            } else if (!secondary) {
                secondary = 'community';
            }

            // Logic for tertiary recommendation
            let tertiary = null;
            const allPrograms = ['rhythmus', 'path', 'mentoring', 'retreat', 'community'];
            
            // Find a third option that's different from primary and secondary
            if (primary !== 'community' && secondary !== 'community') {
                tertiary = 'community'; // Community is always a good third option
            } else if (primary !== 'mentoring' && secondary !== 'mentoring') {
                tertiary = 'mentoring'; // 1:1 is always relevant
            } else if (primary !== 'retreat' && secondary !== 'retreat' && (level === 'competent' || level === 'proficient')) {
                tertiary = 'retreat';
            } else if (primary !== 'path' && secondary !== 'path' && level !== 'novice') {
                tertiary = 'path';
            } else {
                tertiary = 'rhythmus';
            }
            
            // Make sure tertiary is different from primary and secondary
            if (tertiary === primary || tertiary === secondary) {
                for (const prog of allPrograms) {
                    if (prog !== primary && prog !== secondary) {
                        tertiary = prog;
                        break;
                    }
                }
            }
            
            // Program details
            const programs = {
                'rhythmus': {
                    name: 'Rhythmus Fundament',
                    tag: '6 Wochen • 179 €',
                    desc: 'Der ideale Einstieg, um ein solides rhythmisches Fundament aufzubauen. Puls, Subdivisions, Handsatz – die Grundlagen, die alles andere ermöglichen.',
                    icon: '🎯',
                    href: '#rhythmus-fundament'
                },
                'path': {
                    name: 'The Handpan Path',
                    tag: '6 Monate • Hybrid',
                    desc: 'Die transformative Reise für alle, die ihren eigenen Stil entwickeln und tiefer in die Musik eintauchen wollen. 36 intensive Sessions.',
                    icon: '🌟',
                    href: '#handpan-path'
                },
                'mentoring': {
                    name: 'Mentoring',
                    tag: '1:1 • 149 €',
                    desc: 'Individuelle Begleitung für deine spezifischen Fragen und Blockaden. Persönlich und auf deine Situation zugeschnitten.',
                    icon: '🤝',
                    href: '#mentoring'
                },
                'retreat': {
                    name: 'Retreat',
                    tag: '3-4 Tage • Live',
                    desc: 'Intensives Eintauchen in natürlicher Umgebung. Tiefe Praxis, Durchbrüche und gemeinschaftliches Musizieren.',
                    icon: '🏔️',
                    href: '#retreats'
                },
                'community': {
                    name: 'Community',
                    tag: 'Kostenfrei',
                    desc: 'Verbinde dich mit Gleichgesinnten, tausche dich aus und wachse im Dialog. Der perfekte Einstieg ohne Risiko.',
                    icon: '👥',
                    href: '#community'
                }
            };
            
            const p = programs[primary];
            const s = programs[secondary];
            const t = programs[tertiary];
            
            let html = `
                <div class="quiz-result-icon">${p.icon}</div>
                <h3>${p.name}</h3>
                <p class="quiz-result-subtitle">Unsere Empfehlung für dich als ${levelName}</p>
                
                <div class="quiz-result-cards">
                    <a class="quiz-result-card primary" href="${p.href}" onclick="trackQuizClick('${primary}', 'primary')">
                        <span class="tag">✨ Beste Empfehlung • ${p.tag}</span>
                        <h4>${p.name}</h4>
                        <p>${p.desc}</p>
                    </a>
                    <a class="quiz-result-card secondary" href="${s.href}" onclick="trackQuizClick('${secondary}', 'secondary')">
                        <span class="tag">Auch passend • ${s.tag}</span>
                        <h4>${s.name}</h4>
                        <p>${s.desc}</p>
                    </a>
                    <a class="quiz-result-card tertiary" href="${t.href}" onclick="trackQuizClick('${tertiary}', 'tertiary')">
                        <span class="tag">Könnte dich auch interessieren • ${t.tag}</span>
                        <h4>${t.name}</h4>
                        <p>${t.desc}</p>
                    </a>
                </div>

                <button class="quiz-restart" onclick="restartQuiz()" style="margin-top: var(--spacing-lg);">Quiz wiederholen</button>
            `;
            
            return { html, primary, secondary, tertiary };
        }

        function trackQuizClick(program, rank) {
            if (window.gtag) {
                gtag('event', 'quiz_recommendation_click', {
                    quiz_program: program,
                    quiz_rank: rank
                });
            }
        }

        function restartQuiz() {
            quizAnswers = {};
            currentStep = 1;
            localStorage.removeItem('quiz-result');

            // Show teaser, hide quiz container
            document.getElementById('quiz-teaser').style.display = '';
            document.getElementById('quiz-container').style.display = 'none';

            // Reset all steps
            document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
            document.querySelector('.quiz-step[data-step="1"]').classList.add('active');

            // Reset progress dots
            document.querySelectorAll('.quiz-progress-dot').forEach(dot => {
                dot.classList.remove('active', 'completed');
            });
            document.querySelector('.quiz-progress-dot[data-step="1"]').classList.add('active');

            // Reset selected options
            document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        }

        // ============================================
        // PRICE CALCULATOR
        // ============================================

        function initPriceCalc() {
            const calc = document.getElementById('price-calc');
            if (!calc) return;

            // Preistabelle: [1er, ab3, ab5, ab10, ab15] für 60 Min
            const priceTable = {
                '1:1': [60, 55, 50, 45, 40],
                '1:2': [50, 45, 40, 35, 30],
                '1:3': [40, 35, 30, 25, 20]
            };

            // Dropdowns
            const selDuration = document.getElementById('pc-duration');
            const selFormat   = document.getElementById('pc-format');
            const selLocation = document.getElementById('pc-location');
            const selLevel    = document.getElementById('pc-level');
            const slider      = document.getElementById('pc-sessions');

            // 30min-Option merken
            const opt30 = selDuration.querySelector('option[value="30"]');

            function getState() {
                return {
                    duration: parseInt(selDuration.value),
                    format:   selFormat.value,
                    location: selLocation.value,
                    level:    selLevel.value,
                    sessions: parseInt(slider.value)
                };
            }

            // Format-Wechsel: 30 Min ein-/ausblenden
            selFormat.addEventListener('change', function() {
                if (this.value !== '1:1') {
                    opt30.disabled = true;
                    if (selDuration.value === '30') {
                        selDuration.value = '60';
                    }
                } else {
                    opt30.disabled = false;
                }
                updatePriceCalc();
            });

            // Alle Dropdowns
            selDuration.addEventListener('change', updatePriceCalc);
            selLocation.addEventListener('change', updatePriceCalc);
            selLevel.addEventListener('change', updatePriceCalc);
            slider.addEventListener('input', updatePriceCalc);

            function getStaffelIndex(n) {
                if (n >= 15) return 4;
                if (n >= 10) return 3;
                if (n >= 5) return 2;
                if (n >= 3) return 1;
                return 0;
            }

            function getStaffelLabel(n) {
                if (n >= 15) return 'ab 15 Sessions';
                if (n >= 10) return 'ab 10 Sessions';
                if (n >= 5) return 'ab 5 Sessions';
                if (n >= 3) return 'ab 3 Sessions';
                return '';
            }

            function updatePriceCalc() {
                const s = getState();
                let perSession, total;

                if (s.duration === 30) {
                    perSession = 30;
                    total = perSession * s.sessions;
                } else {
                    const idx = getStaffelIndex(s.sessions);
                    const base60 = priceTable[s.format][idx];
                    perSession = s.duration === 90 ? Math.round(base60 * 1.5) : base60;
                    total = perSession * s.sessions;
                }

                // Ersparnis
                let savings = 0;
                if (s.duration !== 30 && s.sessions > 1) {
                    const singlePrice = s.duration === 90
                        ? Math.round(priceTable[s.format][0] * 1.5)
                        : priceTable[s.format][0];
                    savings = (singlePrice - perSession) * s.sessions;
                }

                // Session-Label
                document.getElementById('pc-sessions-label').textContent =
                    s.sessions === 1 ? '1 Session' : s.sessions + ' Sessions';

                // Staffel-Hinweis
                const staffelLabel = getStaffelLabel(s.sessions);
                document.getElementById('pc-tier-hint').textContent =
                    staffelLabel ? staffelLabel + ': ' + perSession + ' € pro Session' : '';

                // Personenzahl aus Format ableiten
                const personCount = s.format === '1:1' ? 1 : s.format === '1:2' ? 2 : 3;

                // Ergebnis
                const perSessionEl = document.getElementById('pc-per-session');
                if (personCount > 1) {
                    perSessionEl.textContent = perSession + ' € pro Person / Session · ' + (perSession * personCount) + ' € pro Session gesamt';
                } else {
                    perSessionEl.textContent = 'Preis pro Session: ' + perSession + ' €';
                }

                // Gesamtpreis
                const totalEl = document.getElementById('pc-total');
                if (personCount > 1) {
                    totalEl.textContent = total + ' € pro Person';
                } else {
                    totalEl.textContent = total + ' €';
                }

                // Zusammenfassung
                const ortLabel = s.location === 'muenchen' ? 'München-Neuhausen' : 'Online';
                document.getElementById('pc-summary').textContent =
                    s.sessions + '× ' + s.duration + ' Min · ' + s.format + ' · ' + ortLabel + ' · ' + s.level;

                // Hinweis-Text anpassen
                const noteEl = document.getElementById('pc-note');
                if (personCount > 1) {
                    noteEl.textContent = 'Alle Preise pro Person (' + personCount + ' Personen) · Gesamtpreis für alle: ' + (total * personCount) + ' € · Keine Vertragsbindung';
                } else {
                    noteEl.textContent = 'Alle Preise pro Person · Keine Vertragsbindung';
                }

                // Ersparnis
                const savingsEl = document.getElementById('pc-savings');
                if (savings > 0) {
                    savingsEl.textContent = 'Du sparst ' + savings + ' € gegenüber Einzelbuchung';
                    savingsEl.classList.remove('hidden');
                } else {
                    savingsEl.classList.add('hidden');
                }

                // Anfrage-Text
                const anfrage = 'Hallo, ich interessiere mich für ' + s.sessions + ' Session' + (s.sessions > 1 ? 's' : '') +
                    ' à ' + s.duration + ' Min im ' + s.format + '-Format' +
                    (s.location === 'muenchen' ? ' vor Ort in München-Neuhausen' : ' online') +
                    '. Level: ' + s.level +
                    '. Gesamtpreis laut Website: ' + total + ' €.' +
                    ' Ich freue mich auf eine Rückmeldung!';

                document.getElementById('pc-wa').href = 'https://wa.me/4915122964922?text=' + encodeURIComponent(anfrage);
                document.getElementById('pc-email').href = 'mailto:kontakt@handpan.schule?subject=' +
                    encodeURIComponent('Anfrage Einzelunterricht – ' + s.sessions + '× ' + s.duration + ' Min ' + s.format) +
                    '&body=' + encodeURIComponent(anfrage);
            }

            // Initial
            updatePriceCalc();

            // "Online buchen" scrollt zum Kalender-Bereich
            document.getElementById('pc-book').addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.getElementById('einzelunterricht-buchen');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // ============================================
        // COOKIE CONSENT
        // ============================================

        // ═══ GOOGLE ANALYTICS ═══════════════════════════
        // So richtest du GA4 ein:
        // 1. Gehe zu https://analytics.google.com/ und erstelle ein Konto
        // 2. Erstelle eine neue Property für "handpan.schule"
        // 3. Unter Datenstreams → Web → neuen Stream anlegen
        // 4. Kopiere die Mess-ID (Format: G-XXXXXXXXXX)
        // 5. Ersetze den Platzhalter unten durch deine echte ID
        // ══════════════════════════════════════════════════
        const GA_MEASUREMENT_ID = 'G-4W4KKCH7TR';

        function cookieConsent(choice) {
            // Save choice in localStorage
            localStorage.setItem('cookie-consent', choice);
            localStorage.setItem('cookie-consent-date', new Date().toISOString());

            // Hide banner
            document.getElementById('cookie-banner').classList.remove('visible');

            // Load analytics if accepted
            if (choice === 'accept') {
                loadGoogleAnalytics();
            }
        }

        function loadGoogleAnalytics() {
            // Don't load if already loaded
            if (window.gaLoaded) return;
            window.gaLoaded = true;

            // Load gtag.js script
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
            document.head.appendChild(script);

            // Initialize gtag
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                anonymize_ip: true
            });
        }

        // On page load: check for existing consent
        document.addEventListener('DOMContentLoaded', function() {
            const consent = localStorage.getItem('cookie-consent');

            if (!consent) {
                // No choice yet → show banner after short delay
                setTimeout(function() {
                    document.getElementById('cookie-banner').classList.add('visible');
                }, 800);
            } else if (consent === 'accept') {
                // Already accepted → load analytics
                loadGoogleAnalytics();
            }
            // If 'decline' → do nothing, no analytics
        });
