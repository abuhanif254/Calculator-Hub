// Nexus Calculator Extension - Popup Engine

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCalculator();
  initConverter();
  initDevTools();
  initHubSearch();
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

// ==========================================
// 1. Tab Controller
// ==========================================
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.add('hidden'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(`panel-${target}`);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
        if (target === 'calc') {
          document.getElementById('calc-input')?.focus();
        }
      }
    });
  });
}

// ==========================================
// 2. Smart Calculator Engine
// ==========================================
function initCalculator() {
  const input = document.getElementById('calc-input');
  const preview = document.getElementById('calc-preview');
  const btnEquals = document.getElementById('btn-equals');
  const btnClear = document.getElementById('btn-clear');
  const btnBackspace = document.getElementById('btn-backspace');
  const btnCopy = document.getElementById('btn-copy');
  const btnToggleHistory = document.getElementById('btn-toggle-history');
  const historyDrawer = document.getElementById('calc-history-drawer');
  const historyList = document.getElementById('history-list');
  const historyCount = document.getElementById('history-count');
  const btnClearHistory = document.getElementById('btn-clear-history');

  let history = [];

  // Load history from chrome.storage.local or localStorage
  const loadHistory = () => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['nexus_calc_history'], (res) => {
        if (res.nexus_calc_history) {
          history = res.nexus_calc_history;
          renderHistory();
        }
      });
    } else {
      try {
        const saved = localStorage.getItem('nexus_calc_history');
        if (saved) {
          history = JSON.parse(saved);
          renderHistory();
        }
      } catch (e) {}
    }
  };

  const saveHistory = (expr, res) => {
    history.unshift({ expr, res, time: Date.now() });
    if (history.length > 25) history = history.slice(0, 25);

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ nexus_calc_history: history });
    } else {
      try {
        localStorage.setItem('nexus_calc_history', JSON.stringify(history));
      } catch (e) {}
    }
    renderHistory();
  };

  const renderHistory = () => {
    historyCount.textContent = history.length;
    historyList.innerHTML = '';
    if (history.length === 0) {
      historyList.innerHTML = '<div style="padding: 10px; text-align: center; color: #64748b; font-size: 11px;">No past calculations yet.</div>';
      return;
    }

    history.forEach(item => {
      const row = document.createElement('div');
      row.className = 'history-item';
      row.innerHTML = `
        <span class="history-expr">${item.expr}</span>
        <span class="history-res">= ${item.res}</span>
      `;
      row.addEventListener('click', () => {
        input.value = item.res;
        preview.textContent = item.expr;
        historyDrawer.classList.add('hidden');
        input.focus();
      });
      historyList.appendChild(row);
    });
  };

  loadHistory();

  // Evaluate math safely
  const calculate = () => {
    const raw = input.value.trim();
    if (!raw) return;

    try {
      let sanitized = raw
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/\^/g, '**')
        .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
        .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

      // Evaluate percent logic e.g., 200 + 10% -> 200 + 20
      sanitized = sanitized.replace(/(\d+(\.\d+)?)\%/g, '($1/100)');

      // Whitelist safety check
      if (!/^[\d\s\+\-\*\/\.\(\)\%\^,MathPIEsqrt]+$/.test(sanitized)) {
        preview.textContent = 'Invalid characters';
        return;
      }

      const fn = new Function(`'use strict'; return (${sanitized})`);
      const val = fn();

      if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
        const formatted = Math.abs(val) < 1e-12 ? '0' : Number(val.toFixed(8)).toString();
        preview.textContent = `${raw} =`;
        input.value = formatted;
        saveHistory(raw, formatted);
      } else {
        preview.textContent = 'Error';
      }
    } catch (err) {
      preview.textContent = 'Syntax Error';
    }
  };

  // Button clicks
  document.querySelectorAll('.calc-keypad [data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      if (key === 'pi') {
        input.value += 'π';
      } else if (key === 'e') {
        input.value += 'e';
      } else if (key === 'sqrt') {
        input.value += '√(';
      } else {
        input.value += key;
      }
      input.focus();
    });
  });

  btnEquals.addEventListener('click', calculate);

  btnClear.addEventListener('click', () => {
    input.value = '';
    preview.textContent = '';
    input.focus();
  });

  btnBackspace.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
    input.focus();
  });

  btnCopy.addEventListener('click', () => {
    if (!input.value) return;
    navigator.clipboard.writeText(input.value).then(() => {
      showToast('Result copied to clipboard!');
    });
  });

  btnToggleHistory.addEventListener('click', () => {
    historyDrawer.classList.toggle('hidden');
  });

  btnClearHistory.addEventListener('click', () => {
    history = [];
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(['nexus_calc_history']);
    } else {
      localStorage.removeItem('nexus_calc_history');
    }
    renderHistory();
  });

  // Keyboard support
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculate();
    } else if (e.key === 'Escape') {
      input.value = '';
      preview.textContent = '';
    }
  });
}

