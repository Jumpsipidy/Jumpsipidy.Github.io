/* ═══════════════════════════════════════════════════════════════
   CONFIGURABLE DATA — Add new archived versions here
   ═══════════════════════════════════════════════════════════════

   To add a new archived version:
   1. Copy one of the objects below and paste it at the TOP of the array
      (newest versions should appear first).
   2. Fill in version, date, size, type, summaries, changelog, and links.
   3. Replace chromeLink / firefoxLink with your actual download URLs.

   Example:
   {
     id: "v4",
     version: "v4.0",
     date: "2026-06-01",
     size: "5.2 MB",
     type: "stable",
     badgeEN: "Stable Release",
     badgeLT: "Stabili Versija",
     summaryEN: "Description here.",
     summaryLT: "Aprašymas čia.",
     keywords: "stable release",
     changelogEN: ["Change 1", "Change 2"],
     changelogLT: ["Pakeitimas 1", "Pakeitimas 2"],
     chromeLink: "YOUR_DOWNLOAD_LINK_HERE",
     firefoxLink: "YOUR_DOWNLOAD_LINK_HERE"
   }

   ═══════════════════════════════════════════════════════════════ */

const archivedVersions = [
  {
    id: "v3",
    version: "v3.0",
    date: "2026-03-15",
    size: "4.8 MB",
    type: "alpha",
    badgeEN: "Alpha Release",
    badgeLT: "Alfa Versija",
    summaryEN: "Alpha build with automatic click answer for eduka.lt. Experimental features — not recommended for daily use.",
    summaryLT: "Alfa versija su automatiniu paspaudimo atsakymu eduka.lt. Eksperimentinės funkcijos — nerekomenduojama kasdieniam naudojimui.",
    keywords: "alpha eduka automatic click",
    changelogEN: [
      "Added alpha automatic click answer",
      "Optimized for eduka.lt specifically",
      "Does not support drag-and-click photo questions"
    ],
    changelogLT: [
      "Pridėtas automatinis paspaudimo atsakymas (Alpha)",
      "Optimizuota eduka.lt svetainei",
      "Neveikia vilkimo ir paspaudimo klausimams su nuotraukomis"
    ],
    // REPLACE WITH DOWNLOAD LINK
    chromeLink: "YOUR_DOWNLOAD_LINK_HERE",
    // REPLACE WITH DOWNLOAD LINK
    firefoxLink: "YOUR_DOWNLOAD_LINK_HERE"
  },
  {
    id: "v2",
    version: "v2.0",
    date: "2026-01-22",
    size: "4.5 MB",
    type: "beta",
    badgeEN: "Latest Beta",
    badgeLT: "Naujausia Beta",
    summaryEN: "Beta sidebar edition with persistent panel layout. Improved token reading performance on dense pages.",
    summaryLT: "Beta šoninės juostos versija su nuolatine panelės struktūra. Patobulintas turinio nuskaitymas tankiuose puslapiuose.",
    keywords: "beta sidebar persistent panel",
    changelogEN: [
      "Added persistent sidebar layout — panel stays open when clicking outside",
      "Optimized contextual token reading on high-density web surfaces",
      "Improved Chrome and Firefox compatibility"
    ],
    changelogLT: [
      "Pridėta nuolatinė šoninė juosta — panelė neužsidaro paspaudus už jos ribų",
      "Optimizuotas puslapio turinio nuskaitymas tankiuose puslapiuose",
      "Patobulintas suderinamumas su Chrome ir Firefox"
    ],
    // REPLACE WITH DOWNLOAD LINK
    chromeLink: "YOUR_DOWNLOAD_LINK_HERE",
    // REPLACE WITH DOWNLOAD LINK
    firefoxLink: "YOUR_DOWNLOAD_LINK_HERE"
  },
  {
    id: "v1",
    version: "v1.0",
    date: "2025-11-08",
    size: "3.9 MB",
    type: "stable",
    badgeEN: "Stable Release",
    badgeLT: "Stabili Versija",
    summaryEN: "First fully stable build with contextual AI answering. Session privacy with clean state between uses.",
    summaryLT: "Pirmoji visiškai stabili versija su DI atsakymais iš puslapio turinio. Sesijų privatumas — švari būsena tarp naudojimų.",
    keywords: "stable first release privacy",
    changelogEN: [
      "Fully functional stable architecture with contextual AI answering",
      "Robust session isolation — no data stored between sessions",
      "Works on any webpage Chrome can open"
    ],
    changelogLT: [
      "Pilnai veikianti stabili architektūra su DI atsakymais iš puslapio turinio",
      "Sesijų izoliacija — duomenys nesaugomi tarp sesijų",
      "Veikia bet kuriame puslapyje, kurį gali atidaryti Chrome"
    ],
    // REPLACE WITH DOWNLOAD LINK
    chromeLink: "YOUR_DOWNLOAD_LINK_HERE",
    // REPLACE WITH DOWNLOAD LINK
    firefoxLink: "YOUR_DOWNLOAD_LINK_HERE"
  }

  /* ── ADD MORE ARCHIVED VERSIONS BELOW THIS LINE ── */
  // Copy the object template above and paste new entries here.
];

