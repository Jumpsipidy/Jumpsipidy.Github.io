const archivedVersions = [
  {
    id: "v4-broken",
    version: "v4.0 (Broken/Deprecated)",
    date: "2026-08-15",
    size: "5.2 MB",
    type: "beta",
    badgeEN: "Deprecated (V4.0)",
    badgeLT: "Pasenusi Versija (V4.0)",
    summaryEN: "Original V4 release. Deprecated due to overlap scrolling bugs.",
    summaryLT: "Pradinė V4 versija. Nerekomenduojama dėl persidengimo slinkties klaidų.",
    changelogEN: ["Original V4 build with UI and parsing updates", "Warning: Contains overlap scrolling issues"],
    changelogLT: ["Pradinė V4 versija su nauja sąsaja", "Įspėjimas: Turi persidengimo klaidų"],
    chromeLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-Chrome-v4.0.zip",
    firefoxLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-Firefox-v4.0.zip"
  },
  {
    id: "v3",
    version: "v3.0",
    date: "2026-03-15",
    size: "4.8 MB",
    type: "alpha",
    badgeEN: "Alpha Release",
    badgeLT: "Alfa Versija",
    summaryEN: "Alpha build with automatic click answer for eduka.lt.",
    summaryLT: "Alfa versija su automatiniu paspaudimo atsakymu eduka.lt.",
    changelogEN: ["Added alpha automatic click answer", "Optimized for eduka.lt"],
    changelogLT: ["Pridėtas automatinis paspaudimo atsakymas", "Optimizuota eduka.lt"],
    chromeLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper- chromme v3 test.rar",
    firefoxLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper- firefox v3 test.rar"
  },
  {
    id: "v2",
    version: "v2.0",
    date: "2026-01-22",
    size: "4.5 MB",
    type: "beta",
    badgeEN: "Beta Release",
    badgeLT: "Beta Versija",
    summaryEN: "Beta sidebar edition with persistent panel layout.",
    summaryLT: "Beta šoninės juostos versija su nuolatine panelės struktūra.",
    changelogEN: ["Added persistent sidebar layout"],
    changelogLT: ["Pridėta nuolatinė šoninė juosta"],
    chromeLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper- chromme v2.rar",
    firefoxLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper- firefox -v2.rar"
  },
  {
    id: "v1",
    version: "v1.0",
    date: "2025-11-08",
    size: "3.9 MB",
    type: "stable",
    badgeEN: "Stable Release",
    badgeLT: "Stabili Versija",
    summaryEN: "First stable build with contextual AI answering.",
    summaryLT: "Pirmoji stabili versija su AI atsakymais.",
    changelogEN: ["First fully functional release"],
    changelogLT: ["Pirmoji pilnai veikianti versija"],
    chromeLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper.rar",
    firefoxLink: "https://jumpsipidy.github.io/Jumpsipidy.Github.io/archived/ElijasGPT-helper- firefox.rar"
  }
];

const ribbonItems = {
  en: ['Actionable Format','Automatic Detection','Lossless AI Vision','Mistral + Groq + Gemini','Works on any website','Free Chrome extension','Session privacy by design','Ask in plain language'],
  lt: ['KĄ, KUR, KAIP Formatas','Automatinis Atpažinimas','Ryškus Ekrano AI','Mistral + Groq + Gemini','Veikia bet kuriame puslapyje','Nemokamas Chrome plėtinys','Sesijų privatumas','Klausk paprastai']
};

let lang = 'lt';
let activeFilter = 'all';
let searchQuery = '';

function setLang(l) {
  lang = l;
  
  // Toggle lang pill classes
  const pill = document.getElementById('langPill');
  if (pill) {
    pill.className = `lang-pill ${l}`;
    pill.querySelectorAll('button').forEach(btn => {
      const isMatch = btn.getAttribute('data-lang') === l;
      btn.classList.toggle('active', isMatch);
    });
  }
  
  document.body.classList.toggle('lt', l === 'lt');
  
  // Update data attribute visibility
  document.querySelectorAll('[data-en]').forEach(el => el.style.display = l === 'en' ? 'revert' : 'none');
  document.querySelectorAll('[data-lt]').forEach(el => el.style.display = l === 'lt' ? 'revert' : 'none');
  
  // Update search placeholder
  const searchInput = document.getElementById('archiveSearch');
  if (searchInput) {
    const phAttr = l === 'lt' ? 'data-placeholder-lt' : 'data-placeholder-en';
    searchInput.placeholder = searchInput.getAttribute(phAttr) || '';
  }
  
  // Rebuild components
  buildRibbon();
  renderCards();
}

function buildRibbon() {
  const track = document.getElementById('ribbonTrack');
  if (!track) return;
  const items = ribbonItems[lang] || ribbonItems.en;
  let html = '';
  for (let r = 0; r < 2; r++) {
    items.forEach(t => {
      html += `<span class="ribbon-item"><span class="ribbon-dot"></span>${t}</span>`;
    });
  }
  track.innerHTML = html;
}

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCards();
}

function onSearchInput() {
  const searchInput = document.getElementById('archiveSearch');
  if (!searchInput) return;
  searchQuery = searchInput.value.toLowerCase().trim();
  
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.hidden = searchQuery.length === 0;
  }
  
  renderCards();
}

