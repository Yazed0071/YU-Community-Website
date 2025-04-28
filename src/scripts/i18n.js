let _trans; 
let _lang = localStorage.getItem('lang') || 'en';

fetch('data/translations.json')
  .then(r => r.json())
  .then(json => {
    _trans = json;
    applyLanguage(_lang);
  })
  .catch(console.error);

function applyLanguage(lang) {
  if (!_trans || !_trans[lang]) return;
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'ar') ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = _trans[lang][key];
    if (txt != null) el.textContent = txt;
  });
}

window.setLanguage = function(lang) {
  localStorage.setItem('lang', lang);
  _lang = lang;
  applyLanguage(lang);
};