/* ═══════════════════════ STATE ═══════════════════════ */
let lang = 'lt';
let activeFilter = 'all';
let searchQuery = '';

/* ═══════════════════════ LANGUAGE ═══════════════════════ */
function setLang(l) {
  lang = l;
  const pill = document.getElementById('langPill');
  pill.classList.toggle('lt', l === 'lt');
  document.body.classList.toggle('lt', l === 'lt');
  document.querySelectorAll('.lang-pill button').forEach((btn, i) => {
    btn.classList.toggle('active', (i === 0 && l === 'en') || (i === 1 && l === 'lt'));
  });

  const searchInput = document.getElementById('archiveSearch');
  if (searchInput) {
    searchInput.placeholder = l === 'lt'
      ? searchInput.dataset.placeholderLt
      : searchInput.dataset.placeholderEn;
  }

  document.getElementById('pageTitle').textContent = l === 'lt'
    ? 'Archyvuoti Atsisiuntimai — ElijasGPT'
    : 'Archived Downloads — ElijasGPT';

  buildRibbon();
  renderArchiveCards();
  updateResultsMeta();
}

/* ═══════════════════════ RIBBON ═══════════════════════ */
const ribbonItems = {
  en: [
    'Previous builds preserved',
    'Chrome & Firefox packages',
    'Rollback anytime',
    'Full changelog per version',
    'Free archived downloads',
    'No login required'
  ],
  lt: [
    'Ankstesnės versijos išsaugotos',
    'Chrome ir Firefox paketai',
    'Grįžimas bet kada',
    'Pilnas pakeitimų sąrašas',
    'Nemokami archyvuoti atsisiuntimai',
    'Prisijungimas nereikalingas'
  ]
};

function buildRibbon() {
  const track = document.getElementById('ribbonTrack');
  if (!track) return;
  const items = ribbonItems[lang];
  let html = '';
  for (let r = 0; r < 2; r++) {
    items.forEach(t => {
      html += `<span class="ribbon-item"><span class="ribbon-dot"></span>${t}</span>`;
    });
  }
  track.innerHTML = html;
}

/* ═══════════════════════ FILTER & SEARCH ═══════════════════════ */
function getFilteredVersions() {
  return archivedVersions.filter(v => {
    const matchesFilter = activeFilter === 'all' || v.type === activeFilter;
    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const haystack = [
      v.version,
      v.date,
      v.type,
      v.keywords,
      v.summaryEN,
      v.summaryLT,
      ...(v.changelogEN || []),
      ...(v.changelogLT || [])
    ].join(' ').toLowerCase();

    return haystack.includes(q);
  });
}

function updateResultsMeta() {
  const meta = document.getElementById('resultsMeta');
  const filtered = getFilteredVersions();
  const total = archivedVersions.length;

  if (lang === 'lt') {
    meta.textContent = searchQuery || activeFilter !== 'all'
      ? `Rodoma ${filtered.length} iš ${total} versijų`
      : `${total} archyvuotos versijos`;
  } else {
    meta.textContent = searchQuery || activeFilter !== 'all'
      ? `Showing ${filtered.length} of ${total} versions`
      : `${total} archived versions`;
  }

  document.getElementById('totalVersions').textContent = total;
}