// ==========================================
// 3. Multi-Unit Converter
// ==========================================
function initConverter() {
  const categoryBtns = document.querySelectorAll('.conv-cat-btn');
  const fromValue = document.getElementById('conv-from-value');
  const toValue = document.getElementById('conv-to-value');
  const fromUnit = document.getElementById('conv-from-unit');
  const toUnit = document.getElementById('conv-to-unit');
  const btnSwap = document.getElementById('conv-btn-swap');
  const formulaDisplay = document.getElementById('conv-formula');

  const UNIT_DEFINITIONS = {
    length: {
      units: [
        { id: 'm', name: 'Meters (m)', factor: 1 },
        { id: 'km', name: 'Kilometers (km)', factor: 1000 },
        { id: 'cm', name: 'Centimeters (cm)', factor: 0.01 },
        { id: 'mm', name: 'Millimeters (mm)', factor: 0.001 },
        { id: 'in', name: 'Inches (in)', factor: 0.0254 },
        { id: 'ft', name: 'Feet (ft)', factor: 0.3048 },
        { id: 'yd', name: 'Yards (yd)', factor: 0.9144 },
        { id: 'mi', name: 'Miles (mi)', factor: 1609.344 },
      ],
      defaultFrom: 'm',
      defaultTo: 'ft'
    },
    mass: {
      units: [
        { id: 'kg', name: 'Kilograms (kg)', factor: 1 },
        { id: 'g', name: 'Grams (g)', factor: 0.001 },
        { id: 'mg', name: 'Milligrams (mg)', factor: 0.000001 },
        { id: 'lb', name: 'Pounds (lb)', factor: 0.45359237 },
        { id: 'oz', name: 'Ounces (oz)', factor: 0.028349523125 },
        { id: 'ton', name: 'Metric Tons (t)', factor: 1000 },
      ],
      defaultFrom: 'kg',
      defaultTo: 'lb'
    },
    temperature: {
      units: [
        { id: 'c', name: 'Celsius (°C)' },
        { id: 'f', name: 'Fahrenheit (°F)' },
        { id: 'k', name: 'Kelvin (K)' },
      ],
      defaultFrom: 'c',
      defaultTo: 'f'
    },
    speed: {
      units: [
        { id: 'kmh', name: 'Kilometers/h (km/h)', factor: 1 },
        { id: 'mph', name: 'Miles/h (mph)', factor: 1.609344 },
        { id: 'ms', name: 'Meters/s (m/s)', factor: 3.6 },
        { id: 'knot', name: 'Knots (kn)', factor: 1.852 },
      ],
      defaultFrom: 'kmh',
      defaultTo: 'mph'
    },
    digital: {
      units: [
        { id: 'b', name: 'Bytes (B)', factor: 1 },
        { id: 'kb', name: 'Kilobytes (KB)', factor: 1024 },
        { id: 'mb', name: 'Megabytes (MB)', factor: 1024 * 1024 },
        { id: 'gb', name: 'Gigabytes (GB)', factor: 1024 * 1024 * 1024 },
        { id: 'tb', name: 'Terabytes (TB)', factor: 1024 * 1024 * 1024 * 1024 },
      ],
      defaultFrom: 'mb',
      defaultTo: 'gb'
    }
  };

  let currentCategory = 'length';

  const populateUnits = () => {
    const def = UNIT_DEFINITIONS[currentCategory];
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    def.units.forEach(u => {
      const optFrom = document.createElement('option');
      optFrom.value = u.id;
      optFrom.textContent = u.name;
      fromUnit.appendChild(optFrom);

      const optTo = document.createElement('option');
      optTo.value = u.id;
      optTo.textContent = u.name;
      toUnit.appendChild(optTo);
    });

    fromUnit.value = def.defaultFrom;
    toUnit.value = def.defaultTo;
    convert();
  };

  const convert = () => {
    const val = parseFloat(fromValue.value);
    if (isNaN(val)) {
      toValue.value = '';
      formulaDisplay.textContent = 'Enter a valid number';
      return;
    }

    const uFrom = fromUnit.value;
    const uTo = toUnit.value;

    if (currentCategory === 'temperature') {
      let cVal = val;
      if (uFrom === 'f') cVal = (val - 32) * (5 / 9);
      if (uFrom === 'k') cVal = val - 273.15;

      let finalVal = cVal;
      if (uTo === 'f') finalVal = (cVal * 9 / 5) + 32;
      if (uTo === 'k') finalVal = cVal + 273.15;

      toValue.value = Number(finalVal.toFixed(4)).toString();
      formulaDisplay.textContent = `${val} ${uFrom.toUpperCase()} = ${toValue.value} ${uTo.toUpperCase()}`;
      return;
    }

    const def = UNIT_DEFINITIONS[currentCategory];
    const unitFromObj = def.units.find(u => u.id === uFrom);
    const unitToObj = def.units.find(u => u.id === uTo);

    if (!unitFromObj || !unitToObj) return;

    const baseVal = val * unitFromObj.factor;
    const result = baseVal / unitToObj.factor;

    toValue.value = Number(result.toFixed(6)).toString();
    formulaDisplay.textContent = `1 ${unitFromObj.id} = ${Number((unitFromObj.factor / unitToObj.factor).toFixed(6))} ${unitToObj.id}`;
  };

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      populateUnits();
    });
  });

  fromValue.addEventListener('input', convert);
  fromUnit.addEventListener('change', convert);
  toUnit.addEventListener('change', convert);

  btnSwap.addEventListener('click', () => {
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    convert();
  });

  populateUnits();
}

