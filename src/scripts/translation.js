const dict = {
  en: {
    nav_home:        'Home',
    nav_clubs:       'Clubs',
    nav_events:      'Events',
    nav_notifications: 'Notifications',
    nav_settings:    'Settings',
    nav_about:       'About',
    site_title:      'YU Community',
    recent_posts:    'Recent Posts',
    footer_text:     '© 2025 YU Community. All rights reserved.',
    mark_all:        'Mark All Read',
    tab_all:         'All',
    tab_events:      'Events',
    tab_posts:       'Posts',
    account:         'ACCOUNT',
    sign_in:         'Sign In ›',
    app_settings:    'APP SETTINGS',
    language:        'Language',
    dark_mode:       'Dark Mode',
    about:           'ABOUT',
    about_app:       'About This App ›',
    contact_us:      'Contact Us ›',
    terms:           'Terms of Service ›',
    privacy:         'Privacy Policy ›',
    version:         'Version'
  },
  ar: {
    nav_home:        'الرئيسية',
    nav_clubs:       'الأندية',
    nav_events:      'الأحداث',
    nav_notifications: 'الإشعارات',
    nav_settings:    'الإعدادات',
    nav_about:       'حول',
    site_title:      'مجتمع YU',
    recent_posts:    'أحدث المنشورات',
    footer_text:     '© 2025 مجتمع YU. جميع الحقوق محفوظة.',
    mark_all:        'علامة الكل كمقروء',
    tab_all:         'الكل',
    tab_events:      'الأحداث',
    tab_posts:       'المنشورات',
    account:         'الحساب',
    sign_in:         'تسجيل الدخول ›',
    app_settings:    'إعدادات التطبيق',
    language:        'اللغة',
    dark_mode:       'الوضع المظلم',
    about:           'حول',
    about_app:       'عن التطبيق ›',
    contact_us:      'اتصل بنا ›',
    terms:           'شروط الخدمة ›',
    privacy:         'سياسة الخصوصية ›',
    version:         'الإصدار'
  }
};

function translatePage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[lang] && dict[lang][key]) {
      el.textContent = dict[lang][key];
    }
  });

  const page = document.documentElement.getAttribute('data-i18n-page');
  if (page && dict[lang][`nav_${page}`]) {
    document.title = dict[lang][`nav_${page}`] + ' – ' + dict[lang].site_title;
  }

  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  translatePage(saved);

  const sel = document.getElementById('lang-select');
  if (sel) {
    sel.addEventListener('change', () => {
      const chosen = sel.value;
      localStorage.setItem('lang', chosen);
      translatePage(chosen);
    });
  }
});
