const container = document.getElementById('club_cards-container');
const searchInput = document.getElementById('club-search');
let allClubs = [];

fetch('data/club_cards.json')
  .then(res => res.json())
  .then(clubs => {
    allClubs = clubs;
    renderClubs(allClubs);
  })
  .catch(err => console.error('Failed to load clubs:', err));

searchInput.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = allClubs.filter(c =>
    c.name.toLowerCase().includes(q)
  );
  renderClubs(filtered);
});

function renderClubs(list) {
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#666;">No clubs found.</p>';
    return;
  }
  list.forEach(club => {
    const card = document.createElement('div');
    card.className = 'club_cards-card';
    card.innerHTML = `
      <img src="${club.logo}" alt="${club.name}">
      <p>${club.name}</p>
      <a class="enter-button" href="${club.link}">Enter</a>
    `;
    container.appendChild(card);
  });
}
