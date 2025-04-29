document.addEventListener('DOMContentLoaded', () => {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  let navbarPath = 'navbar.html'; // default

  if (navbarPlaceholder && navbarPlaceholder.dataset.navbar) {
    navbarPath = navbarPlaceholder.dataset.navbar; // override if specified
  }

  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      navbarPlaceholder.innerHTML = data;

      // Re-bind nav toggle
      const navToggle = document.getElementById('navToggle');
      const navLinks = document.getElementById('navLinks');
      if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
          });
        });
      }
    });

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