// ==========================================
// 4. Developer Utilities Engine
// ==========================================
function initDevTools() {
  const devNavBtns = document.querySelectorAll('.dev-nav-btn');
  const devPanels = document.querySelectorAll('.dev-subpanel');

  devNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-dev');
      devNavBtns.forEach(b => b.classList.remove('active'));
      devPanels.forEach(p => p.classList.add('hidden'));

      btn.classList.add('active');
      document.getElementById(`dev-${target}`)?.classList.remove('hidden');
    });
  });

  // JSON
  const jsonInput = document.getElementById('json-input');
  const jsonStatus = document.getElementById('json-status');
  document.getElementById('btn-json-beautify')?.addEventListener('click', () => {
    try {
      const parsed = JSON.parse(jsonInput.value);
      jsonInput.value = JSON.stringify(parsed, null, 2);
      jsonStatus.textContent = '✓ Valid JSON formatted';
      jsonStatus.className = 'status-msg success';
    } catch (e) {
      jsonStatus.textContent = `⚠ ${e.message}`;
      jsonStatus.className = 'status-msg error';
    }
  });

  document.getElementById('btn-json-minify')?.addEventListener('click', () => {
    try {
      const parsed = JSON.parse(jsonInput.value);
      jsonInput.value = JSON.stringify(parsed);
      jsonStatus.textContent = '✓ Valid JSON minified';
      jsonStatus.className = 'status-msg success';
    } catch (e) {
      jsonStatus.textContent = `⚠ ${e.message}`;
      jsonStatus.className = 'status-msg error';
    }
  });

  document.getElementById('btn-json-copy')?.addEventListener('click', () => {
    if (!jsonInput.value) return;
    navigator.clipboard.writeText(jsonInput.value).then(() => showToast('JSON copied!'));
  });

  // Base64
  const b64Input = document.getElementById('b64-input');
  const b64Status = document.getElementById('b64-status');
  document.getElementById('btn-b64-encode')?.addEventListener('click', () => {
    try {
      b64Input.value = btoa(unescape(encodeURIComponent(b64Input.value)));
      b64Status.textContent = '✓ Encoded to Base64';
      b64Status.className = 'status-msg success';
    } catch (e) {
      b64Status.textContent = `⚠ ${e.message}`;
      b64Status.className = 'status-msg error';
    }
  });

  document.getElementById('btn-b64-decode')?.addEventListener('click', () => {
    try {
      b64Input.value = decodeURIComponent(escape(atob(b64Input.value)));
      b64Status.textContent = '✓ Decoded from Base64';
      b64Status.className = 'status-msg success';
    } catch (e) {
      b64Status.textContent = `⚠ Invalid Base64 payload`;
      b64Status.className = 'status-msg error';
    }
  });

  document.getElementById('btn-b64-copy')?.addEventListener('click', () => {
    if (!b64Input.value) return;
    navigator.clipboard.writeText(b64Input.value).then(() => showToast('Base64 copied!'));
  });

  // Timestamp
  const tsSeconds = document.getElementById('ts-seconds');
  const tsMs = document.getElementById('ts-ms');
  const tsUtc = document.getElementById('ts-utc');

  const updateClock = () => {
    const now = Date.now();
    if (tsSeconds) tsSeconds.textContent = Math.floor(now / 1000);
    if (tsMs) tsMs.textContent = now;
    if (tsUtc) tsUtc.textContent = new Date(now).toUTCString();
  };
  setInterval(updateClock, 1000);
  updateClock();

  document.querySelectorAll('.copy-tiny-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (el) {
        navigator.clipboard.writeText(el.textContent).then(() => showToast('Timestamp copied!'));
      }
    });
  });

  // UUID v4
  const uuidDisplay = document.getElementById('uuid-display');
  const genUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    if (uuidDisplay) uuidDisplay.textContent = uuid;
  };

  document.getElementById('btn-uuid-gen')?.addEventListener('click', genUUID);
  document.getElementById('btn-uuid-copy')?.addEventListener('click', () => {
    if (uuidDisplay && uuidDisplay.textContent) {
      navigator.clipboard.writeText(uuidDisplay.textContent).then(() => showToast('UUID copied!'));
    }
  });
}