/* ═══════════════════════ RENDER CARDS ═══════════════════════ */
function renderArchiveCards() {
  const grid = document.getElementById('archiveGrid');
  const empty = document.getElementById('emptyState');
  const filtered = getFilteredVersions();

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  let html = '';
  filtered.forEach((v, i) => {
    const badge = lang === 'lt' ? v.badgeLT : v.badgeEN;
    const summary = lang === 'lt' ? v.summaryLT : v.summaryEN;
    const badgeClass = `badge-${v.type}`;
    const delay = Math.min(i * 0.06, 0.36);

    html += `
      <article
        class="archive-card"
        data-version="${v.version}"
        data-type="${v.type}"
        data-id="${v.id}"
        style="animation-delay:${delay}s"
      >
        <div class="card-top">
          <div class="card-version">
            <span class="version-num">${v.version}</span>
            <span class="version-badge ${badgeClass}">${badge}</span>
          </div>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>${formatDate(v.date)}</span>
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>${v.size}</span>
            </span>
          </div>
        </div>
        <p class="card-summary">${summary}</p>
        <div class="card-actions">
          <button class="btn-changelog" data-id="${v.id}" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span data-en>Changelog</span>
            <span data-lt>Pakeitimai</span>
          </button>
          <div class="dl-group">
            <!-- REPLACE WITH DOWNLOAD LINK -->
            <a href="${v.chromeLink}" class="btn-dl btn-dl-chrome" ${v.chromeLink !== 'YOUR_DOWNLOAD_LINK_HERE' ? 'download' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 8h8M12 16H4M4.6 9.4l6.4 3.7"/></svg>
              Chrome
            </a>
            <!-- REPLACE WITH DOWNLOAD LINK -->
            <a href="${v.firefoxLink}" class="btn-dl btn-dl-firefox" ${v.firefoxLink !== 'YOUR_DOWNLOAD_LINK_HERE' ? 'download' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Firefox
            </a>
          </div>
        </div>
      </article>
    `;
  });

  grid.innerHTML = html;

  grid.querySelectorAll('.btn-changelog').forEach(btn => {
    btn.addEventListener('click', () => openChangelogModal(btn.dataset.id));
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (lang === 'lt') {
    return d.toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ═══════════════════════ CHANGELOG MODAL ═══════════════════════ */
function openChangelogModal(id) {
  const v = archivedVersions.find(x => x.id === id);
  if (!v) return;

  const badge = lang === 'lt' ? v.badgeLT : v.badgeEN;
  const notes = lang === 'lt' ? v.changelogLT : v.changelogEN;

  document.getElementById('changelogTitle').textContent = `ElijasGPT ${v.version}`;
  document.getElementById('changelogDate').textContent = `${badge} · ${formatDate(v.date)} · ${v.size}`;

  const list = document.getElementById('changelogList');
  list.innerHTML = notes.map(n => `<li>${n}</li>`).join('');

  document.getElementById('changelogDlRow').innerHTML = `
    <!-- REPLACE WITH DOWNLOAD LINK -->
    <a href="${v.chromeLink}" class="btn-dl btn-dl-chrome" ${v.chromeLink !== 'YOUR_DOWNLOAD_LINK_HERE' ? 'download' : ''}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 8h8M12 16H4M4.6 9.4l6.4 3.7"/></svg>
      Chrome
    </a>
    <!-- REPLACE WITH DOWNLOAD LINK -->
    <a href="${v.firefoxLink}" class="btn-dl btn-dl-firefox" ${v.firefoxLink !== 'YOUR_DOWNLOAD_LINK_HERE' ? 'download' : ''}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      Firefox
    </a>
  `;

  document.getElementById('changelogModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeChangelogModal() {
  document.getElementById('changelogModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══════════════════════ SCROLL REVEAL ═══════════════════════ */
function initScrollReveal() {
  const rObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        rObs.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -15px 0px' });

  document.querySelectorAll('.r').forEach(el => rObs.observe(el));

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.r:not(.in)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
        rObs.unobserve(el);
      }
    });
  }, { passive: true });
}

/* ═══════════════════════ EVENT LISTENERS ═══════════════════════ */
function initSearch() {
  const input = document.getElementById('archiveSearch');
  const clearBtn = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    searchQuery = input.value;
    clearBtn.hidden = !searchQuery;
    renderArchiveCards();
    updateResultsMeta();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    clearBtn.hidden = true;
    input.focus();
    renderArchiveCards();
    updateResultsMeta();
  });
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === activeFilter);
      });
      renderArchiveCards();
      updateResultsMeta();
    });
  });
}

function initReset() {
  document.getElementById('resetFilters').addEventListener('click', () => {
    searchQuery = '';
    activeFilter = 'all';
    document.getElementById('archiveSearch').value = '';
    document.getElementById('searchClear').hidden = true;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === 'all');
    });
    renderArchiveCards();
    updateResultsMeta();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeChangelogModal();
});

/* ═══════════════════════ INIT ═══════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  setLang('lt');
  initSearch();
  initFilters();
  initReset();
  initScrollReveal();
});