function renderCards() {
  const grid = document.getElementById('archiveGrid');
  if (!grid) return;

  const filtered = archivedVersions.filter(v => {
    const matchesFilter = activeFilter === 'all' || v.type === activeFilter;
    if (!matchesFilter) return false;
    if (!searchQuery) return true;
    return v.version.toLowerCase().includes(searchQuery) || 
           v.summaryEN.toLowerCase().includes(searchQuery) || 
           v.summaryLT.toLowerCase().includes(searchQuery);
  });

  const totalVersionsEl = document.getElementById('totalVersions');
  if (totalVersionsEl) {
    totalVersionsEl.textContent = archivedVersions.length.toString();
  }

  const resultsMetaEl = document.getElementById('resultsMeta');
  if (resultsMetaEl) {
    if (searchQuery || activeFilter !== 'all') {
      resultsMetaEl.style.display = 'block';
      if (lang === 'lt') {
        resultsMetaEl.textContent = `Rasta versijų: ${filtered.length}`;
      } else {
        resultsMetaEl.textContent = `Found ${filtered.length} versions`;
      }
    } else {
      resultsMetaEl.style.display = 'none';
    }
  }

  const emptyStateEl = document.getElementById('emptyState');
  if (emptyStateEl) {
    emptyStateEl.hidden = filtered.length > 0;
  }

  let html = '';
  filtered.forEach(v => {
    const badge = lang === 'lt' ? v.badgeLT : v.badgeEN;
    const summary = lang === 'lt' ? v.summaryLT : v.summaryEN;

    html += `
      <div class="archive-card">
        <div class="card-top">
          <div class="card-version">
            <span class="version-num">${v.version}</span>
            <span class="version-badge badge-${v.type}">${badge}</span>
          </div>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${v.date}
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              ${v.size}
            </span>
          </div>
        </div>
        <p class="card-summary">${summary}</p>
        <div class="card-actions">
          <button class="btn-changelog" onclick="openChangelog('${v.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>${lang === 'lt' ? 'Pakeitimai' : 'Changelog'}</span>
          </button>
          <div class="dl-group">
            <a href="${v.chromeLink}" download class="btn-dl btn-dl-chrome">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Chrome
            </a>
            <a href="${v.firefoxLink}" download class="btn-dl btn-dl-firefox">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Firefox
            </a>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
  
  // Trigger reveal animation effect
  const cardElements = grid.querySelectorAll('.archive-card');
  cardElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.05}s`;
  });
}

function openChangelog(id) {
  const v = archivedVersions.find(x => x.id === id);
  if (!v) return;

  const titleEl = document.getElementById('changelogTitle');
  if (titleEl) titleEl.textContent = `ElijasGPT ${v.version}`;
  
  const dateEl = document.getElementById('changelogDate');
  if (dateEl) {
    if (lang === 'lt') {
      dateEl.textContent = `Išleista: ${v.date}`;
    } else {
      dateEl.textContent = `Released: ${v.date}`;
    }
  }
  
  const metaEl = document.getElementById('changelogMeta');
  if (metaEl) {
    if (lang === 'lt') {
      metaEl.textContent = `Failo dydis: ${v.size} · Tipas: ${v.type.toUpperCase()}`;
    } else {
      metaEl.textContent = `File size: ${v.size} · Build type: ${v.type.toUpperCase()}`;
    }
  }

  const notes = lang === 'lt' ? v.changelogLT : v.changelogEN;
  const listEl = document.getElementById('changelogList');
  if (listEl) {
    listEl.innerHTML = notes.map(n => `<li>${n}</li>`).join('');
  }

  const dlRow = document.getElementById('changelogDlRow');
  if (dlRow) {
    dlRow.innerHTML = `
      <a href="${v.chromeLink}" download class="btn-dl btn-dl-chrome" style="justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Chrome
      </a>
      <a href="${v.firefoxLink}" download class="btn-dl btn-dl-firefox" style="justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Firefox
      </a>
    `;
  }

  const modal = document.getElementById('changelogModal');
  if (modal) modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('changelogModal');
  if (modal) modal.classList.remove('open');
}

// Attach all dynamic UI events
window.addEventListener('DOMContentLoaded', () => {
  // Set default language
  setLang('lt');

  // Lang switcher events
  const pill = document.getElementById('langPill');
  if (pill) {
    pill.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const l = btn.getAttribute('data-lang');
        if (l) setLang(l);
      });
    });
  }

  // Search input events
  const searchInput = document.getElementById('archiveSearch');
  if (searchInput) {
    searchInput.addEventListener('input', onSearchInput);
  }

  // Clear search button
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        onSearchInput();
        searchInput.focus();
      }
    });
  }

  // Filter button events
  const filterRow = document.getElementById('filterRow');
  if (filterRow) {
    filterRow.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        if (f) setFilter(f, btn);
      });
    });
  }

  // Reset filters button in empty state
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      onSearchInput();
      const allFilterBtn = filterRow ? filterRow.querySelector('[data-filter="all"]') : null;
      setFilter('all', allFilterBtn);
    });
  }

  // Modal close handlers
  const modal = document.getElementById('changelogModal');
  if (modal) {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on click outside modal card
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Reveal elements on load
  setTimeout(() => {
    document.querySelectorAll('.r').forEach(el => el.classList.add('in'));
  }, 100);
});
