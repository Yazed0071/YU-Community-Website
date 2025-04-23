// Setup
let current = new Date();  
const monthYearEl = document.getElementById('month-year');
const calEl       = document.getElementById('calendar-container');
const detailsEl   = document.getElementById('event-details');
let eventsData    = [];

// Month Nav
document.getElementById('prev-month').onclick = () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
};
document.getElementById('next-month').onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};

// Fetch events once
fetch('data/events.json')
  .then(r => r.json())
  .then(json => {
    eventsData = json;
    renderCalendar();
  })
  .catch(console.error);

// Render the calendar grid
function renderCalendar() {
  calEl.innerHTML = '';
  const mo = current.toLocaleString('default',{ month:'long' });
  const yr = current.getFullYear();
  monthYearEl.textContent = `${mo} ${yr}`;

  const year = current.getFullYear();
  const month = current.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= days; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = d;

    // Highlight today
    const today = new Date();
    if (today.toDateString() === new Date(dateStr).toDateString()) {
      dayEl.classList.add('today','active');
      showEventsFor(dateStr);
    }

    // Dot for days with events
    if (eventsData.some(e => e.date === dateStr)) {
      dayEl.classList.add('has-event');
    }

    dayEl.onclick = () => {
      document.querySelectorAll('.calendar-day.active')
              .forEach(el => el.classList.remove('active'));
      dayEl.classList.add('active');
      showEventsFor(dateStr);
    };

    calEl.appendChild(dayEl);
  }
}

// Render events for a given date
function showEventsFor(dateStr) {
  detailsEl.innerHTML = '';
  const dayEvents = eventsData.filter(e => e.date === dateStr);

  if (!dayEvents.length) {
    detailsEl.innerHTML = '<p>No events for this day</p>';
    return;
  }

  dayEvents.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';

    // Always show startTime, then endTime if provided
    let timesHtml = `<div class="times-row">
                       <span class="time-start">${ev.startTime}</span>`;
    if (!ev.allDay && ev.endTime) {
      timesHtml += `<span class="time-end">${ev.endTime}</span>`;
    }
    timesHtml += '</div>';

    // Badge for all‑day
    const badgeHtml = ev.allDay
      ? '<span class="all-day-badge">All Day</span>'
      : '';

    card.innerHTML = `
      <h2>${ev.title}</h2>
      ${timesHtml}
      <a class="club-link" href="${ev.clubLink}">${ev.club}</a>
      <p>${ev.description}</p>
      <p>📍 ${ev.location}</p>
      ${badgeHtml}
    `;
    detailsEl.appendChild(card);
  });
}
