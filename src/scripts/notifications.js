// helper from before, returns e.g. "2h ago", "just now", etc.
function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // in seconds
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

const listEl = document.querySelector('.notifications-list');
const markAllBtn = document.querySelector('.mark-all');
const tabs = document.querySelectorAll('.tab');

// load & render
fetch('data/notifications.json')
  .then(r => r.json())
  .then(notifs => {
    // enrich with runtime timestamp
    notifs.forEach(n => n.timestamp = timeAgo(new Date(n.date)));
    renderList(notifs);
    setupTabs(notifs);
  })
  .catch(console.error);

function renderList(notifs) {
  listEl.innerHTML = '';
  if (!notifs.length) {
    listEl.innerHTML = `<p class="empty">You're all caught up! 🎉</p>`;
    return;
  }

  notifs.forEach(n => {
    const card = document.createElement('div');
    card.className = 'notification-card';
    card.innerHTML = `
      <div class="notification-icon ${n.type}">
        ${n.type === 'event' ? '📅' : '📝'}
      </div>
      <div class="notification-content">
        <h2>${n.title}</h2>
        <p>${n.message}</p>
        <div class="notification-meta">
          <div class="club-info">
            <img src="${n.logo}" alt="${n.club} logo">
            <a href="${n.clubLink}">${n.club}</a>
          </div>
          <div class="timestamp">${n.timestamp}</div>
        </div>
      </div>
    `;
    listEl.appendChild(card);
  });
}

// tab‐filtering
function setupTabs(allNotifs) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter; // e.g. "all", "event", "post"
      const filtered = filter === 'all'
        ? allNotifs
        : allNotifs.filter(n => n.type === filter);
      renderList(filtered);
    });
  });
}

// “Mark All Read” (just clears)
markAllBtn.addEventListener('click', () => {
  listEl.innerHTML = `<p class="empty">All notifications marked as read.</p>`;
});
