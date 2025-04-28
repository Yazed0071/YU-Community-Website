document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('dark-toggle');
  const isDark = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDark);
  if (checkbox) checkbox.checked = isDark;

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      const on = checkbox.checked;
      document.body.classList.toggle('dark-mode', on);
      localStorage.setItem('darkMode', on);
    });
  }
});