// ==========================================
// 5. Nexus Hub Search Engine
// ==========================================
function initHubSearch() {
  const searchInput = document.getElementById('hub-search-input');
  const resultsContainer = document.getElementById('hub-results');
  const categoryPills = document.querySelectorAll('#hub-category-filter .pill-btn');

  const TOOLS_CATALOG = [
    { slug: 'mortgage-calculator', title: 'Mortgage Calculator', cat: 'financial', desc: 'Monthly payments, amortization schedule, and PMI estimation.' },
    { slug: 'auto-loan-calculator', title: 'Auto Loan Calculator', cat: 'financial', desc: 'Calculate vehicle financing, interest, and terms.' },
    { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator', cat: 'financial', desc: 'Simulate long-term investment growth with recurring contributions.' },
    { slug: 'loan-calculator', title: 'Personal Loan Calculator', cat: 'financial', desc: 'Simple loan payment, principal, and total interest.' },
    { slug: '401k-calculator', title: '401(k) Retirement Calculator', cat: 'financial', desc: 'Employer match and retirement nest egg projections.' },
    { slug: 'sales-tax-calculator', title: 'Sales Tax Calculator', cat: 'financial', desc: 'Compute pre-tax and after-tax totals with local tax rates.' },
    { slug: 'bmi-calculator', title: 'BMI Calculator', cat: 'health', desc: 'Body Mass Index and healthy weight category ranges.' },
    { slug: 'calorie-calculator', title: 'Calorie / TDEE Calculator', cat: 'health', desc: 'Maintenance calories and macro deficit targets.' },
    { slug: 'body-fat-calculator', title: 'Body Fat Calculator', cat: 'health', desc: 'US Navy method body fat percentage estimation.' },
    { slug: 'percentage-calculator', title: 'Percentage Calculator', cat: 'math', desc: 'Calculate percent of a number, increases, and differences.' },
    { slug: 'fraction-calculator', title: 'Fraction Calculator', cat: 'math', desc: 'Add, subtract, multiply, and simplify fractions.' },
    { slug: 'probability-calculator', title: 'Probability Calculator', cat: 'math', desc: 'Independent events, combinations, and permutations.' },
    { slug: 'json-formatter', title: 'JSON Formatter & Validator', cat: 'tech', desc: 'Validate, format, indent, and inspect JSON trees.' },
    { slug: 'diff-checker', title: 'Text & Code Diff Checker', cat: 'tech', desc: 'Compare differences between text and source code blocks.' },
    { slug: 'base64-encoder', title: 'Base64 Encoder & Decoder', cat: 'tech', desc: 'Convert text and binary data to Base64 format.' },
  ];

  let selectedCat = 'all';

  const renderTools = () => {
    const query = (searchInput.value || '').trim().toLowerCase();
    resultsContainer.innerHTML = '';

    const filtered = TOOLS_CATALOG.filter(tool => {
      const matchCat = selectedCat === 'all' || tool.cat === selectedCat;
      const matchQuery = !query || tool.title.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b; font-size: 11px;">No calculators found. Try searching another term.</div>';
      return;
    }

    filtered.forEach(tool => {
      const a = document.createElement('a');
      a.className = 'hub-card';
      a.href = `https://www.nexuscalculator.net/en/calculators/${tool.slug}`;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `
        <div>
          <div class="hub-card-title">${tool.title}</div>
          <div class="hub-card-desc">${tool.desc}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #518231; shrink: 0;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      `;
      resultsContainer.appendChild(a);
    });
  };

  searchInput.addEventListener('input', renderTools);

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCat = pill.getAttribute('data-cat');
      renderTools();
    });
  });

  renderTools();
}
