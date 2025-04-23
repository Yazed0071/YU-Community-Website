fetch('data/posts.json')
  .then(r => r.json())
  .then(posts => {
    const container = document.getElementById('posts-container');
    posts.forEach(p => {
      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <h2>${p.title}</h2>
        <p>${p.summary} <a class="highlight-link" href="${p.link}">${p.club}</a></p>
        <small>${p.date}</small>
      `;
      container.appendChild(div);
    });
  })
  .catch(console.error);