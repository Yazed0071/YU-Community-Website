const container = document.getElementById("club_cards-container");
const searchInput = document.getElementById("club-search");

// load & render all clubs
let clubsData = [];
function renderClubs(list) {
  container.innerHTML = "";
  list.forEach(club => {
    const card = document.createElement("div");
    card.className = "club_cards-card";
    card.innerHTML = `
      <img src="${club.logo}" alt="${club.name}">
      <p>${club.name}</p>
      <a class="enter-button" href="${club.link}">Enter</a>
    `;
    container.appendChild(card);
  });
}

// fetch once
fetch('data/club_cards.json')
  .then(res => res.json())
  .then(clubs => {
    clubsData = clubs;
    renderClubs(clubsData);
  })
  .catch(err => console.error("Failed to load clubs:", err));

// filter on input
searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = clubsData.filter(c =>
    c.name.toLowerCase().includes(term)
  );
  renderClubs(filtered);
});
