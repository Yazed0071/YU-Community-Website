const darkToggle = document.getElementById('dark-toggle');
const langSelect = document.getElementById('lang-select');

const savedDark = localStorage.getItem('darkMode') === 'true';
darkToggle.checked = savedDark;
document.documentElement.classList.toggle('dark-mode', savedDark);

const savedLang = localStorage.getItem('lang') || 'en';
langSelect.value = savedLang;

import { applyLanguage } from './translation.js';
applyLanguage(savedLang);

darkToggle.addEventListener('change', e => {
  document.documentElement.classList.toggle('dark-mode', e.target.checked);
  localStorage.setItem('darkMode', e.target.checked);
});

langSelect.addEventListener('change', e => {
  const lang = e.target.value;
  localStorage.setItem('lang', lang);
  applyLanguage(lang);
});
